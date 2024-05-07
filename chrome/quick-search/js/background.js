import { Settings } from "./settings";

async function createMenu() {
    const defaultSearchEntry = await Settings.getDefaultSearchEntry();
    if (defaultSearchEntry && defaultSearchEntry.entries) {
        defaultSearchEntry.entries.forEach(entry => {
            if (entry.title) {
                chrome.contextMenus.create({
                    id: `on-selected-menu-search-${entry.type}`,
                    title: chrome.i18n.getMessage(entry.title),
                    contexts: ['selection']
                });
            }
        });
    }
}

// right-click menu.
chrome.runtime.onInstalled.addListener(async () => {
    await createMenu();
});

chrome.contextMenus.onClicked.addListener(async (item, tab) => {
    // magic number.
    const queryMaxLength = 1354;
    var selectedText = item.selectionText;
    if (!selectedText) {
        return;
    }

    if (selectedText.length > queryMaxLength) {
        selectedText = selectedText.substring(0, queryMaxLength);
    }

    const defaultSearchEntry = await Settings.getDefaultSearchEntry();
    if (defaultSearchEntry && defaultSearchEntry.entries) {
        defaultSearchEntry.entries.forEach(entry => {
            if (item.menuItemId == `on-selected-menu-search-${entry.type}`) {
                let destination = `${entry.url_temple}${selectedText}`;
                chrome.tabs.create({ url: destination, index: tab.index + 1 });
            }
        });
    }
});

chrome.storage.onChanged.addListener(async ({ search_engine }) => {
    chrome.contextMenus.removeAll();
    await createMenu();
});