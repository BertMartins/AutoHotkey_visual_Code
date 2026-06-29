// =============================================
// Directions Configuration (4 / 6 / 8 sectors)
// =============================================
const DIRECTIONS_CONFIG = {
    4: [
        { id: 'top',         label: 'Cima',       angle: 90,  ahkId: 'Top',         minA: 45,    maxA: 135,   wraps: false },
        { id: 'left',        label: 'Esquerda',   angle: 180, ahkId: 'Left',        minA: 135,   maxA: 225,   wraps: false },
        { id: 'bottom',      label: 'Baixo',      angle: 270, ahkId: 'Bottom',      minA: 225,   maxA: 315,   wraps: false },
        { id: 'right',       label: 'Direita',    angle: 0,   ahkId: 'Right',       minA: 315,   maxA: 45,    wraps: true  }
    ],
    6: [
        { id: 'top',         label: 'Cima',       angle: 90,  ahkId: 'Top',         minA: 60,    maxA: 120,   wraps: false },
        { id: 'topLeft',     label: 'Cima-Esq',   angle: 150, ahkId: 'TopLeft',     minA: 120,   maxA: 180,   wraps: false },
        { id: 'bottomLeft',  label: 'Baixo-Esq',  angle: 210, ahkId: 'BottomLeft',  minA: 180,   maxA: 240,   wraps: false },
        { id: 'bottom',      label: 'Baixo',      angle: 270, ahkId: 'Bottom',      minA: 240,   maxA: 300,   wraps: false },
        { id: 'bottomRight', label: 'Baixo-Dir',  angle: 330, ahkId: 'BottomRight', minA: 300,   maxA: 360,   wraps: false },
        { id: 'topRight',    label: 'Cima-Dir',   angle: 30,  ahkId: 'TopRight',    minA: 0,     maxA: 60,    wraps: false }
    ],
    8: [
        { id: 'top',         label: 'Cima',       angle: 90,  ahkId: 'Top',         minA: 67.5,  maxA: 112.5, wraps: false },
        { id: 'topLeft',     label: 'Cima-Esq',   angle: 135, ahkId: 'TopLeft',     minA: 112.5, maxA: 157.5, wraps: false },
        { id: 'left',        label: 'Esquerda',   angle: 180, ahkId: 'Left',        minA: 157.5, maxA: 202.5, wraps: false },
        { id: 'bottomLeft',  label: 'Baixo-Esq',  angle: 225, ahkId: 'BottomLeft',  minA: 202.5, maxA: 247.5, wraps: false },
        { id: 'bottom',      label: 'Baixo',      angle: 270, ahkId: 'Bottom',      minA: 247.5, maxA: 292.5, wraps: false },
        { id: 'bottomRight', label: 'Baixo-Dir',  angle: 315, ahkId: 'BottomRight', minA: 292.5, maxA: 337.5, wraps: false },
        { id: 'right',       label: 'Direita',    angle: 0,   ahkId: 'Right',       minA: 337.5, maxA: 22.5,  wraps: true  },
        { id: 'topRight',    label: 'Cima-Dir',   angle: 45,  ahkId: 'TopRight',    minA: 22.5,  maxA: 67.5,  wraps: false }
    ]
};

const DIR_ARROWS = {
    top: '↑', topLeft: '↖', left: '←', bottomLeft: '↙',
    bottom: '↓', bottomRight: '↘', right: '→', topRight: '↗'
};

function getDirections(count) {
    return DIRECTIONS_CONFIG[count] || DIRECTIONS_CONFIG[4];
}

function emptySector() {
    return { label: '', action: '', actionType: 'hotkey' };
}

function emptyAllSectors() {
    const s = {};
    ['top','topLeft','left','bottomLeft','bottom','bottomRight','right','topRight'].forEach(k => { s[k] = emptySector(); });
    return s;
}

// =============================================
// State Management
// =============================================
const defaultConfig = {
    trigger: 'MButton',
    radius: 120,
    deadzone: 30,
    opacity: 235,
    cornerRadius: 20,
    fadeIn: 120,
    fadeOut: 120,
    fadeSteps: 12,
    scaleActive: 1.10,
    submenuHoldTime: 1500,
    useHighlight: true,
    colors: {
        bg: '1A1A2E',
        item: '2D2D44',
        itemActive: '6366F1',
        text: 'FFFFFF',
        hint: 'A0A0C0',
        aim: '8888AA',
        aimActive: '6366F1',
        shadow: '000000',
        shadowAlpha: 100,
        acrylicAlpha: 210
    }
};

const defaultMenus = {
    main: {
        id: 'main',
        name: 'Menu Principal',
        sectorCount: 6,
        sectors: {
            top:         { label: 'WIN + TAB',  action: 'Send "#{Tab}"',            actionType: 'hotkey'  },
            topLeft:     { label: 'WIN + D',    action: 'Send "#{d}"',              actionType: 'hotkey'  },
            bottomLeft:  { label: 'WIN + L',    action: 'Send "#{l}"',              actionType: 'hotkey'  },
            bottom:      { label: 'EXPLORADOR', action: 'Run "explorer.exe"',       actionType: 'custom'  },
            bottomRight: { label: 'DEV TOOLS',  action: 'submenu:dev',              actionType: 'submenu' },
            topRight:    { label: 'ALT + TAB',  action: 'Send "!{Tab}"',            actionType: 'hotkey'  },
            left:        emptySector(),
            right:       emptySector()
        }
    },
    dev: {
        id: 'dev',
        name: 'Dev Tools',
        sectorCount: 8,
        sectors: {
            top:         { label: 'F5 DEBUG',   action: 'Send "{F5}"',              actionType: 'hotkey' },
            topLeft:     { label: 'CMD PLT',    action: 'Send "^+p"',               actionType: 'hotkey' },
            left:        { label: 'TERMINAL',   action: 'Send "^``"',               actionType: 'hotkey' },
            bottomLeft:  { label: 'GIT',        action: 'Send "^+g"',               actionType: 'hotkey' },
            bottom:      { label: 'CTRL+Z',     action: 'Send "^z"',                actionType: 'hotkey' },
            bottomRight: { label: 'EXPLORER',   action: 'Send "^+e"',               actionType: 'hotkey' },
            right:       { label: 'GO TO DEF',  action: 'Send "{F12}"',             actionType: 'hotkey' },
            topRight:    { label: 'CTRL+S',     action: 'Send "^s"',                actionType: 'hotkey' }
        }
    }
};

let config = JSON.parse(JSON.stringify(defaultConfig));
let menus = JSON.parse(JSON.stringify(defaultMenus));
let currentMenu = 'main';
let selectedSector = null;
let editingSubmenuId = null;

// =============================================
// DOM Elements
// =============================================
const elements = {
    themeToggle: document.getElementById('themeToggle'),
    resetBtn: document.getElementById('resetBtn'),
    generateBtn: document.getElementById('generateBtn'),
    menuPath: document.getElementById('menuPath'),
    radialPreview: document.getElementById('radialPreview'),
    radialLines: document.getElementById('radialLines'),
    sectorEditor: document.getElementById('sectorEditor'),
    editorTitle: document.getElementById('editorTitle'),
    submenuList: document.getElementById('submenuList'),
    codePreview: document.getElementById('codePreview'),
    copyCodeBtn: document.getElementById('copyCodeBtn'),
    settingsTabs: document.getElementById('settingsTabs'),
    addSubmenuBtn: document.getElementById('addSubmenuBtn'),
    sectorCountBtns: document.querySelectorAll('.sector-count-btn'),

    // Settings inputs
    menuRadius: document.getElementById('menuRadius'),
    deadzone: document.getElementById('deadzone'),
    menuOpacity: document.getElementById('menuOpacity'),
    cornerRadius: document.getElementById('cornerRadius'),
    fadeIn: document.getElementById('fadeIn'),
    fadeOut: document.getElementById('fadeOut'),
    fadeSteps: document.getElementById('fadeSteps'),
    scaleActive: document.getElementById('scaleActive'),
    submenuHoldTime: document.getElementById('submenuHoldTime'),
    submenuHoldTimeRange: document.getElementById('submenuHoldTimeRange'),
    holdTimeDisplay: document.getElementById('holdTimeDisplay'),
    bgColor: document.getElementById('bgColor'),
    bgColorText: document.getElementById('bgColorText'),
    itemColor: document.getElementById('itemColor'),
    itemColorText: document.getElementById('itemColorText'),
    accentColor: document.getElementById('accentColor'),
    accentColorText: document.getElementById('accentColorText'),
    textColor: document.getElementById('textColor'),
    textColorText: document.getElementById('textColorText'),
    useHighlightToggle: document.getElementById('useHighlightToggle'),
    highlightToggleSwitch: document.getElementById('highlightToggleSwitch'),
    visualPreviewContainer: document.getElementById('visualPreviewContainer'),
    visualPreviewSvg: document.getElementById('visualPreviewSvg'),
    visualPreviewCenter: document.getElementById('visualPreviewCenter'),

    // Modals
    submenuModal: document.getElementById('submenuModal'),
    submenuName: document.getElementById('submenuName'),
    submenuId: document.getElementById('submenuId'),
    submenuModalTitle: document.getElementById('submenuModalTitle'),
    closeSubmenuModal: document.getElementById('closeSubmenuModal'),
    cancelSubmenu: document.getElementById('cancelSubmenu'),
    saveSubmenu: document.getElementById('saveSubmenu'),

    resetModal: document.getElementById('resetModal'),
    closeResetModal: document.getElementById('closeResetModal'),
    cancelReset: document.getElementById('cancelReset'),
    confirmReset: document.getElementById('confirmReset'),

    toastContainer: document.getElementById('toastContainer'),

    captureOverlay: document.getElementById('captureOverlay'),
    captureIcon: document.getElementById('captureIcon'),
    captureTitle: document.getElementById('captureTitle'),
    captureSubtitle: document.getElementById('captureSubtitle'),
    capturedKeys: document.getElementById('capturedKeys'),
    cancelCapture: document.getElementById('cancelCapture'),
    confirmCapture: document.getElementById('confirmCapture'),
    mapTriggerBtn: document.getElementById('mapTriggerBtn'),
    currentTriggerDisplay: document.getElementById('currentTriggerDisplay')
};

