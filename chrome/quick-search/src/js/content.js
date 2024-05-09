import { OnSelectedMenu } from "./lib/on-selected-menu"
import { Settings } from "./lib/settings";

const theme_url = chrome.runtime.getURL('css/menu_theme.css');
function isEditableElement(el) {
    let activeElement = document.activeElement;
    if (activeElement) {
        if (['TEXTAREA', 'INPUT'].includes(activeElement.nodeName)) {
            return true;
        }
        else if (activeElement.isContentEditable) {
            return true;
        }
    }

    return false;
}

OnSelectedMenu.loadTheme(theme_url).then(() => {
    var selectMenu;
    document.onselectstart = async (e) => {
        if (!selectMenu && await Settings.isOnSelectionMenuEnabled()) {
            selectMenu = new OnSelectedMenu();
        }

        if (!await Settings.isOnSelectionMenuEnabled()) {
            selectMenu && selectMenu.hide();
        }
    };

    document.addEventListener("mouseup", async (e) => {
        if (!selectMenu && await Settings.isOnSelectionMenuEnabled()) {
            selectMenu = new OnSelectedMenu();
        }

        if (!await Settings.isOnSelectionMenuEnabled()) {
            return;
        }

        if (!e.target ||
            (e.target && (isEditableElement(e.target) || e.target.id == OnSelectedMenu.getContainerID()))) {
            selectMenu.hide();
            return;
        }

        var selection = document.getSelection()
        const selectedText = selection.toString();
        if (selection.rangeCount < 1 || !selectedText) {
            if (selectMenu) {
                selectMenu.hide();
            }
            return;
        }

        if (selectMenu) {
            var selectedRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
            var top = (e.clientY) + "px";
            var left = (e.clientX) + "px";
            if (selectedRect.height > 0) {
                var domRelative = document.body.parentNode.getBoundingClientRect();
                top = (selectedRect.bottom - domRelative.top) + "px";
                left = (selectedRect.left - domRelative.left) + "px";
            }

            selectMenu.setPosition(top, left);

            // magic number.
            const queryMaxLength = 1354;
            var enSelectedText = encodeURIComponent(selectedText);
            if (enSelectedText.length > queryMaxLength) {
                enSelectedText = enSelectedText.substring(0, queryMaxLength);
            }

            let content = [];
            const preferedSearchEngine = await Settings.getPreferedSearchEngine();
            if (preferedSearchEngine && preferedSearchEngine.entries) {
                preferedSearchEngine.entries.forEach(entry => {
                    content.push({
                        name: preferedSearchEngine.key,
                        type: entry.type,
                        title: entry.title,
                        url: `${entry.url_temple}${selectedText}`
                    });
                });
            }

            selectMenu.setSelectedText(selectedText);
            selectMenu.setContent(content);
            selectMenu.show();
        }
    });
});