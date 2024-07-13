import mongoose from 'mongoose';
const subTodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    completeBy:{
        type: Date,
        default: null,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    todoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo',
    },
}, { timestamps: true });

const SubTodo = mongoose.model('SubTodo', subTodoSchema);
export default SubTodo;