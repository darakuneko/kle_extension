const template = `
<div style="display: flex; justify-content: space-between; min-width: 600px;">
        <div style="display: flex; align-items: center;"><div><input type="checkbox" name="focus-mode"></div><div>Focus Mode</div></div>
        <div style="display: flex; align-items: center;"><div><input type="radio" name="rotation-scope" value="left-top"></div><div>left-top</div></div>
        <div style="display: flex; align-items: center;"><div><input type="radio" name="rotation-scope" value="left-bottom"></div><div>left-bottom</div></div>
        <div style="display: flex; align-items: center;"><div><input type="radio" name="rotation-scope" value="center" checked="checked"></div><div>center</div></div>
        <div style="display: flex; align-items: center;"><div><input type="radio" name="rotation-scope" value="right-top"></div><div>right-top</div></div>
        <div style="display: flex; align-items: center;"><div><input type="radio" name="rotation-scope" value="right-bottom"></div><div>right-bottom</div></div>
        <div style="display: flex; align-items: center;"><div><input type="radio" name="rotation-scope" value="none"></div><div>none</div></div>
</div>
`

const moveRotatonScope = async (elm) => {
    const el = document.getElementById(elm)
    el.focus()
    el.dispatchEvent(new Event('change', {bubbles: true}))
}

const moveVal = (rotationScope, w, h, x, y) => {
    //console.log(`w ${w} h ${h} x ${x} y${y}`)
    if(rotationScope === "left-top") return {x: x, y: y}
    if(rotationScope === "left-bottom") return {x: x, y: y + h}
    if(rotationScope === "right-top") return {x: x + w, y: y}
    if(rotationScope === "right-bottom") return {x: x + w, y: y + h}
    if(rotationScope === "center") return {x: x + (w / 2), y: y + (h / 2) } 
    return {x: "", y:  ""}
}

const onFocus = () => {
    const rotationScope = $('input:radio[name="rotation-scope"]:checked').val();
    const isFocus = $('#rotation_angle-editor').attr("focus")
    if(!isFocus || isFocus === "unlock"){
        $('#rotation_angle-editor').attr("step", "1")
        $('#rotation_angle-editor').attr("focus", "lock")

        const w = parseFloat($("#width-editor").val())
        const h = parseFloat($("#height-editor").val())
        const x = parseFloat($("#x-editor").val())
        const y = parseFloat($("#y-editor").val())
        
        const v = moveVal(rotationScope, w, h, x, y)
        $("#rotation_x-editor").val(v.x)
        $("#rotation_y-editor").val(v.y)

        moveRotatonScope("rotation_x-editor")
        moveRotatonScope("rotation_y-editor")
        moveRotatonScope("rotation_angle-editor")
        $("#rotation_angle-editor").attr("focus", "unlock")
    }
}

const keyClickEvent = () => {
    $(".key").on("click", e => {
        if($('input[name="focus-mode"]:checked').val() === "on") onFocus(e)
    })
}

export const rotationKeyEvent = () => {
    $("#properties > .form-horizontal > .form-group").eq(11).after(template)
    $('#rotation_angle-editor').on("focus", e => onFocus(e))
    $('input:radio[name="rotation-scope"]').on("change", e => onFocus(e))

    keyClickEvent()
    
    const observer = new MutationObserver(function(){
        var events = $._data($('.key').get(0), "events")
        if(!events) keyClickEvent()
    });

    const elem = document.getElementById('keyboard-bg')
    const config = { 
        childList: true
    }
    observer.observe(elem, config)
}