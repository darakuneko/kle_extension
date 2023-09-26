const moveKeySrc = chrome.runtime.getURL("content/moveKey.js");
const moveKeyP = import(moveKeySrc);

const rotationKeySrc = chrome.runtime.getURL("content/rotationKey.js");
const rotationKeyP = import(rotationKeySrc);

const replaceInputSRC = chrome.runtime.getURL("content/replaceInput.js");
const replaceInputP = import(replaceInputSRC);

const fontSRC = chrome.runtime.getURL("content/font.js");
const fontP = import(fontSRC);

const selectFontSRC = chrome.runtime.getURL("content/selectFont.js");
const selectFontP = import(selectFontSRC);

const exportKeymapSRC = chrome.runtime.getURL("content/exportKeymap.js");
const exportKeymapP = import(exportKeymapSRC);

$(async function(){   
    const moveKey = await moveKeyP
    moveKey.moveKeyEvent()

    const rotationKey = await rotationKeyP
    rotationKey.rotationKeyEvent()

    const replaceInput = await replaceInputP
    replaceInput.replaceInput()

    const font = await fontP
    const fontList = font.list

    const selectFont = await selectFontP
    selectFont.selectFont(fontList)

    const exportKeymap = await exportKeymapP
    exportKeymap.exportKeymap()
})
