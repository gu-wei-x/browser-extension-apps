import { Settings } from "./settings.js";

/**Content script doesn't support customElements, this is workaround.*/
export class OnSelectedMenu {
    static containerID = "quick-serch-selected-menu";
    static #icon_url = chrome.runtime.getURL("images/icons.png");
    static #themeCss = '';

    constructor() {
        this.initialize();
    }

    async initialize() {
        // create the template.
        await OnSelectedMenu.#createTemplate();
        let tempalte = document.getElementById("custom-selected-menu-template");
        let content = tempalte.content;

        this.menuContainer = document.createElement("custom-selected-menu");
        this.menuContainer.id = OnSelectedMenu.containerID;
        this.menuContainer.style.display = "none";
        this.shadowRoot = this.menuContainer.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(content.cloneNode(true));
        document.body.appendChild(this.menuContainer);
        // TODO: bind actions.
    }

    setSelectedText(selectedText) {
        this.selectedText = selectedText;
    }

    setContent(content) {
        this.content = content;
        this.#render();
    }

    setPosition(top, left) {
        var container = this.shadowRoot.getElementById('selected-menu-box');
        if (container && top && left) {
            container.style.top = top;
            container.style.left = left;
        }
    }

    show() {
        if (this.menuContainer) {
            this.menuContainer.style.display = "block";
        }
    }

    hide() {
        if (this.menuContainer) {
            this.menuContainer.style.display = "none";
        }
    }

    #render() {
        var slot = this.shadowRoot.querySelector('slot');
        slot.replaceChildren();
        if (this.selectedText && this.content) {
            slot.appendChild(OnSelectedMenu.#createSelectedTextItem(this.selectedText));
            this.content.forEach(item => {
                let menuItem = OnSelectedMenu.#createMenuItem(item);
                slot.appendChild(menuItem);
            });
        }
    }

    static getContainerID() {
        return OnSelectedMenu.containerID;
    }

    static loadTheme(theme_url) {
        if (!theme_url) {
            return;
        }

        return fetch(theme_url)
            .then((response) => response.text())
            .then((themeCss) => {
                if (themeCss) {
                    OnSelectedMenu.#themeCss = themeCss;
                }
            });
    }

    static #createSelectedTextItem(selectedText) {
        const textItem = document.createElement("span");
        const textContent = document.createTextNode(selectedText);
        textItem.appendChild(textContent);
        return textItem;
    }

    static #createMenuItem(item) {
        var menuItem = document.createElement("a");
        menuItem.title = item.title;
        menuItem.setAttribute("target", "_blank");
        menuItem.setAttribute("href", item.url);

        let icon_class = `c-icon-${item.name.toLowerCase()}-${item.type}`;
        let icon = document.createElement("i");
        icon.className = "c-icon " + icon_class;
        menuItem.appendChild(icon);

        return menuItem;
    }

    static async #createTemplate() {
        var menu_template = document.getElementById("custom-selected-menu-template");
        if (!menu_template) {
            const menuTemplate = document.createElement("template");
            menuTemplate.id = "custom-selected-menu-template";

            const style = document.createElement("style");
            style.innerText = OnSelectedMenu.#themeCss;
            menuTemplate.content.appendChild(style);

            const menu = document.createElement("div");
            menu.className = "selected-menu-box";
            menu.id = "selected-menu-box";

            const slot = document.createElement("slot");
            menu.appendChild(slot);

            menuTemplate.content.appendChild(menu);
            document.body.appendChild(menuTemplate);
        }
    }
}