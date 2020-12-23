const express = require('express');
const morgan = require('morgan');
const product = require('./routes/product.route');
const sale = require('./routes/sale.route');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(morgan('dev'));

app.use('/product', product);
app.use('/sale', sale);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that.")
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.send(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server on port http://localhost:${PORT}.`)
});