// =============================================
// Theme Toggle
// =============================================
function initTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.classList.add('light');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

elements.themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    const isLight = document.documentElement.classList.contains('light');
    elements.themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// =============================================
// Toast Notifications
// =============================================
function showToast(message, type = 'success') {
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${icons[type]}"></i><span class="toast-message">${message}</span>`;
    elements.toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =============================================
// Tabs
// =============================================
elements.settingsTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab')) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        const tabId = 'tab' + e.target.dataset.tab.charAt(0).toUpperCase() + e.target.dataset.tab.slice(1);
        document.getElementById(tabId).classList.add('active');
    }
});

// =============================================
// Trigger Options
// =============================================
document.querySelectorAll('.trigger-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.trigger-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        option.querySelector('input').checked = true;
        config.trigger = option.dataset.value;
        elements.currentTriggerDisplay.textContent = option.dataset.value;
        updateCodePreview();
    });
});

// =============================================
// Key Capture System
// =============================================
let captureMode = null;
let capturedKeyData = { modifiers: [], key: null, ahkCode: '' };
let captureCallback = null;

const keyToAHK = {
    'Mouse0': 'LButton', 'Mouse1': 'RButton', 'Mouse2': 'MButton',
    'Mouse3': 'XButton1', 'Mouse4': 'XButton2',
    'Control': '^', 'Shift': '+', 'Alt': '!', 'Meta': '#',
    'ArrowLeft': '{Left}', 'ArrowRight': '{Right}', 'ArrowUp': '{Up}', 'ArrowDown': '{Down}',
    'Enter': '{Enter}', 'Tab': '{Tab}', 'Escape': '{Escape}', 'Backspace': '{Backspace}',
    'Delete': '{Delete}', 'Home': '{Home}', 'End': '{End}', 'PageUp': '{PgUp}',
    'PageDown': '{PgDn}', 'Insert': '{Insert}', 'PrintScreen': '{PrintScreen}',
    'Pause': '{Pause}', 'ScrollLock': '{ScrollLock}', 'NumLock': '{NumLock}',
    'CapsLock': '{CapsLock}',
    'F1':'{F1}','F2':'{F2}','F3':'{F3}','F4':'{F4}','F5':'{F5}','F6':'{F6}',
    'F7':'{F7}','F8':'{F8}','F9':'{F9}','F10':'{F10}','F11':'{F11}','F12':'{F12}',
    ' ': '{Space}'
};

const keyDisplayName = {
    'ArrowLeft': '←', 'ArrowRight': '→', 'ArrowUp': '↑', 'ArrowDown': '↓',
    'Control': 'Ctrl', 'Meta': 'Win', ' ': 'Space', 'Escape': 'Esc',
    'Backspace': '⌫', 'Delete': 'Del', 'PageUp': 'PgUp', 'PageDown': 'PgDn',
    'PrintScreen': 'PrtSc'
};

function getKeyDisplayName(key) { return keyDisplayName[key] || key; }
function getAHKKey(key) {
    if (keyToAHK[key]) return keyToAHK[key];
    if (key.length === 1) return key.toLowerCase();
    return `{${key}}`;
}

function openCaptureModal(mode, callback) {
    captureMode = mode;
    captureCallback = callback;
    capturedKeyData = { modifiers: [], key: null, ahkCode: '' };
    if (mode === 'trigger') {
        elements.captureIcon.className = 'fas fa-mouse';
        elements.captureTitle.textContent = 'Mapear Gatilho';
        elements.captureSubtitle.textContent = 'Pressione uma tecla ou botão do mouse para usar como gatilho';
    } else {
        elements.captureIcon.className = 'fas fa-keyboard';
        elements.captureTitle.textContent = 'Capturar Atalho';
        elements.captureSubtitle.textContent = 'Pressione a combinação de teclas desejada';
    }
    elements.capturedKeys.innerHTML = '<span style="color: var(--text-muted); font-size: 0.8rem;">Aguardando...</span>';
    elements.confirmCapture.disabled = true;
    elements.captureOverlay.classList.add('active');
    document.addEventListener('keydown', handleCaptureKeydown);
    document.addEventListener('keyup', handleCaptureKeyup);
    elements.captureOverlay.addEventListener('mousedown', handleCaptureMousedown);
}

function closeCaptureModal() {
    elements.captureOverlay.classList.remove('active');
    captureMode = null; captureCallback = null;
    document.removeEventListener('keydown', handleCaptureKeydown);
    document.removeEventListener('keyup', handleCaptureKeyup);
    elements.captureOverlay.removeEventListener('mousedown', handleCaptureMousedown);
}

function handleCaptureKeydown(e) {
    e.preventDefault(); e.stopPropagation();
    const key = e.key;
    if (e.ctrlKey && !capturedKeyData.modifiers.includes('Ctrl')) capturedKeyData.modifiers.push('Ctrl');
    if (e.shiftKey && !capturedKeyData.modifiers.includes('Shift')) capturedKeyData.modifiers.push('Shift');
    if (e.altKey && !capturedKeyData.modifiers.includes('Alt')) capturedKeyData.modifiers.push('Alt');
    if (e.metaKey && !capturedKeyData.modifiers.includes('Win')) capturedKeyData.modifiers.push('Win');
    if (['Control', 'Shift', 'Alt', 'Meta'].includes(key)) { updateCaptureDisplay(); return; }
    capturedKeyData.key = key;
    updateCaptureDisplay(); buildAHKCode();
    elements.confirmCapture.disabled = false;
}

function handleCaptureKeyup(e) {
    if (!capturedKeyData.key) {
        capturedKeyData.modifiers = [];
        if (e.ctrlKey) capturedKeyData.modifiers.push('Ctrl');
        if (e.shiftKey) capturedKeyData.modifiers.push('Shift');
        if (e.altKey) capturedKeyData.modifiers.push('Alt');
        if (e.metaKey) capturedKeyData.modifiers.push('Win');
        updateCaptureDisplay();
    }
}

function handleCaptureMousedown(e) {
    if (e.target.closest('.capture-actions')) return;
    const mouseButtons = { 0:'LButton', 1:'MButton', 2:'RButton', 3:'XButton1', 4:'XButton2' };
    const mouseDisplayNames = { 0:'Esquerdo', 1:'Meio (Scroll)', 2:'Direito', 3:'Lateral 1', 4:'Lateral 2' };
    if (mouseButtons[e.button]) {
        e.preventDefault(); e.stopPropagation();
        capturedKeyData.modifiers = [];
        if (e.ctrlKey) capturedKeyData.modifiers.push('Ctrl');
        if (e.shiftKey) capturedKeyData.modifiers.push('Shift');
        if (e.altKey) capturedKeyData.modifiers.push('Alt');
        if (e.metaKey) capturedKeyData.modifiers.push('Win');
        capturedKeyData.key = mouseDisplayNames[e.button];
        capturedKeyData.ahkCode = mouseButtons[e.button];
        capturedKeyData.isMouseButton = true;
        updateCaptureDisplay();
        elements.confirmCapture.disabled = false;
    }
}

function updateCaptureDisplay() {
    const parts = [...capturedKeyData.modifiers];
    if (capturedKeyData.key) parts.push(getKeyDisplayName(capturedKeyData.key));
    if (parts.length === 0) {
        elements.capturedKeys.innerHTML = '<span style="color: var(--text-muted); font-size: 0.8rem;">Aguardando...</span>';
    } else {
        elements.capturedKeys.innerHTML = parts.map(p => `<span class="capture-key">${p}</span>`).join('<span style="color: var(--text-muted); margin: 0 0.25rem;">+</span>');
    }
}

function buildAHKCode() {
    if (!capturedKeyData.key) return;
    let code = '';
    if (capturedKeyData.modifiers.includes('Ctrl')) code += '^';
    if (capturedKeyData.modifiers.includes('Shift')) code += '+';
    if (capturedKeyData.modifiers.includes('Alt')) code += '!';
    if (capturedKeyData.modifiers.includes('Win')) code += '#';
    code += capturedKeyData.isMouseButton ? capturedKeyData.ahkCode : getAHKKey(capturedKeyData.key);
    capturedKeyData.ahkCode = code;
}

elements.mapTriggerBtn.addEventListener('click', () => {
    openCaptureModal('trigger', (result) => {
        config.trigger = result.ahkCode;
        elements.currentTriggerDisplay.textContent = result.ahkCode;
        document.querySelectorAll('.trigger-option').forEach(o => {
            const isMatch = o.dataset.value === result.ahkCode;
            o.classList.toggle('selected', isMatch);
            o.querySelector('input').checked = isMatch;
        });
        updateCodePreview();
        showToast('Gatilho mapeado: ' + result.ahkCode);
    });
});

