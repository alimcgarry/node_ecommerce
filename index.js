const express = require('express')
const mysql = require('promise-mysql')
const app = express()
app.use(express.json())
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
    const category = req.query.category
    const character = req.query.character
    let query = 'SELECT `id`, `image`, `title`, `price` FROM `products` WHERE `deleted` != 1'
    const values = []
    if (category) {
        query += ' AND `category` = ?'
        values.push(category)
    }
    if (character) {
        query += ' AND `character` = ?'
        values.push(character)
    }
    const products = await connection.query(query, values)
    res.json(products)
    res.status(200)
})

app.get('/products/:id', async (req, res) => {
    const urlId = parseInt(req.params.id)
    const connection = await getDatabase()
    const product = await connection.query('SELECT * FROM `products` WHERE `id` = ?;', [urlId])
    res.json(product)
    res.status(200)
})

app.post('/products', async (req, res) => {
    const connection = await getDatabase()
    await connection.query('INSERT INTO `products` (`title`, `price`, `image`, `category_id`, `category`, `character_id`, `character`, `description`, `image2`, `image3`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [
        req.body.title, req.body.price, req.body.image, req.body.category_id, req.body.category, req.body.character_id, req.body.character, req.body.description, req.body.image2, req.body.image3
    ])
    res.sendStatus(200)
})

app.put('/products/:id', async (req, res) => {
    const urlId = parseInt(req.params.id)
    const connection = await getDatabase()
    await connection.query('UPDATE `products` SET `title` = ?, `price` = ?, `image` = ?, `category_id` = ?, `category` = ?, `character_id` = ?, `character` = ?, `description` = ?, `image2` = ?, `image3` = ? WHERE `id` = ?;', [
        req.body.title, req.body.price, req.body.image, req.body.category_id, req.body.category, req.body.character_id, req.body.character, req.body.description, req.body.image2, req.body.image3, urlId
    ])
    res.sendStatus(200)
})

app.delete('/products/:id', async (req, res) => {
    const urlId = parseInt(req.params.id)
    const connection = await getDatabase()
    await connection.query('UPDATE `products` SET `deleted` = 1 WHERE (`id`) = ?;', [urlId])
    res.sendStatus(200)
})

app.listen(port)
