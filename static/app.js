// ==================== INTERNATIONALIZATION (EN DEFAULT + PT-BR) ====================
const I18N = {
  en: {
    brandSubtitle: "Linux Icon Pack Creator & Editor • OpenDesktop.org",
    activeOnSystem: "Active on System:",
    applyToSystem: "Apply to System",
    applySystemTooltip: "Apply the currently edited pack to the system now",
    pickedIconLabel: "Icon copied to cursor:",
    pickedIconHint: "Click any icon card on the left to replace it, or drop into the pack!",
    cancelEsc: "Cancel (Esc)",
    editingPackLabel: "EDITING PACK (YOUR PACK)",
    btnNewPack: "+ New Pack",
    packNameLabel: "Pack Name:",
    btnSaveName: "💾 Save Name",
    leftBannerHint: "💡 Drag icons from the right (or PC files) onto any icon below",
    tabAllPackIcons: "📦 All Pack Icons",
    tabPlaces: "📁 Folders & Places",
    tabApps: "🚀 Applications",
    tabDevices: "💻 Devices & Drives",
    tabMimes: "📄 File Types",
    tabStatus: "🔔 Status",
    tabEssential: "📌 Essential Slots",
    tabAddIcon: "+ Add Icon",
    leftSearchPlaceholder: "Search icons in this pack (e.g. chrome, folder, terminal...)",
    btnLoadMore: "Load more icons...",
    modeBrowsePacks: "🎨 Browse Packs",
    modeStore: "🌐 Downloads (OpenDesktop.org)",
    modeImports: "🖼️ Custom Icons",
    sourcePackLabel: "SOURCE PACK TO DRAG FROM",
    btnDeleteDownload: "🗑️ Delete Download",
    quickMixLabel: "Quick Mix from this pack:",
    btnCopyAllFolders: "📁 Copy All Folders",
    btnCopyTaskbar: "📌 Copy Taskbar Apps",
    btnCopySystem: "💻 Copy System Icons",
    catAll: "All",
    catFolders: "Folders",
    catApps: "Apps",
    catDevices: "Drives",
    catMimes: "Files",
    catStatus: "Status",
    sourceSearchPlaceholder: "Search icon in source pack (e.g. chrome, folder, code)...",
    storeSearchPlaceholder: "Search on OpenDesktop.org (e.g. Win11, Fluent, WhiteSur, Tela, Colloid)...",
    sortMostDownloaded: "🔥 Most Downloaded",
    sortHighestRated: "⭐ Highest Rated",
    sortNewest: "🆕 Newest",
    btnSearch: "Search",
    suggestionsLabel: "Suggestions:",
    topOverall: "Top Overall",
    dropzoneTitle: "Drop .SVG, .PNG, .ICO or .WEBP files here",
    dropzoneDesc: "Or click to browse from your computer. Then drag onto any icon on the left!",
    btnPrev: "← Previous",
    btnNext: "Next →",
    compareSubtitle: "Click any version below to immediately apply it to your pack",
    newPackModalTitle: "✨ Create New Icon Pack",
    newPackModalSub: "Build your own custom pack by mixing icons from any source",
    packNameField: "Pack Name",
    baseThemeField: "Base Theme (Fallback for unedited icons)",
    baseThemeHelp: "The fallback theme ensures small system tray icons (like Wi-Fi, battery, arrows) keep working while you customize folders and apps!",
    cloneFullCheckbox: "Physically copy all files from the Base Theme into this pack (Full Clone)",
    btnCancel: "Cancel",
    btnCreatePackNow: "Create Pack Now",
    packSettingsTitle: "⚙️ Pack Settings",
    displayNameLabel: "Display Name",
    inheritedThemesLabel: "Inherited Themes (comma-separated fallbacks)",
    btnDeletePack: "🗑️ Delete this Pack",
    btnSaveSettings: "Save Settings",
    addSlotTitle: "➕ Add Custom Icon Slot",
    addSlotSub: "Enter the technical icon name (e.g. spotify-client, vlc, folder-vbox)",
    friendlyNameLabel: "Friendly Label",
    techIconIdLabel: "Technical Icon ID",
    categoryLabel: "Category",
    btnAddSlotConfirm: "Add Slot",
    // Dynamic strings
    optGroupEditable: "✨ Your Editable Packs (~/.local/share/icons)",
    optGroupSystemReadOnly: "🔒 System Packs (Read-Only)",
    optGroupLocalCustom: "✨ Local & Custom Packs",
    optGroupDownloaded: "🌐 Downloaded from OpenDesktop.org",
    optGroupSystem: "💻 System Packs",
    optNoFallback: "No fallback (From scratch / Pure)",
    bannerEditable: "✅ Editable Pack • <strong>{total}</strong> icons in pack • Fallback: <code>{inherits}</code>",
    bannerReadOnly: "🔒 System Pack (Read-Only) — Click '+ New Pack' to create an editable pack",
    showingPackIcons: "Showing <strong>{shown}</strong> of <strong>{total}</strong> icons in this pack",
    showingEssentialSlots: "Showing <strong>{count}</strong> essential & desktop slots",
    noIconsFoundInPack: "No icons found in this category/filter. Drag icons from the right pane to add them!",
    btnUploadPC: "📂 PC",
    btnUploadPCTitle: "Upload custom icon from your computer",
    btnCompareTitle: "Compare and choose from all installed packs",
    btnRemoveTitle: "Remove this icon from the pack",
    badgeEdited: "Edited",
    badgeInPack: "In Pack",
    badgeMissing: "No icon",
    toastNameSaved: "Pack name updated to '{name}'!",
    toastIconUpdated: "Icon '{id}' updated in your pack!",
    toastIconRemoved: "Icon '{id}' removed from pack!",
    toastCustomUploaded: "Custom icon applied to '{id}'!",
    toastFileImported: "Icon '{name}' imported!",
    toastBulkCopied: "{count} icons copied into your pack!",
    toastThemeApplied: "Theme '{theme}' applied to the system!",
    toastPackCreated: "Pack '{id}' created and ready to edit!",
    toastSettingsSaved: "Pack settings saved!",
    toastPackDeleted: "Pack deleted.",
    toastDownloadDeleted: "Download deleted! Icons already copied to your pack remain intact.",
    confirmRemoveIcon: "Remove icon '{name}' from this pack?",
    confirmDeletePack: "Are you sure you want to permanently delete pack '{id}'?",
    confirmDeleteDownload: "Delete '{name}' from downloads? (Icons already dragged into your pack will NOT be lost!)",
    readOnlyAlert: "This pack is read-only. Create or select a user pack in the top-left selector first!",
    applyingBtn: "⏳ Applying...",
    creatingBtn: "⏳ Creating pack...",
    loadingSourceIcons: "Scanning pack icons...",
    noSourceIcons: "No icons found for this filter.",
    showingSourceIcons: "Showing <strong>{shown}</strong> of <strong>{total}</strong> icons (Drag onto the left pane or click to copy)",
    loadingStore: "🌐 Searching icon themes on OpenDesktop.org...",
    storePageText: "Page {page} ({total} themes)",
    btnUsePack: "🎨 Use Icons",
    btnDownloadPack: "⬇️ Download",
    badgeDownloaded: "✓ DOWNLOADED",
    noImportsYet: "No custom icons imported yet. Drop .SVG or .PNG files into the box above!",
    compareModalHeader: "🪄 Choose version for: {label} ({id})",
    compareSearching: "Searching across all installed and downloaded packs...",
    compareNoVariants: "No pack has a dedicated icon for '{id}'. Try dragging any icon from the right pane!",
  },
  "pt-BR": {
    brandSubtitle: "Criador & Editor de Packs de Ícones Linux • OpenDesktop.org",
    activeOnSystem: "Ativo no Sistema:",
    applyToSystem: "Aplicar no Sistema",
    applySystemTooltip: "Aplicar o pack em edição no sistema agora",
    pickedIconLabel: "Ícone copiado no cursor:",
    pickedIconHint: "Clique em qualquer ícone da esquerda para substituir, ou solte no pack!",
    cancelEsc: "Cancelar (Esc)",
    editingPackLabel: "PACK EM EDIÇÃO (SEU PACK)",
    btnNewPack: "+ Novo Pack",
    packNameLabel: "Nome do Pack:",
    btnSaveName: "💾 Salvar Nome",
    leftBannerHint: "💡 Arraste ícones da direita (ou do PC) sobre qualquer ícone abaixo",
    tabAllPackIcons: "📦 Todos do Pack",
    tabPlaces: "📁 Pastas & Locais",
    tabApps: "🚀 Aplicativos",
    tabDevices: "💻 Dispositivos & Discos",
    tabMimes: "📄 Tipos de Arquivo",
    tabStatus: "🔔 Status",
    tabEssential: "📌 Slots Essenciais",
    tabAddIcon: "+ Adicionar Ícone",
    leftSearchPlaceholder: "Buscar ícone neste pack (ex: chrome, folder, terminal...)",
    btnLoadMore: "Carregar mais ícones...",
    modeBrowsePacks: "🎨 Explorar Packs",
    modeStore: "🌐 Downloads (OpenDesktop.org)",
    modeImports: "🖼️ Ícones Próprios",
    sourcePackLabel: "PACK DE ORIGEM PARA ARRASTAR",
    btnDeleteDownload: "🗑️ Excluir Download",
    quickMixLabel: "Mix Rápido deste pack:",
    btnCopyAllFolders: "📁 Copiar Todas as Pastas",
    btnCopyTaskbar: "📌 Copiar Barra de Tarefas",
    btnCopySystem: "💻 Copiar Sistema",
    catAll: "Todos",
    catFolders: "Pastas",
    catApps: "Apps",
    catDevices: "Discos",
    catMimes: "Arquivos",
    catStatus: "Status",
    sourceSearchPlaceholder: "Buscar ícone no pack de origem (ex: chrome, folder, code)...",
    storeSearchPlaceholder: "Buscar no OpenDesktop.org (ex: Win11, Fluent, WhiteSur, Tela, Colloid)...",
    sortMostDownloaded: "🔥 Mais Baixados",
    sortHighestRated: "⭐ Melhor Avaliados",
    sortNewest: "🆕 Mais Recentes",
    btnSearch: "Buscar",
    suggestionsLabel: "Sugestões:",
    topOverall: "Top Geral",
    dropzoneTitle: "Arraste arquivos .SVG, .PNG, .ICO ou .WEBP do seu PC",
    dropzoneDesc: "Ou clique aqui para selecionar do computador. Depois arraste para qualquer ícone à esquerda!",
    btnPrev: "← Anterior",
    btnNext: "Próxima →",
    compareSubtitle: "Clique em qualquer versão abaixo para aplicar imediatamente no seu pack",
    newPackModalTitle: "✨ Criar Novo Pack de Ícones",
    newPackModalSub: "Monte seu pack personalizado misturando ícones de qualquer origem",
    packNameField: "Nome do seu Pack",
    baseThemeField: "Pack Base (Herança / Fallback para ícones não editados)",
    baseThemeHelp: "O Pack Base garante que ícones pequenos do sistema (como Wi-Fi, bateria, setas) continuem funcionando enquanto você troca os ícones principais!",
    cloneFullCheckbox: "Copiar fisicamente todos os arquivos do Pack Base para dentro deste pack (Clone Completo)",
    btnCancel: "Cancelar",
    btnCreatePackNow: "Criar Pack Agora",
    packSettingsTitle: "⚙️ Configurações do Pack",
    displayNameLabel: "Nome de Exibição",
    inheritedThemesLabel: "Temas Herdados (Inherits separados por vírgula)",
    btnDeletePack: "🗑️ Excluir este Pack",
    btnSaveSettings: "Salvar Alterações",
    addSlotTitle: "➕ Adicionar Slot de Ícone Personalizado",
    addSlotSub: "Informe o nome técnico do ícone (ex: spotify-client, vlc, folder-vbox)",
    friendlyNameLabel: "Nome Amigável",
    techIconIdLabel: "ID Técnico do Ícone",
    categoryLabel: "Categoria",
    btnAddSlotConfirm: "Adicionar Slot",
    // Dynamic strings
    optGroupEditable: "✨ Seus Packs Editáveis (~/.local/share/icons)",
    optGroupSystemReadOnly: "🔒 Packs do Sistema (Somente Leitura)",
    optGroupLocalCustom: "✨ Packs Locais & Personalizados",
    optGroupDownloaded: "🌐 Baixados do OpenDesktop.org",
    optGroupSystem: "💻 Packs do Sistema",
    optNoFallback: "Sem base (Do Zero / Puro)",
    bannerEditable: "✅ Pack Editável • <strong>{total}</strong> ícones no pack • Base: <code>{inherits}</code>",
    bannerReadOnly: "🔒 Pack do Sistema (Somente Leitura) — Clique em '+ Novo Pack' para criar um editável",
    showingPackIcons: "Exibindo <strong>{shown}</strong> de <strong>{total}</strong> ícones neste pack",
    showingEssentialSlots: "Exibindo <strong>{count}</strong> slots essenciais e apps do sistema",
    noIconsFoundInPack: "Nenhum ícone encontrado nesta categoria/busca. Arraste ícones da direita para adicionar!",
    btnUploadPC: "📂 PC",
    btnUploadPCTitle: "Carregar ícone personalizado do seu computador",
    btnCompareTitle: "Comparar e escolher entre todos os packs instalados",
    btnRemoveTitle: "Remover este ícone do pack",
    badgeEdited: "Editado",
    badgeInPack: "No Pack",
    badgeMissing: "Sem ícone",
    toastNameSaved: "Nome do pack atualizado para '{name}'!",
    toastIconUpdated: "Ícone '{id}' atualizado no seu pack!",
    toastIconRemoved: "Ícone '{id}' removido do pack!",
    toastCustomUploaded: "Ícone personalizado aplicado em '{id}'!",
    toastFileImported: "Ícone '{name}' importado!",
    toastBulkCopied: "{count} ícones copiados para o seu pack!",
    toastThemeApplied: "Tema '{theme}' aplicado no sistema!",
    toastPackCreated: "Pack '{id}' criado e pronto para edição!",
    toastSettingsSaved: "Configurações do pack salvas!",
    toastPackDeleted: "Pack excluído.",
    toastDownloadDeleted: "Download excluído! Os ícones já usados no seu pack continuam intactos.",
    confirmRemoveIcon: "Remover o ícone '{name}' deste pack?",
    confirmDeletePack: "Tem certeza que deseja excluir permanentemente o pack '{id}'?",
    confirmDeleteDownload: "Excluir '{name}' dos downloads? (Os ícones que você já arrastou para o seu pack NÃO serão perdidos!)",
    readOnlyAlert: "Este pack é somente leitura. Crie ou selecione um pack editável no topo esquerdo primeiro!",
    applyingBtn: "⏳ Aplicando...",
    creatingBtn: "⏳ Criando pack...",
    loadingSourceIcons: "Escaneando ícones do pack...",
    noSourceIcons: "Nenhum ícone encontrado para este filtro.",
    showingSourceIcons: "Exibindo <strong>{shown}</strong> de <strong>{total}</strong> ícones (Arraste para a esquerda ou clique para copiar)",
    loadingStore: "🌐 Buscando pacotes de ícones no OpenDesktop.org...",
    storePageText: "Página {page} ({total} temas)",
    btnUsePack: "🎨 Usar Ícones",
    btnDownloadPack: "⬇️ Baixar Pack",
    badgeDownloaded: "✓ BAIXADO",
    noImportsYet: "Nenhum ícone próprio importado ainda. Solte arquivos .SVG ou .PNG na caixa acima!",
    compareModalHeader: "🪄 Escolher versão para: {label} ({id})",
    compareSearching: "Buscando em todos os packs instalados e baixados...",
    compareNoVariants: "Nenhum pack possui um ícone específico para '{id}'. Você pode arrastar qualquer ícone da direita!",
  },
};

