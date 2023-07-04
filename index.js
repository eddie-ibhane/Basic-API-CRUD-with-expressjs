const express = require('express');
const products = require('./product');

const app = express();

const PORT = 8003;
const hostname = '127.0.0.1';

app.use(express.json());

// create a product
app.post('/api/products', (req, res) => {
    const {name, price, description, color, category, image} = req.body
    const newProduct = {
        id: products.length + 1,
        name, 
        price,
        description,
        color,
        category,
        image
    }

    const saveProduct = products.push(newProduct)

    if(saveProduct){
        res.json({message: "product created" , products})
    }else {
        throw new Error("Not created")
    }
})

app.get('/api', (req, res, next) => {
    res.send('hello express')
})

//fetch all product
app.get('/api/products', (req, res) => {
    res.json(products)
})

//fetch single product
app.get('/api/products/:reqId', (req, res) => {
    const requestId = Number(req.params.reqId)
    const product = products.find(p => p.id === requestId)
    if(product){
        res.json(product)
    }else {
        throw new Error('Oops! Product not found!')
    }
})

//fetch all product by category
app.get('/api/products/category/:catName', (req, res) => {
    const productsByCat = products.filter(p => p.category === req.params.catName)
    if(productsByCat) {
        res.json(productsByCat)
    }else{
        throw new Error('Record not find!')
    }
})

// Update a product by product id
app.put('/api/products/:productId', (req, res) => {
    // find the product with the matching Id from the params
    const productId = parseInt(req.params.productId)
    const product = products.find(p => p.id === productId)
    // if the product is find, update its properties
    const {name, price, description, color, category, image} = req.body
    if (product){
            product.name = name ? name : product.name, 
            product.price = price ? price : product.price,
            product.description = description ? description : product.description,
            product.color = color ? color : product.color,
            product.category = category ? category : product.category,
            product.image = image ? image : product.image

            res.status(200).json({ message: `Product with the id of ${productId} has been updated successfully`, products });
    }else {
        res.status(404).json({ error: 'Product not found' });
    }
})

// Delete a product by id
app.delete('/api/products/:productId', (req, res) => {
    const productId = parseInt(req.params.productId)

   // Find the index of the item with the matching ID
    const productIndex = products.findIndex(p => p.id === productId)
      // If the item is found, remove it from the list
      console.log(productIndex);
    if (productIndex !== -1){ 
        deleteProduct = products.splice(productIndex, 1)
        res.status(200).json({message: 'Product deleted successfully', products})
    }else res.status(404).json({error: 'Product not found!'})
})


app.listen(PORT, console.log(`server is running on ${PORT}`)) 