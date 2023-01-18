$(function(){
    $('#tab-content').find('input').on("keydown", e => {
        if(e.keyCode === 13){
            e.preventDefault();
            const id = $(e.target).attr('id')
            $("#keyboard").trigger("focus")
            if (e.shiftKey) {
              document.getElementById("keyboard").dispatchEvent(new KeyboardEvent("keydown", { keyCode: 74  }))          
            } else {
                document.getElementById("keyboard").dispatchEvent(new KeyboardEvent("keydown", { keyCode: 75  }))
            }
            $(`#${id}`).trigger("focus")
            console.log(id)
        }
    })
})