elements.cancelCapture.addEventListener('click', closeCaptureModal);
elements.confirmCapture.addEventListener('click', () => {
    if (captureCallback) captureCallback(capturedKeyData);
    closeCaptureModal();
});

// =============================================
// Color Inputs
// =============================================
function syncColor(colorEl, textEl, configKey) {
    colorEl.addEventListener('input', () => {
        const hex = colorEl.value.substring(1).toUpperCase();
        textEl.value = hex;
        setConfigColor(configKey, hex);
        updateCodePreview(); updateVisualPreview();
    });
    textEl.addEventListener('input', () => {
        const val = textEl.value.replace(/[^0-9A-Fa-f]/g, '').substring(0, 6).toUpperCase();
        textEl.value = val;
        if (val.length === 6) {
            colorEl.value = '#' + val;
            setConfigColor(configKey, val);
            updateCodePreview(); updateVisualPreview();
        }
    });
}

function setConfigColor(key, val) {
    if (key === 'accent') { config.colors.itemActive = val; config.colors.aimActive = val; }
    else if (key === 'bg') config.colors.bg = val;
    else if (key === 'item') config.colors.item = val;
    else if (key === 'text') config.colors.text = val;
}

syncColor(elements.bgColor, elements.bgColorText, 'bg');
syncColor(elements.itemColor, elements.itemColorText, 'item');
syncColor(elements.accentColor, elements.accentColorText, 'accent');
syncColor(elements.textColor, elements.textColorText, 'text');

elements.useHighlightToggle.addEventListener('click', () => {
    config.useHighlight = !config.useHighlight;
    elements.highlightToggleSwitch.classList.toggle('active', config.useHighlight);
    updateCodePreview(); updateVisualPreview();
});

// =============================================
// Visual Preview (mini — aba Visual)
// =============================================
function updateVisualPreview() {
    const c = config.colors;
    const menu = menus[currentMenu];
    const dirs = getDirections(menu.sectorCount);

    elements.visualPreviewContainer.style.background = `linear-gradient(135deg, #${c.bg}dd 0%, #${c.bg} 100%)`;

    // Re-render sectors
    const existing = elements.visualPreviewContainer.querySelectorAll('.vp-sector');
    existing.forEach(el => el.remove());

    const W = 180, H = 180, cx = W / 2, cy = H / 2, r = 66;

    // SVG lines
    const svgEl = elements.visualPreviewSvg;
    svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svgEl.setAttribute('width', W); svgEl.setAttribute('height', H);
    const step = 360 / dirs.length;
    let svgContent = `<circle cx="${cx}" cy="${cy}" r="${r-2}" fill="none" stroke="#${c.item}" stroke-width="1" opacity="0.5"/>`;
    svgContent += `<circle cx="${cx}" cy="${cy}" r="20" fill="none" stroke="#${c.item}" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>`;
    for (let i = 0; i < dirs.length; i++) {
        const a = ((90 + step / 2 + i * step) * Math.PI / 180);
        const x2 = (cx + r * Math.cos(a)).toFixed(1);
        const y2 = (cy - r * Math.sin(a)).toFixed(1);
        svgContent += `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="#${c.item}" stroke-width="0.8" opacity="0.4"/>`;
    }
    svgEl.innerHTML = svgContent;

    // Center
    elements.visualPreviewCenter.style.background = `#${c.item}`;
    elements.visualPreviewCenter.style.color = `#${c.text}`;
    elements.visualPreviewCenter.style.borderColor = `#${c.itemActive}33`;

    // Sectors
    const container = elements.visualPreviewContainer;
    const vpDiv = container.querySelector('#visualPreviewInner');
    dirs.forEach(dir => {
        const rad = dir.angle * Math.PI / 180;
        const px = cx + r * Math.cos(rad);
        const py = cy - r * Math.sin(rad);
        const sector = menus[currentMenu].sectors[dir.id];
        const div = document.createElement('div');
        div.className = 'vp-sector';
        div.style.cssText = `
            position: absolute;
            left: calc(50% + ${(px - cx).toFixed(1)}px);
            top: calc(50% + ${(py - cy).toFixed(1)}px);
            transform: translate(-50%, -50%);
            background: #${c.item};
            color: #${c.text};
            font-size: 0.5rem;
            font-weight: 700;
            padding: 0.2rem 0.4rem;
            border-radius: 5px;
            text-align: center;
            white-space: nowrap;
            max-width: 52px;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid #${c.item}88;
            z-index: 5;
        `;
        div.textContent = DIR_ARROWS[dir.id] + ' ' + (sector.label || dir.label);
        div.addEventListener('mouseenter', () => {
            if (config.useHighlight) div.style.background = `#${c.itemActive}`;
        });
        div.addEventListener('mouseleave', () => {
            div.style.background = `#${c.item}`;
        });
        container.appendChild(div);
    });
}

// =============================================
// Settings Inputs
// =============================================
['menuRadius', 'deadzone', 'menuOpacity', 'cornerRadius', 'fadeIn', 'fadeOut', 'fadeSteps', 'scaleActive', 'submenuHoldTime'].forEach(id => {
    elements[id].addEventListener('input', () => {
        const mapping = {
            menuRadius: 'radius', menuOpacity: 'opacity', cornerRadius: 'cornerRadius',
            deadzone: 'deadzone', fadeIn: 'fadeIn', fadeOut: 'fadeOut',
            fadeSteps: 'fadeSteps', scaleActive: 'scaleActive', submenuHoldTime: 'submenuHoldTime'
        };
        let val = parseFloat(elements[id].value);
        if (id === 'menuOpacity') val = Math.round(val * 2.55);
        config[mapping[id]] = val;
        if (id === 'submenuHoldTime') {
            elements.submenuHoldTimeRange.value = val;
            updateHoldTimeDisplay(val);
        }
        updateCodePreview();
    });
});

function updateHoldTimeDisplay(ms) {
    elements.holdTimeDisplay.textContent = (ms / 1000).toFixed(1) + ' segundos';
}

elements.submenuHoldTimeRange.addEventListener('input', () => {
    const val = parseInt(elements.submenuHoldTimeRange.value);
    elements.submenuHoldTime.value = val;
    config.submenuHoldTime = val;
    updateHoldTimeDisplay(val);
    updateCodePreview();
});

// =============================================
// Sector Count Selector
// =============================================
elements.sectorCountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const count = parseInt(btn.dataset.count);
        const menu = menus[currentMenu];
        menu.sectorCount = count;

        elements.sectorCountBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        selectedSector = null;
        renderRadialPreview();
        updateSectorDisplay();
        showEmptyEditor();
        updateCodePreview();
        updateVisualPreview();
    });
});

function syncSectorCountBtns() {
    const count = menus[currentMenu].sectorCount;
    elements.sectorCountBtns.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.count) === count);
    });
}

// =============================================
// Radial Preview (main)
// =============================================
const PREVIEW_SIZE = 300;
const PREVIEW_CX = PREVIEW_SIZE / 2;
const PREVIEW_CY = PREVIEW_SIZE / 2;
const PREVIEW_R = 110;

function renderRadialPreview() {
    const menu = menus[currentMenu];
    const dirs = getDirections(menu.sectorCount);

    // Remove existing dynamic sectors
    elements.radialPreview.querySelectorAll('.radial-sector').forEach(el => el.remove());

    // Update SVG lines
    const svg = elements.radialLines;
    const step = 360 / dirs.length;
    let svgContent = `<circle cx="${PREVIEW_CX}" cy="${PREVIEW_CY}" r="${PREVIEW_R - 2}" fill="none" stroke="var(--border)" stroke-width="1.5"/>`;
    svgContent += `<circle cx="${PREVIEW_CX}" cy="${PREVIEW_CY}" r="42" fill="none" stroke="var(--border)" stroke-width="1" stroke-dasharray="4 4"/>`;
    for (let i = 0; i < dirs.length; i++) {
        const a = ((90 + step / 2 + i * step) * Math.PI / 180);
        const x1 = (PREVIEW_CX + 42 * Math.cos(a)).toFixed(1);
        const y1 = (PREVIEW_CY - 42 * Math.sin(a)).toFixed(1);
        const x2 = (PREVIEW_CX + (PREVIEW_R - 2) * Math.cos(a)).toFixed(1);
        const y2 = (PREVIEW_CY - (PREVIEW_R - 2) * Math.sin(a)).toFixed(1);
        svgContent += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--border)" stroke-width="1"/>`;
    }
    svg.innerHTML = svgContent;

    // Create sector elements
    dirs.forEach(dir => {
        const rad = dir.angle * Math.PI / 180;
        const px = PREVIEW_CX + PREVIEW_R * 0.68 * Math.cos(rad);
        const py = PREVIEW_CY - PREVIEW_R * 0.68 * Math.sin(rad);

        const div = document.createElement('div');
        div.className = 'radial-sector';
        div.dataset.direction = dir.id;
        div.style.left = px.toFixed(1) + 'px';
        div.style.top = py.toFixed(1) + 'px';

        const sector = menu.sectors[dir.id];
        div.textContent = sector.label || dir.label;

        div.addEventListener('click', () => {
            selectedSector = dir.id;
            updateSectorDisplay();
            showSectorEditor(dir.id);
        });

        elements.radialPreview.appendChild(div);
    });

    updateSectorDisplay();
}

