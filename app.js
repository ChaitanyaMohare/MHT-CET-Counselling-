require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

// Make session available to all views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/packages'));
app.use('/', require('./routes/basicInfo'));
app.use('/', require('./routes/payment'));
app.use('/', require('./routes/mainForm'));
app.use('/', require('./routes/contact'));
app.use('/', require('./routes/terms'));
app.use('/', require('./routes/privacy'));
app.use('/', require('./routes/admin'));
app.use('/', require('./routes/quickLead'));

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Global error handler caught:', err);
  console.error('Error stack:', err.stack);
  
  // Don't expose error details in production
  const errorMessage = process.env.NODE_ENV === 'production' 
    ? 'Something went wrong. Please try again.' 
    : err.message;
  
  res.status(err.status || 500).render('error', { 
    title: 'Server Error', 
    error: errorMessage 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