// ==================== GLOBAL STATE ====================
const state = {
  lang: localStorage.getItem("iconforge_lang") || "en",
  packs: [],
  currentSystemTheme: "",
  targetPackId: "",
  targetPackState: null,

  // Left pane state
  leftActiveGroup: "all", // 'all', 'places', 'apps', 'devices', 'mimes', 'status', 'essential'
  leftSearchQuery: "",
  leftPackIcons: [],
  leftPackTotal: 0,
  leftPackOffset: 0,
  leftPackLimit: 180,

  // Right pane state
  rightMode: "browse", // 'browse' | 'store' | 'imports'
  sourcePackId: "",
  sourceCategory: "all",
  sourceSearchQuery: "",
  sourceIcons: [],
  sourceTotal: 0,
  sourceOffset: 0,
  sourceLimit: 180,

  // OpenDesktop Store state
  storeQuery: "Win11",
  storeSort: "down",
  storePage: 0,
  storeItems: [],
  storeTotal: 0,
  activeDownloadJobs: [],
  downloadPollTimer: null,

  // Custom Imports state
  importedIcons: [],

  // Drag / Click-to-Assign state
  pickedIcon: null, // { name, path, category }
  draggedIcon: null,
};

function t(key, vars = {}) {
  const dict = I18N[state.lang] || I18N.en;
  let str = dict[key] !== undefined ? dict[key] : (I18N.en[key] || key);
  for (const [k, v] of Object.entries(vars)) {
    str = str.replaceAll(`{${k}}`, v);
  }
  return str;
}

