import express from "express";
const router = express.Router();
import { register, login } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  createTodo,
  getTodos,
  getTodoData,
  deleteTodo,
} from "../controllers/todo.js";
import { createSubTodo, getSubTodos,markComplete ,deleteSubTodo} from "../controllers/subTodo.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/addcard").post(isAuthenticated, createTodo);
router.route("/getcards").get(isAuthenticated, getTodos);
router.route("/getCardData/:id").get(isAuthenticated, getTodoData);
router.route("/deleteCard/:id").delete(isAuthenticated, deleteTodo);
router.route("/subtodo/:id").post(isAuthenticated, createSubTodo);
router.route("/getSubTodo/:id").get(isAuthenticated, getSubTodos);
router.route("/markComplete/:id").put(isAuthenticated, markComplete);
router.route("/deleteSubtodo/:id").delete(isAuthenticated, deleteSubTodo);
export default router;
