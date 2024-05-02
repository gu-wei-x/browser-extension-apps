import { OnSelectedMenu } from "./on-selected-menu.js"

var selectMenu;
document.onselectstart = (e) => {
    if (!selectMenu) {
        selectMenu = new OnSelectedMenu();
    }
};

document.addEventListener("mouseup", (e) => {
    if (!selectMenu) {
        selectMenu = new OnSelectedMenu();
    }

    if (e.target && e.target.id == OnSelectedMenu.getContainerID()) {
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

        var content = [
            { "type": "search", "content": `${selectedText}`, "title": "Search", "url": `https://www.bing.com/search?q=${enSelectedText}` },
            { "type": "copilot", "content": "", "title": "Ask Copilot", "url": `https://www.bing.com/search?showconv=1&sendquery=1&q=${enSelectedText}` }];
        selectMenu.setContent(content);
        selectMenu.show();
    }
});