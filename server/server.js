import fs from 'fs'
import path from 'path'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import RenderPDF from 'chrome-headless-render-pdf'

import emulatePrint from './emulatePrint.js'
import App from '../src/App.js'

const port = Number(process.env.PORT) || 3000
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

const checkProtocolExists = url => /^(https?:\/\/)/i.test(url)

const validURL = url => /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(url)

const serverRenderer = (req, res, next) => {
    fs.readFile(path.resolve('./public/index.html'), 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return res.status(500).send('An error occurred')
      }
      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
        )
      )
    })
}

app.use('/public', express.static(path.join(__dirname, '../public')))
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.get('/', serverRenderer)

app.post('/generate', async (req,res) => {
    let url = checkProtocolExists(req.body.targetURL) ? req.body.targetURL : `https://${req.body.targetURL}`
    let result = await emulatePrint(url)
    res.send(result)
})

app.post('/simple',async (req,res, next) => {
    await RenderPDF
        .generatePdfBuffer( checkProtocolExists(req.body.targetURL) ? req.body.targetURL : `https://${req.body.targetURL}`,{
            chromeOptions: ['--no-sandbox']
        })
        .then( pdfBuffer =>
            res.set('Content-Type','application/pdf').send(pdfBuffer)
        )
        .catch(next)
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`)
})
