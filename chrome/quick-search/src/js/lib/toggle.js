import { QSTottleStyle } from './toggle.style.js'

customElements.get('qs-toogle') || customElements.define('qs-toogle', class extends HTMLElement {
    static get observedAttributes() {
        return ['checked', 'title'];
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = QSTottleStyle;
        this.shadow.appendChild(style);

        this.contentContainer = document.createElement('div');
        this.contentContainer.className = 'qs-toggle';
        this.shadow.appendChild(this.contentContainer);

        /*this.checked = this.hasAttribute('checked') && this.getAttribute('checked');
        this.title = this.getAttribute('title');*/
        this.connected = false;

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'title') {
            this.#render();
        } else if (name == 'checked') {
            this.#render();
        }
    }

    connectedCallback() {
        this.connected = true;
        this.#render();
    }

    #render() {
        if (!this.connected) {
            return;
        }

        this.contentContainer.replaceChildren();

        const label = document.createElement('label');
        label.className = 'switch';

        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        if (this.hasAttribute('checked')) {
            input.setAttribute('checked', '');
        }

        input.addEventListener('input', (e) => {
            let checked = e.target.hasAttribute('checked');
            this.dispatchEvent(new CustomEvent('changed', {
                bubbles: true,
                cancelable: true,
                detail: {
                    checked: !checked
                }
            }));
        });
        label.appendChild(input);

        const span = document.createElement('span');
        span.className = 'slider';
        label.appendChild(span);
        this.contentContainer.appendChild(label);

        const title = document.createElement('span');
        this.contentContainer.appendChild(title);
        title.className = 'qs-toggle-title';
        if (this.title) {
            title.textContent = this.title;
        }
    }
});