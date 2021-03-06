import CDP from 'chrome-remote-interface'

const emulatePrint = async url => new Promise ((resolve,reject) => {
    CDP({host: 'localhost'}, async client => {
        try {
            const {Page, DOM, Network, Emulation, LayerTree } = client
            await Page.enable()
            await LayerTree.enable()
            await DOM.enable()
            await Network.enable()
            await Emulation.setEmulatedMedia({ media: 'print' })
            await Page.navigate({url})

            Page.loadEventFired( async () => {
                setTimeout(async function() {
                    const pdf = await Page.printToPDF({printBackground: true,preferCSSPageSize:true})
                    const buff = Buffer.from(pdf.data, 'base64')

                    await client.close()
                    resolve(buff)
                }, 1000)
            })
        } catch(err) {
            reject(err.message)
        }
    })
})

export default emulatePrint
