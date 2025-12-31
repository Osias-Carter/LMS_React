const express = require('express');
const cors = require('cors');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const coursRoutes = require('./routes/coursRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'academia-lms-secret-2025',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,           
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/cours', coursRoutes);

app.listen(5000, () => console.log('Backend on :5000'));
