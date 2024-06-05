const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Routes
app.use('/', require('./routes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));