function applyTranslations() {
  document.documentElement.lang = state.lang;
  const langSelect = document.getElementById("langSelect");
  if (langSelect && langSelect.value !== state.lang) {
    langSelect.value = state.lang;
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) el.placeholder = t(key);
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    if (key) el.title = t(key);
  });
}

async function setLanguage(newLang, persistRemote = true) {
  if (!I18N[newLang]) newLang = "en";
  state.lang = newLang;
  localStorage.setItem("iconforge_lang", newLang);
  applyTranslations();

  if (state.packs.length > 0) {
    populatePackSelects();
    renderTargetPackHeader();
    renderLeftPaneContent();
    if (state.rightMode === "browse") renderSourceIconsGrid();
    if (state.rightMode === "store") renderStoreGrid();
    if (state.rightMode === "imports") renderImportedIconsGrid();
  }

  if (persistRemote) {
    try {
      await apiPost("/api/user-settings", { language: newLang });
    } catch (_) {}
  }
}

// ==================== HELPERS ====================
function iconUrl(path, bustCache = false) {
  if (!path) return "";
  const u = `/api/icon-file?path=${encodeURIComponent(path)}`;
  return bustCache ? `${u}&t=${Date.now()}` : u;
}

function showToast(message, isError = false) {
  const container = document.getElementById("toastContainer");
  const el = document.createElement("div");
  el.className = `toast ${isError ? "error" : ""}`;
  el.innerHTML = `<span>${isError ? "⚠️" : "✨"}</span> <span>${message}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 250);
  }, 3400);
}

async function apiGet(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.error || `HTTP Error ${res.status}`);
  }
  return data;
}

async function apiPost(url, body = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.error || `HTTP Error ${res.status}`);
  }
  return data;
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pickLocalIconFile(onFileChosen) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".svg,.png,.ico,.webp";
  input.addEventListener("change", () => {
    if (input.files && input.files[0]) {
      onFileChosen(input.files[0]);
    }
  });
  input.click();
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.split(",")[1] || "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", async () => {
  applyTranslations();
  bindUIEvents();
  await loadPacksList(true);
  await loadImportsList();
});

async function loadPacksList(isInitial = false) {
  try {
    const data = await apiGet("/api/packs");
    state.packs = data.packs || [];
    state.currentSystemTheme = data.current_system_theme || "";

    if (isInitial && data.settings && data.settings.language) {
      await setLanguage(data.settings.language, false);
    }

    document.getElementById("currentSystemThemeName").textContent = state.currentSystemTheme;
    document.getElementById("totalPacksBadge").textContent = state.packs.length;

    // Pick initial targetPackId: prefer custom pack, or active editable pack, or first editable pack
    if (!state.targetPackId || !state.packs.some((p) => p.id === state.targetPackId)) {
      const customPack = state.packs.find((p) => p.is_custom && p.editable);
      const activeEditable = state.packs.find((p) => p.is_active && p.editable);
      const anyEditable = state.packs.find((p) => p.editable);
      state.targetPackId = (customPack || activeEditable || anyEditable || state.packs[0] || {}).id || "";
    }

    // Pick initial sourcePackId: prefer a rich pack different from targetPackId
    if (!state.sourcePackId || !state.packs.some((p) => p.id === state.sourcePackId)) {
      const preferred =
        state.packs.find((p) => p.id !== state.targetPackId && (p.id.includes("Win11") || p.id.includes("Fluent"))) ||
        state.packs.find((p) => p.id !== state.targetPackId) ||
        state.packs[0];
      state.sourcePackId = preferred ? preferred.id : "";
    }

    populatePackSelects();

    if (state.targetPackId) {
      await loadTargetPackState();
      await loadTargetPackIcons(true);
    }
    if (state.sourcePackId) {
      await loadSourcePackIcons(true);
    }
  } catch (err) {
    showToast(err.message, true);
  }
}

function populatePackSelects() {
  const targetSel = document.getElementById("targetPackSelect");
  const sourceSel = document.getElementById("sourcePackSelect");
  const baseSel = document.getElementById("newPackBaseSelect");

  targetSel.innerHTML = "";
  sourceSel.innerHTML = "";
  baseSel.innerHTML = "";

  // Target Select: Editable User Packs first, then System Packs
  const userGroup = document.createElement("optgroup");
  userGroup.label = t("optGroupEditable");
  const sysGroup = document.createElement("optgroup");
  sysGroup.label = t("optGroupSystemReadOnly");

  state.packs.forEach((p) => {
    if (p.source === "downloaded") return;
    const opt = document.createElement("option");
    opt.value = p.id;
    const badges = [];
    if (p.is_custom) badges.push("★");
    if (p.is_active) badges.push("🟢");
    opt.textContent = `${badges.join(" ")} ${p.name} (${p.folder_name})`.trim();
    if (p.editable) {
      userGroup.appendChild(opt);
    } else {
      sysGroup.appendChild(opt);
    }
  });
  if (userGroup.children.length) targetSel.appendChild(userGroup);
  if (sysGroup.children.length) targetSel.appendChild(sysGroup);
  targetSel.value = state.targetPackId;

  // Source Select: Local, Downloaded, and System
  const srcUserGroup = document.createElement("optgroup");
  srcUserGroup.label = t("optGroupLocalCustom");
  const srcDlGroup = document.createElement("optgroup");
  srcDlGroup.label = t("optGroupDownloaded");
  const srcSysGroup = document.createElement("optgroup");
  srcSysGroup.label = t("optGroupSystem");

  state.packs.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    if (p.source === "downloaded") {
      opt.textContent = `🌐 ${p.dl_title || p.name} → ${p.folder_name}`;
      srcDlGroup.appendChild(opt);
    } else if (p.source === "user") {
      opt.textContent = `📁 ${p.name} (${p.folder_name})`;
      srcUserGroup.appendChild(opt);
    } else {
      opt.textContent = `💻 ${p.name}`;
      srcSysGroup.appendChild(opt);
    }
  });
  if (srcDlGroup.children.length) sourceSel.appendChild(srcDlGroup);
  if (srcUserGroup.children.length) sourceSel.appendChild(srcUserGroup);
  if (srcSysGroup.children.length) sourceSel.appendChild(srcSysGroup);
  sourceSel.value = state.sourcePackId;

  // Base Theme Select for New Pack Modal
  state.packs
    .filter((p) => p.source !== "downloaded")
    .forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.folder_name;
      opt.textContent = `${p.name} (${p.folder_name})`;
      baseSel.appendChild(opt);
    });
  const noneOpt = document.createElement("option");
  noneOpt.value = "none";
  noneOpt.textContent = t("optNoFallback");
  baseSel.appendChild(noneOpt);
  if ([...baseSel.options].some((o) => o.value === "Win11-dark")) {
    baseSel.value = "Win11-dark";
  }

  updateDeleteDownloadedButton();
}

function updateDeleteDownloadedButton() {
  const btn = document.getElementById("btnDeleteDownloadedSource");
  const currentSrc = state.packs.find((p) => p.id === state.sourcePackId);
  if (currentSrc && currentSrc.source === "downloaded") {
    btn.classList.remove("hidden");
  } else {
    btn.classList.add("hidden");
  }
}

// ==================== LEFT PANE: TARGET PACK EDITOR ====================
async function loadTargetPackState() {
  if (!state.targetPackId) return;
  try {
    const data = await apiGet(`/api/pack-state?pack_id=${encodeURIComponent(state.targetPackId)}`);
    state.targetPackState = data.state;

    // Pre-fill the pack name input bar whenever a pack is selected/loaded
    const nameInput = document.getElementById("targetPackNameInput");
    const saveNameBtn = document.getElementById("btnSavePackName");
    if (nameInput && state.targetPackState) {
      nameInput.value = state.targetPackState.pack_name || state.targetPackState.pack_id;
      nameInput.disabled = !state.targetPackState.editable;
    }
    if (saveNameBtn && state.targetPackState) {
      saveNameBtn.disabled = !state.targetPackState.editable;
    }

    renderTargetPackHeader();
    if (state.leftActiveGroup === "essential") {
      renderLeftPaneContent();
    }
  } catch (err) {
    showToast(err.message, true);
  }
}

async function loadTargetPackIcons(reset = true) {
  if (!state.targetPackId) return;
  if (state.leftActiveGroup === "essential") {
    renderLeftPaneContent();
    return;
  }

  if (reset) {
    state.leftPackOffset = 0;
    state.leftPackIcons = [];
  }

  const cat = state.leftActiveGroup; // 'all', 'places', 'apps', 'devices', 'mimes', 'status'
  const q = state.leftSearchQuery.trim();

  try {
    const url = `/api/pack-icons?pack_id=${encodeURIComponent(state.targetPackId)}&category=${encodeURIComponent(cat)}&q=${encodeURIComponent(q)}&limit=${state.leftPackLimit}&offset=${state.leftPackOffset}`;
    const data = await apiGet(url);
    state.leftPackTotal = data.total || 0;
    if (reset) {
      state.leftPackIcons = data.icons || [];
    } else {
      state.leftPackIcons = state.leftPackIcons.concat(data.icons || []);
    }
    renderLeftPaneContent();
  } catch (err) {
    showToast(err.message, true);
  }
}

function renderTargetPackHeader() {
  const st = state.targetPackState;
  if (!st) return;
  const statusEl = document.getElementById("targetPackStatusText");
  if (st.editable) {
    statusEl.innerHTML = t("bannerEditable", {
      total: st.total_pack_icons ?? state.leftPackTotal ?? 0,
      inherits: escapeHtml(st.inherits || "hicolor"),
    });
  } else {
    statusEl.innerHTML = t("bannerReadOnly");
  }
}

function renderLeftPaneContent() {
  if (state.leftActiveGroup === "essential") {
    renderEssentialSlotsGrid();
  } else {
    renderTargetPackIconsGrid();
  }
}

// Renders ALL icons inside the selected pack (default view & category tabs)
function renderTargetPackIconsGrid() {
  const grid = document.getElementById("targetSlotsGrid");
  const metaEl = document.getElementById("leftIconsMeta");
  const loadMoreWrap = document.getElementById("loadMoreLeftWrap");
  grid.innerHTML = "";

  metaEl.innerHTML = `<span>${t("showingPackIcons", {
    shown: state.leftPackIcons.length,
    total: state.leftPackTotal,
  })}</span>`;

  if (state.leftPackIcons.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; padding: 32px; text-align: center; color: var(--text-muted);">
      ${t("noIconsFoundInPack")}
    </div>`;
    loadMoreWrap.classList.add("hidden");
    return;
  }

  const overrides = (state.targetPackState && state.targetPackState.slots) || [];
  const overriddenSet = new Set(overrides.filter((s) => s.is_overridden).map((s) => s.id));

  state.leftPackIcons.forEach((icon) => {
    const isOverridden = overriddenSet.has(icon.name);
    const card = document.createElement("div");
    card.className = `slot-card ${isOverridden ? "is-overridden" : ""}`;
    card.dataset.slotId = icon.name;

    const aliasText =
      icon.aliases && icon.aliases.length > 1
        ? `${icon.category} • +${icon.aliases.length - 1} aliases`
        : icon.category;

    card.innerHTML = `
      <div class="slot-icon-box">
        <img src="${iconUrl(icon.path, true)}" alt="${escapeHtml(icon.name)}" loading="lazy" />
      </div>
      <div class="slot-info">
        <div class="slot-title" title="${escapeHtml(icon.name)}">${escapeHtml(icon.name)}</div>
        <div class="slot-id" title="${escapeHtml((icon.aliases || []).join(", "))}">${escapeHtml(aliasText)}</div>
        <div class="slot-badges">
          ${
            isOverridden
              ? `<span class="badge-overridden">★ ${t("badgeEdited")}</span>`
              : `<span class="badge-fallback">${t("badgeInPack")}</span>`
          }
        </div>
      </div>
      <div class="slot-actions">
        <button class="slot-action-btn btn-pc-upload" title="${escapeHtml(t("btnUploadPCTitle"))}">${t("btnUploadPC")}</button>
        <button class="slot-action-btn btn-compare" title="${escapeHtml(t("btnCompareTitle"))}">🪄</button>
        <button class="slot-action-btn remove-btn btn-remove-icon" title="${escapeHtml(t("btnRemoveTitle"))}">🗑️</button>
      </div>
    `;

    const slotMeta = {
      id: icon.name,
      label: icon.name,
      category: icon.category || "apps",
      aliases: icon.aliases || [icon.name],
    };

    wireLeftCardInteractions(card, icon.name, slotMeta, async () => {
      await removeIconFromTargetPack(icon.name, icon.aliases || [icon.name]);
    });

    grid.appendChild(card);
  });

  if (state.leftPackIcons.length < state.leftPackTotal) {
    loadMoreWrap.classList.remove("hidden");
  } else {
    loadMoreWrap.classList.add("hidden");
  }
}

