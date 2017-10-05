const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

let todolist = [];
var todoState = [];

/* The to do list and the form are displayed */
app.get('/todo', function(req, res) {
    res.render('todo.ejs', { todolist });
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* Updates/Edits an item in the todo list */
.post('/todo/edit/:id', urlencodedParser, function(req,res) {
    if(req.params.id != '') {
      todolist[req.params.id] = req.body.updatetodo;
    }
    res.redirect('/todos');
})

/* For testing since there is no database */
.get('/reset', function(req, res) {
  todolist = [];
  res.redirect('/');
})

/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);

module.exports = app
