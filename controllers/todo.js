import Todo from "../models/todo.models.js";

const createTodo = async (req, res) => {
  try {
    const { title, description, status, createdBy, subTodos } = req.body;
    if (!title || !description || !createdBy) {
      return res
        .status(400)
        .json({ message: "Title, description, and createdBy are required" });
    }
    const newTodo = new Todo({
      title,
      description,
      status,
      createdBy,
      subTodos,
    });

    const savedTodo = await newTodo.save();
    return res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the todo" });
  }
};
const getTodos = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const todos = await Todo.find({ createdBy: createdBy });
    return res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching todos" });
  }
};
const getTodoData = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    return res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching todo data" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the todo" });
  }
};

export { createTodo, getTodos, getTodoData, deleteTodo };
