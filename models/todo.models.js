import mongoose from 'mongoose';
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subTodos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTodo'
    }]

}, {
    timestamps: true,
}
);

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;