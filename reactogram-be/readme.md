# Reactogram Backend - A Clone of Instagram

## Introduction
Welcome to the Reactogram Backend, a part of the Reactogram project developed by Abdulhakeem Shaik. This backend serves as the foundation for the Reactogram application, which aims to replicate Instagram's core features. React is planned for the frontend (future implementation), while Node.js and Express handle the backend. MongoDB serves as the database to store user data and more.

## Project Structure

The project's structure is organized as follows:

```
- reactogram-be
  - models
  - routes
  - config.js
  - server.js
```

### Models
In the `models` directory, you'll find the `user_model.js` file. This file defines the user schema used to store user data in MongoDB.

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    }
});

mongoose.model("UserModel", userSchema);
```

**Explanation:**
- This code remains unchanged from the previous version. It defines the user schema used for MongoDB.

### Routes
The `routes` directory contains the `user_route.js` file, which defines routes for the project and includes JWT functionality.

```javascript
const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserModel = mongoose.model("UserModel");

const {JWT_SECRET} = require('../config');

// User Signup Route
// ...

// User Login Route
// ...

module.exports = router;
```

**Explanation:**
- In `user_route.js`, the code now includes JWT functionality for user authentication.
- The `jsonwebtoken` library is imported to sign JWT tokens.
- The `JWT_SECRET` is imported from the `config.js` file, which is used to sign and verify JWT tokens.
- The "User Signup" and "User Login" routes have been updated to include JWT token generation upon successful login.

### Configuration
The `config.js` file now includes the `JWT_SECRET` configuration.

```javascript
module.exports = {
    MONGO_DB_URL: "mongodb://127.0.0.1:27017/reactogram",
    JWT_SECRET: "skldfjue089889sdfkljjfkjsdf23334j"
}
```

**Explanation:**
- The `config.js` file includes the `JWT_SECRET`, a secret key used for signing and verifying JWT tokens.

### Server
In `server.js`, the server is started using Express. It connects to the MongoDB database and sets up necessary middleware and routes.

```javascript
const express = require('express');
const PORT = 5000;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const {MONGO_DB_URL} = require('./config');

mongoose.connect(MONGO_DB_URL);

mongoose.connection.on('connected', ()=>{
    console.log("Connected to Database successfully..!");
})

mongoose.connection.on('error', (error)=>{
    console.log("some error while connecting to Database!.");
})

app.use(cors());
app.use(express.json());

require('./models/user_model');
app.use(require('./routes/user_route')); 

app.listen(PORT, ()=>{
    console.log("Server started on port",PORT);
})
```

**Explanation:**
- The server setup remains largely unchanged from the previous version.
- It connects to the MongoDB database using the URL from `config.js`.
- CORS middleware is added to handle cross-origin requests.
- `express.json()` is used to parse JSON data in requests.
- The user model and routes (including JWT functionality) are imported and used.
- The server listens on port 5000, and status messages are logged to the console.

## Getting Started
To get started with the Reactogram Backend (including JWT authentication), follow these steps:

1. Clone this repository.
2. Navigate to the `reactogram-be` directory.
3. Install the required dependencies by running `npm install` in the project root.
4. Start the server using `npm start`.
5. The backend server will be accessible at `http://localhost:5000`.

## Features
- User Signup (with JWT)
- User Login (with JWT)
- (More features can be added in the future)

## Contributing
If you'd like to contribute to the Reactogram Backend, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your fork.
4. Submit a pull request to this repository.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.