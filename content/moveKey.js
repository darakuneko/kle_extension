const sendKeycode = (keycode) => document.getElementById("keyboard")
.dispatchEvent(new KeyboardEvent("keydown", { keyCode: keycode }))
const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const moveKey = (e) =>  {
        if(e.keyCode === 13){  
            e.preventDefault()
            $("#keyboard").trigger("focus")
            if (e.shiftKey) {
                sendKeycode(74)
            } else {
                console.log($(e.currentTarget).attr('id'))

                sendKeycode(75)
            }
            const id = $(e.target).attr('id')
            $(`#${id}`).trigger("focus")
        }
}

export const moveKeyEvent = () =>  $('#tab-content').find('input').on("keydown", e => moveKey(e))
