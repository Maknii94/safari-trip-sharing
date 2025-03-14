# Learn JS

1. [Setup and Installation](#1-setup-and-installation)
- Install Node.js and npm (Node Package Manager).
- Create a new project directory and initialize it with `npm init`.
- Install Express using `npm install express`.

2. [Basic Express Server](#basic-express-server)
- Understand how to create a basic Express server:
```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```

3. [Routing](#routing)
- Learn how to handle different HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
- Understand route parameters and query strings.
```js
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});
```

4. [Middleware](#middleware)
- Middleware functions and their purpose (e.g., logging, authentication, parsing JSON).
- Use built-in middleware like `express.json()` and `express.urlencoded()`.
```js
app.use(express.json());
```

5. Request and Response Objects
- Accessing request data: `req.params`, `req.query`, `req.body`, `req.headers`.
- Sending responses: `res.send()`, `res.json()`, `res.status()`, `res.redirect()`.

6. Serving Static Files
- Use `express.static` to serve static assets like images, CSS, and JavaScript files.
```js
app.use(express.static('public'));
```

7. Handling Forms and JSON Data
- Parse incoming form data and JSON payloads.
- Use `express.json()` and `express.urlencoded()` middleware for parsing.

8. Error Handling
- Create custom error-handling middleware.
```js
app.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
});
```

9. Modular Routing
- Organize routes into separate files using `express.Router()`.
```js
const router = express.Router();
router.get('/example', (req, res) => res.send('Example Route'));
app.use('/api', router);
```

10. Environment Variables
- Load environment variables using `dotenv` package.
```js
require('dotenv').config();
const PORT = process.env.PORT || 3000;
```

11. [Connecting to a Database](#connecting-to-a-database--keycloak)
- Understand how to connect Express with databases like MongoDB (using Mongoose) or SQL databases (e.g., Sequelize).
```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
```

12. API Design and RESTful Principles
- Learn the basics of RESTful API design.
- Understand how to create CRUD (Create, Read, Update, Delete) APIs.

13. Authentication and Authorization
- Learn session-based authentication (e.g., `express-session`) or token-based authentication (`JWT`).
- Understand middleware for protecting routes.

14. Handling File Uploads
- Use `multer` or a similar package to handle file uploads.

15. Templating Engines (Optional)
- If needed, learn how to use templating engines like `EJS`, `Pug`, or `Handlebars` for rendering dynamic HTML.

16. CORS (Cross-Origin Resource Sharing)
- Enable CORS for your API using the `cors` package when building APIs for frontend apps.
```js
const cors = require('cors');
app.use(cors());
```

17. Asynchronous Code and Promises
- Understand `async/await` for handling asynchronous operations.
```js
app.get('/data', async (req, res) => {
    try {
        const data = await fetchData();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});
```

18. Testing and Debugging
- Learn to use tools like `Postman` or `Insomnia` to test APIs.
- Implement basic logging (`console.log`) or use middleware like `morgan` for HTTP request logging.

19. [Deployment](#deployment)
- Serve static files and manage environment variables in production.

20. Project Structure and Best Practices
- Organize your app with a clean folder structure (`routes`, `controllers`, `models`, `middlewares`).
- Follow coding best practices for maintainability and scalability.

## 1. Setup and Installation

### What is NodeJS?

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript code on the server, outside of a web browser. Node.js is known for its:
- Non-blocking, event-driven architecture, which makes it ideal for building scalable network applications.
- Single-threaded model with non-blocking I/O, suitable for data-intensive real-time applications.

**Key Features of Node.js:**

- Asynchronous and Event-Driven: Non-blocking I/O operations using callbacks and promises.
- Fast Execution: Built on the V8 engine, which compiles JavaScript to native machine code.
- Scalability: Ideal for handling many connections simultaneously.
- Cross-Platform: Can run on Windows, macOS, and Linux.

#### What is npm (Node Package Manager)?
npm is the default package manager for Node.js. 

**It helps in:**
- Installing packages (libraries and tools).
- Managing dependencies for your project.
- Running scripts for development and deployment.
- Main npm Commands

---

#### 1. Initialization Commands
Initialize a Project (npm init)

npm init
Walks through setting up package.json interactively.
Automatic Initialization (npm init -y)

npm init -y
Quickly generates a default package.json file.

#### 2. Package Installation Commands
Install a Package Locally (npm install <package>)

npm install express
Installs express into the node_modules directory.
Adds it as a dependency in package.json.
Install a Package Globally (npm install -g <package>)

npm install -g nodemon
Installs nodemon globally, available from anywhere in the terminal.
Install Specific Version (npm install <package>@<version>)

npm install express@4.18.2
Installs a specific version of express.
Install as Development Dependency (npm install --save-dev)

npm install jest --save-dev
Saves the package in the devDependencies section of package.json.
Install from package.json (npm install)

npm install
Installs all dependencies listed in package.json.

#### 3. Package Management Commands
List Installed Packages (npm list)

npm list
Displays installed packages and their dependencies.
Update Packages (npm update)

npm update
Updates packages to the latest minor or patch versions.
Uninstall a Package (npm uninstall <package>)

npm uninstall express
Removes a package and updates package.json.
Check for Outdated Packages (npm outdated)

npm outdated
Shows which packages are outdated and available updates.

#### 4. Running Scripts
Run a Script (npm run <script>)

npm run start
Runs the start script defined in package.json.
Common Scripts in package.json

"scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest"
}

#### 5. Version Management
View Current Version (npm -v)

npm -v
Shows the current npm version.
View Node.js Version (node -v)

node -v

#### 6. Cache and Troubleshooting
Clear Cache (npm cache clean --force)

npm cache clean --force
Clears the npm cache. Useful for resolving cache-related issues.
Audit Packages (npm audit)

npm audit
Checks for security vulnerabilities in installed packages.
Fix Vulnerabilities (npm audit fix)

npm audit fix
Attempts to fix security issues automatically.

#### 7. Global Commands
View Global Packages (npm list -g --depth=0)

npm list -g --depth=0
Lists globally installed packages.
Update Global Packages (npm update -g)

npm update -g

#### 8. Additional Helpful Commands
Remove node_modules and Reinstall (npm ci)

rm -rf node_modules
npm ci
Installs dependencies strictly from package-lock.json for consistent builds.
Generate a package-lock.json (npm install)

Automatically generated when running npm install to lock versions of dependencies.
When to Use Which Command?
npm install <package>: When adding a new library to your project.
npm update: When you want to update existing dependencies.
npm run <script>: For running custom scripts like build or start.
npm audit fix: When you encounter security vulnerabilities.
npm ci: For clean installs, especially in CI/CD pipelines.

## Basic Express Server

### 1. Install NodeJS

Prerequisites: Make sure you have Node.js and npm installed. You can verify by running:

```bash
node -v
npm -v
```

Create a Project Folder:

```bash
mkdir express-app
cd express-app
```

Initialize a Node.js Project:

```bash
npm init -y
```

Install Express and Other Dependencies:

```bash
npm install express dotenv cors body-parser
```

- `express`: The framework for building web servers.
- `dotenv`: For managing environment variables.
- `cors`: Middleware for enabling CORS.
- `body-parser`: Middleware for parsing incoming requests.

---

### 2. Create Project Structure

```bash
express-app/
│
├── public/               # Static files (HTML, CSS, JS)
├── routes/               # Application routes
│     └── userRoutes.js
├── .env                  # Environment variables
├── app.js                # Main application file
└── package.json          # Project metadata
```

---

### 3. Set Up the Express Server (`app.js`)

```js
// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

### 4. Create a Route (`userRoutes.js`)

```js
// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Mock Database
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
];

// GET all users
router.get('/', (req, res) => {
    res.json(users);
});

// GET a user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// POST a new user
router.post('/', (req, res) => {
    const newUser = { id: Date.now(), name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// DELETE a user
router.delete('/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.status(204).send();
});

module.exports = router;
```

---

### 5. Add Environment Variables (`.env`)

```bash
PORT=3000
```

---

### 6. Test the Application

Start the Server:

```bash
node app.js
```

Test API Endpoints:

- Get All Users: [http://localhost:3000/api/users](http://localhost:3000/api/users)
- Get User by ID: [http://localhost:3000/api/users/1](http://localhost:3000/api/users/1)
- Add New User: POST request with JSON body `{"name": "New User"}` to [http://localhost:3000/api/users](http://localhost:3000/api/users)
- Delete User: DELETE request to [http://localhost:3000/api/users/1](http://localhost:3000/api/users/1)

---

### 7. Serving Static Files (`public/index.html`)

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Express App</title>
</head>
<body>
    <h1>Hello from Express Static File!</h1>
</body>
</html>
```

Visit [http://localhost:3000](http://localhost:3000) to see the static HTML file.

---

### 8. Error Handling and Middleware

Custom Middleware Example:

```js
// Logger Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
```

---

### 9. Package.json Scripts

Add a script for easier server startup:

```json
"scripts": {
    "start": "node app.js"
}
```

Start the server with:

```bash
npm start
```

## Routing

Handling Different HTTP Methods in Express.js

When building APIs with Express.js, you need to handle different types of HTTP requests. The most common HTTP methods are:

- **GET:** Retrieve data from the server.
- **POST:** Send data to the server (e.g., create a new resource).
- **PUT:** Update an existing resource on the server.
- **DELETE:** Remove a resource from the server.

### 1. Handling HTTP Methods with Express.js

#### Example: Basic Routes in Express.js

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON requests

// GET Request - Retrieve data
app.get('/api/products', (req, res) => {
    res.json({ message: 'List of all products' });
});

// POST Request - Create a new resource
app.post('/api/products', (req, res) => {
    const product = req.body;
    res.status(201).json({ message: 'Product created', product });
});

// PUT Request - Update an existing resource
app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    res.json({ message: `Product ${productId} updated`, updatedProduct });
});

// DELETE Request - Remove a resource
app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    res.json({ message: `Product ${productId} deleted` });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```

---

### 2. Route Parameters

**Route parameters** are dynamic segments of a URL. They allow you to handle requests for specific resources.

#### Example: Using Route Parameters

```js
// Example URL: http://localhost:3000/api/products/123

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id; // Access route parameter
    res.json({ message: `Product ID: ${productId}` });
});
```

- `:id` is a placeholder for a specific product ID.
- The value can be accessed via `req.params.id`.

---

### 3. Query Strings

**Query strings** are key-value pairs appended to the URL. They are used for filtering, sorting, or providing additional parameters to the request.

#### Example: Using Query Strings

```js
// Example URL: http://localhost:3000/api/products?category=electronics&sort=price

app.get('/api/products', (req, res) => {
    const category = req.query.category; // Access query string
    const sort = req.query.sort;
    res.json({ message: `Filtering by ${category} and sorting by ${sort}` });
});
```

- The `req.query` object contains all query parameters.
- Useful for optional filters and search parameters.

---

### 4. Combining Route Parameters and Query Strings

```js
// Example URL: http://localhost:3000/api/products/123?ref=homepage

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id; // Route parameter
    const ref = req.query.ref; // Query string
    res.json({ message: `Product ID: ${productId} referred from ${ref}` });
});
```

---

### 5. Example Scenario: Product Management API

#### Scenario: Create, Read, Update, and Delete (CRUD) Products

```js
let products = [
    { id: 1, name: 'Laptop', category: 'electronics' },
    { id: 2, name: 'Chair', category: 'furniture' }
];

// GET all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// GET a product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// POST a new product
app.post('/api/products', (req, res) => {
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT to update a product by ID
app.put('/api/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        products[index] = { id: req.params.id, ...req.body };
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// DELETE a product by ID
app.delete('/api/products/:id', (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.json({ message: 'Product deleted' });
});
```

---

### 6. Test with API Tools

- Use **Postman**, **Insomnia**, or **curl** to test different HTTP methods:
```bash
# GET request
curl http://localhost:3000/api/products

# POST request
curl -X POST -H "Content-Type: application/json" -d '{"name": "Table", "category": "furniture"}' http://localhost:3000/api/products

# PUT request
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Table"}' http://localhost:3000/api/products/1

# DELETE request
curl -X DELETE http://localhost:3000/api/products/1
```

---

### Summary

- **Route Parameters (`:param`)**: Used for required, dynamic data in the URL.
- **Query Strings (`?key=value`)**: Used for optional parameters.
- **HTTP Methods:** `GET`, `POST`, `PUT`, `DELETE` handle CRUD operations.

## Middleware

### What is Middleware in Express.js?

**Middleware** in Express.js is a function that has access to the **request object (`req`)**, the **response object (`res`)**, and the **next middleware function (`next`)** in the application’s request-response cycle. Middleware functions can execute code, modify the request and response objects, end the request-response cycle, and call the next middleware function.

### The Middleware Function Signature

```js
function middlewareFunction(req, res, next) {
    // Execute code
    console.log('Middleware function executed');
    
    // Call the next middleware in the stack
    next();
}
```

- **`req` (Request Object):** Contains information about the HTTP request, such as query parameters, body data, headers, and the URL.
- **`res` (Response Object):** Allows you to send a response back to the client.
- **`next` (Next Function):** When called, it passes control to the next middleware function. If not called, the request will hang.

---

## Types of Middleware Functions

Express.js has five types of middleware:

1. **Application-Level Middleware**
2. **Router-Level Middleware**
3. **Built-in Middleware**
4. **Third-Party Middleware**
5. **Error-Handling Middleware**

#### 1. Application-Level Middleware

Application-level middleware is bound to an instance of the `express` object using `app.use()` or `app.METHOD()` where `METHOD` is an HTTP method (`get`, `post`, `put`, etc.).

##### Example: Logger Middleware

```js
const express = require('express');
const app = express();

// Simple logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Proceed to the next middleware
});

// Home route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

- `app.use()` applies the middleware to all routes.
- The logger will run for every request (`GET /`, `POST /`, etc.).

##### Middleware for Specific Routes

```js
// Middleware only for the /admin route
app.use('/admin', (req, res, next) => {
    console.log('Admin Area');
    next();
});

app.get('/admin', (req, res) => {
    res.send('Welcome to the Admin Area');
});
```

---

#### 2. Router-Level Middleware

Router-level middleware works similarly to application-level middleware but is bound to an instance of `express.Router()`.

```js
const express = require('express');
const app = express();
const router = express.Router();

// Middleware for all routes in this router
router.use((req, res, next) => {
    console.log('Router Middleware');
    next();
});

router.get('/products', (req, res) => {
    res.send('Product List');
});

app.use('/api', router);

app.listen(3000, () => console.log('Server running on port 3000'));
```

- **Router-level middleware** is often used to modularize middleware for different sections of an app.

#### 3. Built-in Middleware

Express comes with some built-in middleware:

##### **a. `express.json()`**

Parses incoming requests with **JSON payloads**.

```js
app.use(express.json());
app.post('/data', (req, res) => {
    res.send(req.body);
});
```

##### **b. `express.urlencoded()`**

Parses **URL-encoded payloads**, typically from HTML form submissions.

```js
app.use(express.urlencoded({ extended: true }));
```

##### **c. `express.static()`**

Serves **static files** such as images, CSS, and JavaScript.

```js
app.use(express.static('public'));
```

Files in the `public` directory can be accessed directly via the browser.

#### 4. Third-Party Middleware

Express integrates easily with external middleware from npm. Some popular ones include:

##### **a. `morgan` - HTTP Request Logger**

```bash
npm install morgan
```

```js
const morgan = require('morgan');
app.use(morgan('tiny'));
```

##### **b. `cors` - Enable CORS (Cross-Origin Resource Sharing)

```bash
npm install cors
```

```js
const cors = require('cors');
app.use(cors());
```

##### **c. `body-parser` - Parse Incoming Request Bodies**

```bash
npm install body-parser
```

```js
const bodyParser = require('body-parser');
app.use(bodyParser.json());
```

---

#### 5. Error-Handling Middleware

Error-handling middleware is defined with **four parameters**: `(err, req, res, next)`. This middleware catches errors from the previous middleware.

```js
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
```

##### Example: Error Handling with Middleware

```js
app.get('/error', (req, res, next) => {
    try {
        throw new Error('Simulated Error');
    } catch (error) {
        next(error); // Passes the error to the error-handling middleware
    }
});
```

---

### Advanced Middleware Concepts

#### 1. Short-Circuiting the Request

You can **end the request-response cycle** without calling `next()`:

```js
app.use((req, res, next) => {
    if (!req.headers['authorization']) {
        res.status(403).send('Forbidden');
    } else {
        next(); // Proceed only if authorization header exists
    }
});
```

#### 2. Chaining Multiple Middleware Functions

```js
const middleware1 = (req, res, next) => {
    console.log('Middleware 1');
    next();
};

const middleware2 = (req, res, next) => {
    console.log('Middleware 2');
    next();
};

app.get('/chain', middleware1, middleware2, (req, res) => {
    res.send('Middleware chain complete');
});
```

#### 3. Conditional Middleware Execution

```js
app.use('/admin', (req, res, next) => {
    if (req.user?.isAdmin) {
        next();
    } else {
        res.status(403).send('Not an admin');
    }
});
```

---

### When to Use Middleware?

- **Logging**: Track requests (`morgan`).
- **Authentication & Authorization**: Secure routes (`keycloak-connect`).
- **Request Parsing**: Parse JSON or form data (`express.json`, `body-parser`).
- **Validation**: Validate request data (`express-validator`).
- **Error Handling**: Gracefully manage errors in your app.
- **Performance Monitoring**: Track request performance.


### **Best Practices with Middleware**

1. **Order Matters:** Middleware is executed in the order it is defined.
2. **Avoid Blocking Code:** Keep middleware non-blocking to avoid hanging requests.
3. **Use Next Properly:** Always call `next()` unless you are ending the response.
4. **Scope Middleware Appropriately:** Use router-level middleware to modularize and avoid global application of unnecessary middleware.

### Summary

- **Middleware** is a function that intercepts the request-response cycle.
- There are **application-level**, **router-level**, **built-in**, **third-party**, and **error-handling** middleware.
- Middleware can be used for **logging**, **authentication**, **data parsing**, **CORS**, **static file serving**, and **error management**.
- The order of middleware matters and `next()` is crucial for passing control to the next middleware.

### Using Keycloak Middleware for Authentication in Express.js

To secure your Express.js application with Keycloak authentication, you can leverage **Keycloak's middleware** (`keycloak-connect`). This allows you to protect routes and handle role-based access control (RBAC) seamlessly.

#### 1. Prerequisites

- **Keycloak Server** running locally or on a server.
- **Express.js Application** set up with `express`, `keycloak-connect`, and `express-session`.

#### Install Required Packages

```bash
npm install express keycloak-connect express-session
```

---

#### 2. Configure Keycloak Middleware (`config/keycloak-config.js`)

```js
// config/keycloak-config.js
const session = require('express-session');
const Keycloak = require('keycloak-connect');

// Create a session store to be used by Keycloak
const memoryStore = new session.MemoryStore();

const keycloakConfig = {
    "auth-server-url": "http://localhost:8080/auth",
    "realm": "your_realm_name",
    "clientId": "your_client_id",
    "credentials": {
        "secret": "your_client_secret"
    }
};

// Initialize Keycloak with session store and configuration
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

module.exports = { keycloak, memoryStore };
```

#### 3. Set Up Express App with Keycloak Middleware (`app.js`)

```js
// app.js
const express = require('express');
const session = require('express-session');
const { keycloak, memoryStore } = require('./config/keycloak-config');

const app = express();
const PORT = 3000;

// Session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// Keycloak middleware
app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/admin'
}));

// Public route (no authentication required)
app.get('/', (req, res) => {
    res.send('Public Content - No Authentication Required');
});

// Protected route (requires authentication)
app.get('/protected', keycloak.protect(), (req, res) => {
    res.send('Protected Content - You are authenticated');
});

// Role-based route (requires "admin" role)
app.get('/admin', keycloak.protect('admin'), (req, res) => {
    res.send('Admin Content - You have the admin role');
});

// Logout route
app.get('/logout', (req, res) => {
    res.redirect('/');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```

#### 4. Keycloak Middleware Explained

##### 1. `keycloak.protect()` - General Authentication

- **Without Parameters:** Protects a route, allowing only authenticated users.
```js
app.get('/protected', keycloak.protect(), (req, res) => {
    res.send('Protected Content');
});
```

##### 2. `keycloak.protect('role')` - Role-Based Access Control (RBAC)

- **With Role Parameter:** Restricts access to users with a specific role (`admin` in this example).
```js
app.get('/admin', keycloak.protect('admin'), (req, res) => {
    res.send('Admin Content');
});
```

#### 5. Setting Up Keycloak for Roles and Permissions

##### Step-by-Step in Keycloak Admin Console

1. **Create a Realm:** e.g., `my_realm`.
2. **Create a Client:** e.g., `my_client`, set access type to `confidential`.
3. **Generate Client Secret:** Copy this to your `keycloak-config.js`.
4. **Create Roles:** e.g., `admin`, `user`.
5. **Create Users:** Assign roles to users under the **Role Mappings** tab.
6. **Configure Client Roles:** Go to **Client Roles** and set role-based permissions.

#### 6. Test the Application

##### Public Route (`GET /`)

```bash
curl http://localhost:3000/
```
- **Expected Response:** `Public Content - No Authentication Required`

##### Protected Route (`GET /protected`)

- **Without Token:** Should redirect to Keycloak login.
- **With Valid Token:** Should return `Protected Content - You are authenticated`.

##### Admin Route (`GET /admin`)

- **Without Admin Role:** Should be **forbidden**.
- **With Admin Role:** Should return `Admin Content - You have the admin role`.

#### 7. Testing with Postman or curl

##### Get an Access Token from Keycloak

```bash
curl -X POST http://localhost:8080/auth/realms/my_realm/protocol/openid-connect/token \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=password" \
    -d "client_id=my_client" \
    -d "client_secret=your_client_secret" \
    -d "username=testuser" \
    -d "password=testpassword"
```

##### Access Protected Route with Token

```bash
curl -H "Authorization: Bearer your_access_token" http://localhost:3000/protected
```

##### Access Admin Route with Token

```bash
curl -H "Authorization: Bearer your_admin_access_token" http://localhost:3000/admin
```

#### 8. Error Handling Middleware

```js
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
    } else {
        res.status(500).send('Server error');
    }
});
```

#### 9. Best Practices for Keycloak Middleware

1. **Use `keycloak.protect()`** on all routes that require authentication.
2. **Implement Role-Based Access Control** by specifying roles in the middleware.
3. **Always Call `next()`** in custom middleware to avoid hanging requests.
4. **Handle Errors Gracefully** using error-handling middleware.

## Connecting to a Database & Keycloak

To connect your Express.js app to a PostgreSQL database and integrate Keycloak for user management, follow these steps:

### 1. Install Required Packages

```bash
npm install pg sequelize sequelize-cli pg-hstore keycloak-connect
```

- `pg`: PostgreSQL client for Node.js.
- `sequelize`: ORM (Object-Relational Mapping) for managing database operations.
- `sequelize-cli`: Command-line tool for Sequelize.
- `pg-hstore`: Required for PostgreSQL and Sequelize integration.
- `keycloak-connect`: Middleware for Keycloak integration.

---

### 2. Configure Sequelize

#### Create Sequelize Configuration Files

```bash
npx sequelize-cli init
```

Directory structure generated:

```
express-app/
├── config/
│    └── config.json       # Database configuration
├── models/
│    ├── index.js
│    └── user.js           # User model
├── migrations/            # Migration files
├── seeders/               # Seeder files
└── app.js                 # Main application
```

#### Update `config/config.json`

```json
{
  "development": {
    "username": "your_db_user",
    "password": "your_db_password",
    "database": "your_db_name",
    "host": "localhost",
    "dialect": "postgres"
  }
}
```

#### Create a PostgreSQL Database

```bash
createdb your_db_name
```

---

### 3. Define the User Model

#### Create User Model with Sequelize

```bash
npx sequelize-cli model:generate --name User --attributes name:string,email:string
```

This generates a migration file and updates the `models/user.js` file.

#### Migrate Database

```bash
npx sequelize-cli db:migrate
```

---

### 4. Set Up Keycloak Middleware

#### Create Keycloak Configuration (`config/keycloak-config.js`)

```js
// config/keycloak-config.js
const session = require('express-session');
const Keycloak = require('keycloak-connect');

// Create a session-store to be used by Keycloak
const memoryStore = new session.MemoryStore();

const keycloakConfig = {
    "auth-server-url": "http://localhost:8080/auth",
    "realm": "your_realm_name",
    "clientId": "your_client_id",
    "credentials": {
        "secret": "your_client_secret"
    }
};

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

module.exports = { keycloak, memoryStore };
```

---

### 5. Integrate Express, Sequelize, and Keycloak (`app.js`)

```js
// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const { keycloak, memoryStore } = require('./config/keycloak-config');
const userRoutes = require('./routes/userRoutes');
const { User } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Session for Keycloak
app.use(session({
    secret: 'some_secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// Keycloak middleware
app.use(keycloak.middleware());

// Routes
app.use('/api/users', keycloak.protect(), userRoutes);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

### 6. Update User Routes (`routes/userRoutes.js`)

```js
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
```

---

### 7. Protect Routes with Keycloak

```js
// Protecting specific routes
router.get('/', keycloak.protect(), async (req, res) => {
    // Protected route
});
```

- `keycloak.protect()` ensures only authenticated users can access the route.

---

### 8. Test the Application

#### Start the Server

```bash
npm start
```

#### Test the API Endpoints

- Get All Users: [http://localhost:3000/api/users](http://localhost:3000/api/users)
- Add a New User: POST to `/api/users` with JSON `{ "name": "Test User", "email": "test@example.com" }`
- Delete a User: DELETE `/api/users/1`

#### Test Keycloak Authentication

1. Make sure Keycloak server is running.
2. Access protected routes with valid Keycloak tokens.


#### Create a Seeder

```bash
npx sequelize-cli seed:generate --name demo-user
```

#### Add Seeder Code (`seeders/xxxx-demo-user.js`)

```js
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            { name: 'John Doe', email: 'john@example.com', createdAt: new Date(), updatedAt: new Date() }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
```

#### Run the Seeder

```bash
npx sequelize-cli db:seed:all
```

To containerize your Express.js application with a PostgreSQL database and Keycloak, follow these steps:

---

## Deployment

### 1. Directory Structure*
Your project structure should look like this:

```
express-app/
├── public/               
├── routes/               
│     └── userRoutes.js
├── config/               
│     ├── keycloak-config.js
│     └── config.json       
├── models/               
│     ├── index.js
│     └── user.js
├── docker/               
│     ├── Dockerfile        
│     └── nginx.conf         
├── .env                  
├── app.js                
├── docker-compose.yml     
└── package.json
```

### 2. Create Dockerfile for Express App (`docker/Dockerfile`)

```Dockerfile
# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

---

### 3. Create `docker-compose.yml` File

```yaml
version: '3.9'

services:
  app:
    build:
      context: .
      dockerfile: docker/Dockerfile
    container_name: express-app
    ports:
      - '3000:3000'
    environment:
      - PORT=3000
      - DATABASE_URL=postgres://user:password@db:5432/express_db
      - KEYCLOAK_SERVER_URL=http://keycloak:8080
      - KEYCLOAK_REALM=your_realm_name
      - KEYCLOAK_CLIENT_ID=your_client_id
      - KEYCLOAK_CLIENT_SECRET=your_client_secret
    volumes:
      - .:/app
    depends_on:
      - db
      - keycloak

  db:
    image: postgres:15
    container_name: express-db
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: express_db
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

  keycloak:
    image: quay.io/keycloak/keycloak:22.0
    container_name: keycloak
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
    ports:
      - '8080:8080'
    command: start-dev

  nginx:
    image: nginx:alpine
    container_name: nginx-server
    ports:
      - '80:80'
    volumes:
      - ./docker/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app

volumes:
  pgdata:
```

### 4. Create NGINX Configuration (`docker/nginx.conf`)

```nginx
worker_processes 1;

events { worker_connections 1024; }

http {
    include /etc/nginx/mime.types;
    sendfile on;

    upstream express_app {
        server app:3000;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://express_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### 5. Configure Keycloak (`config/keycloak-config.js`)

```js
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();

const keycloakConfig = {
    "auth-server-url": process.env.KEYCLOAK_SERVER_URL,
    "realm": process.env.KEYCLOAK_REALM,
    "clientId": process.env.KEYCLOAK_CLIENT_ID,
    "credentials": {
        "secret": process.env.KEYCLOAK_CLIENT_SECRET
    }
};

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

module.exports = { keycloak, memoryStore };
```

### 6. Add Database Configuration (`config/config.json`)

```json
{
  "development": {
    "username": "user",
    "password": "password",
    "database": "express_db",
    "host": "db",
    "dialect": "postgres"
  }
}
```

### 7. Environment Variables (`.env`)

```bash
PORT=3000
DATABASE_URL=postgres://user:password@db:5432/express_db
KEYCLOAK_SERVER_URL=http://keycloak:8080
KEYCLOAK_REALM=your_realm_name
KEYCLOAK_CLIENT_ID=your_client_id
KEYCLOAK_CLIENT_SECRET=your_client_secret
```

---

### 8. Run the Containers

```bash
docker-compose up --build
```

- Express app: [http://localhost:3000](http://localhost:3000)
- Keycloak admin console: [http://localhost:8080](http://localhost:8080)

---

### 9. Verify Keycloak Setup

- Log in to Keycloak (`admin/admin`).
- Create a new realm.
- Set up a client with the same `client_id` and `client_secret` as in your `.env` file.
- Configure roles and permissions as needed.

### 10. Test API with Authentication

- Obtain an access token from Keycloak.
- Access protected routes using tools like `Postman` or `curl` with the token.

Run migrations and seeders inside the container:

```bash
docker exec -it express-app npx sequelize-cli db:migrate
docker exec -it express-app npx sequelize-cli db:seed:all
```

## Security

To add HTTPS to your Dockerized Express.js application with NGINX, follow these steps:

### 1. Generate SSL Certificates

#### Option 1: Self-Signed Certificate (For Development Only)

```bash
mkdir -p certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certs/selfsigned.key \
  -out certs/selfsigned.crt \
  -subj "/CN=localhost"
```

- `certs/selfsigned.key`: SSL private key.
- `certs/selfsigned.crt`: SSL certificate.

### 2. Update `nginx.conf` for HTTPS

#### `docker/nginx.conf`

```nginx
worker_processes 1;

events { worker_connections 1024; }

http {
    include /etc/nginx/mime.types;
    sendfile on;

    upstream express_app {
        server app:3000;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            return 301 https://$host$request_uri;
        }
    }

    server {
        listen 443 ssl;
        server_name localhost;

        ssl_certificate /etc/nginx/certs/selfsigned.crt;
        ssl_certificate_key /etc/nginx/certs/selfsigned.key;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        location / {
            proxy_pass http://express_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### 3. Update `docker-compose.yml` for HTTPS

```yaml
version: '3.9'

services:
  app:
    build:
      context: .
      dockerfile: docker/Dockerfile
    container_name: express-app
    ports:
      - '3000:3000'
    environment:
      - PORT=3000
      - DATABASE_URL=postgres://user:password@db:5432/express_db
      - KEYCLOAK_SERVER_URL=http://keycloak:8080
      - KEYCLOAK_REALM=your_realm_name
      - KEYCLOAK_CLIENT_ID=your_client_id
      - KEYCLOAK_CLIENT_SECRET=your_client_secret
    volumes:
      - .:/app
    depends_on:
      - db
      - keycloak

  db:
    image: postgres:15
    container_name: express-db
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: express_db
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

  keycloak:
    image: quay.io/keycloak/keycloak:22.0
    container_name: keycloak
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
    ports:
      - '8080:8080'
    command: start-dev

  nginx:
    image: nginx:alpine
    container_name: nginx-server
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./docker/nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs
    depends_on:
      - app

volumes:
  pgdata:
```

- Ports Exposed: HTTP (`80`) and HTTPS (`443`).
- SSL Certificates: Mounted into NGINX container.

### 4. Rebuild and Run the Containers

```bash
docker-compose down
docker-compose up --build
```

- Access the application via: [https://localhost](https://localhost)

#### Browser Warning (for Self-Signed Certificate)

You might see a security warning in the browser due to the self-signed certificate. This is expected in development.

### 5. Production Setup with Let's Encrypt

#### Install Certbot and Generate SSL Certificates

```bash
docker run -it --rm \
  -v certs:/etc/letsencrypt \
  -v certs-data:/data/letsencrypt \
  certbot/certbot certonly \
  --standalone \
  -d yourdomain.com
```

#### Update NGINX Config for Let's Encrypt

```nginx
ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
```

#### Automate SSL Certificate Renewal

```bash
docker run -it --rm \
  -v certs:/etc/letsencrypt \
  -v certs-data:/data/letsencrypt \
  certbot/certbot renew
```

Schedule a cron job to run this command periodically.

#### HTTP Strict Transport Security (HSTS)

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

#### Force HTTPS in Express App

```js
app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
});
```
# React
### Connecting Express.js API with a Frontend Application and Securing Routes with Keycloak

---

# 1. Setup: Frontend with React and Backend with Express.js

### Directory Structure

```
project/
├── backend/                # Express.js API
│    ├── routes/
│    │    └── productRoutes.js
│    ├── config/
│    │    └── keycloak-config.js
│    ├── models/
│    ├── app.js
│    └── package.json
├── frontend/               # React Application
│    ├── public/
│    ├── src/
│    │    ├── components/
│    │    ├── App.js
│    │    ├── index.js
│    │    └── keycloak.js
│    └── package.json
├── docker-compose.yml
└── nginx.conf
```

---

# 2. Backend: Express.js API with Keycloak Authentication

### Install Required Packages

```bash
cd backend
npm install express cors body-parser keycloak-connect axios
```

### Setup Keycloak (`config/keycloak-config.js`)

```js
// config/keycloak-config.js
const session = require('express-session');
const Keycloak = require('keycloak-connect');

// Create a session store for Keycloak
const memoryStore = new session.MemoryStore();

const keycloakConfig = {
    "auth-server-url": "http://localhost:8080/auth",
    "realm": "your_realm_name",
    "clientId": "your_client_id",
    "credentials": {
        "secret": "your_client_secret"
    }
};

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

module.exports = { keycloak, memoryStore };
```

---

### Define Product Routes (`routes/productRoutes.js`)

```js
// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { keycloak } = require('../config/keycloak-config');

let products = [
    { id: 1, name: 'Laptop', category: 'electronics' },
    { id: 2, name: 'Chair', category: 'furniture' }
];

// GET all products (public)
router.get('/', (req, res) => {
    res.json(products);
});

// GET a product by ID (protected)
router.get('/:id', keycloak.protect(), (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
});

// POST a new product (protected)
router.post('/', keycloak.protect(), (req, res) => {
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// DELETE a product by ID (protected)
router.delete('/:id', keycloak.protect(), (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.json({ message: 'Product deleted' });
});

module.exports = router;
```

---

### Setup Express Server (`app.js`)

```js
// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const { keycloak, memoryStore } = require('./config/keycloak-config');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: 'some_secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

// Keycloak middleware
app.use(keycloak.middleware());

// Routes
app.use('/api/products', productRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
```

---

# 3. Frontend: React Application with Keycloak Integration

### Create React App

```bash
cd ../
npx create-react-app frontend
cd frontend
npm install keycloak-js axios
```

---

### Keycloak Configuration (`src/keycloak.js`)

```js
// src/keycloak.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080/auth',
    realm: 'your_realm_name',
    clientId: 'your_client_id',
});

export default keycloak;
```

---

### Setup React App (`src/App.js`)

```js
// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import keycloak from './keycloak';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';

const ProductList = () => {
    const { keycloak } = useKeycloak();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products', {
            headers: keycloak.authenticated ? {
                Authorization: `Bearer ${keycloak.token}`
            } : {}
        }).then(response => {
            setProducts(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, [keycloak]);

    return (
        <div>
            <h2>Products</h2>
            {products.map(product => (
                <div key={product.id}>{product.name}</div>
            ))}
            {keycloak.authenticated && (
                <button onClick={() => keycloak.logout()}>Logout</button>
            )}
            {!keycloak.authenticated && (
                <button onClick={() => keycloak.login()}>Login</button>
            )}
        </div>
    );
};

const App = () => (
    <ReactKeycloakProvider authClient={keycloak}>
        <ProductList />
    </ReactKeycloakProvider>
);

export default App;
```

---

### Run the Frontend Application

```bash
npm start
```

---

# 4. Dockerize the Full Application

### Docker Compose (`docker-compose.yml`)

```yaml
version: '3.9'

services:
  backend:
    build: ./backend
    container_name: express-app
    ports:
      - '5000:5000'
    environment:
      - PORT=5000
      - KEYCLOAK_SERVER_URL=http://keycloak:8080
      - KEYCLOAK_REALM=your_realm_name
      - KEYCLOAK_CLIENT_ID=your_client_id
      - KEYCLOAK_CLIENT_SECRET=your_client_secret
    depends_on:
      - keycloak

  frontend:
    container_name: react-app
    image: node:18
    working_dir: /app
    volumes:
      - ./frontend:/app
    ports:
      - '3000:3000'
    command: ["npm", "start"]

  keycloak:
    image: quay.io/keycloak/keycloak:22.0
    container_name: keycloak
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
    ports:
      - '8080:8080'
    command: start-dev
```

---

### Build and Run Docker Containers

```bash
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)
- Keycloak: [http://localhost:8080](http://localhost:8080)

---

# 5. Test and Secure Routes

1. **Access Frontend:** Login with Keycloak from the React app.
2. **View Products:** Ensure protected routes are accessible only when authenticated.
3. **Test API:** Manually test API endpoints using tools like Postman with a valid Keycloak token.

### Securing Frontend Components in React with Keycloak Authentication

To ensure that only authenticated users can access specific components, we will use **React Router** with **Keycloak**. We'll create **protected routes** that check if the user is authenticated before rendering components.

#### 1. Install Required Packages

```bash
cd frontend
npm install react-router-dom @react-keycloak/web
```

- `react-router-dom`: Provides routing capabilities in React.
- `@react-keycloak/web`: Connects React with Keycloak for authentication.

---

#### 2. Keycloak Setup (`src/keycloak.js`)

```js
// src/keycloak.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080/auth',
    realm: 'your_realm_name',
    clientId: 'your_client_id',
});

export default keycloak;
```

#### 3. Create Protected Route Component (`src/ProtectedRoute.js`)

```js
// src/ProtectedRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { keycloak } = useKeycloak();

    return (
        <Route
            {...rest}
            render={(props) => 
                keycloak?.authenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
```

- **`ProtectedRoute`**: A custom route that checks if the user is authenticated.
- If not authenticated, the user is redirected to the **login page**.

#### 4. Update App Component with Routing (`src/App.js`)

```js
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import ProtectedRoute from './ProtectedRoute';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Login from './components/Login';

const App = () => {
    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <Router>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/login">Login</Link>
                </nav>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <ProtectedRoute path="/products" component={ProductList} />
                </Switch>
            </Router>
        </ReactKeycloakProvider>
    );
};

export default App;
```

- **Public Routes:** `Home` and `Login` pages.
- **Protected Route:** The `ProductList` component is only accessible when authenticated.

#### 5. Create ProductList Component (`src/components/ProductList.js`)

```js
// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

const ProductList = () => {
    const { keycloak } = useKeycloak();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (keycloak.authenticated) {
            axios.get('http://localhost:5000/api/products', {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            })
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products', error));
        }
    }, [keycloak]);

    return (
        <div>
            <h2>Products</h2>
            {products.map(product => (
                <div key={product.id}>{product.name}</div>
            ))}
            <button onClick={() => keycloak.logout()}>Logout</button>
        </div>
    );
};

export default ProductList;
```

#### 6. Create Login Component (`src/components/Login.js`)

```js
// src/components/Login.js
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Login = () => {
    const { keycloak } = useKeycloak();

    const handleLogin = () => {
        keycloak.login();
    };

    return (
        <div>
            <h2>Login Page</h2>
            {!keycloak.authenticated ? (
                <button onClick={handleLogin}>Login with Keycloak</button>
            ) : (
                <button onClick={() => keycloak.logout()}>Logout</button>
            )}
        </div>
    );
};

export default Login;
```

#### 7. Create Public Home Component (`src/components/Home.js`)

```js
// src/components/Home.js
import React from 'react';

const Home = () => (
    <div>
        <h2>Welcome to the Home Page</h2>
        <p>This page is accessible to everyone.</p>
    </div>
);

export default Home;
```

#### 8. Optional: Improve User Experience

##### Show Loader During Authentication (`App.js`)

```js
<ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{ onLoad: 'login-required' }}
    LoadingComponent={<div>Loading...</div>}
>
```

### Handle Automatic Login (`ProtectedRoute.js`)

```js
<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
```