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
    icon.className = `icon icon-${id}`;
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
    let defaultSearchEngine = await Settings.getDefaultSearchEngine();
    if (defaultSearchEngine && defaultSearchEngine == selectedValue) {
        return;
    }

    await Settings.setDefaultSearchEngine(selectedValue);
}

async function createOptions(parent) {
    var optionContainer = document.createElement("div");
    optionContainer.id = "search_engine_options";
    let defaultSearchEngine = await Settings.getDefaultSearchEngine();
    for (const [key, value] of Settings.getAllSearchEngines()) {
        if (value.name) {
            const option = createOptionForSearchEngine("search_engine_options", value.name, key, defaultSearchEngine == key);
            optionContainer.appendChild(option);
        }
    }
    parent.appendChild(optionContainer);
}

async function createOptions2() {
    var optionContainer = document.getElementById("options");
    if (optionContainer) {
        const titleElement = document.createElement("h2");
        const titleText = document.createTextNode(chrome.i18n.getMessage("optionTitle"));
        titleElement.appendChild(titleText);
        optionContainer.appendChild(titleElement);

        const desElement = document.createElement("p");
        const desText = document.createTextNode(chrome.i18n.getMessage("preferSearchEngine"));
        desElement.appendChild(desText);
        optionContainer.appendChild(desElement);
        await createOptions(optionContainer);
    }
}

createOptions2();
