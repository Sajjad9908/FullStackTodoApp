const TodoItem = require("../models/todoItem")




exports.createTodoItem = async(req, res,next) => {
    console.log("Request Body:", req.body); // Debugging line  
const{task,date}=req.body
if(!task || !date){
    return res.status(400).json({error:"Task and Date are required"})
}
try {
    const todoItem=new TodoItem({
    task,date
})
    await todoItem.save();
    res.status(201).json({message:"Todo Item created successfully",todoItem})

} catch (error) {
    res.status(500).json({error:"Internal Server Error",error: error.message} )
}


}
exports.getTodoItems=async(req,res)=>{
    try {
        const todoItem= await TodoItem.find();
        if(todoItem.length===0){
            return res.status(404).json({error:"No Todo Items found"})
        }
      return res.status(200).json({todoItem})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error",error: error.message} )
    }
}

exports.DeleteTodoItem=async(req,res)=>{
    const{id}=req.params;
    try {
        const todoItem= await TodoItem.findByIdAndDelete(id)
        if(!todoItem){
            return res.status(404).json({error:"Todo Item not found"})
        }
        return res.status(200).json({message:"Todo Item deleted successfully",id:todoItem._id})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error",error: error.message} )
    }
}
exports.markCompleted=async(req,res)=>{
    const{id}=req.params;
    try {
        const todoItem= await TodoItem.findById(id);
        todoItem.completed=true;
        await todoItem.save();
        return res.status(200).json({message:"Todo Item marked as completed",todoItem})
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error",error: error.message} )
    }
}

exports.UpdateDb=async(req,res)=>{
    const{id}=req.params;
    const {task,date,completed}=req.body;
    try {
        if(!task || !date){
            return res.status(400).json({error:"Task and Date are required"})
        }
        const updateItem=await TodoItem.findByIdAndUpdate(id,{
            task,date,completed
            }, { new:true}
        );
        if(!updateItem){
            return res.status(404).json({error:"Todo Item not found"})
        }
        return res.status(200).json({message:"Todo Item updated successfully",updateItem})
    } catch (error) {
        console.error("Error updating item:", error);
        return res.status(500).json({error:"Internal Server Error",error: error.message} )
    }
}