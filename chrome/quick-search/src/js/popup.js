import './lib/index'
import { Settings } from './lib/settings'
import { QSPopupStyle } from './popup.style'

customElements.get('qs-settings') || customElements.define('qs-settings', class extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = QSPopupStyle;
        this.shadow.appendChild(style);

        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'main-content';
        this.contentContainer.className = 'content';
        this.shadow.appendChild(this.contentContainer);

        this.#render();
    }

    async #render() {
        const titleElement = document.createElement('h2');
        titleElement.innerText = chrome.i18n.getMessage('settingsTitle');
        this.contentContainer.appendChild(titleElement);

        // features.
        const featureContainer = document.createElement('div');
        featureContainer.id = 'qs-features';
        featureContainer.className = 'qs-features';

        // features - title.
        const featureTitle = document.createElement('p');
        featureTitle.innerText = chrome.i18n.getMessage('featureTitle');
        featureContainer.appendChild(featureTitle);

        const rightMenu = document.createElement('qs-toogle');
        await Settings.isRightClickMenuEnabled() && rightMenu.setAttribute('checked', '');
        rightMenu.setAttribute('title', chrome.i18n.getMessage('rightClickMenuDescitption'))
        featureContainer.appendChild(rightMenu);
        rightMenu.addEventListener('changed', async (e) => {
            if (e && e.detail) {
                console.log(e.detail.checked);
                await Settings.setRightClickMenu(e.detail.checked);
                let value = await Settings.isRightClickMenuEnabled();
                console.log(value);
            }
        });

        const onSelectionMenu = document.createElement('qs-toogle');
        await Settings.isOnSelectionMenuEnabled() && onSelectionMenu.setAttribute('checked', '');
        onSelectionMenu.setAttribute('title', await chrome.i18n.getMessage('onSelectionsMenuDescitption'))
        featureContainer.appendChild(onSelectionMenu);
        onSelectionMenu.addEventListener('changed', async (e) => {
            if (e && e.detail) {
                console.log(e.detail.checked);
                await Settings.setOnSelectionMenu(e.detail.checked);
            }
        });

        this.contentContainer.appendChild(featureContainer);


        // options.
        const optionContainer = document.createElement('div');
        optionContainer.id = 'qs-options';
        optionContainer.className = 'qs-options';

        const optionTitle = document.createElement('p');
        optionTitle.innerText = chrome.i18n.getMessage('preferredSearchEngine');
        optionContainer.appendChild(optionTitle);


        let preferedSearchEngine = await Settings.getPreferedSearchEngine();
        let searchEngineConfig = await Settings.getSearchEngineConfig();
        if (!preferedSearchEngine || !searchEngineConfig) {
            return;
        }

        for (const [key, value] of Object.entries(searchEngineConfig.searchEngines)) {
            if (value.name) {
                const option = this.#createOptionForSearchEngine('search_engine_options',
                    chrome.i18n.getMessage(value.name),
                    key,
                    preferedSearchEngine && preferedSearchEngine == value);
                optionContainer.appendChild(option);
            }
        }

        this.contentContainer.appendChild(optionContainer);
    }

    #createOptionForSearchEngine(groupName, name, id, is_checked) {
        const option = document.createElement('div');
        const span = document.createElement('span');
        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.checked = is_checked;
        radioButton.id = id;
        radioButton.value = id;
        radioButton.name = groupName;
        radioButton.addEventListener('click', async (event) => {
            const radioButton = event.target;
            const selectedValue = radioButton.value;
            let preferedSearchEngine = await Settings.getPreferedSearchEngine();
            if (preferedSearchEngine && preferedSearchEngine == selectedValue) {
                return;
            }

            await Settings.updatePreferedSearchEngine(selectedValue);
        })

        const label = document.createElement('label');
        label.setAttribute('for', id);

        const icon = document.createElement('i');
        icon.className = `icon icon-${id.toLowerCase()}`;
        label.appendChild(icon);

        const textNode = document.createTextNode(name);
        label.appendChild(textNode);

        span.appendChild(radioButton);
        span.appendChild(label);
        option.appendChild(span);
        return option;
    }
});

