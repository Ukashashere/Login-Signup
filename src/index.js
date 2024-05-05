const express = require("express")         //requires express.js
const path = require("path")
const bodyParser = require("body-parser");  //to simplify the viewing , to make the data readable from the client(filling the login/signup form) to server side that is complex in general viewing. To make it readable we usee bodyParser
const dotenv = require ("dotenv");         //to hide the username/password of mongoDB


const app = express()                      //start express.js
dotenv.config();

// const hbs = require("hbs")
const LogInCollection = require("./mongodb")  //The other file mongodb from src folder is being imported here
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))

// hbs.registerPartials(partialPath)
app.get('/signup', (req, res) => {     //request/response //The `app.get()` function in Node is designed to route HTTP GET requests to the specified path, associating them with designated callback functions. Its primary purpose is to link middleware to your application, facilitating the handling of GET requests at the specified route.
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})

// app.get('/home', (req, res) => {
//     res.render('home')
// })
app.post('/signup', async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            password: req.body.password
        }
        const checking = await LogInCollection.findOne({ name: req.body.name })

        if (checking) {
            res.send("User details already exist")
        } else {
            await LogInCollection.create(data)
            res.status(201).render("home", { naming: req.body.name })
        }
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

app.post('/login', async (req, res) => {
    try {
        const user = await LogInCollection.findOne({ name: req.body.name })

        if (!user) {
            res.send("User not found")
        } else {
            if (user.password === req.body.password) {
                res.status(201).render("home", { naming: req.body.name })
            } else {
                res.send("Incorrect password")
            }
        }
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})


app.listen(port, () => {                  //defining a port number, here alteady defined above in the code, it is a function also
    console.log('port connected');
})



/*
const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {     //request/response //The `app.get()` function in Node is designed to route HTTP GET requests to the specified path, associating them with designated callback functions. Its primary purpose is to link middleware to your application, facilitating the handling of GET requests at the specified route.
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})



// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async (req, res) => {
    
    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    const data = {
        name: req.body.name,
        password: req.body.password
    }

    const checking = await LogInCollection.findOne({ name: req.body.name })

   try{
    if (checking.name === req.body.name && checking.password===req.body.password) {
        res.send("user details already exists")
    }
    else{
        await LogInCollection.insertMany([data])
    }
   }
   catch{
    res.send("wrong inputs")
   }

    res.status(201).render("home", {
        naming: req.body.name
    })
})


app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})



app.listen(port, () => {
    console.log('port connected');
})


*/

/*
This is a Node.js application using the *Express framework* to create a basic web server. Let's break down the code:

1. **Imports**: 
   - `express`: Imports the Express framework.
   - `path`: Provides utilities for working with file and directory paths.
   - `LogInCollection`: Imports a module, presumably a MongoDB model for user login data.
  
2. **Express Setup**:
   - Creates an Express application instance.
   - Configures Express to parse JSON data using `express.json()`.
   - Configures Express to parse URL-encoded data using `express.urlencoded()`.
   - Sets up the paths for templates (`tempelatePath`) and static files (`publicPath`).

3. **View Engine Setup**:
   - Sets the view engine to "hbs" (presumably Handlebars) for rendering dynamic content.
   - Specifies the directory where template files will be located using `app.set('views', tempelatePath)`.

4. **Static Files**:
   - Configures Express to serve static files from the "public" directory using `express.static(publicPath)`.

5. **Routes**:
   - Defines routes for handling HTTP GET requests to "/signup" and "/" (root).
   - Renders the "signup" and "login" views respectively when these routes are accessed.
   - Defines routes for handling HTTP POST requests to "/signup" and "/login".
     - For "/signup", it creates a new user record in the database if the user doesn't exist already. Then it renders the "home" view.
     - For "/login", it checks if the provided credentials match with the stored data and renders the "home" view if successful.

6. **Listening to Port**: 
   - Starts the Express server on the specified port (`port`) or default port 3000.

Overall, this code sets up a basic web server using Express, handles user signup and login functionality, and renders different views based on the routes accessed and data provided.
*/





/*
const express = require("express")     //requires express.js
const path = require("path") 
const app = express()                  //start express.js

app.listen(3000, () => {               //defining a port number, it is a function also
    console.log('port connected');
})
*/




/*
app.post('/signup', async (req, res) => {       //In order to work with mongoDB we have to write 'async' function
    
    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    const data = {
        name: req.body.name,
        password: req.body.password             //defined the  data
    }
                                                
    const checking = await LogInCollection.findOne({ name: req.body.name })   //To give this data to mongodb.To fill the collected data from 'signup' page to mongodb, we used 'await'. We use 'async' and 'await' functions to work with mongodb

   try{
    if (checking.name === req.body.name && checking.password===req.body.password) {
        res.send("user details already exists")
    }
    else{
        await LogInCollection.insertMany([data])
    }
   }
   catch{
    res.send("wrong inputs")
   }

    res.status(201).render("home", {
        naming: req.body.name
    })
})

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }
    } 
    
    catch (e) {

        res.send("wrong details")
        
    }
})

*/