export const exportKeymap = async () =>  {
    $('a[ng-click="downloadPng()"]').parent().after(`<li><a id="downloadPngSQ" href="javascript:void(0);">Download PNG (Standard Quality)</a></li>`)
    $("#downloadPngSQ").on("click", async () => {
        const h2c = await html2canvas($("#keyboard-bg")[0])
        h2c.toBlob(blob => {
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = `keyboard-layout.png`
            link.click()
        })
    })  
}