function updateSectorDisplay() {
    const menu = menus[currentMenu];
    const dirs = getDirections(menu.sectorCount);

    elements.radialPreview.querySelectorAll('.radial-sector').forEach(el => {
        const dirId = el.dataset.direction;
        const dir = dirs.find(d => d.id === dirId);
        if (!dir) return;
        const sector = menu.sectors[dirId];
        el.textContent = sector.label || dir.label;
        el.classList.remove('has-action', 'active', 'is-submenu');
        if (sector.action) el.classList.add('has-action');
        if (sector.actionType === 'submenu') el.classList.add('is-submenu');
        if (selectedSector === dirId) el.classList.add('active');
    });

    // Update breadcrumb
    if (currentMenu === 'main') {
        elements.menuPath.innerHTML = '<span class="menu-path-item current" data-menu="main">Menu Principal</span>';
    } else {
        elements.menuPath.innerHTML = `
            <span class="menu-path-item" data-menu="main">Menu Principal</span>
            <span class="menu-path-sep"><i class="fas fa-chevron-right" style="font-size:0.6rem;"></i></span>
            <span class="menu-path-item current" data-menu="${currentMenu}">${menus[currentMenu].name}</span>`;
    }

    document.querySelectorAll('.menu-path-item').forEach(item => {
        item.addEventListener('click', () => {
            currentMenu = item.dataset.menu;
            selectedSector = null;
            syncSectorCountBtns();
            renderRadialPreview();
            showEmptyEditor();
        });
    });
}

function showEmptyEditor() {
    elements.editorTitle.textContent = 'Editar Setor';
    elements.sectorEditor.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-hand-pointer"></i>
            <p>Clique em um setor no menu para editar</p>
        </div>`;
}

function showSectorEditor(directionId) {
    const menu = menus[currentMenu];
    const dirs = getDirections(menu.sectorCount);
    const dir = dirs.find(d => d.id === directionId);
    if (!dir) return;
    const sector = menu.sectors[directionId];

    elements.editorTitle.textContent = `Setor: ${DIR_ARROWS[directionId]} ${dir.label}`;

    const submenuOptions = Object.keys(menus)
        .filter(id => id !== currentMenu)
        .map(id => `<option value="submenu:${id}" ${sector.action === 'submenu:' + id ? 'selected' : ''}>${menus[id].name}</option>`)
        .join('');

    elements.sectorEditor.innerHTML = `
        <div class="form-group">
            <label class="form-label"><i class="fas fa-tag"></i> Rótulo (texto exibido)</label>
            <input type="text" class="form-input" id="sectorLabel" value="${sector.label || ''}" placeholder="Ex: WIN + TAB">
        </div>
        <div class="form-group" style="margin-top:1rem;">
            <label class="form-label"><i class="fas fa-bolt"></i> Tipo de Ação</label>
            <select class="form-select" id="actionType">
                <option value="hotkey" ${sector.actionType === 'hotkey' ? 'selected' : ''}>Atalho de Teclado</option>
                <option value="submenu" ${sector.actionType === 'submenu' ? 'selected' : ''}>Abrir Submenu</option>
                <option value="custom" ${sector.actionType === 'custom' ? 'selected' : ''}>Código Personalizado</option>
            </select>
        </div>
        <div id="actionConfig" style="margin-top:1rem;"></div>
        <div style="margin-top:1.5rem; display:flex; gap:0.75rem;">
            <button class="btn btn-primary" id="saveSector" style="flex:1;">
                <i class="fas fa-check"></i> Salvar
            </button>
            <button class="btn btn-ghost" id="clearSector">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;

    const actionTypeSelect = document.getElementById('actionType');
    const actionConfig = document.getElementById('actionConfig');

    function updateActionConfig() {
        const type = actionTypeSelect.value;
        if (type === 'hotkey') {
            const existingKeys = parseHotkeyToKeys(sector.action);
            actionConfig.innerHTML = `
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-keyboard"></i> Construtor de Atalhos</label>
                    <p style="font-size:0.7rem; color:var(--text-muted); margin-bottom:0.75rem;">Clique nas teclas para montar a combinação.</p>
                    <div id="selectedKeys" style="min-height:44px; padding:0.5rem; background:var(--bg-tertiary); border:2px dashed var(--border); border-radius:10px; display:flex; flex-wrap:wrap; gap:0.5rem; align-items:center; margin-bottom:1rem;">
                        <span id="emptyKeysHint" style="color:var(--text-muted); font-size:0.8rem; ${existingKeys.length > 0 ? 'display:none;' : ''}">Clique nas teclas para adicionar...</span>
                    </div>
                    <div style="margin-bottom:0.75rem;">
                        <label class="form-label" style="font-size:0.7rem; margin-bottom:0.5rem;">Modificadores</label>
                        <div class="quick-keys">
                            <button class="quick-key key-modifier" data-key="Ctrl" data-ahk="^">Ctrl</button>
                            <button class="quick-key key-modifier" data-key="Shift" data-ahk="+">Shift</button>
                            <button class="quick-key key-modifier" data-key="Alt" data-ahk="!">Alt</button>
                            <button class="quick-key key-modifier" data-key="Win" data-ahk="#">Win</button>
                        </div>
                    </div>
                    <div style="margin-bottom:0.75rem;">
                        <label class="form-label" style="font-size:0.7rem; margin-bottom:0.5rem;">Teclas de Função</label>
                        <div class="quick-keys">
                            ${[1,2,3,4,5,6,7,8,9,10,11,12].map(n => `<button class="quick-key key-function" data-key="F${n}" data-ahk="{F${n}}">F${n}</button>`).join('')}
                        </div>
                    </div>
                    <div style="margin-bottom:0.75rem;">
                        <label class="form-label" style="font-size:0.7rem; margin-bottom:0.5rem;">Navegação</label>
                        <div class="quick-keys">
                            <button class="quick-key key-nav" data-key="←" data-ahk="{Left}">←</button>
                            <button class="quick-key key-nav" data-key="→" data-ahk="{Right}">→</button>
                            <button class="quick-key key-nav" data-key="↑" data-ahk="{Up}">↑</button>
                            <button class="quick-key key-nav" data-key="↓" data-ahk="{Down}">↓</button>
                            <button class="quick-key key-nav" data-key="Tab" data-ahk="{Tab}">Tab</button>
                            <button class="quick-key key-nav" data-key="Enter" data-ahk="{Enter}">Enter</button>
                            <button class="quick-key key-nav" data-key="Esc" data-ahk="{Escape}">Esc</button>
                            <button class="quick-key key-nav" data-key="Space" data-ahk="{Space}">Space</button>
                            <button class="quick-key key-nav" data-key="⌫" data-ahk="{Backspace}">⌫</button>
                            <button class="quick-key key-nav" data-key="Del" data-ahk="{Delete}">Del</button>
                            <button class="quick-key key-nav" data-key="Home" data-ahk="{Home}">Home</button>
                            <button class="quick-key key-nav" data-key="End" data-ahk="{End}">End</button>
                            <button class="quick-key key-nav" data-key="PgUp" data-ahk="{PgUp}">PgUp</button>
                            <button class="quick-key key-nav" data-key="PgDn" data-ahk="{PgDn}">PgDn</button>
                        </div>
                    </div>
                    <div style="margin-bottom:0.75rem;">
                        <label class="form-label" style="font-size:0.7rem; margin-bottom:0.5rem;">Letras</label>
                        <div class="quick-keys">
                            ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => `<button class="quick-key key-letter" data-key="${l}" data-ahk="${l.toLowerCase()}">${l}</button>`).join('')}
                        </div>
                    </div>
                    <div style="margin-bottom:0.75rem;">
                        <label class="form-label" style="font-size:0.7rem; margin-bottom:0.5rem;">Números</label>
                        <div class="quick-keys">
                            ${'0123456789'.split('').map(n => `<button class="quick-key key-number" data-key="${n}" data-ahk="${n}">${n}</button>`).join('')}
                        </div>
                    </div>
                    <div style="display:flex; gap:0.5rem; margin-top:1rem;">
                        <button class="btn btn-map" id="captureHotkeyBtn" style="flex:1;"><i class="fas fa-crosshairs"></i> Mapear Tecla</button>
                        <button class="btn btn-ghost" id="clearAllKeys" style="flex:1;"><i class="fas fa-trash"></i> Limpar</button>
                    </div>
                    <div style="margin-top:1rem; padding:0.75rem; background:#0d1117; border-radius:8px;">
                        <label class="form-label" style="font-size:0.65rem; color:#8b949e; margin-bottom:0.5rem;"><i class="fas fa-code"></i> Código AHK Gerado</label>
                        <input type="text" class="form-input" id="ahkCodeOutput" value="${sector.action || ''}" placeholder='Send "^s"' style="font-family:'JetBrains Mono',monospace; font-size:0.8rem; background:#161b22; border-color:#30363d; color:#c9d1d9;">
                    </div>
                </div>`;
            setupHotkeyBuilder(existingKeys);
        } else if (type === 'submenu') {
            actionConfig.innerHTML = `
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-layer-group"></i> Selecionar Submenu</label>
                    <select class="form-select" id="submenuSelect">
                        <option value="">-- Escolha um submenu --</option>
                        ${submenuOptions}
                    </select>
                </div>`;
        } else {
            actionConfig.innerHTML = `
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-code"></i> Código AHK</label>
                    <textarea class="form-input" id="customCode" rows="4" placeholder='Ex: Run "notepad.exe"' style="font-family:'JetBrains Mono',monospace; resize:vertical;">${sector.actionType === 'custom' ? sector.action : ''}</textarea>
                </div>`;
        }
    }

    actionTypeSelect.addEventListener('change', updateActionConfig);
    updateActionConfig();

    document.getElementById('saveSector').addEventListener('click', () => {
        const label = document.getElementById('sectorLabel').value;
        const type = actionTypeSelect.value;
        let action = '';
        if (type === 'hotkey') action = document.getElementById('ahkCodeOutput').value;
        else if (type === 'submenu') action = document.getElementById('submenuSelect').value;
        else action = document.getElementById('customCode').value;

        menu.sectors[directionId] = { label, action, actionType: type };
        updateSectorDisplay();
        updateSubmenuList();
        updateCodePreview();
        showToast('Setor salvo!');
    });

    document.getElementById('clearSector').addEventListener('click', () => {
        menu.sectors[directionId] = emptySector();
        updateSectorDisplay();
        updateCodePreview();
        showSectorEditor(directionId);
        showToast('Setor limpo!', 'warning');
    });
}

