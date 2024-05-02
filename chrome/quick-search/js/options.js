import { Settings } from "./settings.js"

function createOptionForSearchEngine(groupName, name, id, is_checked) {
    const option = document.createElement('div');
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
    label.innerText = name;
    option.appendChild(radioButton);
    option.appendChild(label);
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

async function createOptions() {
    var optionContainer = document.getElementById("search_engine_options");
    if (optionContainer) {
        let defaultSearchEngine = await Settings.getDefaultSearchEngine();
        for (const [key, value] of Settings.getAllSearchEngines()) {
            if (value.name) {
                const option = createOptionForSearchEngine("search_engine_options", value.name, key, defaultSearchEngine == key);
                optionContainer.appendChild(option);
            }
        }
    }
}

createOptions();
