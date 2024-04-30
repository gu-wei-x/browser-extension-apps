/**Content script doesn't support customElements, this is workaround.*/
class OnSelectedMenu {
    static containerID = "quick-serch-selected-menu";
    static #icon_url = chrome.runtime.getURL("images/icons.png");
    static #styles = '.selected-menu-box { z-index: 10000;position: absolute;cursor: pointer;border: 0;background: #FFF;box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .1);border-radius: 6px;padding: 10px 15px 9px 16px;display: block;}'
        + '.selected-menu-box a,.selected-menu-box a:hover,.selected-menu-box a:visited {text-decoration: none;color: #333;float: left;}'
        + '.selected-menu-box a:hover {background-color: gray;}'
        + '.selected-menu-box span {overflow: hidden;float: left;font-family: Arial, MicrosoftYaHei;white-space: nowrap;text-overflow: ellipsis;max-width: 64px;line-height: 32px;}'
        + '.selected-menu-box .c-icon {float: left;transform: scale(.5); width: 32px;height: 32px;}'
        + `.selected-menu-box .c-icon-search {background: url(${OnSelectedMenu.#icon_url}) no-repeat -10px -68px;}` // -10px -10px: searchGlyph
        + `.selected-menu-box .c-icon-copilot {background: url(${OnSelectedMenu.#icon_url}) no-repeat -68px -10px;}`;

    constructor() {
        this.initialize();
    }

    initialize() {
        // create the template.
        OnSelectedMenu.#createTemplate();
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
        if (this.content) {
            this.content.forEach(item => {
                let menuItem = OnSelectedMenu.#createMenuItem(item, "c-icon-search");
                slot.appendChild(menuItem);
            });
        }
    }

    static getContainerID() {
        return OnSelectedMenu.containerID;
    }

    static #createMenuItem(item, icon_class) {
        var menuItem = document.createElement("a");
        menuItem.title = item.title;
        menuItem.setAttribute("target", "_blank");
        menuItem.setAttribute("href", item.url);
        if (item.content) {
            var content = document.createElement("span");
            var textContent = document.createTextNode(item.content);
            content.appendChild(textContent);
            menuItem.appendChild(content);
        }

        var icon_class = "c-icon ";
        if (item.type == 'search') {
            icon_class += "c-icon-search";
        } else if (item.type == 'copilot') {
            icon_class += "c-icon-copilot"
        }

        var icon = document.createElement("i");
        icon.className = "c-icon " + icon_class;
        menuItem.appendChild(icon);

        return menuItem;
    }

    static #createTemplate() {
        var menu_template = document.getElementById("custom-selected-menu-template");
        if (!menu_template) {
            const menuTemplate = document.createElement("template");
            menuTemplate.id = "custom-selected-menu-template";
            const style = document.createElement("style");
            style.innerText = OnSelectedMenu.#styles;
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