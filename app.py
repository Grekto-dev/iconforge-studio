#!/usr/bin/env python3
import os
import sys
import json
import base64
import socket
import urllib.parse
import threading
import mimetypes
from pathlib import Path
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler

BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

from backend.icon_manager import IconForgeManager

STATIC_DIR = BASE_DIR / "static"
manager = IconForgeManager()


class IconForgeHTTPHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Quiet logging
        pass

    def _send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _read_json_body(self):
        length = int(self.headers.get("Content-Length") or 0)
        if length == 0:
            return {}
        raw = self.rfile.read(length)
        return json.loads(raw.decode("utf-8"))

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        route = parsed.path
        qs = urllib.parse.parse_qs(parsed.query)

        try:
            if route == "/" or route == "/index.html":
                self._serve_static_file(STATIC_DIR / "index.html", "text/html; charset=utf-8")
                return

            if route.startswith("/static/"):
                rel = route[len("/static/"):]
                target = (STATIC_DIR / rel).resolve()
                if not str(target).startswith(str(STATIC_DIR.resolve())) or not target.is_file():
                    self.send_error(404)
                    return
                ctype, _ = mimetypes.guess_type(str(target))
                self._serve_static_file(target, ctype or "application/octet-stream")
                return

            if route == "/api/icon-file":
                icon_path = qs.get("path", [""])[0]
                if not icon_path or not os.path.exists(icon_path):
                    self.send_error(404)
                    return
                real_p = Path(os.path.realpath(icon_path))
                ext = real_p.suffix.lower()
                if ext not in (".svg", ".png", ".ico", ".webp", ".xpm"):
                    self.send_error(403)
                    return
                ctype = "image/svg+xml" if ext == ".svg" else f"image/{ext.lstrip('.')}"
                data = real_p.read_bytes()
                self.send_response(200)
                self.send_header("Content-Type", ctype)
                self.send_header("Content-Length", str(len(data)))
                self.send_header("Cache-Control", "public, max-age=60")
                self.end_headers()
                self.wfile.write(data)
                return

            if route == "/api/packs":
                packs = manager.list_all_packs()
                self._send_json({
                    "ok": True,
                    "current_system_theme": manager.get_current_system_theme(),
                    "settings": manager.get_user_settings(),
                    "packs": packs,
                })
                return

            if route == "/api/user-settings":
                self._send_json({"ok": True, "settings": manager.get_user_settings()})
                return

            if route == "/api/pack-state":
                pack_id = qs.get("pack_id", [""])[0]
                state = manager.get_pack_Editor_state(pack_id)
                self._send_json({"ok": True, "state": state})
                return

            if route == "/api/pack-icons":
                pack_id = qs.get("pack_id", [""])[0]
                cat_filter = qs.get("category", ["all"])[0]
                q = qs.get("q", [""])[0].strip().lower()
                limit = int(qs.get("limit", ["180"])[0])
                offset = int(qs.get("offset", ["0"])[0])

                pack_path = manager.resolve_pack_path(pack_id)
                if not pack_path:
                    self._send_json({"ok": False, "error": "Pack not found"}, 404)
                    return

                unique_icons = manager.get_effective_pack_icons(pack_id, include_inherited=True)
                filtered = []
                for ic in unique_icons:
                    if cat_filter != "all" and ic["category"] != cat_filter:
                        continue
                    if q:
                        if q not in ic["name"].lower() and not any(q in al.lower() for al in ic["aliases"]):
                            continue
                    filtered.append(ic)

                total = len(filtered)
                sliced = filtered[offset : offset + limit]
                self._send_json({
                    "ok": True,
                    "total": total,
                    "offset": offset,
                    "limit": limit,
                    "icons": sliced,
                })
                return

            if route == "/api/compare-slot":
                slot_id = qs.get("slot_id", [""])[0]
                items = manager.compare_slot_across_packs(slot_id)
                self._send_json({"ok": True, "slot_id": slot_id, "variants": items})
                return

            if route == "/api/imports":
                self._send_json({"ok": True, "imports": manager.list_imported_icons()})
                return

            if route == "/api/opendesktop/search":
                q = qs.get("q", [""])[0]
                sortmode = qs.get("sort", ["down"])[0]
                page = int(qs.get("page", ["0"])[0])
                res = manager.search_opendesktop(query=q, sortmode=sortmode, page=page)
                self._send_json({"ok": True, **res})
                return

            if route == "/api/opendesktop/jobs":
                self._send_json({"ok": True, "jobs": manager.get_download_jobs_status()})
                return

            self.send_error(404)

        except Exception as e:
            self._send_json({"ok": False, "error": str(e)}, 500)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        route = parsed.path

        try:
            body = self._read_json_body()

            if route == "/api/user-settings":
                saved = manager.save_user_settings(body)
                self._send_json({"ok": True, "settings": saved})
                return

            if route == "/api/packs/create":
                name = body.get("name", "MyCustomPack")
                base_theme = body.get("base_theme", "Win11-dark")
                clone_full = bool(body.get("clone_full", False))
                new_id = manager.create_new_pack(name=name, base_theme=base_theme, clone_full=clone_full)
                self._send_json({"ok": True, "pack_id": new_id})
                return

            if route == "/api/packs/settings":
                pack_id = body.get("pack_id")
                display_name = body.get("name")
                inherits = body.get("inherits")
                meta = manager.update_pack_settings(pack_id, display_name=display_name, inherits=inherits)
                self._send_json({"ok": True, "meta": meta})
                return

            if route == "/api/packs/delete":
                pack_id = body.get("pack_id")
                manager.delete_user_pack(pack_id)
                self._send_json({"ok": True})
                return

            if route == "/api/slot/assign":
                pack_id = body.get("pack_id")
                slot_id = body.get("slot_id")
                source_path = body.get("source_path")
                slot_meta = body.get("slot_meta")
                written = manager.assign_icon_to_slot(pack_id, slot_id, source_path, slot_meta)
                self._send_json({"ok": True, "written_path": written})
                return

            if route == "/api/slot/remove":
                pack_id = body.get("pack_id")
                icon_name = body.get("icon_name")
                aliases = body.get("aliases")
                removed = manager.remove_icon_from_pack(pack_id, icon_name, aliases)
                self._send_json({"ok": True, "removed_count": removed})
                return

            if route == "/api/slot/restore":
                pack_id = body.get("pack_id")
                slot_id = body.get("slot_id")
                manager.restore_slot(pack_id, slot_id)
                self._send_json({"ok": True})
                return

            if route == "/api/packs/bulk-copy":
                target_pack_id = body.get("target_pack_id")
                source_pack_id = body.get("source_pack_id")
                group_filter = body.get("group_filter", "places")
                count = manager.bulk_copy_from_pack(target_pack_id, source_pack_id, group_filter)
                self._send_json({"ok": True, "copied_count": count})
                return

            if route == "/api/packs/apply":
                pack_id = body.get("pack_id")
                applied_name = manager.apply_pack_to_system(pack_id)
                self._send_json({"ok": True, "applied_theme": applied_name})
                return

            if route == "/api/imports/upload":
                filename = body.get("filename", "icon.svg")
                data_b64 = body.get("data_b64", "")
                raw_bytes = base64.b64decode(data_b64)
                saved = manager.save_imported_file(filename, raw_bytes)

                # Optional direct assignment if dropped directly onto a slot
                pack_id = body.get("pack_id")
                slot_id = body.get("slot_id")
                slot_meta = body.get("slot_meta")
                written_path = None
                if pack_id and slot_id:
                    written_path = manager.assign_icon_to_slot(pack_id, slot_id, saved["path"], slot_meta)

                self._send_json({"ok": True, "imported": saved, "written_path": written_path})
                return

            if route == "/api/imports/delete":
                filename = body.get("filename", "")
                manager.delete_imported_icon(filename)
                self._send_json({"ok": True})
                return

            if route == "/api/opendesktop/download":
                item_id = body.get("item_id")
                title = body.get("title", "Icon Pack")
                archive_name = body.get("archive_name", "pack.tar.xz")
                download_url = body.get("download_url")
                job_id = manager.start_opendesktop_download(item_id, title, archive_name, download_url)
                self._send_json({"ok": True, "job_id": job_id})
                return

            if route == "/api/opendesktop/delete":
                item_id = body.get("item_id")
                manager.delete_downloaded_item(item_id)
                self._send_json({"ok": True})
                return

            self.send_error(404)

        except Exception as e:
            self._send_json({"ok": False, "error": str(e)}, 500)

    def _serve_static_file(self, path: Path, content_type: str):
        if not path.exists():
            self.send_error(404)
            return
        data = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)


