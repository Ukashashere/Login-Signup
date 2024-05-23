const mongoose=require("mongoose")

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.frb73jz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewURlParser : true,
    useUnifiedTopology : true,
});
/*
.then(()=>{
    console.log('mongoose connected');         //If it Connects
})
.catch((e)=>{                                  //If it fails to Connect
    console.log('failed');
})
*/
const logInSchema=new mongoose.Schema({        //To create a database / a document
    name:{                                     //We have 'name' and 'password' in the database, we are defining schema of the document here.
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model('LogInCollection',logInSchema)  //Collection part, we are defining the collection here. 'LogInCollection' is name of collection. 'logInSchema' is written coz, it'll follow it's schema.

module.exports=collection      //To get this on 'index.js'





/*
const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginFormPractice")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection
*/


/*
This is Node.js code using the Mongoose library to interact with a MongoDB database. Let's break it down:

1. `const mongoose = require("mongoose")`: This imports the Mongoose library into the current file.

2. `mongoose.connect("mongodb://localhost:27017/LoginFormPractice")`: This line establishes a connection to a MongoDB database named "LoginFormPractice" running on the local machine (localhost) at port 27017. It returns a promise.

3. `.then(() => {
    console.log('mongoose connected');
})`: This is a promise callback that executes when the connection to the MongoDB database is successfully established. It simply logs "mongoose connected" to the console.

4. `.catch((e) => {
    console.log('failed');
})`: This is a promise callback that executes if there is an error establishing the connection to the MongoDB database. It logs "failed" to the console.

5. `const logInSchema = new mongoose.Schema({ ... })`: This defines a Mongoose schema for a collection named "LogInCollection". The schema specifies the structure of documents that will be stored in this collection. In this case, each document will have a "name" field of type String and a "password" field of type String, both of which are required.

6. `const LogInCollection = new mongoose.model('LogInCollection', logInSchema)`: This creates a Mongoose model based on the schema defined earlier. The model represents a collection in the MongoDB database. It allows you to perform CRUD operations (Create, Read, Update, Delete) on documents in the collection.

7. `module.exports = LogInCollection`: This exports the LogInCollection model so that it can be imported and used in other files within the Node.js application.

In summary, this code establishes a connection to a MongoDB database, defines a schema for a collection named "LogInCollection", creates a Mongoose model based on that schema, and exports the model for use in other parts of the application.
*/