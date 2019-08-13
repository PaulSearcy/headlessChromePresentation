import fs from 'fs'
import path from 'path'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import emulatePrint from './emulatePrint.js'

import App from '../src/App.js'



const port = Number(process.env.PORT) || 3000
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

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

app.post('/generate', (req,res) => {
    console.log('here')
    console.log(req.body)
    res.send(emulatePrint(req.body.targetURL))
})
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`)
})