// Renders Curated/Essential system slots when the 'Essential Slots' tab is active
function renderEssentialSlotsGrid() {
  const st = state.targetPackState;
  const grid = document.getElementById("targetSlotsGrid");
  const metaEl = document.getElementById("leftIconsMeta");
  const loadMoreWrap = document.getElementById("loadMoreLeftWrap");
  loadMoreWrap.classList.add("hidden");
  grid.innerHTML = "";

  if (!st || !st.slots) return;
  const q = state.leftSearchQuery.trim().toLowerCase();

  const filtered = st.slots.filter((slot) => {
    if (!q) return true;
    const matchLabel = slot.label.toLowerCase().includes(q);
    const matchId = slot.id.toLowerCase().includes(q);
    const matchAlias = (slot.aliases || []).some((a) => a.toLowerCase().includes(q));
    return matchLabel || matchId || matchAlias;
  });

  metaEl.innerHTML = `<span>${t("showingEssentialSlots", { count: filtered.length })}</span>`;

  filtered.forEach((slot) => {
    const card = document.createElement("div");
    card.className = `slot-card ${slot.is_overridden ? "is-overridden" : ""}`;
    card.dataset.slotId = slot.id;

    const imgHtml = slot.icon_path
      ? `<img src="${iconUrl(slot.icon_path, true)}" alt="${escapeHtml(slot.label)}" loading="lazy" />`
      : `<span class="slot-missing-icon">?</span>`;

    let badgeHtml = "";
    if (slot.is_overridden) {
      badgeHtml = `<span class="badge-overridden">★ ${t("badgeEdited")}</span>`;
    } else if (slot.source_type && slot.source_type.startsWith("fallback:")) {
      badgeHtml = `<span class="badge-fallback">Base: ${escapeHtml(slot.source_type.split(":")[1])}</span>`;
    } else if (slot.source_type === "pack") {
      badgeHtml = `<span class="badge-fallback">${t("badgeInPack")}</span>`;
    } else {
      badgeHtml = `<span class="badge-fallback">${t("badgeMissing")}</span>`;
    }

    card.innerHTML = `
      <div class="slot-icon-box">${imgHtml}</div>
      <div class="slot-info">
        <div class="slot-title" title="${escapeHtml(slot.label)}">${escapeHtml(slot.label)}</div>
        <div class="slot-id" title="${escapeHtml(slot.id)}">${escapeHtml(slot.id)}</div>
        <div class="slot-badges">${badgeHtml}</div>
      </div>
      <div class="slot-actions">
        <button class="slot-action-btn btn-pc-upload" title="${escapeHtml(t("btnUploadPCTitle"))}">${t("btnUploadPC")}</button>
        <button class="slot-action-btn btn-compare" title="${escapeHtml(t("btnCompareTitle"))}">🪄</button>
        <button class="slot-action-btn remove-btn btn-remove-icon" title="${escapeHtml(t("btnRemoveTitle"))}">🗑️</button>
      </div>
    `;

    wireLeftCardInteractions(card, slot.id, slot, async () => {
      if (slot.is_overridden) {
        await restoreSlotToDefault(slot.id);
      } else {
        await removeIconFromTargetPack(slot.id, slot.aliases || [slot.id]);
      }
    });

    grid.appendChild(card);
  });
}

