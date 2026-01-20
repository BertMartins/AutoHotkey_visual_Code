// =============================================
// State Management
// =============================================
const defaultConfig = {
    trigger: 'MButton',
    radius: 110,
    deadzone: 30,
    opacity: 235,
    cornerRadius: 16,
    fadeIn: 120,
    fadeOut: 120,
    fadeSteps: 12,
    scaleActive: 1.12,
    submenuHoldTime: 1500,
    useHighlight: true,
    colors: {
        bg: '1E1E1E',
        item: '333333',
        itemActive: '1F6FEB',
        text: 'FFFFFF',
        hint: 'BFBFBF',
        aim: 'CCCCCC',
        aimActive: '1F6FEB',
        shadow: '000000',
        shadowAlpha: 120,
        acrylicAlpha: 220
    }
};

const defaultMenus = {
    main: {
        id: 'main',
        name: 'Menu Principal',
        sectors: {
            top: { label: 'WIN + TAB', action: 'Send "#{Tab}"', actionType: 'hotkey' },
            right: { label: 'SNAP DIR', action: 'Send "#{Right}"', actionType: 'hotkey' },
            bottom: { label: 'DEV', action: 'submenu:dev', actionType: 'submenu' },
            left: { label: 'SNAP ESQ', action: 'Send "#{Left}"', actionType: 'hotkey' }
        }
    },
    dev: {
        id: 'dev',
        name: 'Dev Tools',
        sectors: {
            top: { label: 'F5', action: 'Send "{F5}"', actionType: 'hotkey' },
            right: { label: 'CTRL+F12', action: 'Send "^{F12}"', actionType: 'hotkey' },
            bottom: { label: 'OUTLINE', action: 'Send "^+o"', actionType: 'hotkey' },
            left: { label: 'CTRL+F5', action: 'Send "^{F5}"', actionType: 'hotkey' }
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
    sectorTop: document.getElementById('sectorTop'),
    sectorRight: document.getElementById('sectorRight'),
    sectorBottom: document.getElementById('sectorBottom'),
    sectorLeft: document.getElementById('sectorLeft'),
    sectorEditor: document.getElementById('sectorEditor'),
    editorTitle: document.getElementById('editorTitle'),
    submenuList: document.getElementById('submenuList'),
    codePreview: document.getElementById('codePreview'),
    copyCodeBtn: document.getElementById('copyCodeBtn'),
    settingsTabs: document.getElementById('settingsTabs'),
    addSubmenuBtn: document.getElementById('addSubmenuBtn'),

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
    visualPreview: document.getElementById('visualPreview'),
    visualPreviewContainer: document.getElementById('visualPreviewContainer'),
    previewCenter: document.getElementById('previewCenter'),
    previewTop: document.getElementById('previewTop'),
    previewRight: document.getElementById('previewRight'),
    previewBottom: document.getElementById('previewBottom'),
    previewLeft: document.getElementById('previewLeft'),

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

    toastContainer: document.getElementById('toastContainer')
};

// =============================================
// Theme Toggle
// =============================================
function initTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.classList.add('light');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            document.documentElement.classList.remove('light');
            elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.classList.add('light');
            elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
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
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
                <i class="fas ${icons[type]}"></i>
                <span class="toast-message">${message}</span>
            `;

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
        updateCodePreview();
    });
});

// =============================================
// Color Inputs
// =============================================
elements.bgColor.addEventListener('input', () => {
    elements.bgColorText.value = elements.bgColor.value.substring(1).toUpperCase();
    config.colors.bg = elements.bgColorText.value;
    updateCodePreview();
});

elements.bgColorText.addEventListener('input', () => {
    const val = elements.bgColorText.value.replace(/[^0-9A-Fa-f]/g, '').substring(0, 6);
    elements.bgColorText.value = val.toUpperCase();
    if (val.length === 6) {
        elements.bgColor.value = '#' + val;
        config.colors.bg = val;
        updateCodePreview();
    }
});

elements.accentColor.addEventListener('input', () => {
    elements.accentColorText.value = elements.accentColor.value.substring(1).toUpperCase();
    config.colors.itemActive = elements.accentColorText.value;
    config.colors.aimActive = elements.accentColorText.value;
    updateCodePreview();
});

elements.accentColorText.addEventListener('input', () => {
    const val = elements.accentColorText.value.replace(/[^0-9A-Fa-f]/g, '').substring(0, 6);
    elements.accentColorText.value = val.toUpperCase();
    if (val.length === 6) {
        elements.accentColor.value = '#' + val;
        config.colors.itemActive = val;
        config.colors.aimActive = val;
        updateCodePreview();
        updateVisualPreview();
    }
});

// Item Color (setor)
elements.itemColor.addEventListener('input', () => {
    elements.itemColorText.value = elements.itemColor.value.substring(1).toUpperCase();
    config.colors.item = elements.itemColorText.value;
    updateCodePreview();
    updateVisualPreview();
});

elements.itemColorText.addEventListener('input', () => {
    const val = elements.itemColorText.value.replace(/[^0-9A-Fa-f]/g, '').substring(0, 6);
    elements.itemColorText.value = val.toUpperCase();
    if (val.length === 6) {
        elements.itemColor.value = '#' + val;
        config.colors.item = val;
        updateCodePreview();
        updateVisualPreview();
    }
});

// Text Color
elements.textColor.addEventListener('input', () => {
    elements.textColorText.value = elements.textColor.value.substring(1).toUpperCase();
    config.colors.text = elements.textColorText.value;
    updateCodePreview();
    updateVisualPreview();
});

elements.textColorText.addEventListener('input', () => {
    const val = elements.textColorText.value.replace(/[^0-9A-Fa-f]/g, '').substring(0, 6);
    elements.textColorText.value = val.toUpperCase();
    if (val.length === 6) {
        elements.textColor.value = '#' + val;
        config.colors.text = val;
        updateCodePreview();
        updateVisualPreview();
    }
});

// Update bg and accent to also update preview
elements.bgColor.removeEventListener('input', () => { });
elements.bgColor.addEventListener('input', () => {
    elements.bgColorText.value = elements.bgColor.value.substring(1).toUpperCase();
    config.colors.bg = elements.bgColorText.value;
    updateCodePreview();
    updateVisualPreview();
});

// Highlight Toggle
elements.useHighlightToggle.addEventListener('click', () => {
    config.useHighlight = !config.useHighlight;
    elements.highlightToggleSwitch.classList.toggle('active', config.useHighlight);
    updateCodePreview();
    updateVisualPreview();
});

// =============================================
// Visual Preview
// =============================================
function updateVisualPreview() {
    const c = config.colors;

    // Container background
    elements.visualPreviewContainer.style.background = `linear-gradient(135deg, #${c.bg}dd 0%, #${c.bg} 100%)`;

    // Main preview background
    elements.visualPreview.style.background = `#${c.bg}`;
    elements.visualPreview.style.borderRadius = `${config.cornerRadius}px`;
    elements.visualPreview.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3)`;

    // Center
    elements.previewCenter.style.background = `#${c.item}`;
    elements.previewCenter.style.color = `#${c.text}`;

    // Sectors
    const previewSectors = [elements.previewTop, elements.previewRight, elements.previewBottom, elements.previewLeft];
    previewSectors.forEach(sector => {
        sector.style.background = `#${c.item}`;
        sector.style.color = `#${c.text}`;
    });
}

// Preview sector hover effect
document.querySelectorAll('.preview-sector').forEach(sector => {
    sector.addEventListener('mouseenter', () => {
        if (config.useHighlight) {
            sector.style.background = `#${config.colors.itemActive}`;
            sector.style.transform = sector.dataset.sector === 'top' || sector.dataset.sector === 'bottom'
                ? `translateX(-50%) scale(${config.scaleActive})`
                : `translateY(-50%) scale(${config.scaleActive})`;
        }
    });

    sector.addEventListener('mouseleave', () => {
        sector.style.background = `#${config.colors.item}`;
        sector.style.transform = sector.dataset.sector === 'top' || sector.dataset.sector === 'bottom'
            ? 'translateX(-50%)'
            : 'translateY(-50%)';
    });
});

// =============================================
// Settings Inputs
// =============================================
['menuRadius', 'deadzone', 'menuOpacity', 'cornerRadius', 'fadeIn', 'fadeOut', 'fadeSteps', 'scaleActive', 'submenuHoldTime'].forEach(id => {
    elements[id].addEventListener('input', () => {
        const mapping = {
            menuRadius: 'radius',
            menuOpacity: 'opacity',
            cornerRadius: 'cornerRadius',
            deadzone: 'deadzone',
            fadeIn: 'fadeIn',
            fadeOut: 'fadeOut',
            fadeSteps: 'fadeSteps',
            scaleActive: 'scaleActive',
            submenuHoldTime: 'submenuHoldTime'
        };

        let val = parseFloat(elements[id].value);
        if (id === 'menuOpacity') {
            val = Math.round(val * 2.55); // Convert 0-100 to 0-255
        }
        config[mapping[id]] = val;

        // Sync submenu hold time slider and display
        if (id === 'submenuHoldTime') {
            elements.submenuHoldTimeRange.value = val;
            updateHoldTimeDisplay(val);
        }

        // Update visual preview for visual settings
        if (['cornerRadius', 'scaleActive'].includes(id)) {
            updateVisualPreview();
        }

        updateCodePreview();
    });
});

// Submenu hold time range slider sync
function updateHoldTimeDisplay(ms) {
    const seconds = (ms / 1000).toFixed(1);
    elements.holdTimeDisplay.textContent = seconds + ' segundos';
}

elements.submenuHoldTimeRange.addEventListener('input', () => {
    const val = parseInt(elements.submenuHoldTimeRange.value);
    elements.submenuHoldTime.value = val;
    config.submenuHoldTime = val;
    updateHoldTimeDisplay(val);
    updateCodePreview();
});

// =============================================
// Sector Selection & Editing
// =============================================
function updateSectorDisplay() {
    const menu = menus[currentMenu];
    const sectors = {
        top: elements.sectorTop,
        right: elements.sectorRight,
        bottom: elements.sectorBottom,
        left: elements.sectorLeft
    };

    Object.keys(sectors).forEach(dir => {
        const sector = sectors[dir];
        const data = menu.sectors[dir];

        sector.textContent = data.label || dir.toUpperCase();
        sector.classList.toggle('has-action', !!data.action);
        sector.classList.toggle('active', selectedSector === dir);
    });

    // Update path
    if (currentMenu === 'main') {
        elements.menuPath.innerHTML = '<span class="menu-path-item current" data-menu="main">Menu Principal</span>';
    } else {
        elements.menuPath.innerHTML = `
                    <span class="menu-path-item" data-menu="main">Menu Principal</span>
                    <span class="menu-path-sep"><i class="fas fa-chevron-right" style="font-size: 0.6rem;"></i></span>
                    <span class="menu-path-item current" data-menu="${currentMenu}">${menus[currentMenu].name}</span>
                `;
    }

    // Add click handlers to path items
    document.querySelectorAll('.menu-path-item').forEach(item => {
        item.addEventListener('click', () => {
            currentMenu = item.dataset.menu;
            selectedSector = null;
            updateSectorDisplay();
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
                </div>
            `;
}

function showSectorEditor(direction) {
    const menu = menus[currentMenu];
    const sector = menu.sectors[direction];
    const dirLabels = { top: 'Cima', right: 'Direita', bottom: 'Baixo', left: 'Esquerda' };

    elements.editorTitle.textContent = `Setor: ${dirLabels[direction]}`;

    // Build submenu options
    const submenuOptions = Object.keys(menus)
        .filter(id => id !== currentMenu)
        .map(id => `<option value="submenu:${id}" ${sector.action === 'submenu:' + id ? 'selected' : ''}>${menus[id].name}</option>`)
        .join('');

    elements.sectorEditor.innerHTML = `
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-tag"></i> Rótulo (texto exibido)</label>
                    <input type="text" class="form-input" id="sectorLabel" value="${sector.label || ''}" placeholder="Ex: WIN + TAB">
                </div>

                <div class="form-group" style="margin-top: 1rem;">
                    <label class="form-label"><i class="fas fa-bolt"></i> Tipo de Ação</label>
                    <select class="form-select" id="actionType">
                        <option value="hotkey" ${sector.actionType === 'hotkey' ? 'selected' : ''}>Atalho de Teclado</option>
                        <option value="submenu" ${sector.actionType === 'submenu' ? 'selected' : ''}>Abrir Submenu</option>
                        <option value="custom" ${sector.actionType === 'custom' ? 'selected' : ''}>Código Personalizado</option>
                    </select>
                </div>

                <div id="actionConfig" style="margin-top: 1rem;"></div>

                <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem;">
                    <button class="btn btn-primary" id="saveSector" style="flex: 1;">
                        <i class="fas fa-check"></i> Salvar
                    </button>
                    <button class="btn btn-ghost" id="clearSector">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

    const actionTypeSelect = document.getElementById('actionType');
    const actionConfig = document.getElementById('actionConfig');

    function updateActionConfig() {
        const type = actionTypeSelect.value;

        if (type === 'hotkey') {
            const existingKeys = parseHotkeyToKeys(sector.action);
            actionConfig.innerHTML = `
                        <div class="form-group">
                            <label class="form-label"><i class="fas fa-keyboard"></i> Construtor de Atalhos</label>
                            <p style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                                Clique nas teclas abaixo para montar sua combinação. Você pode adicionar quantas teclas quiser!
                            </p>

                            <!-- Teclas selecionadas -->
                            <div id="selectedKeys" class="selected-keys" style="
                                min-height: 44px;
                                padding: 0.5rem;
                                background: var(--bg-tertiary);
                                border: 2px dashed var(--border);
                                border-radius: 10px;
                                display: flex;
                                flex-wrap: wrap;
                                gap: 0.5rem;
                                align-items: center;
                                margin-bottom: 1rem;
                            ">
                                <span id="emptyKeysHint" style="color: var(--text-muted); font-size: 0.8rem; ${existingKeys.length > 0 ? 'display: none;' : ''}">
                                    Clique nas teclas para adicionar...
                                </span>
                            </div>

                            <!-- Modificadores -->
                            <div style="margin-bottom: 0.75rem;">
                                <label class="form-label" style="font-size: 0.7rem; margin-bottom: 0.5rem;">Modificadores</label>
                                <div class="quick-keys">
                                    <button class="quick-key key-modifier" data-key="Ctrl" data-ahk="^">Ctrl</button>
                                    <button class="quick-key key-modifier" data-key="Shift" data-ahk="+">Shift</button>
                                    <button class="quick-key key-modifier" data-key="Alt" data-ahk="!">Alt</button>
                                    <button class="quick-key key-modifier" data-key="Win" data-ahk="#">Win</button>
                                </div>
                            </div>

                            <!-- Teclas de Função -->
                            <div style="margin-bottom: 0.75rem;">
                                <label class="form-label" style="font-size: 0.7rem; margin-bottom: 0.5rem;">Teclas de Função</label>
                                <div class="quick-keys">
                                    <button class="quick-key key-function" data-key="F1" data-ahk="{F1}">F1</button>
                                    <button class="quick-key key-function" data-key="F2" data-ahk="{F2}">F2</button>
                                    <button class="quick-key key-function" data-key="F3" data-ahk="{F3}">F3</button>
                                    <button class="quick-key key-function" data-key="F4" data-ahk="{F4}">F4</button>
                                    <button class="quick-key key-function" data-key="F5" data-ahk="{F5}">F5</button>
                                    <button class="quick-key key-function" data-key="F6" data-ahk="{F6}">F6</button>
                                    <button class="quick-key key-function" data-key="F7" data-ahk="{F7}">F7</button>
                                    <button class="quick-key key-function" data-key="F8" data-ahk="{F8}">F8</button>
                                    <button class="quick-key key-function" data-key="F9" data-ahk="{F9}">F9</button>
                                    <button class="quick-key key-function" data-key="F10" data-ahk="{F10}">F10</button>
                                    <button class="quick-key key-function" data-key="F11" data-ahk="{F11}">F11</button>
                                    <button class="quick-key key-function" data-key="F12" data-ahk="{F12}">F12</button>
                                </div>
                            </div>

                            <!-- Setas e Navegação -->
                            <div style="margin-bottom: 0.75rem;">
                                <label class="form-label" style="font-size: 0.7rem; margin-bottom: 0.5rem;">Navegação</label>
                                <div class="quick-keys">
                                    <button class="quick-key key-nav" data-key="←" data-ahk="{Left}">←</button>
                                    <button class="quick-key key-nav" data-key="→" data-ahk="{Right}">→</button>
                                    <button class="quick-key key-nav" data-key="↑" data-ahk="{Up}">↑</button>
                                    <button class="quick-key key-nav" data-key="↓" data-ahk="{Down}">↓</button>
                                    <button class="quick-key key-nav" data-key="Tab" data-ahk="{Tab}">Tab</button>
                                    <button class="quick-key key-nav" data-key="Enter" data-ahk="{Enter}">Enter</button>
                                    <button class="quick-key key-nav" data-key="Esc" data-ahk="{Escape}">Esc</button>
                                    <button class="quick-key key-nav" data-key="Space" data-ahk="{Space}">Space</button>
                                    <button class="quick-key key-nav" data-key="Backspace" data-ahk="{Backspace}">⌫</button>
                                    <button class="quick-key key-nav" data-key="Delete" data-ahk="{Delete}">Del</button>
                                    <button class="quick-key key-nav" data-key="Home" data-ahk="{Home}">Home</button>
                                    <button class="quick-key key-nav" data-key="End" data-ahk="{End}">End</button>
                                    <button class="quick-key key-nav" data-key="PgUp" data-ahk="{PgUp}">PgUp</button>
                                    <button class="quick-key key-nav" data-key="PgDn" data-ahk="{PgDn}">PgDn</button>
                                </div>
                            </div>

                            <!-- Letras -->
                            <div style="margin-bottom: 0.75rem;">
                                <label class="form-label" style="font-size: 0.7rem; margin-bottom: 0.5rem;">Letras</label>
                                <div class="quick-keys">
                                    ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l =>
                `<button class="quick-key key-letter" data-key="${l}" data-ahk="${l.toLowerCase()}">${l}</button>`
            ).join('')}
                                </div>
                            </div>

                            <!-- Números -->
                            <div style="margin-bottom: 0.75rem;">
                                <label class="form-label" style="font-size: 0.7rem; margin-bottom: 0.5rem;">Números</label>
                                <div class="quick-keys">
                                    ${'0123456789'.split('').map(n =>
                `<button class="quick-key key-number" data-key="${n}" data-ahk="${n}">${n}</button>`
            ).join('')}
                                </div>
                            </div>

                            <!-- Símbolos -->
                            <div style="margin-bottom: 0.75rem;">
                                <label class="form-label" style="font-size: 0.7rem; margin-bottom: 0.5rem;">Símbolos e Outros</label>
                                <div class="quick-keys">
                                    <button class="quick-key key-symbol" data-key="+" data-ahk="{+}">+</button>
                                    <button class="quick-key key-symbol" data-key="-" data-ahk="-">-</button>
                                    <button class="quick-key key-symbol" data-key="*" data-ahk="*">*</button>
                                    <button class="quick-key key-symbol" data-key="/" data-ahk="/">/</button>
                                    <button class="quick-key key-symbol" data-key="." data-ahk=".">.</button>
                                    <button class="quick-key key-symbol" data-key="," data-ahk=",">,</button>
                                    <button class="quick-key key-symbol" data-key=";" data-ahk=";">;</button>
                                    <button class="quick-key key-symbol" data-key="[" data-ahk="[">[</button>
                                    <button class="quick-key key-symbol" data-key="]" data-ahk="]">]</button>
                                    <button class="quick-key key-symbol" data-key="PrintScreen" data-ahk="{PrintScreen}">PrtSc</button>
                                    <button class="quick-key key-symbol" data-key="Insert" data-ahk="{Insert}">Ins</button>
                                    <button class="quick-key key-symbol" data-key="Pause" data-ahk="{Pause}">Pause</button>
                                </div>
                            </div>

                            <!-- Ações -->
                            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                                <button class="btn btn-ghost" id="clearAllKeys" style="flex: 1;">
                                    <i class="fas fa-trash"></i> Limpar Tudo
                                </button>
                            </div>

                            <!-- Código AHK gerado -->
                            <div style="margin-top: 1rem; padding: 0.75rem; background: #0d1117; border-radius: 8px;">
                                <label class="form-label" style="font-size: 0.65rem; color: #8b949e; margin-bottom: 0.5rem;">
                                    <i class="fas fa-code"></i> Código AHK Gerado (editável)
                                </label>
                                <input type="text" class="form-input" id="ahkCodeOutput"
                                    value="${sector.action || ''}"
                                    placeholder='Send "^s"'
                                    style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; background: #161b22; border-color: #30363d; color: #c9d1d9;">
                            </div>
                        </div>
                    `;
            setupHotkeyBuilder(existingKeys);
        } else if (type === 'submenu') {
            actionConfig.innerHTML = `
                        <div class="form-group">
                            <label class="form-label"><i class="fas fa-layer-group"></i> Selecionar Submenu</label>
                            <select class="form-select" id="submenuSelect">
                                <option value="">-- Escolha um submenu --</option>
                                ${submenuOptions}
                            </select>
                        </div>
                    `;
        } else if (type === 'custom') {
            actionConfig.innerHTML = `
                        <div class="form-group">
                            <label class="form-label"><i class="fas fa-code"></i> Código AHK</label>
                            <textarea class="form-input" id="customCode" rows="4"
                                placeholder='Ex: Run "notepad.exe"'
                                style="font-family: 'JetBrains Mono', monospace; resize: vertical;">${sector.actionType === 'custom' ? sector.action : ''}</textarea>
                        </div>
                    `;
        }
    }

    actionTypeSelect.addEventListener('change', updateActionConfig);
    updateActionConfig();

    // Save button
    document.getElementById('saveSector').addEventListener('click', () => {
        const label = document.getElementById('sectorLabel').value;
        const type = actionTypeSelect.value;
        let action = '';

        if (type === 'hotkey') {
            const ahkCodeOutput = document.getElementById('ahkCodeOutput');
            action = ahkCodeOutput.value;
        } else if (type === 'submenu') {
            const submenuSelect = document.getElementById('submenuSelect');
            action = submenuSelect.value;
        } else if (type === 'custom') {
            action = document.getElementById('customCode').value;
        }

        menu.sectors[direction] = { label, action, actionType: type };
        updateSectorDisplay();
        updateSubmenuList();
        updateCodePreview();
        showToast('Setor salvo com sucesso!');
    });

    // Clear button
    document.getElementById('clearSector').addEventListener('click', () => {
        menu.sectors[direction] = { label: '', action: '', actionType: 'hotkey' };
        updateSectorDisplay();
        updateCodePreview();
        showSectorEditor(direction);
        showToast('Setor limpo!', 'warning');
    });
}

// Parse existing AHK code to extract keys for display
function parseHotkeyToKeys(action) {
    if (!action || action.startsWith('submenu:')) return [];

    const match = action.match(/Send\s+"([^"]+)"/);
    if (!match) return [];

    const ahk = match[1];
    const keys = [];

    // Extract modifiers
    if (ahk.includes('^')) keys.push({ key: 'Ctrl', ahk: '^', type: 'modifier' });
    if (ahk.includes('+') && !ahk.includes('{+}')) keys.push({ key: 'Shift', ahk: '+', type: 'modifier' });
    if (ahk.includes('!')) keys.push({ key: 'Alt', ahk: '!', type: 'modifier' });
    if (ahk.includes('#')) keys.push({ key: 'Win', ahk: '#', type: 'modifier' });

    // Extract special keys in braces
    const braceMatches = ahk.match(/\{[^}]+\}/g) || [];
    braceMatches.forEach(m => {
        const keyName = m.replace(/[{}]/g, '');
        const displayMap = {
            'Left': '←', 'Right': '→', 'Up': '↑', 'Down': '↓',
            'Tab': 'Tab', 'Enter': 'Enter', 'Escape': 'Esc', 'Space': 'Space',
            'Backspace': '⌫', 'Delete': 'Del', 'Home': 'Home', 'End': 'End',
            'PgUp': 'PgUp', 'PgDn': 'PgDn', 'PrintScreen': 'PrtSc', 'Insert': 'Ins', 'Pause': 'Pause'
        };
        keys.push({ key: displayMap[keyName] || keyName, ahk: m, type: 'special' });
    });

    // Extract regular letters/numbers (after removing modifiers and braced content)
    let remaining = ahk.replace(/[\^!#+]/g, '').replace(/\{[^}]+\}/g, '');
    remaining.split('').forEach(char => {
        if (char.trim()) {
            keys.push({ key: char.toUpperCase(), ahk: char, type: 'letter' });
        }
    });

    return keys;
}

function setupHotkeyBuilder(existingKeys = []) {
    const selectedKeysContainer = document.getElementById('selectedKeys');
    const emptyHint = document.getElementById('emptyKeysHint');
    const ahkOutput = document.getElementById('ahkCodeOutput');
    const clearAllBtn = document.getElementById('clearAllKeys');

    let selectedKeys = [...existingKeys];

    function updateDisplay() {
        // Clear all chips and plus signs
        const chips = selectedKeysContainer.querySelectorAll('.key-chip');
        const plusSigns = selectedKeysContainer.querySelectorAll('.key-plus');
        chips.forEach(c => c.remove());
        plusSigns.forEach(p => p.remove());

        if (selectedKeys.length === 0) {
            emptyHint.style.display = '';
        } else {
            emptyHint.style.display = 'none';

            selectedKeys.forEach((keyData, index) => {
                const chip = document.createElement('span');
                chip.className = 'key-chip';
                chip.style.cssText = `
                            display: inline-flex;
                            align-items: center;
                            gap: 0.375rem;
                            padding: 0.375rem 0.625rem;
                            background: var(--accent);
                            color: white;
                            border-radius: 6px;
                            font-size: 0.75rem;
                            font-weight: 600;
                            font-family: 'JetBrains Mono', monospace;
                        `;
                chip.innerHTML = `
                            ${keyData.key}
                            <button class="remove-key" data-index="${index}" style="
                                background: none;
                                border: none;
                                color: rgba(255,255,255,0.7);
                                cursor: pointer;
                                padding: 0;
                                font-size: 0.875rem;
                                line-height: 1;
                            ">&times;</button>
                        `;
                selectedKeysContainer.appendChild(chip);
            });

            // Add plus signs between chips
            const allChips = selectedKeysContainer.querySelectorAll('.key-chip');
            allChips.forEach((chip, i) => {
                if (i < allChips.length - 1) {
                    const plus = document.createElement('span');
                    plus.className = 'key-plus';
                    plus.style.cssText = 'color: var(--text-muted); font-weight: bold;';
                    plus.textContent = '+';
                    chip.after(plus);
                }
            });
        }

        // Update AHK output
        updateAHKOutput();

        // Add remove handlers
        selectedKeysContainer.querySelectorAll('.remove-key').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.dataset.index);
                selectedKeys.splice(idx, 1);
                updateDisplay();
            });
        });
    }

    function updateAHKOutput() {
        if (selectedKeys.length === 0) {
            ahkOutput.value = '';
            return;
        }

        // Build AHK string: modifiers first, then other keys
        const modifiers = selectedKeys.filter(k => k.type === 'modifier').map(k => k.ahk).join('');
        const otherKeys = selectedKeys.filter(k => k.type !== 'modifier').map(k => k.ahk).join('');

        ahkOutput.value = `Send "${modifiers}${otherKeys}"`;
    }

    // Add key click handlers
    document.querySelectorAll('#actionConfig .quick-key').forEach(btn => {
        btn.addEventListener('click', () => {
            const keyData = {
                key: btn.dataset.key,
                ahk: btn.dataset.ahk,
                type: btn.classList.contains('key-modifier') ? 'modifier' :
                    btn.classList.contains('key-function') ? 'function' :
                        btn.classList.contains('key-nav') ? 'nav' :
                            btn.classList.contains('key-letter') ? 'letter' :
                                btn.classList.contains('key-number') ? 'number' : 'symbol'
            };

            // For modifiers, toggle them
            if (keyData.type === 'modifier') {
                const existingIndex = selectedKeys.findIndex(k => k.key === keyData.key);
                if (existingIndex >= 0) {
                    selectedKeys.splice(existingIndex, 1);
                } else {
                    // Insert at beginning (modifiers first)
                    const firstNonMod = selectedKeys.findIndex(k => k.type !== 'modifier');
                    if (firstNonMod >= 0) {
                        selectedKeys.splice(firstNonMod, 0, keyData);
                    } else {
                        selectedKeys.push(keyData);
                    }
                }
            } else {
                // For other keys, just add them
                selectedKeys.push(keyData);
            }

            updateDisplay();
        });
    });

    // Clear all button
    clearAllBtn.addEventListener('click', () => {
        selectedKeys = [];
        updateDisplay();
    });

    // Initialize display with existing keys
    updateDisplay();
}

