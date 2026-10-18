import os
import sys
import json
import time
import shutil
import tarfile
import zipfile
import tempfile
import threading
import subprocess
import configparser
from pathlib import Path
import requests

HOME = Path.home()
USER_ICONS_DIR = HOME / ".local" / "share" / "icons"
LEGACY_ICONS_DIR = HOME / ".icons"
SYSTEM_ICONS_DIR = Path("/usr/share/icons")
FLATPAK_EXPORTS_APPS = Path("/var/lib/flatpak/exports/share/applications")
FLATPAK_EXPORTS_ICONS = Path("/var/lib/flatpak/exports/share/icons/hicolor")
USER_APPS_DIR = HOME / ".local" / "share" / "applications"
SYSTEM_APPS_DIR = Path("/usr/share/applications")

APP_DATA_DIR = HOME / ".local" / "share" / "iconforge"
DOWNLOADS_DIR = APP_DATA_DIR / "downloads"
IMPORTS_DIR = APP_DATA_DIR / "imports"
DOWNLOADS_META_FILE = APP_DATA_DIR / "downloads_meta.json"
SETTINGS_FILE = APP_DATA_DIR / "settings.json"

for d in [USER_ICONS_DIR, APP_DATA_DIR, DOWNLOADS_DIR, IMPORTS_DIR]:
    d.mkdir(parents=True, exist_ok=True)


# Curated slots that represent the most important icons in a Linux / Cinnamon desktop
CURATED_SLOTS = [
    # Taskbar / Core Apps
    {
        "id": "com.google.Chrome",
        "label": "Google Chrome",
        "group": "taskbar",
        "category": "apps",
        "aliases": ["com.google.Chrome", "google-chrome", "google-chrome-stable", "chrome", "googlechrome"],
    },
    {
        "id": "nemo",
        "label": "File Manager (Nemo)",
        "group": "taskbar",
        "category": "apps",
        "aliases": ["nemo", "system-file-manager", "org.Nemo", "file-manager", "org.gnome.Nautilus"],
    },
    {
        "id": "org.gnome.Terminal",
        "label": "Terminal",
        "group": "taskbar",
        "category": "apps",
        "aliases": ["org.gnome.Terminal", "utilities-terminal", "terminal", "gnome-terminal", "xfce4-terminal"],
    },
    {
        "id": "hermes",
        "label": "Hermes Desktop",
        "group": "taskbar",
        "category": "apps",
        "aliases": ["hermes", "com.nousresearch.hermes"],
    },
    {
        "id": "antigravity",
        "label": "Antigravity IDE",
        "group": "taskbar",
        "category": "apps",
        "aliases": ["antigravity", "code", "visual-studio-code", "com.visualstudio.code"],
    },
    {
        "id": "iconforge",
        "label": "IconForge Studio",
        "group": "taskbar",
        "category": "apps",
        "aliases": ["iconforge", "IconForge"],
    },
    {
        "id": "preferences-system",
        "label": "System Settings",
        "group": "taskbar",
        "category": "apps",
        "aliases": ["preferences-system", "cinnamon-settings", "org.gnome.Settings", "gnome-control-center", "settings"],
    },

    # Folders & Places
    {
        "id": "folder",
        "label": "Default Folder",
        "group": "places",
        "category": "places",
        "aliases": ["folder", "inode-directory", "folder-blue", "folder-yellow"],
    },
    {
        "id": "folder-open",
        "label": "Open Folder",
        "group": "places",
        "category": "places",
        "aliases": ["folder-open", "folder-drag-accept"],
    },
    {
        "id": "user-home",
        "label": "Home Folder",
        "group": "places",
        "category": "places",
        "aliases": ["user-home", "folder-home"],
    },
    {
        "id": "folder-download",
        "label": "Downloads",
        "group": "places",
        "category": "places",
        "aliases": ["folder-download", "folder-downloads", "folder_download"],
    },
    {
        "id": "folder-documents",
        "label": "Documents",
        "group": "places",
        "category": "places",
        "aliases": ["folder-documents", "folder-document"],
    },
    {
        "id": "folder-pictures",
        "label": "Pictures / Photos",
        "group": "places",
        "category": "places",
        "aliases": ["folder-pictures", "folder-images", "folder-photo", "folder-photos"],
    },
    {
        "id": "folder-music",
        "label": "Music",
        "group": "places",
        "category": "places",
        "aliases": ["folder-music", "folder-sound", "folder-audio"],
    },
    {
        "id": "folder-videos",
        "label": "Videos",
        "group": "places",
        "category": "places",
        "aliases": ["folder-videos", "folder-video", "folder-movies"],
    },
    {
        "id": "user-desktop",
        "label": "Desktop",
        "group": "places",
        "category": "places",
        "aliases": ["user-desktop", "folder-desktop", "desktop"],
    },
    {
        "id": "user-trash",
        "label": "Trash (Empty)",
        "group": "places",
        "category": "places",
        "aliases": ["user-trash", "folder-trash", "trashcan_empty"],
    },
    {
        "id": "user-trash-full",
        "label": "Trash (Full)",
        "group": "places",
        "category": "places",
        "aliases": ["user-trash-full", "folder-trash-full", "trashcan_full"],
    },
    {
        "id": "folder-code",
        "label": "Code / Dev Folder",
        "group": "places",
        "category": "places",
        "aliases": ["folder-code", "folder-development", "folder-git", "folder-github"],
    },
    {
        "id": "folder-cloud",
        "label": "Cloud Folder",
        "group": "places",
        "category": "places",
        "aliases": ["folder-cloud", "folder-gdrive", "folder-dropbox", "folder-nextcloud"],
    },
    {
        "id": "folder-games",
        "label": "Games Folder",
        "group": "places",
        "category": "places",
        "aliases": ["folder-games", "folder-steam"],
    },
    {
        "id": "network-workgroup",
        "label": "Network / Servers",
        "group": "places",
        "category": "places",
        "aliases": ["network-workgroup", "network-server", "folder-remote", "folder-network"],
    },

    # System & Devices
    {
        "id": "drive-harddisk",
        "label": "Local Disk (HDD / SSD)",
        "group": "system",
        "category": "devices",
        "aliases": ["drive-harddisk", "drive-harddisk-system", "drive-harddisk-solidstate", "harddrive"],
    },
    {
        "id": "drive-removable-media",
        "label": "USB / Removable Drive",
        "group": "system",
        "category": "devices",
        "aliases": ["drive-removable-media", "drive-removable-media-usb", "media-removable", "usb-creator"],
    },
    {
        "id": "accessories-calculator",
        "label": "Calculator",
        "group": "system",
        "category": "apps",
        "aliases": ["accessories-calculator", "org.gnome.Calculator", "gnome-calculator", "calc", "calculator"],
    },
    {
        "id": "accessories-text-editor",
        "label": "Text Editor",
        "group": "system",
        "category": "apps",
        "aliases": ["accessories-text-editor", "org.x.editor", "xed", "org.gnome.TextEditor", "gedit", "notepadqq"],
    },
    {
        "id": "utilities-system-monitor",
        "label": "System Monitor",
        "group": "system",
        "category": "apps",
        "aliases": ["utilities-system-monitor", "org.gnome.SystemMonitor", "gnome-system-monitor", "htop"],
    },
    {
        "id": "system-software-install",
        "label": "Software Manager / Store",
        "group": "system",
        "category": "apps",
        "aliases": ["system-software-install", "mintinstall", "org.gnome.Software", "software-store"],
    },
    {
        "id": "accessories-screenshot",
        "label": "Screenshot",
        "group": "system",
        "category": "apps",
        "aliases": ["accessories-screenshot", "org.gnome.Screenshot", "applets-screenshooter"],
    },
    {
        "id": "multimedia-volume-control",
        "label": "Sound / Volume Control",
        "group": "system",
        "category": "apps",
        "aliases": ["multimedia-volume-control", "preferences-desktop-sound", "pavucontrol", "audio-card"],
    },
]