function wireLeftCardInteractions(card, slotId, slotMeta, onRemoveClick) {
  // 1. Upload from PC button
  const btnPc = card.querySelector(".btn-pc-upload");
  if (btnPc) {
    btnPc.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!ensureEditablePack()) return;
      pickLocalIconFile(async (file) => {
        await uploadAndAssignFileToSlot(file, slotId, slotMeta);
      });
    });
  }

  // 2. Compare across packs button
  const btnCompare = card.querySelector(".btn-compare");
  if (btnCompare) {
    btnCompare.addEventListener("click", (e) => {
      e.stopPropagation();
      openCompareModal(slotMeta);
    });
  }

  // 3. Remove icon button
  const btnRemove = card.querySelector(".btn-remove-icon");
  if (btnRemove) {
    btnRemove.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!ensureEditablePack()) return;
      await onRemoveClick();
    });
  }

  // 4. Click on card: if an icon is picked in cursor, assign it; otherwise open Compare modal
  card.addEventListener("click", async () => {
    if (state.pickedIcon) {
      await assignIconToSlot(slotId, state.pickedIcon.path, slotMeta);
      clearPickedIcon();
    } else {
      openCompareModal(slotMeta);
    }
  });

  // 5. Drag & Drop onto this card (supports both Right-Pane icons AND OS files from PC)
  card.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
    card.classList.add("drag-over");
  });

  card.addEventListener("dragleave", () => {
    card.classList.remove("drag-over");
  });

  card.addEventListener("drop", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    card.classList.remove("drag-over");

    if (!ensureEditablePack()) return;

    // Check if user dropped a file directly from their computer file manager
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await uploadAndAssignFileToSlot(file, slotId, slotMeta);
      return;
    }

    // Check if user dragged an icon tile from the right pane
    const rawData = e.dataTransfer.getData("application/json");
    if (rawData) {
      try {
        const dragged = JSON.parse(rawData);
        if (dragged && dragged.path) {
          await assignIconToSlot(slotId, dragged.path, slotMeta);
        }
      } catch (_) {}
    }
  });
}

function ensureEditablePack() {
  if (!state.targetPackState || !state.targetPackState.editable) {
    showToast(t("readOnlyAlert"), true);
    document.getElementById("newPackModal").classList.remove("hidden");
    return false;
  }
  return true;
}

async function saveTargetPackName() {
  if (!ensureEditablePack()) return;
  const input = document.getElementById("targetPackNameInput");
  const newName = (input.value || "").trim();
  if (!newName) return;

  try {
    await apiPost("/api/packs/settings", {
      pack_id: state.targetPackId,
      name: newName,
    });
    showToast(t("toastNameSaved", { name: newName }));
    await loadPacksList();
  } catch (err) {
    showToast(err.message, true);
  }
}

async function assignIconToSlot(slotId, sourcePath, slotMeta = null) {
  if (!ensureEditablePack()) return;
  try {
    await apiPost("/api/slot/assign", {
      pack_id: state.targetPackId,
      slot_id: slotId,
      source_path: sourcePath,
      slot_meta: slotMeta
        ? {
            label: slotMeta.label || slotId,
            group: slotMeta.group || "custom",
            category: slotMeta.category || "apps",
            aliases: slotMeta.aliases || [slotId],
          }
        : undefined,
    });
    showToast(t("toastIconUpdated", { id: slotId }));
    await loadTargetPackState();
    await loadTargetPackIcons(false);
  } catch (err) {
    showToast(err.message, true);
  }
}

async function removeIconFromTargetPack(iconName, aliases = []) {
  if (!ensureEditablePack()) return;
  if (!confirm(t("confirmRemoveIcon", { name: iconName }))) return;
  try {
    await apiPost("/api/slot/remove", {
      pack_id: state.targetPackId,
      icon_name: iconName,
      aliases: aliases,
    });
    showToast(t("toastIconRemoved", { id: iconName }));
    // Remove locally from state.leftPackIcons for instant feedback
    state.leftPackIcons = state.leftPackIcons.filter((ic) => ic.name !== iconName);
    state.leftPackTotal = Math.max(0, state.leftPackTotal - 1);
    renderLeftPaneContent();
    await loadTargetPackState();
  } catch (err) {
    showToast(err.message, true);
  }
}

async function restoreSlotToDefault(slotId) {
  try {
    await apiPost("/api/slot/restore", {
      pack_id: state.targetPackId,
      slot_id: slotId,
    });
    showToast(t("toastIconRemoved", { id: slotId }));
    await loadTargetPackState();
    await loadTargetPackIcons(true);
  } catch (err) {
    showToast(err.message, true);
  }
}

async function uploadAndAssignFileToSlot(file, slotId, slotMeta = null) {
  try {
    const b64 = await readFileAsBase64(file);
    await apiPost("/api/imports/upload", {
      filename: file.name,
      data_b64: b64,
      pack_id: state.targetPackId,
      slot_id: slotId,
      slot_meta: slotMeta,
    });
    showToast(t("toastCustomUploaded", { id: slotId }));
    await loadImportsList();
    await loadTargetPackState();
    await loadTargetPackIcons(true);
  } catch (err) {
    showToast(err.message, true);
  }
}

// ==================== RIGHT PANE: BROWSE SOURCE PACK ICONS ====================
async function loadSourcePackIcons(reset = true) {
  if (!state.sourcePackId) return;
  if (reset) {
    state.sourceOffset = 0;
    state.sourceIcons = [];
  }

  const grid = document.getElementById("sourceIconsGrid");
  if (reset) {
    grid.innerHTML = `<div style="grid-column: 1/-1; padding: 24px; color: var(--text-muted);">${t("loadingSourceIcons")}</div>`;
  }

  try {
    const url = `/api/pack-icons?pack_id=${encodeURIComponent(state.sourcePackId)}&category=${encodeURIComponent(state.sourceCategory)}&q=${encodeURIComponent(state.sourceSearchQuery)}&limit=${state.sourceLimit}&offset=${state.sourceOffset}`;
    const data = await apiGet(url);
    state.sourceTotal = data.total || 0;
    if (reset) {
      state.sourceIcons = data.icons || [];
    } else {
      state.sourceIcons = state.sourceIcons.concat(data.icons || []);
    }
    renderSourceIconsGrid();
  } catch (err) {
    showToast(err.message, true);
  }
}

function renderSourceIconsGrid() {
  const grid = document.getElementById("sourceIconsGrid");
  const meta = document.getElementById("sourceIconsMeta");
  const loadMoreWrap = document.getElementById("loadMoreSourceWrap");

  meta.innerHTML = `<span>${t("showingSourceIcons", {
    shown: state.sourceIcons.length,
    total: state.sourceTotal,
  })}</span>`;

  grid.innerHTML = "";
  if (state.sourceIcons.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; padding: 28px; text-align: center; color: var(--text-muted);">${t("noSourceIcons")}</div>`;
    loadMoreWrap.classList.add("hidden");
    return;
  }

  state.sourceIcons.forEach((ic) => {
    const tile = createDraggableIconTile(ic);
    grid.appendChild(tile);
  });

  if (state.sourceIcons.length < state.sourceTotal) {
    loadMoreWrap.classList.remove("hidden");
  } else {
    loadMoreWrap.classList.add("hidden");
  }
}

function createDraggableIconTile(ic) {
  const tile = document.createElement("div");
  tile.className = "source-icon-tile";
  if (state.pickedIcon && state.pickedIcon.path === ic.path) {
    tile.classList.add("picked");
  }
  tile.draggable = true;
  tile.title = `${ic.name}\nAliases: ${(ic.aliases || [ic.name]).join(", ")}\n(Drag to the left pane or click to copy)`;

  tile.innerHTML = `
    <span class="source-tile-cat">${escapeHtml(ic.category || "")}</span>
    <img src="${iconUrl(ic.path)}" alt="${escapeHtml(ic.name)}" loading="lazy" />
    <div class="source-tile-name">${escapeHtml(ic.name)}</div>
  `;

  tile.addEventListener("dragstart", (e) => {
    const payload = {
      name: ic.name,
      path: ic.path,
      category: ic.category || "apps",
      aliases: ic.aliases || [ic.name],
    };
    state.draggedIcon = payload;
    e.dataTransfer.setData("application/json", JSON.stringify(payload));
    e.dataTransfer.effectAllowed = "copy";
  });

  tile.addEventListener("click", () => {
    setPickedIcon({
      name: ic.name,
      path: ic.path,
      category: ic.category || "apps",
      aliases: ic.aliases || [ic.name],
    });
  });

  return tile;
}

