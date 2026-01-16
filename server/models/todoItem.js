const mongoose=require('mongoose');

const todoSchema=new mongoose.Schema({
    task:
    {type:String,required:true},
    date:
    {
        type:Date,required:true,
    },
    completed:{
        type:Boolean,default:false
    },
   

},{timestamps:true});
const TodoItem = mongoose.model('TodoItem', todoSchema);

module.exports = TodoItem;
