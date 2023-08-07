const express = require('express')
const router = express.Router()
const fs = require('fs')

const json__products = fs.readFileSync('files/cart.json', 'utf-8')
let products = JSON.parse(json__products)

//Obtener todos los productos

router.get('/cart', (req, res)=> {

    res.json({ products })

})

//Obtener producto en especifico

router.get('/cart/:cid', (req, res) => {

    const cid = parseInt(req.params.cid)
    console.log(cid)

    const product = products.find ((product) => product.id === cid)

    if(!product){

        return res.status(404).json({ error:'Producto no encontrado.' })

    }else {

        return res.json(product)
    }

})

//Agregar un nuevo producto

router.post('/cart', (req, res) =>{

    const { productTitle, productDescription, productCode } = req.body

    if(!productTitle || !productDescription || !productCode){

        res.status(400).send('Las entradas deben tener un nombre, una descripción y un código')
    }

    const newProduct = req.body 

    products.push(newProduct)

    const json_products = JSON.stringify(products)

    fs.writeFileSync('files/cart.json', json_products, 'utf-8')

    res.json({ message: 'Producto agregado correctamente' })

})


module.exports = router

