const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const methodOverride = require('method-override');

const app = express();

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
// set 'html' as the engine, using ejs's renderFile function

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');


app.get('/', (request, response) => {
  response.render('index');
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
