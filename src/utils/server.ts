import * as http from 'http'
import * as color from 'colors'
import * as open from 'opn'

import * as config from '../../config'
import html from '../html'

export function runServer() {
    const server = http.createServer((req, res) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(html)
    })

    server.listen(config.serverPort, () => {
        console.log(color.green(`Server: http://localhost:${config.serverPort}`))
        open(`http://localhost:${config.serverPort}`)
    })
}