function setPickedIcon(iconObj) {
  state.pickedIcon = iconObj;
  const banner = document.getElementById("pickedBanner");
  document.getElementById("pickedBannerImg").src = iconUrl(iconObj.path);
  document.getElementById("pickedBannerName").textContent = iconObj.name;
  banner.classList.remove("hidden");
  document.querySelectorAll(".source-icon-tile").forEach((el) => el.classList.remove("picked"));
}

function clearPickedIcon() {
  state.pickedIcon = null;
  document.getElementById("pickedBanner").classList.add("hidden");
  document.querySelectorAll(".source-icon-tile").forEach((el) => el.classList.remove("picked"));
}

// ==================== RIGHT PANE MODE 2: OPENDESKTOP.ORG STORE ====================
async function searchOpenDesktopStore(page = 0) {
  state.storePage = page;
  const grid = document.getElementById("storeItemsGrid");
  grid.innerHTML = `<div style="grid-column: 1/-1; padding: 36px; text-align: center; color: var(--text-secondary);">
    ${t("loadingStore")}
  </div>`;

  try {
    const url = `/api/opendesktop/search?q=${encodeURIComponent(state.storeQuery)}&sort=${encodeURIComponent(state.storeSort)}&page=${state.storePage}`;
    const data = await apiGet(url);
    state.storeItems = data.items || [];
    state.storeTotal = data.total || 0;
    renderStoreGrid();
  } catch (err) {
    grid.innerHTML = `<div style="grid-column: 1/-1; padding: 28px; color: var(--danger);">Error querying OpenDesktop.org: ${escapeHtml(err.message)}</div>`;
  }
}

function renderStoreGrid() {
  const grid = document.getElementById("storeItemsGrid");
  grid.innerHTML = "";

  document.getElementById("storePageIndicator").textContent = t("storePageText", {
    page: state.storePage + 1,
    total: state.storeTotal,
  });
  document.getElementById("btnStorePrevPage").disabled = state.storePage <= 0;
  document.getElementById("btnStoreNextPage").disabled = state.storeItems.length === 0;

  if (state.storeItems.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; padding: 30px; text-align: center; color: var(--text-muted);">No themes found on OpenDesktop.org for this search.</div>`;
    return;
  }

  state.storeItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = `store-card ${item.is_downloaded ? "is-downloaded" : ""}`;

    const thumbUrl = item.previews && item.previews[0] ? item.previews[0] : "";
    const thumbHtml = thumbUrl
      ? `<img src="${escapeHtml(thumbUrl)}" alt="${escapeHtml(item.name)}" loading="lazy" />`
      : `<div style="color: var(--text-muted); font-size: 12px;">No preview</div>`;

    const archiveOpts = item.archives
      .map((a, idx) => {
        const mb = a.size_kb ? ` (${(a.size_kb / 1024).toFixed(1)} MB)` : "";
        return `<option value="${idx}">${escapeHtml(a.name)}${mb}</option>`;
      })
      .join("");

    let installedControlsHtml = "";
    if (item.is_downloaded && item.downloaded_info) {
      const firstPackId = (item.downloaded_info.packs || [])[0] || "";
      installedControlsHtml = `
        <div class="store-installed-actions">
          <button class="btn btn-primary btn-sm flex-1 btn-use-downloaded" data-pack-id="${escapeHtml(firstPackId)}">
            ${t("btnUsePack")}
          </button>
          <button class="btn btn-danger-ghost btn-sm btn-delete-dl-card" data-item-id="${escapeHtml(item.id)}" title="${escapeHtml(t("btnDeleteDownload"))}">
            🗑️
          </button>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="store-thumb-wrap">
        ${thumbHtml}
        ${item.is_downloaded ? `<span class="store-downloaded-badge">${t("badgeDownloaded")}</span>` : ""}
        <span class="store-score-badge">⭐ ${escapeHtml(item.score)}%</span>
      </div>
      <div class="store-card-body">
        <div class="store-card-title" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>
        <div class="store-card-meta">
          <span>👤 ${escapeHtml(item.author || "author")}</span>
          <span>⬇️ ${escapeHtml(item.downloads || "0")}</span>
        </div>
        <div class="store-card-actions">
          <div class="store-dl-row">
            <select class="input-select archive-select">${archiveOpts}</select>
            <button class="btn btn-secondary btn-sm btn-trigger-dl">${t("btnDownloadPack")}</button>
          </div>
          ${installedControlsHtml}
        </div>
      </div>
    `;

    card.querySelector(".btn-trigger-dl").addEventListener("click", async () => {
      const selIdx = parseInt(card.querySelector(".archive-select").value, 10) || 0;
      const arch = item.archives[selIdx];
      if (!arch) return;
      await startOpenDesktopDownload(item.id, item.name, arch.name, arch.url);
    });

    const btnUse = card.querySelector(".btn-use-downloaded");
    if (btnUse) {
      btnUse.addEventListener("click", async () => {
        const pid = btnUse.dataset.packId;
        if (pid) {
          state.sourcePackId = pid;
          switchRightMode("browse");
          populatePackSelects();
          await loadSourcePackIcons(true);
        }
      });
    }

    const btnDel = card.querySelector(".btn-delete-dl-card");
    if (btnDel) {
      btnDel.addEventListener("click", async () => {
        await deleteDownloadedItem(item.id, item.name);
      });
    }

    grid.appendChild(card);
  });
}

async function startOpenDesktopDownload(itemId, title, archiveName, downloadUrl) {
  try {
    await apiPost("/api/opendesktop/download", {
      item_id: itemId,
      title: title,
      archive_name: archiveName,
      download_url: downloadUrl,
    });
    showToast(`Downloading '${archiveName}'...`);
    startPollingDownloadJobs();
  } catch (err) {
    showToast(err.message, true);
  }
}

function startPollingDownloadJobs() {
  if (state.downloadPollTimer) return;
  pollDownloadJobsOnce();
  state.downloadPollTimer = setInterval(pollDownloadJobsOnce, 1000);
}

async function pollDownloadJobsOnce() {
  try {
    const data = await apiGet("/api/opendesktop/jobs");
    const jobs = data.jobs || [];
    renderDownloadJobs(jobs);

    const anyRunning = jobs.some((j) => j.status === "downloading" || j.status === "extracting");
    if (!anyRunning && state.downloadPollTimer) {
      clearInterval(state.downloadPollTimer);
      state.downloadPollTimer = null;
      await loadPacksList();
      if (state.rightMode === "store") {
        await searchOpenDesktopStore(state.storePage);
      }
    }
  } catch (_) {}
}

function renderDownloadJobs(jobs) {
  const area = document.getElementById("storeDownloadJobsArea");
  const activeOrRecent = jobs.filter((j) => j.status !== "done" || Date.now() / 1000 - (j.finished_at || 0) < 10);
  area.innerHTML = "";
  activeOrRecent.slice(-3).forEach((j) => {
    const bar = document.createElement("div");
    bar.className = "dl-job-bar";
    bar.innerHTML = `
      <div class="dl-job-header">
        <span>📦 ${escapeHtml(j.title)} (${escapeHtml(j.archive_name)})</span>
        <span>${escapeHtml(j.message)}</span>
      </div>
      <div class="dl-progress-track">
        <div class="dl-progress-fill" style="width: ${j.progress || 0}%"></div>
      </div>
    `;
    area.appendChild(bar);
  });
}

async function deleteDownloadedItem(itemId, label = "this download") {
  if (!confirm(t("confirmDeleteDownload", { name: label }))) {
    return;
  }
  try {
    await apiPost("/api/opendesktop/delete", { item_id: itemId });
    showToast(t("toastDownloadDeleted"));
    if (state.sourcePackId.startsWith(`dl:${itemId}:`)) {
      state.sourcePackId = "";
    }
    await loadPacksList();
    if (state.rightMode === "store") {
      await searchOpenDesktopStore(state.storePage);
    }
  } catch (err) {
    showToast(err.message, true);
  }
}

// ==================== RIGHT PANE MODE 3: CUSTOM IMPORTS ====================
async function loadImportsList() {
  try {
    const data = await apiGet("/api/imports");
    state.importedIcons = data.imports || [];
    document.getElementById("totalImportsBadge").textContent = state.importedIcons.length;
    renderImportedIconsGrid();
  } catch (_) {}
}

