<div align="center">
  <img src="static/iconforge.svg" width="96" height="96" alt="IconForge Studio Logo" />
  <h1>IconForge Studio</h1>
  <p><strong>Modern & Minimalist Linux Icon Pack Creator, Mixer & Editor with Direct OpenDesktop.org Integration</strong></p>
</div>

---

## ✨ Features

- **🎨 Mix & Match Any Icon Pack**: Create your own custom Linux icon pack from scratch or edit existing local packs (`~/.local/share/icons`) by dragging and dropping icons from any installed or downloaded theme.
- **🌐 Built-in OpenDesktop.org Store**: Search, preview, and download icon themes (e.g., *Win11*, *Fluent*, *WhiteSur*, *Tela*, *Colloid*, *Kora*) directly inside the app via the official OCS API.
- **🛡️ Standalone & Safe**: When you drag an icon into your pack, IconForge Studio copies the physical file and automatically resolves all desktop/application aliases (`com.google.Chrome`, `google-chrome`, `chrome`, etc.). Deleting a downloaded source pack later **never** breaks your custom pack.
- **📂 Custom PC Icon Upload**: Replace any icon in your pack with your own `.svg`, `.png`, `.ico`, or `.webp` files via drag-and-drop or the quick **📂 PC** button on every icon card.
- **🪄 1-Click Cross-Pack Comparison**: Click any icon (or the `🪄` button) to compare how that specific icon looks across **all** installed and downloaded icon packs side-by-side.
- **⚡ Quick Bulk Mix**: Copy all Folders/Places, Taskbar Apps, or System icons from a source pack into your pack with a single click.
- **🌐 Bilingual UI (Persistent)**: English by default with instant switching between **English** and **Português (BR)** in the top-right header, persisted across sessions.
- **🚀 1-Click System Apply**: Updates the GTK icon cache and applies your theme immediately to Cinnamon and GNOME desktops.

---

## 🖥️ Requirements

- **OS**: Linux (Cinnamon, GNOME, XFCE, MATE, KDE, etc.)
- **Python**: Python 3.8+ with `requests` and `PyGObject` (`gi.repository.Gtk`, `WebKit2` for native desktop window; automatically falls back to default browser if WebKit2 is unavailable).

---

## 🚀 Quick Start

```bash
git clone https://github.com/Grekto-dev/iconforge-studio.git
cd iconforge-studio
python3 app.py
```

---

## 🇧🇷 Resumo em Português

O **IconForge Studio** é um estúdio visual moderno e minimalista para criar, misturar e editar pacotes de ícones no Linux:
- **Painel Esquerdo (Pack em Edição)**: Ao selecionar um pack, o nome já vem preenchido na barra superior e todos os ícones do pack são carregados abaixo. Você pode **remover** qualquer ícone (`🗑️`), **substituir** arrastando outro da direita (ou clicando em `🪄`), ou **carregar um arquivo personalizado do seu PC** (`📂 PC`).
- **Painel Direito (Origens & Downloads)**: Explore packs instalados, baixe novos temas diretamente do **OpenDesktop.org** (podendo excluir o download depois sem perder os ícones usados) ou importe seus próprios arquivos `.SVG` / `.PNG` / `.ICO` / `.WEBP`.
- **Seletor de Idioma Persistente**: Inglês por padrão (`English`) e `Português (BR)` no canto superior direito, salvando sua preferência automaticamente.