def find_free_port(preferred=18420):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind(("127.0.0.1", preferred))
            return preferred
        except OSError:
            s.bind(("127.0.0.1", 0))
            return s.getsockname()[1]


def start_server(port):
    server = ThreadingHTTPServer(("127.0.0.1", port), IconForgeHTTPHandler)
    t = threading.Thread(target=server.serve_forever, daemon=True)
    t.start()
    return server


def run_gtk_webkit_window(url):
    import gi
    gi.require_version("Gtk", "3.0")
    gi.require_version("WebKit2", "4.1")
    from gi.repository import Gtk, Gdk, WebKit2

    settings = Gtk.Settings.get_default()
    if settings:
        settings.set_property("gtk-application-prefer-dark-theme", True)

    win = Gtk.Window(title="IconForge Studio — Linux Icon Pack Creator & Editor")
    win.set_default_size(1420, 880)
    win.set_position(Gtk.WindowPosition.CENTER)
    win.set_wmclass("iconforge", "IconForge")

    icon_file = STATIC_DIR / "iconforge.svg"
    if icon_file.exists():
        try:
            Gtk.Window.set_default_icon_from_file(str(icon_file))
            win.set_icon_from_file(str(icon_file))
        except Exception:
            pass

    webview = WebKit2.WebView()
    wv_settings = webview.get_settings()
    wv_settings.set_enable_developer_extras(True)
    wv_settings.set_enable_smooth_scrolling(True)

    # Dark background while loading
    rgba = Gdk.RGBA(0.055, 0.063, 0.082, 1.0)
    webview.set_background_color(rgba)

    webview.load_uri(url)
    win.add(webview)
    win.connect("destroy", Gtk.main_quit)
    win.show_all()
    Gtk.main()


if __name__ == "__main__":
    port = find_free_port(18420)
    server = start_server(port)
    url = f"http://127.0.0.1:{port}"
    print(f"IconForge Studio rodando em: {url}", flush=True)

    if "--headless" in sys.argv:
        try:
            threading.Event().wait()
        except KeyboardInterrupt:
            pass
    else:
        try:
            run_gtk_webkit_window(url)
        except Exception as e:
            print(f"Aviso GTK/WebKit2 ({e}), abrindo no navegador...", flush=True)
            import webbrowser
            webbrowser.open(url)
            threading.Event().wait()
