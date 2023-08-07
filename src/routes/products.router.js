const express = require('express')
const router = express.Router()
const fs = require('fs')

//Array de productos

const json__products = fs.readFileSync('files/products.json', 'utf-8')
let products = JSON.parse(json__products)

//Obtener todos los productos

router.get('/api/products', (req, res)=> {

    res.json({ products })

})

//Obtener producto en especifico

router.get('/api/products/:pid', (req, res) => {

    const pid = parseInt(req.params.pid)
    console.log(pid)

    const product = products.find ((product) => product.id === pid)

    if(!product){

        return res.status(404).json({ error:'Producto no encontrado.' })

    }else {

        return res.json(product)
    }

})

//Agregar un nuevo producto

router.post('/api/products', (req, res) =>{

    const { productTitle, productDescription, productCode } = req.body

    if(!productTitle || !productDescription || !productCode){

        res.status(400).send('Las entradas deben tener un nombre, una descripción y un código')
    }

    const newProduct = req.body 

    try {let lastId; /* TAMBIEN SE PODRÍA HACER CON OPERADOR TERNARIO const lastId = objects.length > 0 ? objects[objects.length - 1].id : 0*/
            
    if(products.length > 0) {

        lastId = products[products.length - 1].id

    }else {

        lastId = 0
    }
    

    const newId = lastId + 1

    const newProduct1 = {

        Id: newId,
        ...newProduct
    }

    products.push(newProduct1)
    return newId

    }catch{

        console.error ('No se pudo guardar el objeto')

    }

    const json_products = JSON.stringify(products)

    fs.writeFileSync('files/products.json', json_products, 'utf-8')

    res.json({ message: 'Producto agregado correctamente' })

})

//Actualizar producto

router.put('/api/products/:pid', (req, res)=> {

    const pid = parseInt(req.params.pid)
    const updateFields = req.body

    if(Object.keys(updateFields).length === 0) {

        return res.status(400).json({ error: 'Debe proporcionar un campo para actualizar.' })

    }

    const productIndex = products.findIndex((product) => product.id === pid)

        if(productIndex === -1) {

            return res.status(404).json({ error: 'Producto no encontrado '})

        }

        products[productIndex] = {

            ...products[productIndex],
            ...updateFields

        }

        return res.json(products[productIndex])

})

//Eliminar un producto

router.delete('/api/products/:pid', (req, res) =>{

    const pid = parseInt(req.params.pid)
    const productIndex = products.find((product) => product.id === pid)

    if(productIndex === -1){

        return res.status(404).json({error: 'Producto no encontrado'})

    }

    const deleteProduct = products.splice(productIndex, 1)

    return res.json(deleteProduct[0])

})

module.exports = router