function parseHotkeyToKeys(action) {
    if (!action || action.startsWith('submenu:')) return [];
    const match = action.match(/Send\s+"([^"]+)"/);
    if (!match) return [];
    const ahk = match[1];
    const keys = [];
    if (ahk.includes('^')) keys.push({ key: 'Ctrl', ahk: '^', type: 'modifier' });
    if (ahk.includes('+') && !ahk.includes('{+}')) keys.push({ key: 'Shift', ahk: '+', type: 'modifier' });
    if (ahk.includes('!')) keys.push({ key: 'Alt', ahk: '!', type: 'modifier' });
    if (ahk.includes('#')) keys.push({ key: 'Win', ahk: '#', type: 'modifier' });
    const braceMatches = ahk.match(/\{[^}]+\}/g) || [];
    braceMatches.forEach(m => {
        const keyName = m.replace(/[{}]/g, '');
        const displayMap = { 'Left':'←','Right':'→','Up':'↑','Down':'↓','Tab':'Tab','Enter':'Enter','Escape':'Esc','Space':'Space','Backspace':'⌫','Delete':'Del','Home':'Home','End':'End','PgUp':'PgUp','PgDn':'PgDn','PrintScreen':'PrtSc','Insert':'Ins','Pause':'Pause' };
        keys.push({ key: displayMap[keyName] || keyName, ahk: m, type: 'special' });
    });
    let remaining = ahk.replace(/[\^!#+]/g, '').replace(/\{[^}]+\}/g, '');
    remaining.split('').forEach(char => { if (char.trim()) keys.push({ key: char.toUpperCase(), ahk: char, type: 'letter' }); });
    return keys;
}

function setupHotkeyBuilder(existingKeys = []) {
    const selectedKeysContainer = document.getElementById('selectedKeys');
    const emptyHint = document.getElementById('emptyKeysHint');
    const ahkOutput = document.getElementById('ahkCodeOutput');
    let selectedKeys = [...existingKeys];

    function updateDisplay() {
        selectedKeysContainer.querySelectorAll('.key-chip, .key-plus').forEach(el => el.remove());
        if (selectedKeys.length === 0) {
            emptyHint.style.display = '';
        } else {
            emptyHint.style.display = 'none';
            selectedKeys.forEach((keyData, index) => {
                const chip = document.createElement('span');
                chip.className = 'key-chip';
                chip.style.cssText = 'display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.625rem;background:var(--accent);color:white;border-radius:6px;font-size:0.75rem;font-weight:600;font-family:"JetBrains Mono",monospace;';
                chip.innerHTML = `${keyData.key}<button class="remove-key" data-index="${index}" style="background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer;padding:0;font-size:0.875rem;">&times;</button>`;
                selectedKeysContainer.appendChild(chip);
            });
            selectedKeysContainer.querySelectorAll('.key-chip').forEach((chip, i, arr) => {
                if (i < arr.length - 1) {
                    const plus = document.createElement('span');
                    plus.className = 'key-plus';
                    plus.style.cssText = 'color:var(--text-muted);font-weight:bold;';
                    plus.textContent = '+';
                    chip.after(plus);
                }
            });
        }
        updateAHKOutput();
        selectedKeysContainer.querySelectorAll('.remove-key').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                selectedKeys.splice(parseInt(btn.dataset.index), 1);
                updateDisplay();
            });
        });
    }

    function updateAHKOutput() {
        if (selectedKeys.length === 0) { ahkOutput.value = ''; return; }
        const modifiers = selectedKeys.filter(k => k.type === 'modifier').map(k => k.ahk).join('');
        const others = selectedKeys.filter(k => k.type !== 'modifier').map(k => k.ahk).join('');
        ahkOutput.value = `Send "${modifiers}${others}"`;
    }

    document.querySelectorAll('#actionConfig .quick-key').forEach(btn => {
        btn.addEventListener('click', () => {
            const keyData = {
                key: btn.dataset.key, ahk: btn.dataset.ahk,
                type: btn.classList.contains('key-modifier') ? 'modifier' :
                      btn.classList.contains('key-function') ? 'function' :
                      btn.classList.contains('key-nav') ? 'nav' :
                      btn.classList.contains('key-letter') ? 'letter' : 'symbol'
            };
            if (keyData.type === 'modifier') {
                const idx = selectedKeys.findIndex(k => k.key === keyData.key);
                if (idx >= 0) selectedKeys.splice(idx, 1);
                else {
                    const firstNonMod = selectedKeys.findIndex(k => k.type !== 'modifier');
                    if (firstNonMod >= 0) selectedKeys.splice(firstNonMod, 0, keyData);
                    else selectedKeys.push(keyData);
                }
            } else {
                selectedKeys.push(keyData);
            }
            updateDisplay();
        });
    });

    document.getElementById('clearAllKeys').addEventListener('click', () => { selectedKeys = []; updateDisplay(); });

    const captureBtn = document.getElementById('captureHotkeyBtn');
    if (captureBtn) {
        captureBtn.addEventListener('click', () => {
            openCaptureModal('hotkey', (result) => {
                selectedKeys = [];
                const modMap = { 'Ctrl':{key:'Ctrl',ahk:'^',type:'modifier'}, 'Shift':{key:'Shift',ahk:'+',type:'modifier'}, 'Alt':{key:'Alt',ahk:'!',type:'modifier'}, 'Win':{key:'Win',ahk:'#',type:'modifier'} };
                result.modifiers.forEach(mod => { if (modMap[mod]) selectedKeys.push(modMap[mod]); });
                if (result.key) {
                    selectedKeys.push({ key: getKeyDisplayName(result.key), ahk: result.isMouseButton ? result.ahkCode : getAHKKey(result.key), type: 'captured' });
                }
                updateDisplay();
                showToast('Teclas capturadas!');
            });
        });
    }

    updateDisplay();
}

// =============================================
// Submenu Management
// =============================================
function updateSubmenuList() {
    const submenus = Object.keys(menus).filter(id => id !== 'main');
    if (submenus.length === 0) {
        elements.submenuList.innerHTML = `<div class="empty-state"><i class="fas fa-layer-group"></i><p>Nenhum submenu criado</p></div>`;
        return;
    }
    elements.submenuList.innerHTML = submenus.map(id => {
        const menu = menus[id];
        const dirs = getDirections(menu.sectorCount);
        const active = dirs.filter(d => menu.sectors[d.id] && menu.sectors[d.id].action).length;
        return `
            <div class="menu-item" data-id="${id}">
                <div class="menu-item-info">
                    <div class="menu-item-icon"><i class="fas fa-folder"></i></div>
                    <div class="menu-item-text">
                        <h4>${menu.name}</h4>
                        <span>${menu.sectorCount} setores · ${active} ações</span>
                    </div>
                </div>
                <div class="menu-item-actions">
                    <button class="menu-item-btn edit-submenu" data-id="${id}"><i class="fas fa-pen"></i></button>
                    <button class="menu-item-btn enter-submenu" data-id="${id}"><i class="fas fa-arrow-right"></i></button>
                    <button class="menu-item-btn danger delete-submenu" data-id="${id}"><i class="fas fa-trash"></i></button>
                </div>
            </div>`;
    }).join('');

    document.querySelectorAll('.enter-submenu').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentMenu = btn.dataset.id;
            selectedSector = null;
            syncSectorCountBtns();
            renderRadialPreview();
            showEmptyEditor();
        });
    });

    document.querySelectorAll('.edit-submenu').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            editingSubmenuId = btn.dataset.id;
            const menu = menus[editingSubmenuId];
            elements.submenuModalTitle.textContent = 'Editar Submenu';
            elements.submenuName.value = menu.name;
            elements.submenuId.value = menu.id;
            elements.submenuId.disabled = true;
            elements.submenuModal.classList.add('active');
        });
    });

    document.querySelectorAll('.delete-submenu').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            let inUse = false;
            Object.values(menus).forEach(menu => Object.values(menu.sectors).forEach(sector => { if (sector.action === 'submenu:' + id) inUse = true; }));
            if (inUse) { showToast('Submenu em uso! Remova as referências.', 'error'); return; }
            delete menus[id];
            if (currentMenu === id) currentMenu = 'main';
            updateSubmenuList();
            syncSectorCountBtns();
            renderRadialPreview();
            updateCodePreview();
            showToast('Submenu removido!', 'warning');
        });
    });

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            currentMenu = item.dataset.id;
            selectedSector = null;
            syncSectorCountBtns();
            renderRadialPreview();
            showEmptyEditor();
        });
    });
}

