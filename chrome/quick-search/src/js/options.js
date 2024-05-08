import { Settings } from "./settings.js"

function createOptionForSearchEngine(groupName, name, id, is_checked) {
    const option = document.createElement('div');
    const span = document.createElement('span');
    const radioButton = document.createElement('input');
    radioButton.type = "radio";
    radioButton.checked = is_checked;
    radioButton.id = id;
    radioButton.value = id;
    radioButton.name = groupName;
    radioButton.addEventListener("click", (event) => {
        handleSearchEngineOptionClick(event);
    })

    const label = document.createElement('label');
    label.setAttribute("for", id);

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

async function handleSearchEngineOptionClick(event) {
    const radioButton = event.target;
    const selectedValue = radioButton.value;
    let preferedSearchEngine = await Settings.getPreferedSearchEngine();
    if (preferedSearchEngine && preferedSearchEngine == selectedValue) {
        return;
    }

    await Settings.updatePreferedSearchEngine(selectedValue);
}

async function createOptions(parent) {
    var optionContainer = document.createElement("div");
    optionContainer.id = "search_engine_options";
    let preferedSearchEngine = await Settings.getPreferedSearchEngine();
    let searchEngineConfig = await Settings.getSearchEngineConfig();
    if (!preferedSearchEngine || !searchEngineConfig) {
        return;
    }

    for (const [key, value] of Object.entries(searchEngineConfig.searchEngines)) {
        if (value.name) {
            const option = createOptionForSearchEngine("search_engine_options",
                chrome.i18n.getMessage(value.name),
                key,
                preferedSearchEngine && preferedSearchEngine == value);
            optionContainer.appendChild(option);
        }
    }

    parent.appendChild(optionContainer);
}

async function createContent() {
    var contentContainer = document.getElementById("main-content");
    if (contentContainer) {
        const titleElement = document.createElement("h2");
        const titleText = document.createTextNode(chrome.i18n.getMessage("optionTitle"));
        titleElement.appendChild(titleText);
        contentContainer.appendChild(titleElement);

        const desElement = document.createElement("p");
        const desText = document.createTextNode(chrome.i18n.getMessage("preferredSearchEngine"));
        desElement.appendChild(desText);
        contentContainer.appendChild(desElement);
        await createOptions(contentContainer);
    }
}

createContent();
