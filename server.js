const express = require('express');
const path = require('path');
const api = require('./server/routes/api');

const app = express();

const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/weatherDB", {
  useNewUrlParser: true,
}).catch((err) => console.log(err)).catch((err) => console.log(err))

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', api);

const PORT = 1202;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});