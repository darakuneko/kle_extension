export const replaceInput = () =>  {
    $('#properties').css({"width": "800px", "float": "left"})
    $('#properties > form').css("width", "100%")
    $('input[id*="labeleditor"]').attr('size', '18')
    $('#properties').find('label').css({"width": "18%", 'padding-left': '10px'})
    $('#properties').find('label').next().css("width", "82%")
}
