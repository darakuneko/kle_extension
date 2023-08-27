const moveKeySrc = chrome.runtime.getURL("content/moveKey.js");
const moveKeyP = import(moveKeySrc);

const rotationKeySrc = chrome.runtime.getURL("content/rotationKey.js");
const rotationKeyP = import(rotationKeySrc);

const replaceInputSRC = chrome.runtime.getURL("content/replaceInput.js");
const replaceInputP = import(replaceInputSRC);

$(async function(){   
    const moveKey = await moveKeyP
    moveKey.moveKeyEvent()

    const rotationKey = await rotationKeyP
    rotationKey.rotationKeyEvent()

    const replaceInput = await replaceInputP
    replaceInput.replaceInput()
})