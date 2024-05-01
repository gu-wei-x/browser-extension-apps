// right-click menu.
chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: "on-selected-menu-search",
        title: "Search",
        contexts: ['selection']
    });
    chrome.contextMenus.create({
        id: "on-selected-menu-copilot",
        title: "Ask Copilot",
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
    // magic number.
    const queryMaxLength = 1354;
    var selectedText = item.selectionText;
    if (!selectedText) {
        return;
    }

    if (selectedText.length > queryMaxLength) {
        selectedText = selectedText.substring(0, queryMaxLength);
    }

    var url = new URL("https://www.bing.com/search");
    if (item.menuItemId == "on-selected-menu-copilot") {
        url.searchParams.set('showconv', "1");
        url.searchParams.set('sendquery', "1");
    }
    url.searchParams.set('q', selectedText);
    chrome.tabs.create({ url: url.href, index: tab.index + 1 });
});