async function combinePng(blob1, blob2) {
    const img1 = await createImageFromBlob(blob1)
    const img2 = await createImageFromBlob(blob2)

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const canvasWidth = Math.max(img1.width, img2.width)
    const canvasHeight = img1.height + img2.height
    
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    ctx.drawImage(img1, (canvasWidth - img1.width) / 2, 0)
    ctx.drawImage(img2, (canvasWidth - img2.width) / 2, img1.height)
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob)
        }, 'image/png')
    })
}

function createImageFromBlob(blob) {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.src = URL.createObjectURL(blob)
    })
}

export const exportKeymap = async () =>  {
    $('a[ng-click="downloadPng()"]').parent().after(`<li><a id="downloadPngSQ" href="javascript:void(0)">Download PNG (Standard Quality)</a></li>`)
    $("#downloadPngSQ").on("click", async () => {
        const keymap = await html2canvas($("#keyboard-bg")[0])
        if(
            $('input[name="keyboard-view"]').prop('checked') ||
            $('input[name="author-view"]').prop('checked') ||
            $('input[name="font-view"]').prop('checked') 
        ) {
            keymap.toBlob( async keymapBlob =>  {
                const info = await html2canvas($("#info")[0])
                info.toBlob( async infoBlob =>  {
                    await combinePng(keymapBlob, infoBlob).then(combinedBlob => {
                        const link = document.createElement('a')
                        link.href = window.URL.createObjectURL(combinedBlob)
                        link.download = `keyboard-layout.png`
                        link.click()
                    })
                })
            })
        } else {
            keymap.toBlob( async keymapBlob =>  {
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(keymapBlob)
                link.download = `keyboard-layout.png`
                link.click()
            })         
        }
    })
}