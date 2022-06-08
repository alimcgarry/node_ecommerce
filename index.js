const express = require('express')
const mysql = require('promise-mysql')
const app = express()
const port = 3000

const getDatabase = async () => {
    await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'ecommerce_node'
    })
}

app.listen(port)
