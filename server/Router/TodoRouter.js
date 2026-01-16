const express=require('express');
const todoRouter=express.Router(); 
const todoItemController=require('../conroller/todoItemcontroller')

todoRouter.post('/',todoItemController.createTodoItem); 
todoRouter.get('/getitem',todoItemController.getTodoItems);
todoRouter.delete('/:id',todoItemController.DeleteTodoItem);
todoRouter.put('/:id/completed',todoItemController.markCompleted);
todoRouter.put('/:id/update',todoItemController.UpdateDb);


module.exports=todoRouter; 