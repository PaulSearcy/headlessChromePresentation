const fs = require('fs')
const path = require('path');
const { URL } = require('url')
const express = require('express')
const parser = require('body-parser')
const timeout = require('connect-timeout')

const CDP = require('chrome-remote-interface');

const port = 8093

const server = express()
server.use(parser.json())
server.use('/public', express.static('./public'))

const log = x => console.log(x)
const ID = () => '' + Math.random().toString(36).substr(2, 9)

server.post('/pdf',timeout('5s'), async (req, res) => {
    let host = req.body.host || (req.headers.referer ? new URL(req.headers.referer).origin : "") ||'https://api.stelter.com'
    let unqiueFileName = ID()
    let pathname = req.body.pathname
    let url = host + pathname 
    log(`
        body: ${JSON.stringify(req.body)}
        pathname: ${pathname}
        bodyPathName: ${req.body.pathname}
        host: ${req.body.host}
        url: ${url}
    `)
    log(url)
    
    try {
        CDP({host:'localhost'},async function(client) {
            const {DOM, Emulation, Network, Page} = client;
        
            await Page.enable()
            await DOM.enable()
            await Network.enable()

            await Emulation.setEmulatedMedia({ media: 'print' })

            await Page.navigate({url});
        
            Page.loadEventFired(async () => {
                setTimeout(async function() {
                    const pdf = await Page.printToPDF({printBackground: true,preferCSSPageSize:true})
                    console.log('converted')
                    fs.writeFileSync('./public/'+unqiueFileName+'.pdf', pdf.data, 'base64')
                    res.download('./public/'+unqiueFileName+'.pdf')
                    client.close()
                }, 1000)
            })
        }).on('error', err => {console.error('Cannot connect to browser:', err);throw err})
    } catch (error) {
        res.sendStatus(500)
    }

})

server.post('/',timeout('5s'), async (req, res) => {
    let host = req.body.host || (req.headers.referer ? new URL(req.headers.referer).origin : "") ||'https://api.stelter.com'
    let unqiueFileName = ID()
    let pathname = req.body.pathname
    let queryParamsObj = req.body.params
    let queryParams = `?${
        Object.keys(queryParamsObj)
        .map(key =>
            `${key}=${queryParamsObj[key]}&`
        )
        .join('')
        .slice(0,-1)
    }`
    let url = host + pathname + queryParams
    log(`
        pathname: ${pathname}
        queryParamsObj: ${req.body.params}
        queryParams: ${queryParams}
        url: ${url}
    `)
    log(url)
    
    try {
        CDP({host:'localhost'},async function(client) {
            const {DOM, Emulation, Network, Page} = client;
        
            await Page.enable()
            await DOM.enable()
            await Network.enable()

            await Emulation.setEmulatedMedia({ media: 'print' })
        
            await Page.navigate({url});
        
            Page.loadEventFired(async () => {
                setTimeout(async function() {
                    const pdf = await Page.printToPDF({printBackground: true,preferCSSPageSize:true})
                    console.log('converted')
                    const filePath = path.join(__dirname,`./public/${unqiueFileName}.pdf`)
                    console.log(filePath)
                    fs.writeFileSync(filePath, pdf.data, 'base64')
                    res.download(filePath)
                    await client.close()
                    fs.unlink(filePath,(err,data)=>console.log(err,data))
                }, 1000)
            })
        }).on('error', err => {console.error('Cannot connect to browser:', err);})
    } catch (error) {
        res.sendStatus(500)
    }

})

server.listen(port)