function getHotkeyDisplay(action) {
    if (!action || action.startsWith('submenu:')) return '';

    // Parse Send command
    const match = action.match(/Send\s+"([^"]+)"/);
    if (!match) return action;

    let keys = match[1];
    // Convert AHK syntax to display
    keys = keys.replace(/\^/g, 'Ctrl+');
    keys = keys.replace(/!/g, 'Alt+');
    keys = keys.replace(/\+/g, 'Shift+');
    keys = keys.replace(/#/g, 'Win+');
    keys = keys.replace(/\{(\w+)\}/g, '$1');
    keys = keys.replace(/\{(Left|Right|Up|Down)\}/g, (m, p) => {
        const arrows = { Left: '←', Right: '→', Up: '↑', Down: '↓' };
        return arrows[p] || p;
    });

    return keys;
}

function convertDisplayToAHK(display) {
    if (!display) return '';

    let ahk = display;
    ahk = ahk.replace(/Ctrl\+/gi, '^');
    ahk = ahk.replace(/Alt\+/gi, '!');
    ahk = ahk.replace(/Shift\+/gi, '+');
    ahk = ahk.replace(/Win\+/gi, '#');
    ahk = ahk.replace(/←/g, '{Left}');
    ahk = ahk.replace(/→/g, '{Right}');
    ahk = ahk.replace(/↑/g, '{Up}');
    ahk = ahk.replace(/↓/g, '{Down}');
    ahk = ahk.replace(/Space/gi, '{Space}');
    ahk = ahk.replace(/Tab/gi, '{Tab}');
    ahk = ahk.replace(/Enter/gi, '{Enter}');
    ahk = ahk.replace(/Escape/gi, '{Escape}');
    ahk = ahk.replace(/Backspace/gi, '{Backspace}');
    ahk = ahk.replace(/Delete/gi, '{Delete}');
    ahk = ahk.replace(/(F\d+)/gi, '{$1}');

    // Wrap remaining keys
    const lastPart = ahk.match(/[^^!+#]+$/);
    if (lastPart && !lastPart[0].startsWith('{')) {
        const key = lastPart[0];
        if (key.length === 1) {
            // Single letter, just use as is
        } else {
            ahk = ahk.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'), `{${key}}`);
        }
    }

    return `Send "${ahk}"`;
}

// Sector click handlers
[elements.sectorTop, elements.sectorRight, elements.sectorBottom, elements.sectorLeft].forEach(sector => {
    sector.addEventListener('click', () => {
        const direction = sector.dataset.direction;
        selectedSector = direction;
        updateSectorDisplay();
        showSectorEditor(direction);
    });
});

// =============================================
// Submenu Management
// =============================================
function updateSubmenuList() {
    const submenus = Object.keys(menus).filter(id => id !== 'main');

    if (submenus.length === 0) {
        elements.submenuList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-layer-group"></i>
                        <p>Nenhum submenu criado</p>
                    </div>
                `;
        return;
    }

    elements.submenuList.innerHTML = submenus.map(id => {
        const menu = menus[id];
        const sectors = Object.values(menu.sectors).filter(s => s.action).length;
        return `
                    <div class="menu-item" data-id="${id}">
                        <div class="menu-item-info">
                            <div class="menu-item-icon">
                                <i class="fas fa-folder"></i>
                            </div>
                            <div class="menu-item-text">
                                <h4>${menu.name}</h4>
                                <span>${sectors} ações configuradas</span>
                            </div>
                        </div>
                        <div class="menu-item-actions">
                            <button class="menu-item-btn edit-submenu" data-id="${id}"><i class="fas fa-pen"></i></button>
                            <button class="menu-item-btn enter-submenu" data-id="${id}"><i class="fas fa-arrow-right"></i></button>
                            <button class="menu-item-btn danger delete-submenu" data-id="${id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
    }).join('');

    // Add event listeners
    document.querySelectorAll('.enter-submenu').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentMenu = btn.dataset.id;
            selectedSector = null;
            updateSectorDisplay();
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

            // Check if any sector references this submenu
            let inUse = false;
            Object.values(menus).forEach(menu => {
                Object.values(menu.sectors).forEach(sector => {
                    if (sector.action === 'submenu:' + id) {
                        inUse = true;
                    }
                });
            });

            if (inUse) {
                showToast('Este submenu está em uso! Remova as referências primeiro.', 'error');
                return;
            }

            delete menus[id];
            if (currentMenu === id) {
                currentMenu = 'main';
            }
            updateSubmenuList();
            updateSectorDisplay();
            updateCodePreview();
            showToast('Submenu removido!', 'warning');
        });
    });

    // Click to enter
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            currentMenu = item.dataset.id;
            selectedSector = null;
            updateSectorDisplay();
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

