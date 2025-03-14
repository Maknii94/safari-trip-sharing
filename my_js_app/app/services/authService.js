// /services/authService.js
function getUserDetails(req) {
    // Extracts user info from the Keycloak token if available
    if (req.kauth && req.kauth.grant && req.kauth.grant.access_token) {
      return req.kauth.grant.access_token.content;
    }
    return null;
  }
  
  module.exports = { getUserDetails };
  