import express from 'express';
require('../src/mongoose');
var cors = require('cors')

export const app = express();
const port = process.env.PORT || 3001;
app.use(cors())

const movieRouter = require('./routes/movies');

app.use('/movies', movieRouter);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