elements.closeSubmenuModal.addEventListener('click', () => {
    elements.submenuModal.classList.remove('active');
});

elements.cancelSubmenu.addEventListener('click', () => {
    elements.submenuModal.classList.remove('active');
});

elements.saveSubmenu.addEventListener('click', () => {
    const name = elements.submenuName.value.trim();
    let id = elements.submenuId.value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

    if (!name) {
        showToast('Digite um nome para o submenu', 'error');
        return;
    }

    if (!id) {
        id = name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 10);
    }

    if (editingSubmenuId) {
        menus[editingSubmenuId].name = name;
    } else {
        if (menus[id]) {
            showToast('Já existe um menu com esse ID', 'error');
            return;
        }

        menus[id] = {
            id,
            name,
            sectors: {
                top: { label: '', action: '', actionType: 'hotkey' },
                right: { label: '', action: '', actionType: 'hotkey' },
                bottom: { label: '', action: '', actionType: 'hotkey' },
                left: { label: '', action: '', actionType: 'hotkey' }
            }
        };
    }

    elements.submenuModal.classList.remove('active');
    updateSubmenuList();
    updateCodePreview();
    showToast(editingSubmenuId ? 'Submenu atualizado!' : 'Submenu criado!');
});

// =============================================
// Reset
// =============================================
elements.resetBtn.addEventListener('click', () => {
    elements.resetModal.classList.add('active');
});

