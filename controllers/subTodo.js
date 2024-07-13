import SubTodo from "../models/subToDo.models.js";
import Todo from "../models/todo.models.js";

const createSubTodo = async (req, res) => {
  const todoId = req.params.id;
  const todo = await Todo.findById(todoId);
  try {
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    } else {
      const { content, completeBy } = req.body;
      if (!content) {
        return res.status(400).json({ message: "Content is required" });
      }
      const createdBy = req.user._id;
      const newSubTodo = new SubTodo({
        content: content,
        complete: false,
        completeBy: completeBy,
        createdBy: createdBy,
        todoId: todoId,
      });
      await newSubTodo.save();
      todo.subTodos.push(newSubTodo._id);
      await todo.save();
      return res.status(201).json(newSubTodo);
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the subtodo" });
  }
};

const getSubTodos = async (req, res) => {
  const id = req.params.id;
  try {
    const ParentTodo = await Todo.findById(id);
    if (!ParentTodo) {
      return res.status(404).json({ message: "Parent Todo not found" });
    }
    const subTodos = [];
    for (let i = 0; i < ParentTodo.subTodos.length; i++) {
      const subTodo = await SubTodo.findById(ParentTodo.subTodos[i]);
      if (subTodo !== null) {
        subTodos.push(subTodo);
      }
    }
    // console.log(subTodos);
    return res.status(200).json(subTodos);
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred while getting the subtodos",
      error: err.message,
    });
  }
};

const markComplete = async (req, res) => {
  const id = req.params.id;
  try {
    const subTodo = await SubTodo.findById(id);
    if (!subTodo) {
      return res.status(404).json({ message: "Subtodo not found" });
    }
    subTodo.complete = true;
    await subTodo.save();
    return res.status(200).json(subTodo);
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred while marking the subtodo as complete",
      error: err.message,
    });
  }
};

const deleteSubTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const subTodo = await SubTodo.findById(id);
    if (!subTodo) {
      return res.status(404).json({ message: "Subtodo not found" });
    }
    const TodoId=subTodo.todoId;
    const todoParent=await Todo.findById(TodoId);
    const indexToRemove = todoParent.subTodos.findIndex(subTodo => subTodo._id === id);
    todoParent.subTodos.splice(indexToRemove, 1);
    await todoParent.save();
    await SubTodo.findByIdAndDelete(id);
    return res.status(200).json({ message: "Subtodo deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred while deleting the subtodo",
      error: err.message,
    });
  }
};

export { createSubTodo, getSubTodos, markComplete, deleteSubTodo };
