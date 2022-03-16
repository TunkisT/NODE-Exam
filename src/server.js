const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');

app.use('/', authRoutes);
app.use('/', accountRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