elements.closeResetModal.addEventListener('click', () => {
    elements.resetModal.classList.remove('active');
});

elements.cancelReset.addEventListener('click', () => {
    elements.resetModal.classList.remove('active');
});

elements.confirmReset.addEventListener('click', () => {
    config = JSON.parse(JSON.stringify(defaultConfig));
    menus = JSON.parse(JSON.stringify(defaultMenus));
    currentMenu = 'main';
    selectedSector = null;

    // Reset UI
    elements.menuRadius.value = 110;
    elements.deadzone.value = 30;
    elements.menuOpacity.value = 92;
    elements.cornerRadius.value = 16;
    elements.fadeIn.value = 120;
    elements.fadeOut.value = 120;
    elements.fadeSteps.value = 12;
    elements.scaleActive.value = 1.12;
    elements.submenuHoldTime.value = 1500;
    elements.submenuHoldTimeRange.value = 1500;
    elements.holdTimeDisplay.textContent = '1.5 segundos';
    elements.bgColor.value = '#1E1E1E';
    elements.bgColorText.value = '1E1E1E';
    elements.itemColor.value = '#333333';
    elements.itemColorText.value = '333333';
    elements.accentColor.value = '#1F6FEB';
    elements.accentColorText.value = '1F6FEB';
    elements.textColor.value = '#FFFFFF';
    elements.textColorText.value = 'FFFFFF';
    elements.highlightToggleSwitch.classList.add('active');

    document.querySelectorAll('.trigger-option').forEach(o => {
        o.classList.toggle('selected', o.dataset.value === 'MButton');
        o.querySelector('input').checked = o.dataset.value === 'MButton';
    });

    updateSectorDisplay();
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
function generateAHKCode() {
    const c = config;
    const clr = c.colors;

    // Build submenu function calls
    const submenuFunctions = Object.keys(menus)
        .filter(id => id !== 'main')
        .map(id => generateSubmenuFunction(id))
        .join('\n\n');

    // Get main menu sector actions
    const mainMenu = menus.main;

    // Identifica quais setores são submenus
    const submenuSectors = [];
    ['top', 'right', 'bottom', 'left'].forEach(dir => {
        if (mainMenu.sectors[dir].actionType === 'submenu') {
            submenuSectors.push(dir);
        }
    });

    const getAction = (sector) => {
        if (!sector.action) return `; Nenhuma ação configurada`;
        if (sector.actionType === 'submenu') {
            const submenuId = sector.action.replace('submenu:', '');
            const funcName = 'Show' + submenuId.charAt(0).toUpperCase() + submenuId.slice(1) + 'Menu';
            return `${funcName}(cx, cy)`;
        }
        return sector.action;
    };

    // Gera código para verificação de submenus com hold timer
    const holdTime = c.submenuHoldTime || 1500;
    const generateSubmenuHoldCheck = (direction, submenuId) => {
        const funcName = 'Show' + submenuId.charAt(0).toUpperCase() + submenuId.slice(1) + 'Menu';
        const dirMap = { top: 'Top', right: 'Right', bottom: 'Bottom', left: 'Left' };
        return `
            ; Verifica hold para submenu ${submenuId}
            if (action = "${dirMap[direction]}" && lastSel = "${dirMap[direction]}") {
                holdTime${dirMap[direction]} += 10
                if (holdTime${dirMap[direction]} >= ${holdTime}) {
                    ; Fecha menu principal
                    FadeTo(menuGui.Hwnd, Config.Alpha, 1, Config.Anim.FadeOutMs, Config.Anim.Steps)
                    FadeTo(shadow.Hwnd, Config.Theme.ShadowAlpha, 1, Config.Anim.FadeOutMs, Config.Anim.Steps)
                    try menuGui.Destroy()
                    try shadow.Gui.Destroy()
                    ; Abre submenu
                    ${funcName}(cx, cy)
                    return
                }
                ; Mostra progresso do hold
                progress := Round(holdTime${dirMap[direction]} / ${holdTime} * 100)
                info.Text := "${mainMenu.sectors[direction].label} (" progress "%)"
            } else {
                holdTime${dirMap[direction]} := 0
            }`;
    };

    // Inicialização dos holdTimers
    const holdTimerInits = submenuSectors.map(dir => {
        const dirMap = { top: 'Top', right: 'Right', bottom: 'Bottom', left: 'Left' };
        return `holdTime${dirMap[dir]} := 0`;
    }).join('\n    ');

    // Checks de hold para submenus
    const holdChecks = submenuSectors.map(dir => {
        const submenuId = mainMenu.sectors[dir].action.replace('submenu:', '');
        return generateSubmenuHoldCheck(dir, submenuId);
    }).join('\n');

    const code = `#Requires AutoHotkey v2.0
#SingleInstance Force
CoordMode("Mouse", "Screen")

; =========================
; Configurações
; =========================
global Config := {
    Radius: ${c.radius}
  , Deadzone: ${c.deadzone}
  , Alpha: ${c.opacity}                   ; opacidade final do menu (0-255)
  , UseWinSnap: true
  , UseHighlight: ${c.useHighlight ? 'true' : 'false'}       ; usar cor de destaque
  , Font: { Name: "Segoe UI", Size: 10 }
  , Theme: {
        Bg: "${clr.bg}"
      , Item: "${clr.item}"
      , ItemActive: "${clr.itemActive}"     ; cor destaque
      , Text: "${clr.text}"
      , Hint: "${clr.hint}"
      , Aim:  "${clr.aim}"           ; cor da seta/mira neutra
      , AimActive: "${clr.aimActive}"      ; cor da seta/mira ativa
      , Shadow: "${clr.shadow}"         ; base da sombra (preto)
      , ShadowAlpha: ${clr.shadowAlpha}         ; opacidade da sombra
      , AcrylicAlpha: ${clr.acrylicAlpha}        ; alpha do Acrylic (0-255)
    }
  , Anim: {
        FadeInMs: ${c.fadeIn}            ; duração do fade-in
      , FadeOutMs: ${c.fadeOut}           ; duração do fade-out
      , Steps: ${c.fadeSteps}                ; passos do fade
      , ScaleActive: ${c.scaleActive}        ; escala do botão ativo
    }
  , Shape: {
        CornerRadius: ${c.cornerRadius}         ; raio dos cantos
      , ShadowOffset: 8          ; deslocamento da sombra (px)
      , ShadowExpand: 12         ; "expande" sombra para além da borda (px)
    }
}

; Hotkey: ${c.trigger} abre o radial
${c.trigger}::RadialMenu()

; =========================
; Radial Menu
; =========================
RadialMenu() {
    global Config

    MouseGetPos(&cx, &cy)

    size := Config.Radius * 2
    x := cx - Config.Radius
    y := cy - Config.Radius

    ; --- sombra (atrás, click-through)
    shadow := CreateShadowGui(x, y, size, size)

    ; --- GUI principal
    menuGui := Gui("+AlwaysOnTop -Caption +ToolWindow")
    menuGui.BackColor := Config.Theme.Bg
    menuGui.SetFont("s" Config.Font.Size " c" Config.Theme.Text, Config.Font.Name)
    menuGui.Show("x" x " y" y " w" size " h" size " NA")

    ApplyRoundedCorners(menuGui.Hwnd, Config.Shape.CornerRadius)
    EnableAcrylic(menuGui.Hwnd, Config.Theme.Bg, Config.Theme.AcrylicAlpha)

    ; fade-in (menu + sombra)
    WinSetTransparent(1, menuGui.Hwnd)
    WinSetTransparent(1, shadow.Hwnd)
    FadeTo(shadow.Hwnd, 1, Config.Theme.ShadowAlpha, Config.Anim.FadeInMs, Config.Anim.Steps)
    FadeTo(menuGui.Hwnd, 1, Config.Alpha, Config.Anim.FadeInMs, Config.Anim.Steps)

    ; Setores (labels) - posicionados em arco
    topCtrl    := AddSector("${mainMenu.sectors.top.label || 'CIMA'}",  Config.Radius-47, 8,                 menuGui)
    leftCtrl   := AddSector("${mainMenu.sectors.left.label || 'ESQ'}",   8,                 Config.Radius-16, menuGui)
    rightCtrl  := AddSector("${mainMenu.sectors.right.label || 'DIR'}",   size-102,          Config.Radius-16, menuGui)
    bottomCtrl := AddSector("${mainMenu.sectors.bottom.label || 'BAIXO'}",        Config.Radius-47,  size-40,          menuGui)

    ; Texto central (feedback)
    info := menuGui.Add("Text"
        , "x" (Config.Radius-75) " y" (Config.Radius-12) " w150 Center c" Config.Theme.Hint
        , "Escolha uma ação")

    ; Indicador de direção (seta rotacionando por steps de 45°)
    aim := menuGui.Add("Text", "x" (Config.Radius-10) " y" (Config.Radius-12) " w20 h20 Center c" Config.Theme.Aim, "●")
    aim.SetFont("s14 Bold", "Segoe UI Symbol")
    rAim := Config.Radius - 22

    ; Inicializações
    action  := ""
    lastSel := ""
    theta   := 0
    dx := 0, dy := 0
    ${holdTimerInits}

    ; Loop enquanto segura ${c.trigger}
    while GetKeyState("${c.trigger}", "P") {
        Sleep 10
        MouseGetPos(&mx, &my)
        dx := mx - cx
        dy := my - cy

        ; --- eixo Y corrigido
        dy := -dy

        dist := Sqrt(dx*dx + dy*dy)

        if (dist < Config.Deadzone) {
            info.Text := "Escolha uma ação"
            lastSel := HighlightSector("", [topCtrl, rightCtrl, bottomCtrl, leftCtrl], lastSel)
            UpdateArrow(aim, 0, Config.Radius, Config.Radius, 0, false)
            ${submenuSectors.map(dir => {
        const dirMap = { top: 'Top', right: 'Right', bottom: 'Bottom', left: 'Left' };
        return `holdTime${dirMap[dir]} := 0`;
    }).join('\n            ')}
            action := ""
            continue
        }

        theta := GetAngle(dx, dy)
        UpdateArrow(aim, theta, Config.Radius, Config.Radius, rAim, true)

        ; Direções
        if (theta >= 45 && theta < 135) {             ; CIMA
            action := "Top"
            info.Text := "${mainMenu.sectors.top.label || 'Cima'}"
            lastSel := HighlightSector("Top", [topCtrl, rightCtrl, bottomCtrl, leftCtrl], lastSel)
        } else if (theta >= 135 && theta < 225) {     ; ESQUERDA
            action := "Left"
            info.Text := "${mainMenu.sectors.left.label || 'Esquerda'}"
            lastSel := HighlightSector("Left", [topCtrl, rightCtrl, bottomCtrl, leftCtrl], lastSel)
        } else if (theta >= 225 && theta < 315) {     ; BAIXO
            action := "Bottom"
            info.Text := "${mainMenu.sectors.bottom.label || 'Baixo'}"
            lastSel := HighlightSector("Bottom", [topCtrl, rightCtrl, bottomCtrl, leftCtrl], lastSel)
        } else {                                      ; DIREITA
            action := "Right"
            info.Text := "${mainMenu.sectors.right.label || 'Direita'}"
            lastSel := HighlightSector("Right", [topCtrl, rightCtrl, bottomCtrl, leftCtrl], lastSel)
        }
${holdChecks}
    }

    ; soltei o botão → fade out e fecha
    FadeTo(menuGui.Hwnd, Config.Alpha, 1, Config.Anim.FadeOutMs, Config.Anim.Steps)
    FadeTo(shadow.Hwnd,  Config.Theme.ShadowAlpha, 1, Config.Anim.FadeOutMs, Config.Anim.Steps)
    try menuGui.Destroy()
    try shadow.Gui.Destroy()

    ; Execução da ação escolhida
    if (action = "" || action = "Cancel")
        return

    if (action = "Top") {
        ${getAction(mainMenu.sectors.top)}
    } else if (action = "Left") {
        ${getAction(mainMenu.sectors.left)}
    } else if (action = "Right") {
        ${getAction(mainMenu.sectors.right)}
    } else if (action = "Bottom") {
        ${getAction(mainMenu.sectors.bottom)}
    }
}

${submenuFunctions}

; =========================
; Helpers visuais
; =========================
AddSector(text, x, y, hostGui) {
    global Config
    ctrl := hostGui.Add(
        "Text"
      , "x" x " y" y " w94 h32 Center Background" Config.Theme.Item " c" Config.Theme.Text " +0x1000"
      , text
    )
    ctrl.SetFont("s9 Bold", Config.Font.Name)
    ctrl.__ox := x, ctrl.__oy := y, ctrl.__ow := 94, ctrl.__oh := 32
    ; Aplica cantos arredondados ao setor
    SetRoundRegion(ctrl.Hwnd, 10)
    return ctrl
}

HighlightSector(which, ctrlList, lastSel) {
    global Config
    order := Map("Top", 1, "Right", 2, "Bottom", 3, "Left", 4)

    ; Reseta TODOS os setores para cor de fundo normal
    Loop 4 {
        c := ctrlList[A_Index]
        try c.Opt("Background" . Config.Theme.Item)
        try c.Move(c.__ox, c.__oy, c.__ow, c.__oh)
        try SetRoundRegion(c.Hwnd, 10)
    }

    ; Se nenhum setor selecionado, retorna vazio
    if (!which || !order.Has(which))
        return ""

    ; Aplica destaque apenas no setor atual (se UseHighlight estiver ativo)
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
        try SetRoundRegion(c.Hwnd, 12)
    }

    return which
}

UpdateArrow(arrowCtrl, theta, cx, cy, r, active := true) {
    global Config
    idx := Mod(Round(theta / 45), 8)
    glyphs := ["→","↗","↑","↖","←","↙","↓","↘"]
    g := glyphs[idx+1]
    try arrowCtrl.Text := g

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

; =========================
; Sombra & cantos arredondados & Acrylic
; =========================
CreateShadowGui(x, y, w, h) {
    global Config
    s := Gui("+AlwaysOnTop -Caption +ToolWindow +E0x20")
    s.BackColor := Config.Theme.Shadow
    off := Config.Shape.ShadowOffset
    exp := Config.Shape.ShadowExpand
    sx := x - Floor(exp/2) + off
    sy := y - Floor(exp/2) + off
    sw := w + exp
    sh := h + exp
    s.Show("x" sx " y" sy " w" sw " h" sh " NA")
    ApplyRoundedCorners(s.Hwnd, Config.Shape.CornerRadius + 6)
    return { Gui: s, Hwnd: s.Hwnd }
}

ApplyRoundedCorners(hwnd, radius := 12) {
    try {
        pref := 2
        DllCall("dwmapi\\DwmSetWindowAttribute", "ptr", hwnd, "int", 33, "int*", pref, "int", 4)
    }
    SetRoundRegion(hwnd, radius)
}

SetRoundRegion(hwnd, radius) {
    WinGetPos(&wx, &wy, &ww, &wh, "ahk_id " hwnd)
    rr := DllCall("gdi32\\CreateRoundRectRgn"
        , "int", 0, "int", 0, "int", ww, "int", wh
        , "int", radius*2, "int", radius*2
        , "ptr")
    DllCall("user32\\SetWindowRgn", "ptr", hwnd, "ptr", rr, "int", true)
}

EnableAcrylic(hwnd, hexBg := "1E1E1E", alpha := 220) {
    accentSize := 16
    policy := Buffer(accentSize, 0)
    state := 4
    flags := 0
    grad := ARGBFromHex(hexBg, alpha)

    NumPut("Int", state, policy, 0)
    NumPut("Int", flags, policy, 4)
    NumPut("Int", grad,  policy, 8)
    NumPut("Int", 0,     policy, 12)

    data := Buffer(24, 0)
    NumPut("Int", 19,            data, 0)
    NumPut("Ptr", policy.Ptr,    data, 8)
    NumPut("Int", accentSize,    data, 16)

    ok := 0
    try ok := DllCall("user32\\SetWindowCompositionAttribute", "ptr", hwnd, "ptr", data, "int")
    if (!ok) {
        NumPut("Int", 3, policy, 0)
        NumPut("Int", 0, policy, 4)
        NumPut("Int", grad, policy, 8)
        try DllCall("user32\\SetWindowCompositionAttribute", "ptr", hwnd, "ptr", data, "int")
    }
}

ARGBFromHex(hex, alpha := 220) {
    if (SubStr(hex, 1, 1) = "#")
        hex := SubStr(hex, 2)
    if (StrLen(hex) != 6)
        hex := "1E1E1E"
    r := "0x" . SubStr(hex, 1, 2)
    g := "0x" . SubStr(hex, 3, 2)
    b := "0x" . SubStr(hex, 5, 2)
    a := alpha & 0xFF
    return (a << 24) | (Integer(r) << 16) | (Integer(g) << 8) | Integer(b)
}

; =========================
; Snap preciso por monitor
; =========================
SnapByMove(side, px, py) {
    mon := GetMonitorAtPoint(px, py)
    if !mon {
        Send "#{Left}"
        return
    }
    L := mon.L, T := mon.T, R := mon.R, B := mon.B
    W := R - L, H := B - T

    if (side = "Left")
        WinMove(L, T, Floor(W/2), H, "A")
    else if (side = "Right")
        WinMove(L + Floor(W/2), T, Floor(W/2), H, "A")
}

GetMonitorAtPoint(x, y) {
    try {
        cnt := MonitorGetCount()
        Loop cnt {
            i := A_Index
            MonitorGet(i, &L, &T, &R, &B)
            if (x >= L && x < R && y >= T && y < B) {
                MonitorGetWorkArea(i, &wL, &wT, &wR, &wB)
                return { L: wL, T: wT, R: wR, B: wB }
            }
        }
    }
    MonitorGetWorkArea(1, &wL, &wT, &wR, &wB)
    return { L: wL, T: wT, R: wR, B: wB }
}

; =========================
; Animações
; =========================
FadeTo(hwnd, fromAlpha, toAlpha, durationMs := 120, steps := 12) {
    if (steps < 1)
        steps := 1
    stepTime := Max(10, Round(durationMs / steps))
    diff := toAlpha - fromAlpha
    Loop steps {
        t := A_Index / steps
        eased := 1 - (1 - t) * (1 - t)
        a := Round(fromAlpha + diff * eased)
        WinSetTransparent(a, "ahk_id " hwnd)
        Sleep stepTime
    }
    WinSetTransparent(toAlpha, "ahk_id " hwnd)
}

; =========================
; Matemática
; =========================
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

    return code;
}

function generateSubmenuFunction(menuId) {
    const menu = menus[menuId];
    const funcName = 'Show' + menuId.charAt(0).toUpperCase() + menuId.slice(1) + 'Menu';
    const c = config;

    const getAction = (sector) => {
        if (!sector.action) return `; Nenhuma ação configurada`;
        if (sector.actionType === 'submenu') {
            const submenuId = sector.action.replace('submenu:', '');
            const subFuncName = 'Show' + submenuId.charAt(0).toUpperCase() + submenuId.slice(1) + 'Menu';
            return `${subFuncName}(cx, cy)`;
        }
        return sector.action;
    };

    return `; =========================
; ${menu.name} (submenu)
; =========================
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

    cTop    := AddSector("${menu.sectors.top.label || 'CIMA'}",       Config.Radius-47, 8,               g)
    cLeft   := AddSector("${menu.sectors.left.label || 'ESQ'}",  8,               Config.Radius-16, g)
    cRight  := AddSector("${menu.sectors.right.label || 'DIR'}", size-102,        Config.Radius-16, g)
    cBottom := AddSector("${menu.sectors.bottom.label || 'BAIXO'}",  Config.Radius-47, size-40,         g)

    ; Texto central (feedback)
    info := g.Add("Text"
        , "x" (Config.Radius-75) " y" (Config.Radius-12) " w150 Center c" Config.Theme.Hint
        , "${menu.name}")

    aim := g.Add("Text", "x" (Config.Radius-10) " y" (Config.Radius-12) " w20 h20 Center c" Config.Theme.Aim, "●")
    aim.SetFont("s14 Bold", "Segoe UI Symbol")
    rAim := Config.Radius - 22

    sel := ""
    thetaD := 0
    dx := 0, dy := 0

    ; Loop enquanto segura o botão
    while GetKeyState("${c.trigger}", "P") {
        Sleep 10
        MouseGetPos(&mx, &my)
        dx := mx - cx
        dy := my - cy
        dy := -dy

        dist := Sqrt(dx*dx + dy*dy)
        if (dist < Config.Deadzone) {
            info.Text := "${menu.name}"
            sel := HighlightSector("", [cTop, cRight, cBottom, cLeft], sel)
            UpdateArrow(aim, 0, Config.Radius, Config.Radius, 0, false)
            continue
        }

        thetaD := GetAngle(dx, dy)
        UpdateArrow(aim, thetaD, Config.Radius, Config.Radius, rAim, true)

        if (thetaD >= 45 && thetaD < 135) {
            sel := HighlightSector("Top", [cTop, cRight, cBottom, cLeft], sel)
            info.Text := "${menu.sectors.top.label || 'Cima'}"
        } else if (thetaD >= 135 && thetaD < 225) {
            sel := HighlightSector("Left", [cTop, cRight, cBottom, cLeft], sel)
            info.Text := "${menu.sectors.left.label || 'Esquerda'}"
        } else if (thetaD >= 225 && thetaD < 315) {
            sel := HighlightSector("Bottom", [cTop, cRight, cBottom, cLeft], sel)
            info.Text := "${menu.sectors.bottom.label || 'Baixo'}"
        } else {
            sel := HighlightSector("Right", [cTop, cRight, cBottom, cLeft], sel)
            info.Text := "${menu.sectors.right.label || 'Direita'}"
        }
    }

    FadeTo(g.Hwnd, Config.Alpha, 1, Config.Anim.FadeOutMs, Config.Anim.Steps)
    FadeTo(shadow.Hwnd, Config.Theme.ShadowAlpha, 1, Config.Anim.FadeOutMs, Config.Anim.Steps)
    try g.Destroy()
    try shadow.Gui.Destroy()

    if (sel = "Top") {
        ${getAction(menu.sectors.top)}
    } else if (sel = "Right") {
        ${getAction(menu.sectors.right)}
    } else if (sel = "Bottom") {
        ${getAction(menu.sectors.bottom)}
    } else if (sel = "Left") {
        ${getAction(menu.sectors.left)}
    }
}`;
}

function updateCodePreview() {
    const code = generateAHKCode();
    // Simple syntax highlighting
    let highlighted = code
        .replace(/;(.*)$/gm, '<span class="comment">;$1</span>')
        .replace(/\b(global|if|else|while|Loop|try|return|Send|Gui|Sleep)\b/g, '<span class="keyword">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
        .replace(/(\w+)\(/g, '<span class="function">$1</span>(');

    elements.codePreview.innerHTML = highlighted;
}

elements.copyCodeBtn.addEventListener('click', async () => {
    const code = generateAHKCode();
    try {
        await navigator.clipboard.writeText(code);
        showToast('Código copiado!');
    } catch (err) {
        showToast('Erro ao copiar', 'error');
    }
});

elements.generateBtn.addEventListener('click', () => {
    const code = generateAHKCode();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'radial-menu.ahk';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Script gerado com sucesso!');
});

// =============================================
// Initialize
// =============================================
function init() {
    initTheme();
    updateSectorDisplay();
    updateSubmenuList();
    updateCodePreview();
    updateVisualPreview();
}

init();