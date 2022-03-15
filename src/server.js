const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const PORT = 3000;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json('Express works');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