elements.addSubmenuBtn.addEventListener('click', () => {
    editingSubmenuId = null;
    elements.submenuModalTitle.textContent = 'Novo Submenu';
    elements.submenuName.value = '';
    elements.submenuId.value = '';
    elements.submenuId.disabled = false;
    elements.submenuModal.classList.add('active');
});

elements.closeSubmenuModal.addEventListener('click', () => elements.submenuModal.classList.remove('active'));
elements.cancelSubmenu.addEventListener('click', () => elements.submenuModal.classList.remove('active'));

elements.saveSubmenu.addEventListener('click', () => {
    const name = elements.submenuName.value.trim();
    let id = elements.submenuId.value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!name) { showToast('Digite um nome', 'error'); return; }
    if (!id) id = name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 10);

    if (editingSubmenuId) {
        menus[editingSubmenuId].name = name;
    } else {
        if (menus[id]) { showToast('ID já existe', 'error'); return; }
        menus[id] = { id, name, sectorCount: 4, sectors: emptyAllSectors() };
    }
    elements.submenuModal.classList.remove('active');
    updateSubmenuList();
    updateCodePreview();
    showToast(editingSubmenuId ? 'Submenu atualizado!' : 'Submenu criado!');
});

// =============================================
// Reset
// =============================================
elements.resetBtn.addEventListener('click', () => elements.resetModal.classList.add('active'));
elements.closeResetModal.addEventListener('click', () => elements.resetModal.classList.remove('active'));
elements.cancelReset.addEventListener('click', () => elements.resetModal.classList.remove('active'));

elements.confirmReset.addEventListener('click', () => {
    config = JSON.parse(JSON.stringify(defaultConfig));
    menus = JSON.parse(JSON.stringify(defaultMenus));
    currentMenu = 'main';
    selectedSector = null;

    elements.menuRadius.value = defaultConfig.radius;
    elements.deadzone.value = defaultConfig.deadzone;
    elements.menuOpacity.value = 92;
    elements.cornerRadius.value = defaultConfig.cornerRadius;
    elements.fadeIn.value = defaultConfig.fadeIn;
    elements.fadeOut.value = defaultConfig.fadeOut;
    elements.fadeSteps.value = defaultConfig.fadeSteps;
    elements.scaleActive.value = defaultConfig.scaleActive;
    elements.submenuHoldTime.value = defaultConfig.submenuHoldTime;
    elements.submenuHoldTimeRange.value = defaultConfig.submenuHoldTime;
    updateHoldTimeDisplay(defaultConfig.submenuHoldTime);
    elements.bgColor.value = '#' + defaultConfig.colors.bg;
    elements.bgColorText.value = defaultConfig.colors.bg;
    elements.itemColor.value = '#' + defaultConfig.colors.item;
    elements.itemColorText.value = defaultConfig.colors.item;
    elements.accentColor.value = '#' + defaultConfig.colors.itemActive;
    elements.accentColorText.value = defaultConfig.colors.itemActive;
    elements.textColor.value = '#' + defaultConfig.colors.text;
    elements.textColorText.value = defaultConfig.colors.text;
    elements.highlightToggleSwitch.classList.add('active');

    document.querySelectorAll('.trigger-option').forEach(o => {
        o.classList.toggle('selected', o.dataset.value === 'MButton');
        o.querySelector('input').checked = o.dataset.value === 'MButton';
    });
    elements.currentTriggerDisplay.textContent = 'MButton';

    syncSectorCountBtns();
    renderRadialPreview();
    updateSubmenuList();
    updateCodePreview();
    updateVisualPreview();
    showEmptyEditor();
    elements.resetModal.classList.remove('active');
    showToast('Configurações resetadas!', 'warning');
});

// =============================================
// Code Generation
// =============================================
function generateAHKConditions(dirs) {
    const lines = [];
    let wrapsDir = dirs.find(d => d.wraps);
    let normalDirs = dirs.filter(d => !d.wraps);

    normalDirs.forEach((dir, i) => {
        const kw = i === 0 && !wrapsDir ? 'if' : (i === 0 ? 'if' : 'else if');
        // For last normal dir with no wraps, use else? Only if there's no wraps dir.
        if (!wrapsDir && i === normalDirs.length - 1) {
            lines.push(`        } else {                                          ; ${dir.label}\n            action := "${dir.ahkId}"\n            info.Text := "${dir.label}"`);
        } else {
            const cond = `theta >= ${dir.minA} && theta < ${dir.maxA}`;
            lines.push(`        } ${i === 0 ? 'if' : 'else if'} (${cond}) {          ; ${dir.label}\n            action := "${dir.ahkId}"\n            info.Text := "${dir.label}"`);
        }
    });

    if (wrapsDir) {
        lines.push(`        } else if (theta >= ${wrapsDir.minA} || theta < ${wrapsDir.maxA}) { ; ${wrapsDir.label}\n            action := "${wrapsDir.ahkId}"\n            info.Text := "${wrapsDir.label}"`);
        // Last dir without wraps that wasn't included yet
        const lastNorm = normalDirs[normalDirs.length - 1];
        if (lastNorm && lines.filter(l => l.includes(lastNorm.ahkId)).length > 0) {
            // already added
        }
    }

    return lines.join('\n') + '\n        }';
}

function generateHighlightCalls(dirs, menuObj) {
    const lines = [];
    const ctrlListStr = dirs.map(d => `${d.id}Ctrl`).join(', ');
    dirs.forEach((dir, i) => {
        const sector = menuObj.sectors[dir.id];
        const sLabel = (sector && sector.label) ? sector.label : dir.label;
        const kw = i === 0 ? 'if' : 'else if';
        let cond;
        if (dir.wraps) cond = `action = "${dir.ahkId}"`;
        else cond = `action = "${dir.ahkId}"`;
        lines.push(`        ${kw} (action = "${dir.ahkId}") {\n            info.Text := "${sLabel}"\n            lastSel := HighlightSector("${dir.ahkId}", [${ctrlListStr}], lastSel)\n        }`);
    });
    return lines.join(' else ');
}

function sectorPositions(sectorCount, radius) {
    const dirs = getDirections(sectorCount);
    const rSector = Math.round(radius * 0.62);
    const sW = 90, sH = 28;
    return dirs.map(dir => {
        const rad = dir.angle * Math.PI / 180;
        const sx = Math.round(radius + rSector * Math.cos(rad)) - Math.round(sW / 2);
        const sy = Math.round(radius - rSector * Math.sin(rad)) - Math.round(sH / 2);
        return { dir, sx, sy, sW, sH };
    });
}

