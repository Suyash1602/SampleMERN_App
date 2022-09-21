//create express application
const exp = require("express");
const app = exp();
require('dotenv').config();

const path = require('path')
// connnect react build with server
app.use(exp.static(path.join(__dirname, './build/')))

// import mongo client
const mclient = require("mongodb").MongoClient;

// get db url
// const url = "mongodb://localhost:27017/appdata"
const url = process.env.DATABASE_URL

// connnect to database
mclient.connect(url)
    .then(client => {
        // getting db obj
        let dbObj = client.db("appdata")
        // getting collection obj 
        let useCollectionObj = dbObj.collection("usercollection")
        let productcollectionObj = dbObj.collection("productcollection")
        // sharing to user api
        app.set("useCollectionObj", useCollectionObj)
        app.set("productcollectionObj", productcollectionObj)

        console.log("Database connected")

    })
    .catch(err => console.log("Error in connecting ", err))


//add body parser
app.use(exp.json());

// server api 
const userApp = require("./APIs/userApi")
const productApp = require("./APIs/productApi")



// execute specific API based on apis
app.use('/user', userApp)
app.use('/product', productApp)


// third approach is to create new middleware here
let middleware3 = (req, res, next) => {
    console.log("Middleware 3 executed")
    next();
}
// and call inside the specific based api
// app.use('/user', middleware3, userApp)

// dealing with invalid path
app.use("**", (req, res, next) => {
    res.send({ message: err.message })
})

// error handler
app.use((err, req, res, next) => {
    res.send({ message: err.message })
})



//allign port number
const port = process.env.portNumber;
app.listen(port, () => console.log(`Server listening on port ${port}`));