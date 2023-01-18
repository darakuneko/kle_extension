$(function(){
    const sendKeycode  = (keycode) => document.getElementById("keyboard")
        .dispatchEvent(new KeyboardEvent("keydown", { keyCode: keycode  }))

    $('#tab-content').find('input').on("keydown", e => {
        if(e.keyCode === 13){
            e.preventDefault();
            const id = $(e.target).attr('id')
            $("#keyboard").trigger("focus")
            if (e.shiftKey) {
                sendKeycode(74)
            } else {
                sendKeycode(75)
            }
            $(`#${id}`).trigger("focus")
        }
    })
})