function generateAHKCode() {
    const c = config;
    const clr = c.colors;
    const mainMenu = menus.main;
    const mainDirs = getDirections(mainMenu.sectorCount);
    const mainPositions = sectorPositions(mainMenu.sectorCount, c.radius);

    const submenuFunctions = Object.keys(menus)
        .filter(id => id !== 'main')
        .map(id => generateSubmenuFunction(id))
        .join('\n\n');

    const getAction = (sector) => {
        if (!sector || !sector.action) return `; Nenhuma ação configurada`;
        if (sector.actionType === 'submenu') {
            const sid = sector.action.replace('submenu:', '');
            return `Show${sid.charAt(0).toUpperCase() + sid.slice(1)}Menu(cx, cy)`;
        }
        return sector.action;
    };

    // Hold timer init for submenu sectors
    const submenuSectors = mainDirs.filter(d => mainMenu.sectors[d.id] && mainMenu.sectors[d.id].actionType === 'submenu');
    const holdInits = submenuSectors.map(d => `holdTime${d.ahkId} := 0`).join('\n    ');
    const holdReset = submenuSectors.map(d => `holdTime${d.ahkId} := 0`).join('\n            ');

    const holdChecks = submenuSectors.map(dir => {
        const sector = mainMenu.sectors[dir.id];
        const sid = sector.action.replace('submenu:', '');
        const fnName = `Show${sid.charAt(0).toUpperCase() + sid.slice(1)}Menu`;
        return `
            ; Hold para abrir submenu: ${sid}
            if (action = "${dir.ahkId}" && lastSel = "${dir.ahkId}") {
                holdTime${dir.ahkId} += 10
                if (holdTime${dir.ahkId} >= ${c.submenuHoldTime}) {
                    FadeTo(menuGui.Hwnd, Config.Alpha, 1, Config.Anim.FadeOutMs, Config.Anim.Steps)
                    FadeTo(shadow.Hwnd, Config.Theme.ShadowAlpha, 1, Config.Anim.FadeOutMs, Config.Anim.Steps)
                    try menuGui.Destroy()
                    try shadow.Gui.Destroy()
                    ${fnName}(cx, cy)
                    return
                }
                progress := Round(holdTime${dir.ahkId} / ${c.submenuHoldTime} * 100)
                info.Text := "${sector.label} (" progress "%)"
            } else {
                holdTime${dir.ahkId} := 0
            }`;
    }).join('\n');

    // Build sector control declarations
    const ctrlDecls = mainPositions.map(p => {
        const sector = mainMenu.sectors[p.dir.id];
        const arrow = DIR_ARROWS[p.dir.id] || '';
        const lbl = (sector && sector.label) ? sector.label : p.dir.label;
        return `    ${p.dir.id}Ctrl := AddSector("${arrow} ${lbl}", ${p.sx}, ${p.sy}, "${p.dir.ahkId}", menuGui)`;
    }).join('\n');

    const ctrlList = mainDirs.map(d => `${d.id}Ctrl`).join(', ');

    // Build direction detection
    const dirDetect = buildDetectionBlock(mainDirs, mainMenu);

    // Build action execution
    const actionExec = mainDirs.map((dir, i) => {
        const sector = mainMenu.sectors[dir.id];
        const kw = i === 0 ? 'if' : 'else if';
        return `    ${kw} (action = "${dir.ahkId}") {\n        ${getAction(sector)}\n    }`;
    }).join(' ');

    // Order map for HighlightSector
    const orderMap = mainDirs.map((d, i) => `"${d.ahkId}", ${i + 1}`).join(', ');

    const size = c.radius * 2;

    return `#Requires AutoHotkey v2.0
#SingleInstance Force
CoordMode("Mouse", "Screen")

; =====================================
; Configurações
; =====================================
global Config := {
    Radius: ${c.radius}
  , Deadzone: ${c.deadzone}
  , Alpha: ${c.opacity}
  , UseHighlight: ${c.useHighlight ? 'true' : 'false'}
  , Font: { Name: "Segoe UI", Size: 10 }
  , Theme: {
        Bg: "${clr.bg}"
      , Item: "${clr.item}"
      , ItemActive: "${clr.itemActive}"
      , Text: "${clr.text}"
      , Hint: "${clr.hint}"
      , Aim: "${clr.aim}"
      , AimActive: "${clr.aimActive}"
      , Shadow: "${clr.shadow}"
      , ShadowAlpha: ${clr.shadowAlpha}
      , AcrylicAlpha: ${clr.acrylicAlpha}
    }
  , Anim: {
        FadeInMs: ${c.fadeIn}
      , FadeOutMs: ${c.fadeOut}
      , Steps: ${c.fadeSteps}
      , ScaleActive: ${c.scaleActive}
    }
  , Shape: {
        CornerRadius: ${c.cornerRadius}
      , ShadowOffset: 8
      , ShadowExpand: 12
    }
}

; Gatilho: ${c.trigger}
${c.trigger}::RadialMenu()

; =====================================
; Radial Menu Principal
; =====================================
RadialMenu() {
    global Config

    MouseGetPos(&cx, &cy)

    size := Config.Radius * 2
    x := cx - Config.Radius
    y := cy - Config.Radius

    shadow := CreateShadowGui(x, y, size, size)

    menuGui := Gui("+AlwaysOnTop -Caption +ToolWindow")
    menuGui.BackColor := Config.Theme.Bg
    menuGui.SetFont("s" Config.Font.Size " c" Config.Theme.Text, Config.Font.Name)
    menuGui.Show("x" x " y" y " w" size " h" size " NA")

    ApplyRoundedCorners(menuGui.Hwnd, Config.Shape.CornerRadius)
    EnableAcrylic(menuGui.Hwnd, Config.Theme.Bg, Config.Theme.AcrylicAlpha)

    WinSetTransparent(1, menuGui.Hwnd)
    WinSetTransparent(1, shadow.Hwnd)
    FadeTo(shadow.Hwnd, 1, Config.Theme.ShadowAlpha, Config.Anim.FadeInMs, Config.Anim.Steps)
    FadeTo(menuGui.Hwnd, 1, Config.Alpha, Config.Anim.FadeInMs, Config.Anim.Steps)

    ; Setores
${ctrlDecls}

    ; Centro
    info := menuGui.Add("Text", "x" (Config.Radius-75) " y" (Config.Radius-12) " w150 Center c" Config.Theme.Hint, "● Escolha")
    aim := menuGui.Add("Text", "x" (Config.Radius-10) " y" (Config.Radius-10) " w20 h20 Center c" Config.Theme.Aim, "●")
    aim.SetFont("s14 Bold", "Segoe UI Symbol")
    rAim := Config.Radius - 24

    action := "", lastSel := "", theta := 0
    ${holdInits}

    while GetKeyState("${c.trigger}", "P") {
        Sleep 10
        MouseGetPos(&mx, &my)
        dx := mx - cx
        dy := -(my - cy)
        dist := Sqrt(dx*dx + dy*dy)

        if (dist < Config.Deadzone) {
            info.Text := "● Escolha"
            lastSel := HighlightSector("", [${ctrlList}], lastSel)
            UpdateArrow(aim, 0, Config.Radius, Config.Radius, 0, false)
            ${holdReset}
            action := ""
            continue
        }

        theta := GetAngle(dx, dy)
        UpdateArrow(aim, theta, Config.Radius, Config.Radius, rAim, true)

${dirDetect}
${holdChecks}
    }

    FadeTo(menuGui.Hwnd, Config.Alpha, 1, Config.Anim.FadeOutMs, Config.Anim.Steps)
    FadeTo(shadow.Hwnd, Config.Theme.ShadowAlpha, 1, Config.Anim.FadeOutMs, Config.Anim.Steps)
    try menuGui.Destroy()
    try shadow.Gui.Destroy()

    if (action = "")
        return

    ${actionExec}
}

${submenuFunctions}

; =====================================
; Funções Visuais
; =====================================
AddSector(text, x, y, id, hostGui) {
    global Config
    ctrl := hostGui.Add("Text"
        , "x" x " y" y " w90 h28 Center Background" Config.Theme.Item " c" Config.Theme.Text " +0x1000"
        , text)
    ctrl.SetFont("s9 Bold", Config.Font.Name)
    ctrl.__ox := x, ctrl.__oy := y, ctrl.__ow := 90, ctrl.__oh := 28
    ctrl.__id := id
    SetRoundRegion(ctrl.Hwnd, 8)
    return ctrl
}

HighlightSector(which, ctrlList, lastSel) {
    global Config
    order := Map(${orderMap})

    for ctrl in ctrlList {
        try ctrl.Opt("Background" . Config.Theme.Item)
        try ctrl.Move(ctrl.__ox, ctrl.__oy, ctrl.__ow, ctrl.__oh)
        try SetRoundRegion(ctrl.Hwnd, 8)
    }

    if (!which || !order.Has(which))
        return ""

    idx := order[which]
    c := ctrlList[idx]
    if (Config.UseHighlight) {
        try c.Opt("Background" . Config.Theme.ItemActive)
        scale := Config.Anim.ScaleActive
        nw := Round(c.__ow * scale)
        nh := Round(c.__oh * scale)
        nx := c.__ox - Round((nw - c.__ow) / 2)
        ny := c.__oy - Round((nh - c.__oh) / 2)
        try c.Move(nx, ny, nw, nh)
        try SetRoundRegion(c.Hwnd, 10)
    }
    return which
}

UpdateArrow(arrowCtrl, theta, cx, cy, r, active := true) {
    global Config
    idx := Mod(Round(theta / 45), 8)
    glyphs := ["→","↗","↑","↖","←","↙","↓","↘"]
    try arrowCtrl.Text := glyphs[idx+1]
    if (active) {
        try arrowCtrl.Opt("c" . Config.Theme.AimActive)
        rad := DegToRad(theta)
        ax := Round(cx - 10 + r * Cos(rad))
        ay := Round(cy - 10 - r * Sin(rad))
        try arrowCtrl.Move(ax, ay, 20, 20)
    } else {
        try arrowCtrl.Opt("c" . Config.Theme.Aim)
        try arrowCtrl.Move(cx - 10, cy - 10, 20, 20)
    }
}

; =====================================
; Sombra & Cantos & Acrylic
; =====================================
CreateShadowGui(x, y, w, h) {
    global Config
    s := Gui("+AlwaysOnTop -Caption +ToolWindow +E0x20")
    s.BackColor := Config.Theme.Shadow
    off := Config.Shape.ShadowOffset
    exp := Config.Shape.ShadowExpand
    s.Show("x" (x - Floor(exp/2) + off) " y" (y - Floor(exp/2) + off) " w" (w + exp) " h" (h + exp) " NA")
    ApplyRoundedCorners(s.Hwnd, Config.Shape.CornerRadius + 6)
    return { Gui: s, Hwnd: s.Hwnd }
}

ApplyRoundedCorners(hwnd, radius := 12) {
    try DllCall("dwmapi\\DwmSetWindowAttribute", "ptr", hwnd, "int", 33, "int*", 2, "int", 4)
    SetRoundRegion(hwnd, radius)
}

SetRoundRegion(hwnd, radius) {
    WinGetPos(&wx, &wy, &ww, &wh, "ahk_id " hwnd)
    rr := DllCall("gdi32\\CreateRoundRectRgn", "int", 0, "int", 0, "int", ww, "int", wh, "int", radius*2, "int", radius*2, "ptr")
    DllCall("user32\\SetWindowRgn", "ptr", hwnd, "ptr", rr, "int", true)
}

EnableAcrylic(hwnd, hexBg := "1A1A2E", alpha := 210) {
    accentSize := 16
    policy := Buffer(accentSize, 0)
    grad := ARGBFromHex(hexBg, alpha)
    NumPut("Int", 4, policy, 0)
    NumPut("Int", 0, policy, 4)
    NumPut("Int", grad, policy, 8)
    NumPut("Int", 0, policy, 12)
    data := Buffer(24, 0)
    NumPut("Int", 19, data, 0)
    NumPut("Ptr", policy.Ptr, data, 8)
    NumPut("Int", accentSize, data, 16)
    ok := 0
    try ok := DllCall("user32\\SetWindowCompositionAttribute", "ptr", hwnd, "ptr", data, "int")
    if (!ok) {
        NumPut("Int", 3, policy, 0)
        try DllCall("user32\\SetWindowCompositionAttribute", "ptr", hwnd, "ptr", data, "int")
    }
}

ARGBFromHex(hex, alpha := 210) {
    if (SubStr(hex, 1, 1) = "#") hex := SubStr(hex, 2)
    if (StrLen(hex) != 6) hex := "1A1A2E"
    r := "0x" . SubStr(hex, 1, 2)
    g := "0x" . SubStr(hex, 3, 2)
    b := "0x" . SubStr(hex, 5, 2)
    a := alpha & 0xFF
    return (a << 24) | (Integer(r) << 16) | (Integer(g) << 8) | Integer(b)
}

; =====================================
; Animação
; =====================================
FadeTo(hwnd, fromAlpha, toAlpha, durationMs := 120, steps := 12) {
    if (steps < 1) steps := 1
    stepTime := Max(10, Round(durationMs / steps))
    diff := toAlpha - fromAlpha
    Loop steps {
        t := A_Index / steps
        eased := 1 - (1 - t) * (1 - t)
        WinSetTransparent(Round(fromAlpha + diff * eased), "ahk_id " hwnd)
        Sleep stepTime
    }
    WinSetTransparent(toAlpha, "ahk_id " hwnd)
}

; =====================================
; Matemática
; =====================================
GetAngle(dx, dy) {
    return Mod(ATan2(dy, dx) * 180 / 3.1415926535 + 360, 360)
}
DegToRad(deg) {
    return deg * 3.1415926535 / 180
}
ATan2(y, x) {
    return DllCall("msvcrt\\atan2", "Double", y, "Double", x, "Cdecl Double")
}
`;
}

