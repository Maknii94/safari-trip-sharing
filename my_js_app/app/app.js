const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configure session middleware
const { memoryStore, keycloak } = require('./middleware/auth');
app.use(session({
  secret: 'some secret', // In production, use an environment variable
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
// Use express-ejs-layouts middleware
app.use(expressLayouts);
// Set the default layout (optional)
app.set('layout', 'layout'); // Assumes 'views/layout.ejs' as the layout file
app.set('views', path.join(__dirname, 'views'));
// Serve static files (CSS, images, JS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Keycloak Middleware
app.use(keycloak.middleware({
  admin: '/'
}));

// Routes
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const extendedSearchRoutes = require('./routes/extendedSearchRoutes');

app.use('/', authRoutes);
app.use('/trips', tripRoutes);
app.use('/extended-search', extendedSearchRoutes);

// Home Route
app.get('/', (req, res) => {
  const user = req.session.user || null;
  res.render('home', { user, title: 'Safari Trip App - Home' });
});

// Error Handling Middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
