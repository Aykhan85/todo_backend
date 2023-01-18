const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  createNewTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todosController");

router
  .route("/")
  .get(getAllTodos)
  .post(createNewTodo)
  .patch(updateTodo)
  .delete(deleteTodo);

module.exports = router;
