const express = require('express')
const mysql = require('promise-mysql')
const app = express()
const port = 3000

const getDatabase = async () => {
    return mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'ecommerce_node'
    })
}

app.get('/products', async (req, res) => {
    const connection = await getDatabase()
    const products = await connection.query('SELECT `id`, `image`, `title`, `price` FROM `products`')
    res.json(products)
})

app.get('/products/:id', async (req, res) => {
    const urlId = parseInt(req.params.id)
    const connection = await getDatabase()
    const product = await connection.query('SELECT * FROM `products` WHERE `id` = ?;', [urlId])
    res.json(product)
})

app.listen(port)
