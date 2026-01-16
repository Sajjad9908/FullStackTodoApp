import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useState } from "react";
import { AddItemToServer, DeletefromServer, getItemsFromServer, MarkItemCompletedOnServer, updateItemOnServer } from "./services/ItemService";
import { useEffect } from "react";


function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(()=>{
    const initializeItems=async()=>{
      const itemsFromServer=await getItemsFromServer();
      setTodoItems(itemsFromServer);
    }
    initializeItems();
  }, [])  
  

  const handleNewItem = async(itemName, itemDueDate, _editingId = null) => {
  if(editingItem){
    const updatedItem=await updateItemOnServer(editingItem.id,{task:itemName,date:itemDueDate});
    if(!updatedItem){
      console.error('No item returned from server; skipping state update');
      return;
    }
    setTodoItems((todos=>todos.map((item)=>item.id===editingItem.id? updatedItem:item)))
    setEditingItem(null);
    return;
  }

    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const item =await AddItemToServer(itemName,itemDueDate)
    if(!item){
      console.error('No item returned from server; skipping state update');
      return;
    }
    const newTodoItems = [
      ...todoItems,
     item
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async(id) => {
    const todoItem=await DeletefromServer(id);
    console.log('Deleted item id from server:', todoItem);
    console.log(id)
    if(!todoItem){
      console.error('No item returned from server; skipping state update');
      return;
    }
    const newTodoItems = todoItems.filter((item) => item.id !== todoItem.id);
    setTodoItems(newTodoItems);
  };

  const handleMarkedCompleted=async(id)=>{
    console.log(`Item marked completed: ${id}`);
    const updatedItem=await MarkItemCompletedOnServer(id);
    if(!updatedItem){
      console.error('No item returned from server; skipping state update');
      return;
    }
    setTodoItems((todos=>todos.map((item)=>item.id===id? updatedItem:item)));
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center flex-col">
      <AppName />
      <div className="flex flex-col items-center w-full">
        <AddTodo onNewItem={handleNewItem}
         editingItem={editingItem}
         onCancelEdit={(()=>setEditingItem(null))}
         />
        {todoItems.length === 0 && <WelcomeMessage />}
        <TodoItems
          todoItems={todoItems}
          onDeleteClick={handleDeleteItem}
          onMarkedCompleted={handleMarkedCompleted}
          onEditClick={setEditingItem}
        />
      </div>
    </div>
  );
}

export default App;
