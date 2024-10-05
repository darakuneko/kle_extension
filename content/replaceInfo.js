const infoTemplate = (keyboard, author, selectedFont, width) => `
<div id="info" style="
    display: flex;
    justify-content: center;
    max-widht: ${width};
    padding-top: 4px;
    padding-bottom: 4px;
">
<div id="info-keyboard" style="padding-right: 20px;">${keyboard}</div>
<div id="info-author" style="padding-right: 20px;">${author}</div>
<div id="info-font"">${selectedFont}</div>
</div>
`

const inputObserve = (node, name) => {
    var config = { childList: true, characterData: true, subtree: true }
    var callback = (mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          const text = $($(node)).text()
          if(name == "keyboard") {
            $('#info-keyboard').text(text.replaceAll("Title: ", "Keyboard: "))
          } else if(name == "author") {
            $('#info-author').text(text)
          } 
        }
      })
    }
  
    var observer = new MutationObserver(callback)
    observer.observe(node, config)
}

const resizeObserb = (keyboardBg, info) => {
    const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
                const newWidth = entry.contentRect.width + 20;
                info.css("max-width", `${newWidth}px`)
            }
    });
    resizeObserver.observe(keyboardBg[0])
}

const renderInfo = () => {
  const printSummary = $('#printSummary').find(".ng-binding")
  const selectedFontVal = $('#fontFamily').val() 
  const selectedFont = selectedFontVal ? selectedFontVal : "Default"
  $('[ng-click="previewNotes()"]').parent().hide()
  const keyboard = $(printSummary[0]).text()
  const author = $(printSummary[1]).text()
  const width = $("#keyboard-bg").width()
  
  $('#keyboard-bg').after(infoTemplate(keyboard, author, `Font: ${selectedFont}`, width))
  
  inputObserve(printSummary[0], "keyboard")
  inputObserve(printSummary[1], "author")
  resizeObserb($('#keyboard-bg'), $('#info'))
}

const viewTemplate = (name, left) => `<div  style="
    margin: 4px 0 0;
    position: absolute;
    left: ${left}px;
"><input type="checkbox" name="${name}" checked></div>`

export const replaceInfo = async () =>  {
  renderInfo()

  $('label[for="kbdnameeditor"]').after(viewTemplate("keyboard-view", 12))
  $('label[for="authoreditor"]').after(viewTemplate("author-view", 64))  

  $('input[name="keyboard-view"]').on("change", e => {
    if($(e.target).prop('checked')){
      $("#info-keyboard").show()
    } else {
      $("#info-keyboard").hide()
    }
  })

  $('input[name="author-view"]').on("change", e => {
    if($(e.target).prop('checked')){
      $("#info-author").show()
    } else {
      $("#info-author").hide()
    }
  })
}