function buildDetectionBlock(dirs, menuObj) {
    const ctrlListStr = dirs.map(d => `${d.id}Ctrl`).join(', ');
    const wrapsDir = dirs.find(d => d.wraps);
    const normalDirs = dirs.filter(d => !d.wraps);
    let out = '';

    normalDirs.forEach((dir, i) => {
        const sector = menuObj.sectors[dir.id];
        const sLabel = (sector && sector.label) ? sector.label : dir.label;
        if (!wrapsDir && i === normalDirs.length - 1) {
            out += `        } else {                                     ; ${dir.label}\n`;
        } else {
            const prefix = i === 0 ? '        if' : '        } else if';
            out += `${prefix} (theta >= ${dir.minA} && theta < ${dir.maxA}) {   ; ${dir.label}\n`;
        }
        out += `            action := "${dir.ahkId}"\n`;
        out += `            info.Text := "${sLabel}"\n`;
        out += `            lastSel := HighlightSector("${dir.ahkId}", [${ctrlListStr}], lastSel)\n`;
    });

    if (wrapsDir) {
        const sector = menuObj.sectors[wrapsDir.id];
        const sLabel = (sector && sector.label) ? sector.label : wrapsDir.label;
        out += `        } else if (theta >= ${wrapsDir.minA} || theta < ${wrapsDir.maxA}) { ; ${wrapsDir.label}\n`;
        out += `            action := "${wrapsDir.ahkId}"\n`;
        out += `            info.Text := "${sLabel}"\n`;
        out += `            lastSel := HighlightSector("${wrapsDir.ahkId}", [${ctrlListStr}], lastSel)\n`;
        out += `        } else {\n`;
        out += `            action := ""\n`;
        out += `            lastSel := HighlightSector("", [${ctrlListStr}], lastSel)\n`;
    }

    return out + '        }';
}

function generateSubmenuFunction(menuId) {
    const menu = menus[menuId];
    const dirs = getDirections(menu.sectorCount);
    const positions = sectorPositions(menu.sectorCount, config.radius);
    const funcName = 'Show' + menuId.charAt(0).toUpperCase() + menuId.slice(1) + 'Menu';
    const ctrlList = dirs.map(d => `${d.id}Ctrl`).join(', ');
    const orderMap = dirs.map((d, i) => `"${d.ahkId}", ${i + 1}`).join(', ');

    const getAction = (sector) => {
        if (!sector || !sector.action) return `; Nenhuma ação`;
        if (sector.actionType === 'submenu') {
            const sid = sector.action.replace('submenu:', '');
            return `Show${sid.charAt(0).toUpperCase() + sid.slice(1)}Menu(cx, cy)`;
        }
        return sector.action;
    };

    const ctrlDecls = positions.map(p => {
        const sector = menu.sectors[p.dir.id];
        const arrow = DIR_ARROWS[p.dir.id] || '';
        const lbl = (sector && sector.label) ? sector.label : p.dir.label;
        return `    ${p.dir.id}Ctrl := AddSector("${arrow} ${lbl}", ${p.sx}, ${p.sy}, "${p.dir.ahkId}", g)`;
    }).join('\n');

    const dirDetect = buildDetectionBlock(dirs, menu);

    const actionExec = dirs.map((dir, i) => {
        const sector = menu.sectors[dir.id];
        const kw = i === 0 ? 'if' : 'else if';
        return `    ${kw} (action = "${dir.ahkId}") {\n        ${getAction(sector)}\n    }`;
    }).join(' ');

    return `; =====================================
; ${menu.name} (submenu)
; =====================================
${funcName}(cx, cy) {
    global Config

    size := Config.Radius * 2
    x := cx - Config.Radius
    y := cy - Config.Radius

    shadow := CreateShadowGui(x, y, size, size)

    g := Gui("+AlwaysOnTop -Caption +ToolWindow")
    g.BackColor := Config.Theme.Bg
    g.SetFont("s" Config.Font.Size " c" Config.Theme.Text, Config.Font.Name)
    g.Show("x" x " y" y " w" size " h" size " NA")

    ApplyRoundedCorners(g.Hwnd, Config.Shape.CornerRadius)
    EnableAcrylic(g.Hwnd, Config.Theme.Bg, Config.Theme.AcrylicAlpha)

    WinSetTransparent(1, g.Hwnd)
    WinSetTransparent(1, shadow.Hwnd)
    FadeTo(shadow.Hwnd, 1, Config.Theme.ShadowAlpha, Config.Anim.FadeInMs, Config.Anim.Steps)
    FadeTo(g.Hwnd, 1, Config.Alpha, Config.Anim.FadeInMs, Config.Anim.Steps)

${ctrlDecls}

    info := g.Add("Text", "x" (Config.Radius-75) " y" (Config.Radius-12) " w150 Center c" Config.Theme.Hint, "${menu.name}")
    aim := g.Add("Text", "x" (Config.Radius-10) " y" (Config.Radius-10) " w20 h20 Center c" Config.Theme.Aim, "●")
    aim.SetFont("s14 Bold", "Segoe UI Symbol")
    rAim := Config.Radius - 24

    action := "", lastSel := "", theta := 0

    while GetKeyState("${config.trigger}", "P") {
        Sleep 10
        MouseGetPos(&mx, &my)
        dx := mx - cx
        dy := -(my - cy)
        dist := Sqrt(dx*dx + dy*dy)

        if (dist < Config.Deadzone) {
            info.Text := "${menu.name}"
            lastSel := HighlightSector("", [${ctrlList}], lastSel)
            UpdateArrow(aim, 0, Config.Radius, Config.Radius, 0, false)
            action := ""
            continue
        }

        theta := GetAngle(dx, dy)
        UpdateArrow(aim, theta, Config.Radius, Config.Radius, rAim, true)

${dirDetect}
    }

    FadeTo(g.Hwnd, Config.Alpha, 1, Config.Anim.FadeOutMs, Config.Anim.Steps)
    FadeTo(shadow.Hwnd, Config.Theme.ShadowAlpha, 1, Config.Anim.FadeOutMs, Config.Anim.Steps)
    try g.Destroy()
    try shadow.Gui.Destroy()

    if (action = "")
        return

    ${actionExec}

    ; HighlightSector local order
    HighlightSector(which, ctrlList, lastSel) {
        global Config
        order := Map(${orderMap})
        for ctrl in ctrlList {
            try ctrl.Opt("Background" . Config.Theme.Item)
            try ctrl.Move(ctrl.__ox, ctrl.__oy, ctrl.__ow, ctrl.__oh)
            try SetRoundRegion(ctrl.Hwnd, 8)
        }
        if (!which || !order.Has(which))
            return ""
        idx := order[which]
        c := ctrlList[idx]
        if (Config.UseHighlight) {
            try c.Opt("Background" . Config.Theme.ItemActive)
            scale := Config.Anim.ScaleActive
            nw := Round(c.__ow * scale)
            nh := Round(c.__oh * scale)
            try c.Move(c.__ox - Round((nw-c.__ow)/2), c.__oy - Round((nh-c.__oh)/2), nw, nh)
            try SetRoundRegion(c.Hwnd, 10)
        }
        return which
    }
}`;
}

function updateCodePreview() {
    const code = generateAHKCode();
    let highlighted = code
        .replace(/;(.*)$/gm, '<span class="comment">;$1</span>')
        .replace(/\b(global|if|else|while|Loop|try|return|Send|Gui|Sleep|Run)\b/g, '<span class="keyword">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
        .replace(/(\w+)\(/g, '<span class="function">$1</span>(');
    elements.codePreview.innerHTML = highlighted;
}

elements.copyCodeBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(generateAHKCode());
        showToast('Código copiado!');
    } catch { showToast('Erro ao copiar', 'error'); }
});

elements.generateBtn.addEventListener('click', () => {
    const code = generateAHKCode();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'radial-menu.ahk';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    showToast('Script gerado!');
});

// =============================================
// Initialize
// =============================================
function init() {
    initTheme();
    syncSectorCountBtns();
    renderRadialPreview();
    updateSubmenuList();
    updateCodePreview();
    updateVisualPreview();
}

init();