function renderImportedIconsGrid() {
  const grid = document.getElementById("importedIconsGrid");
  grid.innerHTML = "";
  if (state.importedIcons.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; padding: 28px; text-align: center; color: var(--text-muted);">
      ${t("noImportsYet")}
    </div>`;
    return;
  }

  state.importedIcons.forEach((imp) => {
    const tile = createDraggableIconTile({
      name: imp.name,
      path: imp.path,
      category: "custom",
      aliases: [imp.name],
    });
    const delBtn = document.createElement("button");
    delBtn.className = "slot-action-btn";
    delBtn.style.position = "absolute";
    delBtn.style.top = "4px";
    delBtn.style.left = "4px";
    delBtn.textContent = "✕";
    delBtn.title = "Remove from imports";
    delBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      await apiPost("/api/imports/delete", { filename: imp.filename });
      await loadImportsList();
    });
    tile.appendChild(delBtn);
    grid.appendChild(tile);
  });
}

// ==================== COMPARE MODAL ====================
async function openCompareModal(slot) {
  const modal = document.getElementById("compareModal");
  const title = document.getElementById("compareModalTitle");
  const grid = document.getElementById("compareVariantsGrid");

  title.textContent = t("compareModalHeader", { label: slot.label || slot.id, id: slot.id });
  grid.innerHTML = `<div style="grid-column: 1/-1; padding: 24px; color: var(--text-secondary);">${t("compareSearching")}</div>`;
  modal.classList.remove("hidden");

  try {
    const data = await apiGet(`/api/compare-slot?slot_id=${encodeURIComponent(slot.id)}`);
    const variants = data.variants || [];
    grid.innerHTML = "";

    if (variants.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; padding: 24px; color: var(--text-muted);">
        ${t("compareNoVariants", { id: escapeHtml(slot.id) })}
      </div>`;
      return;
    }

    variants.forEach((v) => {
      const card = document.createElement("div");
      card.className = "compare-card";
      card.innerHTML = `
        <img src="${iconUrl(v.icon_path)}" alt="${escapeHtml(v.pack_name)}" />
        <div class="compare-pack-name">${escapeHtml(v.pack_name)}</div>
        <div class="compare-pack-source">${escapeHtml(v.pack_source)}</div>
      `;
      card.addEventListener("click", async () => {
        modal.classList.add("hidden");
        await assignIconToSlot(slot.id, v.icon_path, slot);
      });
      grid.appendChild(card);
    });
  } catch (err) {
    grid.innerHTML = `<div style="color: var(--danger);">${escapeHtml(err.message)}</div>`;
  }
}

// ==================== UI EVENTS BINDING ====================
function bindUIEvents() {
  // Language Selector (Top Right)
  const langSelect = document.getElementById("langSelect");
  if (langSelect) {
    langSelect.value = state.lang;
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value, true);
    });
  }

  // Cancel Picked Icon (Esc or button)
  document.getElementById("btnCancelPicked").addEventListener("click", clearPickedIcon);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      clearPickedIcon();
      document.querySelectorAll(".modal-backdrop").forEach((m) => m.classList.add("hidden"));
    }
  });

  // Left: Target Pack Selector
  document.getElementById("targetPackSelect").addEventListener("change", async (e) => {
    state.targetPackId = e.target.value;
    await loadTargetPackState();
    await loadTargetPackIcons(true);
  });

  // Left: Pack Name Save Bar
  document.getElementById("btnSavePackName").addEventListener("click", saveTargetPackName);
  document.getElementById("targetPackNameInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveTargetPackName();
    }
  });

  // Left: Category Tabs
  document.querySelectorAll("#leftGroupTabs .tab-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const grp = btn.dataset.group;
      if (grp === "add_custom") {
        document.getElementById("addSlotModal").classList.remove("hidden");
        return;
      }
      document.querySelectorAll("#leftGroupTabs .tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.leftActiveGroup = grp;
      await loadTargetPackIcons(true);
    });
  });

  // Left: Search Input
  let leftSearchTimer = null;
  document.getElementById("leftSlotSearch").addEventListener("input", (e) => {
    clearTimeout(leftSearchTimer);
    leftSearchTimer = setTimeout(() => {
      state.leftSearchQuery = e.target.value;
      loadTargetPackIcons(true);
    }, 200);
  });

  // Left: Load More Button
  document.getElementById("btnLoadMoreLeft").addEventListener("click", async () => {
    state.leftPackOffset += state.leftPackLimit;
    await loadTargetPackIcons(false);
  });

  // Left: Drop onto the general Target Pack Container (adds new icon into pack)
  const leftCanvas = document.getElementById("targetSlotsContainer");
  leftCanvas.addEventListener("dragover", (e) => {
    e.preventDefault();
    leftCanvas.classList.add("drag-over-canvas");
  });
  leftCanvas.addEventListener("dragleave", () => {
    leftCanvas.classList.remove("drag-over-canvas");
  });
  leftCanvas.addEventListener("drop", async (e) => {
    e.preventDefault();
    leftCanvas.classList.remove("drag-over-canvas");
    if (!ensureEditablePack()) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const f = e.dataTransfer.files[0];
      const stem = f.name.replace(/\.[^/.]+$/, "");
      const cat = ["places", "apps", "devices", "mimes", "status"].includes(state.leftActiveGroup)
        ? state.leftActiveGroup
        : "apps";
      await uploadAndAssignFileToSlot(f, stem, {
        id: stem,
        label: stem,
        category: cat,
        aliases: [stem],
      });
      return;
    }

    const rawData = e.dataTransfer.getData("application/json");
    if (rawData) {
      try {
        const dragged = JSON.parse(rawData);
        if (dragged && dragged.path && dragged.name) {
          await assignIconToSlot(dragged.name, dragged.path, {
            id: dragged.name,
            label: dragged.name,
            category: dragged.category || "apps",
            aliases: dragged.aliases || [dragged.name],
          });
        }
      } catch (_) {}
    }
  });

  // Center Header: Apply Pack to System
  document.getElementById("btnApplyToSystem").addEventListener("click", async () => {
    if (!state.targetPackId) return;
    const btn = document.getElementById("btnApplyToSystem");
    const prevHtml = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = t("applyingBtn");
    try {
      const res = await apiPost("/api/packs/apply", { pack_id: state.targetPackId });
      state.currentSystemTheme = res.applied_theme;
      document.getElementById("currentSystemThemeName").textContent = res.applied_theme;
      showToast(t("toastThemeApplied", { theme: res.applied_theme }));
      await loadPacksList();
    } catch (err) {
      showToast(err.message, true);
    } finally {
      btn.disabled = false;
      btn.innerHTML = prevHtml;
      applyTranslations();
    }
  });

  // Right: Mode Tabs ('browse' | 'store' | 'imports')
  document.querySelectorAll(".right-mode-tabs .mode-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      switchRightMode(tab.dataset.mode);
    });
  });

  // Right Mode 1: Source Pack Selector
  document.getElementById("sourcePackSelect").addEventListener("change", async (e) => {
    state.sourcePackId = e.target.value;
    updateDeleteDownloadedButton();
    await loadSourcePackIcons(true);
  });

  // Right Mode 1: Delete Downloaded Source Pack button
  document.getElementById("btnDeleteDownloadedSource").addEventListener("click", async () => {
    const currentSrc = state.packs.find((p) => p.id === state.sourcePackId);
    if (currentSrc && currentSrc.dl_id) {
      await deleteDownloadedItem(currentSrc.dl_id, currentSrc.dl_title || currentSrc.name);
    }
  });

  // Right Mode 1: Quick Bulk Mix buttons
  document.getElementById("btnBulkCopyPlaces").addEventListener("click", () => runBulkCopy("places"));
  document.getElementById("btnBulkCopyTaskbar").addEventListener("click", () => runBulkCopy("taskbar"));
  document.getElementById("btnBulkCopySystem").addEventListener("click", () => runBulkCopy("system"));

  // Right Mode 1: Category Pills
  document.querySelectorAll("#sourceCatPills .pill-btn").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("#sourceCatPills .pill-btn").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      state.sourceCategory = pill.dataset.cat;
      loadSourcePackIcons(true);
    });
  });

  // Right Mode 1: Source Icon Search
  let searchTimer = null;
  document.getElementById("sourceIconSearch").addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.sourceSearchQuery = e.target.value.trim();
      loadSourcePackIcons(true);
    }, 220);
  });

  // Right Mode 1: Load More Source Icons
  document.getElementById("btnLoadMoreSource").addEventListener("click", () => {
    state.sourceOffset += state.sourceLimit;
    loadSourcePackIcons(false);
  });

  // Right Mode 2: OpenDesktop Store Search & Quick Tags
  document.getElementById("btnStoreSearch").addEventListener("click", () => {
    state.storeQuery = document.getElementById("storeSearchInput").value.trim();
    state.storeSort = document.getElementById("storeSortSelect").value;
    searchOpenDesktopStore(0);
  });

  document.getElementById("storeSearchInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      state.storeQuery = e.target.value.trim();
      state.storeSort = document.getElementById("storeSortSelect").value;
      searchOpenDesktopStore(0);
    }
  });

  document.getElementById("storeSortSelect").addEventListener("change", (e) => {
    state.storeSort = e.target.value;
    searchOpenDesktopStore(0);
  });

  document.querySelectorAll(".store-quick-tags .tag-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const q = chip.dataset.query;
      document.getElementById("storeSearchInput").value = q;
      state.storeQuery = q;
      searchOpenDesktopStore(0);
    });
  });

  document.getElementById("btnStorePrevPage").addEventListener("click", () => {
    if (state.storePage > 0) searchOpenDesktopStore(state.storePage - 1);
  });
  document.getElementById("btnStoreNextPage").addEventListener("click", () => {
    searchOpenDesktopStore(state.storePage + 1);
  });

  // Right Mode 3: Custom Upload Dropzone
  const dropzone = document.getElementById("customUploadDropzone");
  const fileInput = document.getElementById("customFileInput");
  dropzone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", async (e) => {
    const files = [...(e.target.files || [])];
    for (const f of files) {
      await uploadImportFileOnly(f);
    }
    fileInput.value = "";
  });

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("drag-over");
  });
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("drag-over"));
  dropzone.addEventListener("drop", async (e) => {
    e.preventDefault();
    dropzone.classList.remove("drag-over");
    const files = [...(e.dataTransfer.files || [])];
    for (const f of files) {
      await uploadImportFileOnly(f);
    }
  });

  // Modals: Close & Actions
  document.getElementById("btnCloseCompareModal").addEventListener("click", () => {
    document.getElementById("compareModal").classList.add("hidden");
  });

  // New Pack Modal
  document.getElementById("btnNewPackModal").addEventListener("click", () => {
    document.getElementById("newPackModal").classList.remove("hidden");
  });
  document.getElementById("btnCloseNewPackModal").addEventListener("click", () => {
    document.getElementById("newPackModal").classList.add("hidden");
  });
  document.getElementById("btnCancelNewPack").addEventListener("click", () => {
    document.getElementById("newPackModal").classList.add("hidden");
  });
  document.getElementById("btnConfirmCreatePack").addEventListener("click", createNewPackAction);

  // Pack Settings Modal
  document.getElementById("btnPackSettingsModal").addEventListener("click", openPackSettingsModal);
  document.getElementById("btnClosePackSettingsModal").addEventListener("click", () => {
    document.getElementById("packSettingsModal").classList.add("hidden");
  });
  document.getElementById("btnCancelPackSettings").addEventListener("click", () => {
    document.getElementById("packSettingsModal").classList.add("hidden");
  });
  document.getElementById("btnSavePackSettings").addEventListener("click", savePackSettingsAction);
  document.getElementById("btnDeleteCurrentPack").addEventListener("click", deleteCurrentPackAction);

  // Add Custom Slot Modal
  document.getElementById("btnCloseAddSlotModal").addEventListener("click", () => {
    document.getElementById("addSlotModal").classList.add("hidden");
  });
  document.getElementById("btnCancelAddSlot").addEventListener("click", () => {
    document.getElementById("addSlotModal").classList.add("hidden");
  });
  document.getElementById("btnConfirmAddSlot").addEventListener("click", confirmAddCustomSlot);
}

