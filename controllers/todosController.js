const Todo = require("../models/Todo");
const asyncHandler = require("express-async-handler");

const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find().lean();
  if (!todos) {
    return res.status(400).json({ message: "No todo found" });
  }
  res.json(todos);
});

const createNewTodo = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }
  const dublicate = await Todo.findOne({ content }).lean().exec();
  if (dublicate) {
    return res.status(409).json({ message: "Dublicated todo" });
  }
  const todoObject = { content };
  const todo = await Todo.create(todoObject);
  if (todo) {
    return res.status(201).json({ message: `${content} added` });
  } else {
    return res.status(400).json({ message: "Invalid todo data received" });
  }
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id, completed } = req.body;
  if (!id || !completed.toString()) {
    return res.status(400).json({ message: "All fields are requiered" });
  }
  const todo = await Todo.findById(id).exec();
  if (!todo) {
    return res.status(400).json({ message: "Todo not found" });
  }
  todo.completed = completed;
  const updatedTodo = await todo.save();
  res.json(updatedTodo);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Todo ID required" });
  }
  const todo = await Todo.findById(id).exec();
  if (!todo) {
    return res.status(400).json({ message: "Todo not found" });
  }
  const result = await todo.deleteOne();
  const reply = `Todo with content ${result.content} and ID ${result._id} deleted`;
  res.json(reply);
});

module.exports = { getAllTodos, createNewTodo, deleteTodo, updateTodo };
