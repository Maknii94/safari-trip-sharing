// /middleware/auth.js
const session = require('express-session');
const Keycloak = require('keycloak-connect');

// Create an in-memory session store (for development purposes)
const memoryStore = new session.MemoryStore();

// Keycloak configuration (aligns with nodejs-app.json and docker-compose)
const keycloakConfig = {
  realm: 'MyApp', // Adjust as needed
  'auth-server-url': 'http://localhost:8080', // Keycloak server URL
  'ssl-required': 'external',
  resource: 'nodejs-app', // Must match the resource in nodejs-app.json
  'public-client': true,
  'confidential-port': 0
};

// Initialize Keycloak instance with the memory store
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

// Logging middleware to output session and user info
function logSession(req, res, next) {
  // console.log('Session:', req.session);
  if (req.session && req.session.user) {
    req.user = req.session.user;
  }
  console.log('User:', req.user);
  // If using Keycloak, you can also log:
  /*if (req.kauth) {
    console.log('Keycloak Grant:', req.kauth.grant);
  }
  next();*/
}

module.exports = { keycloak, memoryStore, logSession };

