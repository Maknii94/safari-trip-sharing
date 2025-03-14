# Architecture

- Controllers: Handle request processing and call services.
- Routes: Define URL endpoints and associate them with controllers.
- Middleware: Contain reusable functions like authentication, logging, or error handling.
- Services: Encapsulate business logic and interact with data sources.
- Models: Represent data structures and (if applicable) database schemas.

```bash
/app
  /controllers
    userController.js
  /routes
    userRoutes.js
  /middleware
    auth.js
    errorHandler.js
  /services
    userService.js
  /models
    userModel.js
  app.js
```

Test

```js
const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();
const memoryStore = new session.MemoryStore();

// Configure session middleware
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));


const keycloakConfig = {
    realm: 'MyApp',
    'auth-server-url': 'http://localhost:8080',
    'ssl-required': 'external',
    resource: 'nodejs-app',
    'public-client': true,
    'confidential-port': 0
  };
  
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

  
// Initialize Keycloak middleware
app.use(keycloak.middleware());

// Public route with a link to the protected route
app.get('/', (req, res) => {
  res.send('Public page. <a href="/protected">Go to protected page</a>');
});

// Protected route; redirects to Keycloak login if not authenticated
app.get('/protected', keycloak.protect(), (req, res) => {
  const username = req.kauth.grant.access_token.content.preferred_username;
  res.send(`Hello ${username}`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```