class IconForgeManager:
    def __init__(self):
        self._theme_scan_cache = {}  # theme_path -> (mtime, icons_dict, unique_list)
        self._downloads_lock = threading.Lock()
        self._active_downloads = {}  # job_id -> status dict

    def get_current_system_theme(self):
        try:
            out = subprocess.check_output(
                ["gsettings", "get", "org.cinnamon.desktop.interface", "icon-theme"],
                text=True,
                stderr=subprocess.DEVNULL,
            ).strip().strip("'")
            return out
        except Exception:
            return "Win11-dark"

    def list_all_packs(self):
        """Returns all local, system, and downloaded icon packs."""
        packs = []
        seen_paths = set()
        current_theme = self.get_current_system_theme()

        def inspect_dir(base_dir, source_type, extra_meta=None):
            if not base_dir.exists():
                return
            for entry in sorted(base_dir.iterdir(), key=lambda p: p.name.lower()):
                if not entry.is_dir():
                    continue
                if entry.name.startswith(".") or entry.name in ("default", "hicolor", "locolor"):
                    continue
                index_file = entry / "index.theme"
                custom_meta_file = entry / ".iconforge.json"
                # Check if it's a valid icon theme dir (exclude cursor-only themes)
                has_icon_subdirs = any(
                    (entry / sub).exists()
                    for sub in ("apps", "places", "scalable", "16", "22", "24", "32", "48", "64", "16x16", "24x24", "32x32", "48x48", "64x64")
                )
                if not (has_icon_subdirs or custom_meta_file.exists()):
                    continue
                real_p = str(entry.resolve())
                if real_p in seen_paths and source_type != "user":
                    continue
                seen_paths.add(real_p)

                display_name = entry.name
                comment = ""
                inherits = ""
                if index_file.exists():
                    try:
                        cp = configparser.ConfigParser(interpolation=None, strict=False)
                        cp.read(index_file, encoding="utf-8")
                        if "Icon Theme" in cp:
                            display_name = cp["Icon Theme"].get("Name", entry.name)
                            comment = cp["Icon Theme"].get("Comment", "")
                            inherits = cp["Icon Theme"].get("Inherits", "")
                    except Exception:
                        pass

                is_custom = custom_meta_file.exists()
                custom_data = {}
                if is_custom:
                    try:
                        custom_data = json.loads(custom_meta_file.read_text(encoding="utf-8"))
                    except Exception:
                        pass

                pack_info = {
                    "id": entry.name if source_type != "downloaded" else f"dl:{extra_meta['dl_id']}:{entry.name}",
                    "folder_name": entry.name,
                    "name": custom_data.get("name") or display_name,
                    "path": str(entry),
                    "source": source_type,  # 'user', 'downloaded', 'system'
                    "editable": source_type == "user",
                    "is_custom": is_custom,
                    "is_active": (entry.name == current_theme and source_type in ("user", "system")),
                    "comment": comment,
                    "inherits": custom_data.get("inherits") or inherits,
                    "override_count": len(custom_data.get("overrides", {})) if is_custom else 0,
                }
                if extra_meta:
                    pack_info.update(extra_meta)
                packs.append(pack_info)

        # 1. User packs (~/.local/share/icons and ~/.icons)
        inspect_dir(USER_ICONS_DIR, "user")
        inspect_dir(LEGACY_ICONS_DIR, "user")

        # 2. Downloaded packs from OpenDesktop (~/.local/share/iconforge/downloads/<dl_id>/<theme_dir>)
        dl_meta = self._load_downloads_meta()
        if DOWNLOADS_DIR.exists():
            for dl_folder in sorted(DOWNLOADS_DIR.iterdir(), key=lambda p: p.name):
                if not dl_folder.is_dir():
                    continue
                dl_id = dl_folder.name
                meta = dl_meta.get(dl_id, {})
                inspect_dir(
                    dl_folder,
                    "downloaded",
                    extra_meta={
                        "dl_id": dl_id,
                        "dl_title": meta.get("title", dl_id),
                        "dl_archive": meta.get("archive_name", ""),
                    },
                )

        # 3. System packs (/usr/share/icons)
        inspect_dir(SYSTEM_ICONS_DIR, "system")

        # Sort: Custom packs first, then active, then user packs, then downloaded, then system
        def sort_key(p):
            src_order = {"user": 1, "downloaded": 2, "system": 3}.get(p["source"], 4)
            return (0 if p["is_custom"] else 1, 0 if p["is_active"] else 1, src_order, p["name"].lower())

        packs.sort(key=sort_key)
        return packs

    def resolve_pack_path(self, pack_id):
        if not pack_id:
            return None
        if pack_id.startswith("dl:"):
            parts = pack_id.split(":", 2)
            if len(parts) == 3:
                p = DOWNLOADS_DIR / parts[1] / parts[2]
                if p.exists():
                    return p
        for base in [USER_ICONS_DIR, LEGACY_ICONS_DIR, SYSTEM_ICONS_DIR]:
            p = base / pack_id
            if p.exists():
                return p
        return None

    def scan_pack_icons(self, pack_path: Path):
        """Scans an icon theme directory and returns:
        - by_name: dict of icon_name -> {'path': str, 'category': str, 'score': int}
        - unique_icons: list of deduplicated icons for browsing [{'name': str, 'category': str, 'path': str, 'aliases': [str]}]
        """
        pack_str = str(pack_path)
        try:
            mtime = pack_path.stat().st_mtime
        except Exception:
            mtime = 0

        cached = self._theme_scan_cache.get(pack_str)
        if cached and cached[0] == mtime:
            return cached[1], cached[2]

        def score_path(p_str):
            lp = p_str.lower()
            if "symbolic" in lp:
                return 1
            if "scalable" in lp or "256" in lp or "128" in lp:
                return 100
            if "96" in lp or "64" in lp:
                return 85
            if "48" in lp:
                return 75
            if "32" in lp:
                return 60
            if "24" in lp or "22" in lp:
                return 40
            if "16" in lp:
                return 20
            return 50

        def detect_cat(rel_parts):
            for part in rel_parts:
                lp = part.lower()
                if lp in ("apps", "applications"):
                    return "apps"
                if lp in ("places",):
                    return "places"
                if lp in ("devices",):
                    return "devices"
                if lp in ("mimes", "mimetypes"):
                    return "mimes"
                if lp in ("status", "panel"):
                    return "status"
                if lp in ("categories",):
                    return "categories"
                if lp in ("actions",):
                    return "actions"
            return "other"

        by_name = {}
        visited_dirs = set()

        for root, dirs, files in os.walk(pack_str, followlinks=True):
            # Skip internal metadata dirs
            dirs[:] = [d for d in dirs if not d.startswith(".iconforge")]
            real_root = os.path.realpath(root)
            if real_root in visited_dirs:
                dirs[:] = []
                continue
            visited_dirs.add(real_root)

            rel_parts = os.path.relpath(root, pack_str).split(os.sep)
            cat = detect_cat(rel_parts)
            sc = score_path(root)
            if sc <= 1:
                continue  # skip symbolic icons in color browser

            for f in files:
                if not (f.endswith(".svg") or f.endswith(".png")):
                    continue
                name = os.path.splitext(f)[0]
                if name.endswith("-symbolic"):
                    continue
                full_path = os.path.join(root, f)
                existing = by_name.get(name)
                # Prefer places/apps over other if same score, or higher score
                cat_bonus = 5 if cat in ("apps", "places", "devices") else 0
                total_sc = sc + cat_bonus
                if existing is None or total_sc > existing["score"]:
                    by_name[name] = {
                        "name": name,
                        "category": cat,
                        "path": full_path,
                        "score": total_sc,
                    }

        curated_canonical = {cs["id"]: cs["label"] for cs in CURATED_SLOTS}
        for cs in CURATED_SLOTS:
            for al in cs.get("aliases", []):
                curated_canonical.setdefault(al, cs["label"])

        # Group by realpath to deduplicate symlinks for visual browsing
        by_realpath = {}
        for name, info in by_name.items():
            try:
                rp = os.path.realpath(info["path"])
            except Exception:
                rp = info["path"]
            real_stem = os.path.splitext(os.path.basename(rp))[0]
            if rp not in by_realpath:
                by_realpath[rp] = {
                    "name": name,
                    "real_stem": real_stem,
                    "category": info["category"],
                    "path": info["path"],
                    "score": info["score"],
                    "aliases": [name],
                }
            else:
                entry = by_realpath[rp]
                entry["aliases"].append(name)
                # Prefer exact real_stem or curated slot id over obscure short symlinks like 'Mt' or 'kfm'
                curr_name = entry["name"]
                if name == real_stem or (name in curated_canonical and curr_name != real_stem):
                    entry["name"] = name
                    entry["category"] = info["category"]
                    entry["path"] = info["path"]
                elif curr_name != real_stem and curr_name not in curated_canonical:
                    if len(name) >= 4 and (len(curr_name) < 4 or len(name) < len(curr_name)) and not name.startswith("chrome-"):
                        entry["name"] = name
                        entry["category"] = info["category"]
                        entry["path"] = info["path"]

        unique_icons = sorted(by_realpath.values(), key=lambda x: (x["category"], x["name"].lower()))
        self._theme_scan_cache[pack_str] = (mtime, by_name, unique_icons)
        return by_name, unique_icons

    def invalidate_cache(self, pack_path=None):
        if pack_path:
            self._theme_scan_cache.pop(str(pack_path), None)
        else:
            self._theme_scan_cache.clear()

    def get_installed_desktop_apps(self):
        """Scans .desktop files to get real applications installed on the user's system."""
        apps = {}
        # Check pinned apps in Cinnamon
        pinned_desktops = set()
        spices_dir = HOME / ".config" / "cinnamon" / "spices" / "grouped-window-list@cinnamon.org"
        if spices_dir.exists():
            for jf in spices_dir.glob("*.json"):
                try:
                    data = json.loads(jf.read_text(encoding="utf-8"))
                    vals = data.get("pinned-apps", {}).get("value", [])
                    for v in vals:
                        pinned_desktops.add(v.split(":")[0])
                except Exception:
                    pass

        search_dirs = [USER_APPS_DIR, FLATPAK_EXPORTS_APPS, SYSTEM_APPS_DIR]
        for sdir in search_dirs:
            if not sdir.exists():
                continue
            for df in sorted(sdir.glob("*.desktop")):
                try:
                    cp = configparser.ConfigParser(interpolation=None, strict=False)
                    cp.read(df, encoding="utf-8")
                    if "Desktop Entry" not in cp:
                        continue
                    de = cp["Desktop Entry"]
                    if de.get("NoDisplay", "false").lower() == "true":
                        continue
                    if de.get("Type", "Application") != "Application":
                        continue
                    icon_name = de.get("Icon", "").strip()
                    if not icon_name or icon_name.startswith("/"):
                        continue
                    name = (
                        de.get("Name[pt_BR]")
                        or de.get("Name[pt]")
                        or de.get("Name")
                        or df.stem
                    )
                    is_pinned = df.name in pinned_desktops
                    if icon_name not in apps or is_pinned:
                        apps[icon_name] = {
                            "id": icon_name,
                            "label": name,
                            "desktop_file": df.name,
                            "group": "taskbar" if is_pinned else "installed_apps",
                            "category": "apps",
                            "aliases": list({icon_name, df.stem, icon_name.lower()}),
                            "pinned": is_pinned,
                        }
                except Exception:
                    continue
        return list(apps.values())

    def get_pack_Editor_state(self, pack_id):
        """Returns the full state of a target pack for the Left Canvas editor."""
        pack_path = self.resolve_pack_path(pack_id)
        if not pack_path:
            raise ValueError(f"Pack '{pack_id}' não encontrado.")

        by_name, unique_icons = self.scan_pack_icons(pack_path)

        # Check custom metadata if any
        meta_file = pack_path / ".iconforge.json"
        custom_meta = {}
        if meta_file.exists():
            try:
                custom_meta = json.loads(meta_file.read_text(encoding="utf-8"))
            except Exception:
                pass

        overrides = custom_meta.get("overrides", {})

        # Also check fallback / inherited theme so slots show what fallback icon they have if not overridden yet
        inherits_str = custom_meta.get("inherits", "")
        index_display_name = ""
        if (pack_path / "index.theme").exists():
            try:
                cp = configparser.ConfigParser(interpolation=None, strict=False)
                cp.read(pack_path / "index.theme", encoding="utf-8")
                if "Icon Theme" in cp:
                    if not inherits_str:
                        inherits_str = cp["Icon Theme"].get("Inherits", "")
                    index_display_name = cp["Icon Theme"].get("Name", "")
            except Exception:
                pass

        fallback_Chain = []
        for inh in [x.strip() for x in inherits_str.split(",") if x.strip()]:
            if inh in ("hicolor", "default"):
                continue
            fb_path = self.resolve_pack_path(inh)
            if fb_path and fb_path != pack_path:
                fb_by_name, _ = self.scan_pack_icons(fb_path)
                fallback_Chain.append((inh, fb_by_name))

        # Build slots list combining CURATED_SLOTS + installed desktop apps + any custom slots in overrides
        slots_map = {}
        for s in CURATED_SLOTS:
            slots_map[s["id"]] = dict(s)

        for app in self.get_installed_desktop_apps():
            # Check if this app matches an existing curated slot alias
            matched_curated = False
            for cs in CURATED_SLOTS:
                if app["id"] in cs["aliases"]:
                    matched_curated = True
                    break
            if not matched_curated and app["id"] not in slots_map:
                slots_map[app["id"]] = app

        # Add any extra custom slots the user added in overrides
        for ov_id, ov_data in overrides.items():
            if ov_id not in slots_map:
                slots_map[ov_id] = {
                    "id": ov_id,
                    "label": ov_data.get("label", ov_id),
                    "group": ov_data.get("group", "custom"),
                    "category": ov_data.get("category", "apps"),
                    "aliases": ov_data.get("aliases", [ov_id]),
                }

        # Resolve current icon path for each slot
        resolved_slots = []
        for slot_id, slot in slots_map.items():
            aliases = slot.get("aliases", [slot_id])
            found_path = None
            found_source = "none"  # 'pack', 'override', 'fallback', 'system'

            # 1. Check in the pack itself
            for al in aliases:
                if al in by_name:
                    found_path = by_name[al]["path"]
                    found_source = "override" if slot_id in overrides else "pack"
                    break

            # 2. Check in inherited fallback themes
            if not found_path:
                for fb_name, fb_by_name in fallback_Chain:
                    for al in aliases:
                        if al in fb_by_name:
                            found_path = fb_by_name[al]["path"]
                            found_source = f"fallback:{fb_name}"
                            break
                    if found_path:
                        break

            # 3. Check in Flatpak/hicolor exports for apps
            if not found_path:
                for al in aliases:
                    for cand in [
                        FLATPAK_EXPORTS_ICONS / "scalable" / "apps" / f"{al}.svg",
                        FLATPAK_EXPORTS_ICONS / "128x128" / "apps" / f"{al}.png",
                        FLATPAK_EXPORTS_ICONS / "64x64" / "apps" / f"{al}.png",
                        USER_ICONS_DIR / "hicolor" / "scalable" / "apps" / f"{al}.svg",
                        SYSTEM_ICONS_DIR / "hicolor" / "scalable" / "apps" / f"{al}.svg",
                        SYSTEM_ICONS_DIR / "hicolor" / "48x48" / "apps" / f"{al}.png",
                    ]:
                        if cand.exists():
                            found_path = str(cand)
                            found_source = "hicolor"
                            break
                    if found_path:
                        break

            resolved_slots.append({
                "id": slot_id,
                "label": slot["label"],
                "group": slot["group"],
                "category": slot["category"],
                "aliases": aliases,
                "icon_path": found_path,
                "source_type": found_source,
                "is_overridden": slot_id in overrides,
                "override_info": overrides.get(slot_id),
            })

        effective_icons = self.get_effective_pack_icons(pack_id, include_inherited=True)

        return {
            "pack_id": pack_id,
            "pack_name": custom_meta.get("name") or index_display_name or pack_path.name,
            "pack_path": str(pack_path),
            "editable": pack_path.parent in (USER_ICONS_DIR, LEGACY_ICONS_DIR),
            "is_custom": meta_file.exists(),
            "inherits": inherits_str,
            "is_active": (pack_path.name == self.get_current_system_theme()),
            "total_pack_icons": len(effective_icons),
            "slots": resolved_slots,
        }

    def get_effective_pack_icons(self, pack_id, include_inherited=True):
        """Returns all unique icons in pack_id, optionally merging icons from its primary inherited theme
        when pack_id is a custom overlay pack, with direct/edited icons listed first."""
        pack_path = self.resolve_pack_path(pack_id)
        if not pack_path:
            return []

        _, direct_icons = self.scan_pack_icons(pack_path)
        meta_file = pack_path / ".iconforge.json"
        custom_meta = {}
        if meta_file.exists():
            try:
                custom_meta = json.loads(meta_file.read_text(encoding="utf-8"))
            except Exception:
                pass

        overrides = custom_meta.get("overrides", {})
        removed_set = set(custom_meta.get("removed_icons", []))

        result = []
        seen_names = set()

        for ic in direct_icons:
            if ic["name"] in removed_set:
                continue
            item = dict(ic)
            item["is_overridden"] = ic["name"] in overrides
            item["source_origin"] = "pack"
            result.append(item)
            seen_names.add(ic["name"])
            for al in ic.get("aliases", []):
                seen_names.add(al)

        if include_inherited and len(direct_icons) < 200:
            inherits_str = custom_meta.get("inherits", "")
            if not inherits_str and (pack_path / "index.theme").exists():
                try:
                    cp = configparser.ConfigParser(interpolation=None, strict=False)
                    cp.read(pack_path / "index.theme", encoding="utf-8")
                    if "Icon Theme" in cp:
                        inherits_str = cp["Icon Theme"].get("Inherits", "")
                except Exception:
                    pass

            for inh in [x.strip() for x in inherits_str.split(",") if x.strip()]:
                if inh in ("hicolor", "default", "Adwaita"):
                    continue
                fb_path = self.resolve_pack_path(inh)
                if fb_path and fb_path != pack_path:
                    _, fb_icons = self.scan_pack_icons(fb_path)
                    for ic in fb_icons:
                        if ic["name"] in seen_names or ic["name"] in removed_set:
                            continue
                        if any(al in seen_names or al in removed_set for al in ic.get("aliases", [])):
                            continue
                        item = dict(ic)
                        item["is_overridden"] = False
                        item["source_origin"] = f"fallback:{inh}"
                        result.append(item)
                        seen_names.add(ic["name"])
                        for al in ic.get("aliases", []):
                            seen_names.add(al)
                    break  # Primary inherited theme is enough for clean browsing

        curated_priority = {}
        for idx, cs in enumerate(CURATED_SLOTS):
            curated_priority[cs["id"]] = idx
            for al in cs.get("aliases", []):
                curated_priority.setdefault(al, idx)

        cat_order = {"places": 0, "apps": 1, "devices": 2, "mimes": 3, "status": 4, "categories": 5, "actions": 6}

        def icon_sort_key(x):
            name = x["name"]
            c_idx = curated_priority.get(name)
            if c_idx is None:
                for al in x.get("aliases", []):
                    if al in curated_priority:
                        c_idx = curated_priority[al]
                        break
            return (
                0 if x.get("is_overridden") else 1,
                0 if c_idx is not None else 1,
                c_idx if c_idx is not None else 9999,
                cat_order.get(x["category"], 9),
                name.lower(),
            )

        result.sort(key=icon_sort_key)
        return result

    def create_new_pack(self, name, base_theme="Win11-dark", clone_full=False):
        """Creates a new customizable icon pack in ~/.local/share/icons/<folder_name>."""
        safe_id = "".join(c if (c.isalnum() or c in "-_") else "-" for c in name.strip()).strip("-")
        if not safe_id:
            safe_id = f"CustomPack-{int(time.time())}"
        target_dir = USER_ICONS_DIR / safe_id
        counter = 2
        while target_dir.exists():
            target_dir = USER_ICONS_DIR / f"{safe_id}-{counter}"
            counter += 1

        if clone_full and base_theme and base_theme != "none":
            src_path = self.resolve_pack_path(base_theme)
            if src_path and src_path.exists():
                # Copy tree resolving symlinks so it's standalone
                shutil.copytree(src_path, target_dir, symlinks=False, ignore_dangling_symlinks=True)

        target_dir.mkdir(parents=True, exist_ok=True)
        for cat in ["apps", "places", "devices", "mimes", "status", "categories", "actions"]:
            (target_dir / cat / "scalable").mkdir(parents=True, exist_ok=True)

        inherits_list = []
        if base_theme and base_theme != "none":
            # If base_theme is a downloaded pack id, use Win11-dark or hicolor as system fallback
            if not base_theme.startswith("dl:"):
                inherits_list.append(base_theme)
        inherits_list.append("hicolor")
        inherits_str = ",".join(dict.fromkeys(inherits_list))

        self._write_index_theme(target_dir, name.strip() or target_dir.name, inherits_str)

        meta = {
            "name": name.strip() or target_dir.name,
            "id": target_dir.name,
            "created_at": time.time(),
            "inherits": inherits_str,
            "overrides": {},
        }
        (target_dir / ".iconforge.json").write_text(json.dumps(meta, indent=2, ensure_ascii=False), encoding="utf-8")
        self.invalidate_cache(target_dir)
        return target_dir.name

    def _write_index_theme(self, target_dir: Path, display_name: str, inherits_str: str):
        """Writes a clean, high-priority index.theme if not already a complex full theme, or updates Name/Inherits."""
        index_path = target_dir / "index.theme"
        # Check if this is a freshly created pack (only our standard cat/scalable dirs)
        has_custom_layout = any((target_dir / d).exists() for d in ["16x16", "48x48", "scalable"])
        if index_path.exists() and has_custom_layout:
            # Update Name and Inherits in existing index.theme
            content = index_path.read_text(encoding="utf-8", errors="ignore")
            lines = []
            for line in content.splitlines():
                if line.startswith("Name="):
                    lines.append(f"Name={display_name}")
                elif line.startswith("Inherits="):
                    lines.append(f"Inherits={inherits_str}")
                else:
                    lines.append(line)
            index_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
            return

        cats = [
            ("apps", "Applications"),
            ("places", "Places"),
            ("devices", "Devices"),
            ("mimes", "MimeTypes"),
            ("status", "Status"),
            ("categories", "Categories"),
            ("actions", "Actions"),
        ]
        dirs = [f"{c}/scalable" for c, _ in cats]
        lines = [
            "[Icon Theme]",
            f"Name={display_name}",
            "Comment=Pack de ícones personalizado criado no IconForge Studio",
            f"Inherits={inherits_str}",
            "Example=folder",
            f"Directories={','.join(dirs)}",
            "",
        ]
        for c, ctx in cats:
            lines.extend([
                f"[{c}/scalable]",
                f"Context={ctx}",
                "Size=64",
                "MinSize=8",
                "MaxSize=512",
                "Type=Scalable",
                "",
            ])
        index_path.write_text("\n".join(lines), encoding="utf-8")

    def assign_icon_to_slot(self, pack_id, slot_id, source_icon_path, slot_meta=None):
        """Copies source_icon_path into the pack for slot_id and all its aliases, completely self-contained."""
        pack_path = self.resolve_pack_path(pack_id)
        if not pack_path:
            raise ValueError(f"Pack '{pack_id}' não encontrado.")
        if pack_path.parent not in (USER_ICONS_DIR, LEGACY_ICONS_DIR):
            raise ValueError("Este pack é do sistema (somente leitura). Clone-o primeiro para editar.")

        src_file = Path(os.path.realpath(source_icon_path))
        if not src_file.exists():
            raise ValueError(f"Arquivo de ícone de origem não encontrado: {source_icon_path}")

        ext = src_file.suffix.lower()
        if ext not in (".svg", ".png"):
            raise ValueError("Formato de ícone inválido (use .svg ou .png)")

        # Find slot definition
        slot_def = None
        for cs in CURATED_SLOTS:
            if cs["id"] == slot_id:
                slot_def = cs
                break
        if not slot_def:
            for app in self.get_installed_desktop_apps():
                if app["id"] == slot_id:
                    slot_def = app
                    break
        if not slot_def:
            slot_def = {
                "id": slot_id,
                "label": (slot_meta or {}).get("label", slot_id),
                "group": (slot_meta or {}).get("group", "custom"),
                "category": (slot_meta or {}).get("category", "apps"),
                "aliases": (slot_meta or {}).get("aliases", [slot_id]),
            }

        category = slot_def.get("category", "apps")
        aliases = list(dict.fromkeys([slot_id] + slot_def.get("aliases", [])))

        # Store backup of original files if this is the first time overriding in an existing pack
        backup_dir = pack_path / ".iconforge_backups" / slot_id
        meta_file = pack_path / ".iconforge.json"
        custom_meta = {}
        if meta_file.exists():
            try:
                custom_meta = json.loads(meta_file.read_text(encoding="utf-8"))
            except Exception:
                pass
        overrides = custom_meta.setdefault("overrides", {})

        # Find all existing occurrences of any alias in this pack (across all size dirs)
        existing_matches = []
        visited_real = set()
        for root, dirs, files in os.walk(str(pack_path), followlinks=True):
            dirs[:] = [d for d in dirs if not d.startswith(".iconforge")]
            real_r = os.path.realpath(root)
            if real_r in visited_real:
                dirs[:] = []
                continue
            visited_real.add(real_r)
            if "symbolic" in root.lower():
                continue
            rel_root = os.path.relpath(root, str(pack_path))
            logical_root = pack_path if rel_root == "." else (pack_path / rel_root)
            for f in files:
                stem, fext = os.path.splitext(f)
                if stem in aliases and fext.lower() in (".svg", ".png"):
                    existing_matches.append(logical_root / f)

        if slot_id not in overrides and existing_matches:
            backup_dir.mkdir(parents=True, exist_ok=True)
            backed_up = []
            for m in existing_matches:
                rel = m.relative_to(pack_path)
                b_dest = backup_dir / rel
                b_dest.parent.mkdir(parents=True, exist_ok=True)
                try:
                    real_m = Path(os.path.realpath(m))
                    if real_m.exists():
                        shutil.copy2(real_m, b_dest)
                        backed_up.append(str(rel))
                except Exception:
                    pass

        # Determine target scalable directory in pack
        # Support both `<cat>/scalable` (Win11/IconForge style) and `scalable/<cat>` (Fluent style)
        target_dirs = []
        if (pack_path / "scalable" / category).exists():
            target_dirs.append(pack_path / "scalable" / category)
        if (pack_path / category / "scalable").exists() or not target_dirs:
            td = pack_path / category / "scalable"
            target_dirs.append(td)

        # Materialize any symlinked parent dirs before unlinking old conflicting files
        for m in existing_matches:
            local_parent = self._ensure_local_dir(pack_path, m.parent)
            local_m = local_parent / m.name
            try:
                if local_m.exists() or local_m.is_symlink():
                    local_m.unlink()
            except Exception:
                pass

        # Copy the new icon file into target scalable dir(s) for primary and all aliases
        primary_written = None
        for td in target_dirs:
            td = self._ensure_local_dir(pack_path, td)
            primary_file = td / f"{slot_id}{ext}"
            shutil.copy2(src_file, primary_file)
            if not primary_written:
                primary_written = primary_file
            for al in aliases:
                if al == slot_id:
                    continue
                al_file = td / f"{al}{ext}"
                if al_file.exists() or al_file.is_symlink():
                    al_file.unlink()
                try:
                    al_file.symlink_to(f"{slot_id}{ext}")
                except Exception:
                    shutil.copy2(src_file, al_file)

        # Also if existing_matches had fixed-size directories (like 16, 22, 24, 32, 48, 64), write there too
        for m in existing_matches:
            parent_d = self._ensure_local_dir(pack_path, m.parent)
            dest_f = parent_d / f"{m.stem}{ext}"
            if not dest_f.exists():
                try:
                    shutil.copy2(src_file, dest_f)
                except Exception:
                    pass

        # Save metadata in .iconforge.json
        overrides[slot_id] = {
            "label": slot_def.get("label", slot_id),
            "group": slot_def.get("group", "custom"),
            "category": category,
            "aliases": aliases,
            "source_path": str(src_file),
            "updated_at": time.time(),
        }
        removed_list = set(custom_meta.get("removed_icons", []))
        for al in aliases:
            removed_list.discard(al)
        custom_meta["removed_icons"] = sorted(removed_list)
        custom_meta["name"] = custom_meta.get("name") or pack_path.name
        custom_meta["id"] = pack_path.name
        meta_file.write_text(json.dumps(custom_meta, indent=2, ensure_ascii=False), encoding="utf-8")

        self.invalidate_cache(pack_path)
        return str(primary_written)

    def _ensure_local_dir(self, pack_path: Path, target_dir: Path) -> Path:
        """If any component of target_dir inside pack_path is a symlink pointing outside pack_path
        (like Fluent's scalable -> ../.Fluent-base/scalable), materializes it as a real directory
        so edits only affect this pack and survive deleting other packs."""
        rel_parts = target_dir.relative_to(pack_path).parts
        curr = pack_path
        for part in rel_parts:
            curr = curr / part
            if curr.is_symlink():
                real_target = Path(os.path.realpath(curr))
                curr.unlink()
                if real_target.exists() and real_target.is_dir():
                    shutil.copytree(real_target, curr, symlinks=True, ignore_dangling_symlinks=True)
                else:
                    curr.mkdir(parents=True, exist_ok=True)
        curr.mkdir(parents=True, exist_ok=True)
        return curr

    def remove_icon_from_pack(self, pack_id, icon_name, aliases=None):
        """Removes an icon (and all its aliases) from an editable pack."""
        pack_path = self.resolve_pack_path(pack_id)
        if not pack_path:
            raise ValueError(f"Pack '{pack_id}' not found.")
        if pack_path.parent not in (USER_ICONS_DIR, LEGACY_ICONS_DIR):
            raise ValueError("This is a read-only system pack.")

        target_names = set([icon_name] + (aliases or []))
        for cs in CURATED_SLOTS:
            if cs["id"] == icon_name or icon_name in cs["aliases"]:
                target_names.update(cs["aliases"])
                target_names.add(cs["id"])
                break

        matches = []
        visited_real = set()
        for root, dirs, files in os.walk(str(pack_path), followlinks=True):
            dirs[:] = [d for d in dirs if not d.startswith(".iconforge")]
            real_r = os.path.realpath(root)
            if real_r in visited_real:
                dirs[:] = []
                continue
            visited_real.add(real_r)
            if "symbolic" in root.lower():
                continue
            rel_root = os.path.relpath(root, str(pack_path))
            logical_root = pack_path if rel_root == "." else (pack_path / rel_root)
            for f in files:
                stem, fext = os.path.splitext(f)
                if stem in target_names and fext.lower() in (".svg", ".png"):
                    matches.append(logical_root / f)

        removed_count = 0
        for m in matches:
            local_parent = self._ensure_local_dir(pack_path, m.parent)
            local_m = local_parent / m.name
            try:
                if local_m.exists() or local_m.is_symlink():
                    local_m.unlink()
                    removed_count += 1
            except Exception:
                pass

        meta_file = pack_path / ".iconforge.json"
        custom_meta = {}
        if meta_file.exists():
            try:
                custom_meta = json.loads(meta_file.read_text(encoding="utf-8"))
            except Exception:
                pass
        overrides = custom_meta.get("overrides", {})
        for tn in list(target_names):
            overrides.pop(tn, None)
        removed_list = set(custom_meta.get("removed_icons", []))
        removed_list.update(target_names)
        custom_meta["removed_icons"] = sorted(removed_list)
        meta_file.write_text(json.dumps(custom_meta, indent=2, ensure_ascii=False), encoding="utf-8")

        self.invalidate_cache(pack_path)
        return removed_count

    def restore_slot(self, pack_id, slot_id):
        """Restores a customized slot to its original state or removes the override."""
        pack_path = self.resolve_pack_path(pack_id)
        if not pack_path:
            raise ValueError("Pack not found.")
        meta_file = pack_path / ".iconforge.json"
        if not meta_file.exists():
            return False

        custom_meta = json.loads(meta_file.read_text(encoding="utf-8"))
        overrides = custom_meta.get("overrides", {})
        ov = overrides.pop(slot_id, None)
        if not ov:
            return False

        aliases = ov.get("aliases", [slot_id])
        # Remove overridden files
        for root, dirs, files in os.walk(str(pack_path), followlinks=False):
            dirs[:] = [d for d in dirs if not d.startswith(".iconforge")]
            if "symbolic" in root.lower():
                continue
            for f in files:
                stem, _ = os.path.splitext(f)
                if stem in aliases:
                    try:
                        (Path(root) / f).unlink()
                    except Exception:
                        pass

        # Restore from .iconforge_backups if available
        backup_dir = pack_path / ".iconforge_backups" / slot_id
        if backup_dir.exists():
            for root, _, files in os.walk(str(backup_dir)):
                for f in files:
                    src_f = Path(root) / f
                    rel = src_f.relative_to(backup_dir)
                    dest_f = pack_path / rel
                    dest_f.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(src_f, dest_f)
            shutil.rmtree(backup_dir, ignore_errors=True)

        meta_file.write_text(json.dumps(custom_meta, indent=2, ensure_ascii=False), encoding="utf-8")
        self.invalidate_cache(pack_path)
        return True

    def bulk_copy_from_pack(self, target_pack_id, source_pack_id, group_filter="places"):
        """Copies all icons for a given group ('places', 'taskbar', 'system', 'all_curated')
        from source_pack_id into target_pack_id."""
        src_path = self.resolve_pack_path(source_pack_id)
        if not src_path:
            raise ValueError("Pack de origem não encontrado.")
        src_by_name, _ = self.scan_pack_icons(src_path)

        count = 0
        slots_to_process = CURATED_SLOTS
        for slot in slots_to_process:
            if group_filter != "all_curated" and slot["group"] != group_filter:
                continue
            for al in slot["aliases"]:
                if al in src_by_name:
                    self.assign_icon_to_slot(target_pack_id, slot["id"], src_by_name[al]["path"], slot)
                    count += 1
                    break
        return count

    def update_pack_settings(self, pack_id, display_name=None, inherits=None):
        pack_path = self.resolve_pack_path(pack_id)
        if not pack_path:
            raise ValueError("Pack não encontrado.")
        meta_file = pack_path / ".iconforge.json"
        custom_meta = {}
        if meta_file.exists():
            try:
                custom_meta = json.loads(meta_file.read_text(encoding="utf-8"))
            except Exception:
                pass
        if display_name is not None:
            custom_meta["name"] = display_name.strip() or pack_path.name
        if inherits is not None:
            inh_list = [x.strip() for x in inherits.split(",") if x.strip() and x.strip() != "none"]
            if "hicolor" not in inh_list:
                inh_list.append("hicolor")
            custom_meta["inherits"] = ",".join(inh_list)

        meta_file.write_text(json.dumps(custom_meta, indent=2, ensure_ascii=False), encoding="utf-8")
        self._write_index_theme(
            pack_path,
            custom_meta.get("name", pack_path.name),
            custom_meta.get("inherits", "hicolor"),
        )
        self.invalidate_cache(pack_path)
        return custom_meta

    def compare_slot_across_packs(self, slot_id):
        """Finds how `slot_id` (or its aliases) looks across all installed and downloaded icon packs in <15ms."""
        aliases = [slot_id]
        category = "apps"
        for cs in CURATED_SLOTS:
            if cs["id"] == slot_id:
                aliases = cs["aliases"]
                category = cs.get("category", "apps")
                break
        if len(aliases) == 1:
            for app in self.get_installed_desktop_apps():
                if app["id"] == slot_id:
                    aliases = app["aliases"]
                    category = app.get("category", "apps")
                    break

        cat_dirs = [category] + [c for c in ("apps", "places", "devices", "mimes", "status") if c != category]
        sub_patterns = []
        for c in cat_dirs:
            sub_patterns.extend([
                f"{c}/scalable",
                f"scalable/{c}",
                f"64x64/{c}",
                f"{c}/64",
                f"48x48/{c}",
                f"{c}/48",
                f"32x32/{c}",
                f"{c}/32",
                f"24x24/{c}",
                f"{c}/24",
            ])

        results = []
        seen_realpaths = set()
        for pack in self.list_all_packs():
            p_path = Path(pack["path"])
            found_file = None

            # If already in scan cache, use it directly
            cached = self._theme_scan_cache.get(str(p_path))
            if cached:
                by_name = cached[1]
                for al in aliases:
                    if al in by_name:
                        found_file = by_name[al]["path"]
                        break
            else:
                # Fast direct path probe (<0.1ms per pack)
                for al in aliases:
                    for pat in sub_patterns:
                        for ext in (".svg", ".png"):
                            cand = p_path / pat / f"{al}{ext}"
                            if cand.exists():
                                found_file = str(cand)
                                break
                        if found_file:
                            break
                    if found_file:
                        break

            if found_file:
                try:
                    rp = os.path.realpath(found_file)
                except Exception:
                    rp = found_file
                if rp in seen_realpaths and not pack["is_custom"]:
                    continue
                seen_realpaths.add(rp)
                results.append({
                    "pack_id": pack["id"],
                    "pack_name": pack["name"],
                    "pack_source": pack["source"],
                    "icon_name": slot_id,
                    "icon_path": found_file,
                })
        return results

    def apply_pack_to_system(self, pack_id):
        """Updates GTK icon cache and applies the icon theme to Cinnamon and GNOME immediately."""
        pack_path = self.resolve_pack_path(pack_id)
        if not pack_path:
            raise ValueError(f"Pack '{pack_id}' não encontrado.")

        # If it's a downloaded pack not yet in ~/.local/share/icons, copy it into ~/.local/share/icons
        if pack_path.parent not in (USER_ICONS_DIR, LEGACY_ICONS_DIR, SYSTEM_ICONS_DIR):
            dest = USER_ICONS_DIR / pack_path.name
            if dest.exists():
                shutil.rmtree(dest)
            shutil.copytree(pack_path, dest, symlinks=True, ignore_dangling_symlinks=True)
            pack_path = dest

        theme_name = pack_path.name
        # Update icon cache
        subprocess.run(["gtk-update-icon-cache", "-f", "-q", str(pack_path)], stderr=subprocess.DEVNULL)

        # Toggle theme in Cinnamon & GNOME so panel applets reload cached icons immediately
        subprocess.run(
            ["gsettings", "set", "org.cinnamon.desktop.interface", "icon-theme", "hicolor"],
            stderr=subprocess.DEVNULL,
        )
        time.sleep(0.15)
        subprocess.run(
            ["gsettings", "set", "org.cinnamon.desktop.interface", "icon-theme", theme_name],
            stderr=subprocess.DEVNULL,
        )
        subprocess.run(
            ["gsettings", "set", "org.gnome.desktop.interface", "icon-theme", theme_name],
            stderr=subprocess.DEVNULL,
        )
        return theme_name

    def delete_user_pack(self, pack_id):
        pack_path = self.resolve_pack_path(pack_id)
        if not pack_path or pack_path.parent not in (USER_ICONS_DIR, LEGACY_ICONS_DIR):
            raise ValueError("Apenas packs locais do usuário podem ser excluídos.")
        shutil.rmtree(pack_path)
        self.invalidate_cache(pack_path)
        return True

    # ==================== CUSTOM FILE IMPORTS ====================

    def save_imported_file(self, filename, raw_bytes):
        ext = os.path.splitext(filename)[1].lower()
        if ext not in (".svg", ".png", ".ico", ".webp"):
            raise ValueError("Formato não suportado. Use SVG, PNG, ICO ou WEBP.")
        safe_stem = "".join(c if (c.isalnum() or c in "-_") else "_" for c in os.path.splitext(filename)[0]).strip("_")
        if not safe_stem:
            safe_stem = "custom_icon"

        # If .ico or .webp, convert to .png via GdkPixbuf if possible
        target_file = IMPORTS_DIR / f"{safe_stem}_{int(time.time() * 1000)}{ext}"
        target_file.write_bytes(raw_bytes)

        if ext in (".ico", ".webp"):
            try:
                import gi
                gi.require_version("GdkPixbuf", "2.0")
                from gi.repository import GdkPixbuf
                pb = GdkPixbuf.Pixbuf.new_from_file_at_scale(str(target_file), 128, 128, True)
                png_file = target_file.with_suffix(".png")
                pb.savev(str(png_file), "png", [], [])
                target_file.unlink()
                target_file = png_file
            except Exception:
                pass

        return {
            "name": safe_stem,
            "path": str(target_file),
            "filename": target_file.name,
        }

    def list_imported_icons(self):
        items = []
        if IMPORTS_DIR.exists():
            for f in sorted(IMPORTS_DIR.iterdir(), key=lambda p: p.stat().st_mtime, reverse=True):
                if f.suffix.lower() in (".svg", ".png"):
                    items.append({
                        "name": f.stem.rsplit("_", 1)[0],
                        "filename": f.name,
                        "path": str(f),
                        "category": "imported",
                    })
        return items

    def delete_imported_icon(self, filename):
        target = IMPORTS_DIR / os.path.basename(filename)
        if target.exists():
            target.unlink()
            return True
        return False

    # ==================== OPENDESKTOP.ORG (PLING OCS API) ====================

    def search_opendesktop(self, query="", sortmode="down", page=0, pagesize=24):
        """Queries OpenDesktop.org OCS v1 API for Category 386 (Full Icon Themes)."""
        params = {
            "categories": "386",
            "sortmode": sortmode,  # 'down' (most downloaded), 'high' (highest rated), 'new' (newest)
            "page": page,
            "pagesize": pagesize,
            "format": "json",
        }
        if query.strip():
            params["search"] = query.strip()

        r = requests.get(
            "https://api.opendesktop.org/ocs/v1/content/data",
            params=params,
            headers={"User-Agent": "IconForgeStudio/1.0 (Linux)"},
            timeout=12,
        )
        r.raise_for_status()
        payload = r.json()
        raw_items = payload.get("data", [])
        downloaded_meta = self._load_downloads_meta()

        items = []
        for it in raw_items:
            item_id = str(it.get("id", ""))
            # Collect downloadable archives (filter only tar.*, zip, 7z)
            archives = []
            for idx in range(1, 25):
                dl_url = it.get(f"downloadlink{idx}")
                dl_name = it.get(f"downloadname{idx}")
                dl_size = it.get(f"downloadsize{idx}")
                if dl_url and dl_name:
                    lname = dl_name.lower()
                    if any(lname.endswith(ext) for ext in (".tar.xz", ".tar.gz", ".tgz", ".tar.bz2", ".zip", ".tar")):
                        archives.append({
                            "index": idx,
                            "name": dl_name,
                            "url": dl_url,
                            "size_kb": int(dl_size) if str(dl_size).isdigit() else 0,
                        })
            if not archives:
                continue

            previews = []
            for p_idx in range(1, 5):
                p_url = it.get(f"previewpic{p_idx}")
                if p_url:
                    previews.append(p_url)

            items.append({
                "id": item_id,
                "name": it.get("name", "Sem nome"),
                "author": it.get("personid", ""),
                "score": it.get("score", "0"),
                "downloads": it.get("downloads", "0"),
                "summary": (it.get("summary") or it.get("description") or "")[:220],
                "previews": previews,
                "detail_url": it.get("detailpage", f"https://www.opendesktop.org/p/{item_id}"),
                "archives": archives,
                "is_downloaded": item_id in downloaded_meta,
                "downloaded_info": downloaded_meta.get(item_id),
            })

        return {
            "total": int(payload.get("totalitems") or 0),
            "page": page,
            "items": items,
        }

    def start_opendesktop_download(self, item_id, title, archive_name, download_url):
        """Starts an asynchronous download & extraction job for an OpenDesktop archive."""
        job_id = f"{item_id}_{int(time.time())}"
        with self._downloads_lock:
            self._active_downloads[job_id] = {
                "job_id": job_id,
                "item_id": str(item_id),
                "title": title,
                "archive_name": archive_name,
                "status": "downloading",  # downloading, extracting, done, error
                "progress": 0,
                "downloaded_bytes": 0,
                "total_bytes": 0,
                "message": "Iniciando download...",
                "extracted_packs": [],
            }

        thread = threading.Thread(
            target=self._run_download_job,
            args=(job_id, str(item_id), title, archive_name, download_url),
            daemon=True,
        )
        thread.start()
        return job_id

    def _run_download_job(self, job_id, item_id, title, archive_name, download_url):
        tmp_file = None
        try:
            with requests.get(
                download_url,
                headers={"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) IconForgeStudio/1.0"},
                stream=True,
                timeout=30,
            ) as resp:
                resp.raise_for_status()
                total = int(resp.headers.get("Content-Length") or 0)
                with self._downloads_lock:
                    self._active_downloads[job_id]["total_bytes"] = total

                fd, tmp_path = tempfile.mkstemp(suffix=f"_{archive_name}")
                tmp_file = Path(tmp_path)
                downloaded = 0
                with os.fdopen(fd, "wb") as out_f:
                    for chunk in resp.iter_content(chunk_size=65536):
                        if not chunk:
                            continue
                        out_f.write(chunk)
                        downloaded += len(chunk)
                        pct = int(downloaded * 100 / total) if total > 0 else 50
                        with self._downloads_lock:
                            self._active_downloads[job_id]["downloaded_bytes"] = downloaded
                            self._active_downloads[job_id]["progress"] = min(pct, 92)
                            mb = downloaded / (1024 * 1024)
                            self._active_downloads[job_id]["message"] = f"Baixando... ({mb:.1f} MB)"

            with self._downloads_lock:
                self._active_downloads[job_id]["status"] = "extracting"
                self._active_downloads[job_id]["progress"] = 95
                self._active_downloads[job_id]["message"] = "Extraindo pacote de ícones..."

            target_dl_dir = DOWNLOADS_DIR / item_id
            target_dl_dir.mkdir(parents=True, exist_ok=True)

            # Extract archive to a temp staging folder first to locate icon theme root folder(s)
            with tempfile.TemporaryDirectory() as stage_dir:
                stage_path = Path(stage_dir)
                lname = archive_name.lower()
                if lname.endswith(".zip"):
                    with zipfile.ZipFile(tmp_file, "r") as zf:
                        zf.extractall(stage_path)
                else:
                    # Use system tar for fast extraction of .tar.xz / .tar.gz / .tar.bz2
                    res = subprocess.run(
                        ["tar", "-xf", str(tmp_file), "-C", str(stage_path)],
                        capture_output=True,
                        text=True,
                    )
                    if res.returncode != 0:
                        with tarfile.open(tmp_file, "r:*") as tf:
                            tf.extractall(stage_path)

                # Find directories inside stage_path that look like icon themes
                theme_roots = []
                for root, dirs, files in os.walk(stage_dir):
                    r_path = Path(root)
                    if "index.theme" in files or any(
                        d in dirs for d in ("apps", "places", "scalable", "16x16", "48x48", "64x64")
                    ):
                        theme_roots.append(r_path)
                        dirs[:] = []  # don't recurse into subdirs of a theme root

                if not theme_roots:
                    # Fallback: top-level dirs
                    theme_roots = [p for p in stage_path.iterdir() if p.is_dir()]

                extracted_names = []
                for tr in theme_roots:
                    folder_name = tr.name
                    if folder_name == stage_path.name:
                        folder_name = os.path.splitext(os.path.splitext(archive_name)[0])[0]
                    dest = target_dl_dir / folder_name
                    if dest.exists():
                        shutil.rmtree(dest)
                    shutil.move(str(tr), str(dest))
                    extracted_names.append(f"dl:{item_id}:{folder_name}")

            # Record in downloads_meta.json
            meta = self._load_downloads_meta()
            existing_packs = meta.get(item_id, {}).get("packs", [])
            all_packs = list(dict.fromkeys(existing_packs + extracted_names))
            meta[item_id] = {
                "item_id": item_id,
                "title": title,
                "archive_name": archive_name,
                "downloaded_at": time.time(),
                "packs": all_packs,
            }
            self._save_downloads_meta(meta)
            self.invalidate_cache()

            with self._downloads_lock:
                self._active_downloads[job_id]["status"] = "done"
                self._active_downloads[job_id]["progress"] = 100
                self._active_downloads[job_id]["message"] = "Pack baixado e pronto para uso!"
                self._active_downloads[job_id]["extracted_packs"] = all_packs

        except Exception as e:
            with self._downloads_lock:
                self._active_downloads[job_id]["status"] = "error"
                self._active_downloads[job_id]["message"] = f"Erro: {str(e)}"
        finally:
            if tmp_file and tmp_file.exists():
                try:
                    tmp_file.unlink()
                except Exception:
                    pass

    def get_download_jobs_status(self):
        with self._downloads_lock:
            return list(self._active_downloads.values())

    def delete_downloaded_item(self, item_id):
        """Deletes a downloaded OpenDesktop pack from ~/.local/share/iconforge/downloads/<item_id>.
        Note: Any icons already dragged into user's custom packs were copied as standalone files,
        so deleting this download will NEVER break the user's custom packs!"""
        item_id = str(item_id)
        target_dl_dir = DOWNLOADS_DIR / item_id
        if target_dl_dir.exists():
            shutil.rmtree(target_dl_dir)
        meta = self._load_downloads_meta()
        meta.pop(item_id, None)
        self._save_downloads_meta(meta)
        self.invalidate_cache()
        return True

    def _load_downloads_meta(self):
        if DOWNLOADS_META_FILE.exists():
            try:
                return json.loads(DOWNLOADS_META_FILE.read_text(encoding="utf-8"))
            except Exception:
                return {}
        return {}

    def _save_downloads_meta(self, meta):
        DOWNLOADS_META_FILE.write_text(json.dumps(meta, indent=2, ensure_ascii=False), encoding="utf-8")

    # ==================== USER SETTINGS (LANGUAGE PERSISTENCE) ====================

    def get_user_settings(self):
        defaults = {"language": "en"}
        if SETTINGS_FILE.exists():
            try:
                data = json.loads(SETTINGS_FILE.read_text(encoding="utf-8"))
                defaults.update(data)
            except Exception:
                pass
        return defaults

    def save_user_settings(self, updates: dict):
        curr = self.get_user_settings()
        curr.update(updates)
        SETTINGS_FILE.write_text(json.dumps(curr, indent=2, ensure_ascii=False), encoding="utf-8")
        return curr

