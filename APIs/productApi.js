//create express userproductApplication
const { response } = require("express");
const exp = require("express");
const productApp = exp.Router();

// to use error handle 
const expressAsyncHandler = require('express-async-handler')

// FOR Product API
// let products = [
//     {
//         id: 100,
//         name: "Washing Machine",
//         price: 20000
//     },
//     {
//         id: 101,
//         name: "Television",
//         price: 50000
//     }
// ]

// create Product api

// Route for GET request products
productApp.get('/getProducts', expressAsyncHandler(async (request, response) => {
    let productcollectionObj = request.app.get("productcollectionObj")
    let productArray = await productcollectionObj.find().toArray();
    response.send({ message: "All Products", payload: productArray })
})
)


// Route for GET request product id
productApp.get('/getProduct/:id', expressAsyncHandler(async (request, response) => {
    let productcollectionObj = request.app.get("productcollectionObj")
    let productId = +request.params.id;
    let productObj = await productcollectionObj.findOne(
        { id: { $eq: productId } }
    );
    response.send({ message: "Product", payload: productObj })

})
)


// Route for POST request
productApp.post('/create-product', expressAsyncHandler(async (request, response) => {
    let productcollectionObj = request.app.get("productcollectionObj")
    let productObj = request.body

    // checking existing product
    let result = await productcollectionObj.findOne({ name: productObj.name });

    if (result != null) {
        res.send({ message: "product name already existed . Please choose another product name" })
    }


})
)


// Route for PUT request
productApp.put('/update-product/:id', expressAsyncHandler(async (request, response) => {
    let productcollectionObj = request.app.get("productcollectionObj")
    let productId = +request.params.id;
    let modifiedProduct = request.body
    await productcollectionObj.updateOne(
        { id: { $eq: productId } },
        { $set: { ...modifiedProduct } }
    );
    response.send({ message: "Product Modified" })

})
)


// Route for DELETE request
productApp.put('/delete-product/:id', expressAsyncHandler(async (request, response) => {
    let productcollectionObj = request.app.get("productcollectionObj")
    let productId = +request.params.id;
    await productcollectionObj.deleteOne(
        { id: { $eq: productId } }
    );
    response.send({ message: "Product Deleted" })

})
)


// exporting module
module.exports = productApp
