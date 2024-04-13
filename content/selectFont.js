const fontTemplate = (options) => 
`
<div class="form-group form-group-sm">
    <label class="control-label col-md-2 col-lg-1 text-nowrap" for="kbdcoloreditor">Google Font:</label>
    <div class="col-md-10 col-lg-11">
            <div class="form-inline">
                <select name="fontFamily" id="fontFamily" style="font-size: 16px; padding:4px;">
                        <option value="">------------------ default ------------------</option>
                        ${options}
                </select>
                <select name="fontVariants" id="fontVariants" style="font-size: 16px; padding:4px;">
                    <option value="regular">regular</option>
                </select>
                <input type="number" id="fontSize" name="fontSize" min="1" max="100" value="14" style="font-size: 16px; padding:2px;" /> px
                <div>LastUpdated: 20240412</div>
            </div>
    </div>
</div>
`
const customStyleTemplate = (family, variant, size) => {
    if(family){
        return `@import url("https://fonts.googleapis.com/css?family=${family}:${variant}");
        #keyboard .keycap *, #glyphScroller * { font-family: \'${family}\'; font-size: ${size}px }`
    } else {
        return `#keyboard .keycap *, #glyphScroller * { font-size: ${size}px }`
    }

}

export const selectFont = (list) =>  {
    const newStyle = $("<style>").attr("data-font", "font")
    $("head").append(newStyle)
    const familyOpts = list.map(l => `<option value="${l.family}">${l.family}</option>`)
    $("#kbdproperties > form").prepend(fontTemplate(familyOpts))
    $("#fontFamily").on('change', (e) =>{
        const family = $(e.currentTarget).children(':selected').val();
        const fontSize = $("#fontSize").val()
        if(family.length > 0){
            const obj = list.find(l => l.family === family)
            const variantsOpts = obj.variants.map(v => v === "regular" ?
                `<option value="${v}" selected>${v}</option>` : `<option value="${v}">${v}</option>`)
            $("#fontVariants").empty().append(variantsOpts)
            $('style[data-font="font"]').empty().append(customStyleTemplate(family, "regular", fontSize))
        } else {
            const variantsOpts = `<option value="regular" selected>regular</option>`
            $("#fontVariants").empty().append(variantsOpts)
            $('style[data-font="font"]').empty().append(customStyleTemplate(family, "regular", fontSize))
        }
    });

    $("#fontVariants").on('change', () =>{
        const family = $("#fontFamily").children(':selected').val();
        const variant = $("#fontVariants").children(':selected').val();
        const fontSize = $("#fontSize").val()
        $('style[data-font="font"]').empty().append(customStyleTemplate(family, variant, fontSize))
    });

    $("#fontSize").on('change', () =>{
        const family = $("#fontFamily").children(':selected').val();
        const variant = $("#fontVariants").children(':selected').val();
        const fontSize = $("#fontSize").val()
        if(fontSize && fontSize !== 0) {
            $('style[data-font="font"]').empty().append(customStyleTemplate(family, variant, fontSize))
        }
    });
}
