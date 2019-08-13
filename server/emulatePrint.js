import CDP from 'chrome-remote-interface'

const emulatePrint = async url => new Promise ((resolve,reject) => {
    CDP({host: 'localhost'}, async client => {
        try {
            const {Page, Emulation, LayerTree } = client
            await Page.enable()
            await LayerTree.enable()
            await DOM.enable()
            await Network.enable()
            //magic
            await Emulation.setEmulatedMedia({ media: 'print' })

            await Page.navigate({url})

            Page.loadEventFired( async () => {
                const pdf = await Page.printToPDF({printBackground: true,preferCSSPageSize:true})
                const buff = Buffer.from(pdf.data, 'base64')

                await client.close()
                resolve(buff)
            })
        } catch(err) {
            reject(err.message)
        }
    })
})

export default emulatePrint