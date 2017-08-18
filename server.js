"use strict";

const express = require('express');
const app = new express();
app.set('view engine', 'ejs');
const quotes = require('./assets/quotes.js');
const url = require('url');


app.use(express.static('./'))

app.get('/', function(req, res){
  var qtLn = quotes.length;
  var rand = Math.floor(Math.random() * qtLn);
 	res.render('index',{
    maxIndex: qtLn - 1,
    rand: rand,
    author: quotes[rand].author,
    quote: quotes[rand].quote,
    url: req.get('host')
  });
});

// --- API \/
app.get('/:str', (req, res) => {

  var str = req.params.str;

  // getting the length of quotes
  var qtLn = quotes.length;
  var rand = Math.floor(Math.random() * qtLn);

  // cheking for valid arguments
  var isValid = str === 'rand' || str === 'all' || str === 'maxIndex' ||
    (typeof parseInt(str) === 'number' && (parseInt(str) > -1 && parseInt(str) < qtLn));

  // error JSON for invalid arguments
  if (!isValid) {
    return res.json({error: `/${str} <-- is invalid`, try: '/rand', or: '/all', 'also': `/${rand}`})
  }

  // return the number for the maxIndex
  if (str === 'maxIndex') {return res.json(qtLn - 1)};

  // return a random quote
  if (str === 'rand') {
    return res.json(quotes[rand]);
  }

  // return all quotes
  if (str === 'all') {
    return res.json(quotes);
  }

  // return a specific quote
  if (typeof parseInt(str) === 'number') {
    return res.json(quotes[str]);
  }
})
// --- API /\

app.listen(3000, () => {
  console.log("Listening");
});
