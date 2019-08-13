require('ignore-styles')

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: [
        [
            '@babel/preset-env',
            {
                "targets": {
                    "chrome": "76"
                }
            }
        ],
        '@babel/preset-react'
    ]
})

require('./server/server.js')