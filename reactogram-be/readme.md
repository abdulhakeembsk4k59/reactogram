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
- In the `user_model.js` file, a user schema is defined using Mongoose.
- The schema includes fields for the user's full name, email, password, and profile image URL.
- The `default` property is set for the `profileImg` field, providing a default image URL if the user doesn't upload a profile picture.

### Routes
The `routes` directory contains the `user_route.js` file, defining routes for the project.

```javascript
const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");

const mongoose = require('mongoose');
const UserModel = mongoose.model("UserModel");

// User Signup Route
// ...

// User Login Route
// ...

module.exports = router;
```

**Explanation:**
- In `user_route.js`, an Express router is created to define routes.
- The router handles user signup and login routes.
- It uses the `bcryptjs` library for secure password hashing and comparison.
- The user model is imported and used to interact with the MongoDB database.

### Configuration
The `config.js` file contains the MongoDB local URL and exports it using `module.exports`.

```javascript
module.exports = {
    MONGO_DB_URL: "mongodb://127.0.0.1:27017/reactogram"
}
```

**Explanation:**
- The `config.js` file stores the MongoDB database URL as `MONGO_DB_URL`.
- This URL specifies the location of the MongoDB instance, including the database name (`reactogram` in this case).

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
- In `server.js`, an Express server is created and configured.
- It connects to the MongoDB database using the URL from `config.js`.
- CORS middleware is added to handle cross-origin requests.
- `express.json()` is used to parse JSON data in requests.
- The user model and routes are imported and used.
- Finally, the server listens on port 5000, and status messages are logged to the console.

## Getting Started
To get started with the Reactogram Backend, follow these steps:

1. Clone this repository.
2. Navigate to the `reactogram-be` directory.
3. Install the required dependencies by running `npm install` in the project root.
4. Start the server using `npm start`.
5. The backend server will be accessible at `http://localhost:5000`.

## Features
- User Signup
- User Login
- (More features can be added in the future)

## Contributing
If you'd like to contribute to the Reactogram Backend, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your fork.
4. Submit a pull request to this repository.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.