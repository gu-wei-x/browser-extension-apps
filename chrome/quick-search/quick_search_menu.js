function getSelectionHTML() {
    var userSelection;
    if (window.getSelection) {
        // W3C Ranges
        userSelection = window.getSelection();
        // Get the range:
        if (userSelection.getRangeAt)
            var range = userSelection.getRangeAt(0);
        else {
            var range = document.createRange();
            range.setStart(userSelection.anchorNode, userSelection.anchorOffset);
            range.setEnd(userSelection.focusNode, userSelection.focusOffset);
        }
        // And the HTML:
        var clonedSelection = range.cloneContents();
        var div = document.createElement('div');
        div.appendChild(clonedSelection);
        return div.innerHTML;
    } else if (document.selection) {
        // Explorer selection, return the HTML
        userSelection = document.selection.createRange();
        return userSelection.htmlText;
    } else {
        return '';
    }
}

/*chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.Message == "getSelection") {
        //var selection = window.getSelectionHTML();
        //console.log(selection.toString());
        console.log(window.getSelection().toString());
    } else {
        console.log("hello");
    }
});*/

function getPositionOfSelection(selection) {
    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const startOffset = range.startOffset;
        const endOffset = startOffset + range.toString().length - 1;
        console.log(`Selection starts at: ${startOffset}`);
        console.log(`Selection ends at: ${endOffset}`);
    }
}

function mouse_position(e) {
    var posX = e.clientX;
    var posY = e.clientY;
    console.log(`Mouse ends at: ${posX}`);
    console.log(`Mouse ends at: ${posY}`);

    console.log(`Target: ${e.target}`);
    console.log(`Target ends at: ${e.target.offsetTop}`);
    console.log(`Target ends at: ${e.target.offsetLeft}`);

    console.log(`Target ends at: ${posX + window.pageXOffset}`);
    console.log(`Target ends at: ${posY + window.pageYOffset}`);
}

// onselectionchange is annoying.
document.onmouseup = (e) => {
    let quick_menu = document.getElementById("quick_menu");
    var selection = document.getSelection()
    if (selection.rangeCount < 1 || !selection.toString()) {
        // or hide the menu.
        if (quick_menu) {
            quick_menu.style.display = "none";
        }

        return;
    }

    console.log(selection);
    console.log(getPositionOfSelection(selection));
    console.log(mouse_position(e));

    if (!quick_menu) {
        quick_menu = document.createElement("div");
        quick_menu.setAttribute("id", "quick_menu");

        quick_menu.style.background = "red";
        quick_menu.style.zIndex = "10000";
        quick_menu.style.position = "absolute";

        var search_icon = document.createElement("li");
        //search_icon.setAttribute("style", "width:14px;height:14px");
        var search_icon_content = document.createTextNode("Test");
        search_icon.appendChild(search_icon_content);

        quick_menu.appendChild(search_icon);
        document.body.appendChild(quick_menu);
    }

    // TODO: meed a better way to calculate the position.

    var r=window.getSelection().getRangeAt(0).getBoundingClientRect();
    var relative=document.body.parentNode.getBoundingClientRect();
    var top =(r.bottom - relative.top);//this will place ele below the selection
    //right = -(r.right-relative.right)+'px';//this will align the right edges together

    /*var getRange = selection.getRangeAt(0);
    var client_rect = getRange.getClientRects()[0];
    var left = client_rect.left;
    var top = client_rect.top - 20;*/

    //quick_menu.style.left = `${left}px`;
    quick_menu.style.top = `${top}px`;
    quick_menu.style.right = -(r.right-relative.right)+'px';
    quick_menu.style.display = "block";
};
