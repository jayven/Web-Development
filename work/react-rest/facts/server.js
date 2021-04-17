const express = require('express');
const app = express();
const PORT = 5000;

const facts = require('./facts');
app.use(express.static('./build'));

app.get('/facts', (req, res) => {
    res.setTimeout(3000,function () {
        res.status(200).json(facts);
    });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});