function switchRightMode(mode) {
  state.rightMode = mode;
  document.querySelectorAll(".right-mode-tabs .mode-tab").forEach((tEl) => {
    tEl.classList.toggle("active", tEl.dataset.mode === mode);
  });

  document.getElementById("sourceBrowseControls").classList.toggle("hidden", mode !== "browse");
  document.getElementById("sourceStoreControls").classList.toggle("hidden", mode !== "store");
  document.getElementById("sourceImportsControls").classList.toggle("hidden", mode !== "imports");

  document.getElementById("viewBrowseIcons").classList.toggle("hidden", mode !== "browse");
  document.getElementById("viewStoreItems").classList.toggle("hidden", mode !== "store");
  document.getElementById("viewImportedIcons").classList.toggle("hidden", mode !== "imports");

  if (mode === "store" && state.storeItems.length === 0) {
    document.getElementById("storeSearchInput").value = state.storeQuery;
    searchOpenDesktopStore(0);
  }
}

async function runBulkCopy(groupFilter) {
  if (!ensureEditablePack()) return;
  try {
    const res = await apiPost("/api/packs/bulk-copy", {
      target_pack_id: state.targetPackId,
      source_pack_id: state.sourcePackId,
      group_filter: groupFilter,
    });
    showToast(t("toastBulkCopied", { count: res.copied_count }));
    await loadTargetPackState();
    await loadTargetPackIcons(true);
  } catch (err) {
    showToast(err.message, true);
  }
}

async function uploadImportFileOnly(file) {
  try {
    const b64 = await readFileAsBase64(file);
    const res = await apiPost("/api/imports/upload", {
      filename: file.name,
      data_b64: b64,
    });
    showToast(t("toastFileImported", { name: res.imported.name }));
    await loadImportsList();
  } catch (err) {
    showToast(err.message, true);
  }
}

async function createNewPackAction() {
  const name = document.getElementById("newPackNameInput").value.trim() || "MyCustomPack";
  const baseTheme = document.getElementById("newPackBaseSelect").value;
  const cloneFull = document.getElementById("newPackCloneCheckbox").checked;

  const btn = document.getElementById("btnConfirmCreatePack");
  btn.disabled = true;
  btn.textContent = t("creatingBtn");
  try {
    const res = await apiPost("/api/packs/create", {
      name: name,
      base_theme: baseTheme,
      clone_full: cloneFull,
    });
    document.getElementById("newPackModal").classList.add("hidden");
    state.targetPackId = res.pack_id;
    showToast(t("toastPackCreated", { id: res.pack_id }));
    await loadPacksList();
  } catch (err) {
    showToast(err.message, true);
  } finally {
    btn.disabled = false;
    btn.textContent = t("btnCreatePackNow");
  }
}

function openPackSettingsModal() {
  const st = state.targetPackState;
  if (!st) return;
  if (!st.editable) {
    showToast(t("readOnlyAlert"), true);
    return;
  }
  document.getElementById("settingsPackIdSubtitle").textContent = `Folder: ~/.local/share/icons/${st.pack_id}`;
  document.getElementById("settingsPackNameInput").value = st.pack_name || st.pack_id;
  document.getElementById("settingsPackInheritsInput").value = st.inherits || "Win11-dark,hicolor";
  document.getElementById("packSettingsModal").classList.remove("hidden");
}

async function savePackSettingsAction() {
  const name = document.getElementById("settingsPackNameInput").value.trim();
  const inherits = document.getElementById("settingsPackInheritsInput").value.trim();
  try {
    await apiPost("/api/packs/settings", {
      pack_id: state.targetPackId,
      name: name,
      inherits: inherits,
    });
    document.getElementById("packSettingsModal").classList.add("hidden");
    showToast(t("toastSettingsSaved"));
    await loadPacksList();
  } catch (err) {
    showToast(err.message, true);
  }
}

async function deleteCurrentPackAction() {
  if (!state.targetPackId) return;
  if (!confirm(t("confirmDeletePack", { id: state.targetPackId }))) return;
  try {
    await apiPost("/api/packs/delete", { pack_id: state.targetPackId });
    document.getElementById("packSettingsModal").classList.add("hidden");
    state.targetPackId = "";
    showToast(t("toastPackDeleted"));
    await loadPacksList();
  } catch (err) {
    showToast(err.message, true);
  }
}

function confirmAddCustomSlot() {
  const label = document.getElementById("customSlotLabelInput").value.trim();
  const slotId = document.getElementById("customSlotIdInput").value.trim();
  const cat = document.getElementById("customSlotCategorySelect").value;
  if (!slotId) {
    showToast("Please enter the technical icon ID", true);
    return;
  }
  document.getElementById("addSlotModal").classList.add("hidden");
  openCompareModal({
    id: slotId,
    label: label || slotId,
    group: "custom",
    category: cat,
    aliases: [slotId],
  });
}
