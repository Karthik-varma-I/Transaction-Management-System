const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT;
const routes = require('./routes/routes');
app.use(cors());
app.use('/api', express.json());
app.use('/api', routes);
app.use('/', express.static('../client'));



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});