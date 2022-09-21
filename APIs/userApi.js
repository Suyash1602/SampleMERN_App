//create express userApplication
const exp = require("express");
const userApp = exp.Router();
require('dotenv').config();
// to use error handle 
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const verifyToken = require("./Authorization/verifyToken");

//create User API
//Routes for GET req
userApp.get("/getusers", expressAsyncHandler(async (req, res) => {

    // getting usercollectinoobj
    let useCollectionObj = req.app.get("useCollectionObj")

    let usersArray = await useCollectionObj.find().toArray();
    res.send({ message: "All users", payload: usersArray })

})
)

// route for get user by id
userApp.get("/getuser/:id", expressAsyncHandler(async (req, res) => {

    let useCollectionObj = req.app.get("useCollectionObj")
    // get user id from url 
    let userId = +req.params.id;
    // get user by id 
    let userObj = await useCollectionObj.findOne({ id: { $eq: userId } });
    res.send({ message: "User", payload: userObj })
}

)
)



//Route for create user
userApp.post("/create-user", expressAsyncHandler(async (req, res) => {
    let useCollectionObj = req.app.get("useCollectionObj")
    let userObj = req.body

    // verify duplicate data
    let result = await useCollectionObj.findOne({ username: userObj.username });

    // if username existed send resonse as duplicate user
    if (result != null) {
        res.send({ message: "Username already existed . Please choose another username" })
    }
    else {
        let hashedPassword = await bcryptjs.hash(userObj.password, 6);
        // replace existing password with hashed pass
        userObj.password = hashedPassword;
        await useCollectionObj.insertOne(userObj);
        res.send({ message: "User created" })
    }
})
)


//route for User Login 
userApp.post('/login', expressAsyncHandler(async (req, res) => {
    //get usercollectionObj 
    let usercollectionObj = req.app.get('useCollectionObj')
    //get user obj from req 
    let userCredentialObj = req.body
    // console.log(userObj) 


    //verify username 
    let user = await usercollectionObj.findOne({ username: userCredentialObj.username })
    //if username not found 
    if (user === null) {
        res.send({ message: "Invalid username" })
    }
    //if username matched 
    else {
        //compare passwords 
        let result = await bcryptjs.compare(userCredentialObj.password, user.password)
        //if passwords not matchec 
        if (result === false) {
            res.send({ message: "Invalid Password" })
        }
        //i passwords matched 
        else {
            //create jwt token 
            let token = jwt.sign({ username: user.username }, process.env.SECRETE_KEY, { expiresIn: 100 })
            //send response 
            res.send({ message: "success", token: token, user: user })
        }
    }
}))


// route for private get 
userApp.get("/private", verifyToken, expressAsyncHandler(async (req, res) => {
    // console.log(req.headers)
    res.send({ message: "Request from private route" })
}))



//Route for update user
userApp.put("/update-user/:id", expressAsyncHandler(async (req, res) => {

    let useCollectionObj = req.app.get("useCollectionObj")
    let userId = +req.params.id
    let modifiedUser = req.body

    await useCollectionObj.updateOne(
        { id: { $eq: userId } },
        { $set: { ...modifiedUser } }
    );
    res.send({ message: "User Modified" })
})
)



//Route for DELETE req
userApp.delete("/delete-user/:id", expressAsyncHandler(async (req, res) => {

    let useCollectionObj = req.app.get("useCollectionObj")
    let userId = +req.params.id
    await useCollectionObj.deleteOne(
        { id: { $eq: userId } }
    );
    res.send("User deleted")

})
)


module.exports = userApp;