import { useEffect, useState } from "react";

function AddTodo({ onNewItem, editingItem, onCancelEdit }) {
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");


  useEffect(()=>{
    if(editingItem){
      setTodoName(editingItem.name || "");
      setDueDate(editingItem.dueDate?.slice(0,10) || "");
    }
    else{
      setTodoName("");
      setDueDate("");
    }

  },[editingItem?.id])
  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddButtonClicked = () => {
    if(editingItem){
      onNewItem(todoName, dueDate, editingItem.id)
      onCancelEdit();
    }
    else{
    onNewItem(todoName, dueDate);
    }
    setDueDate("");
    setTodoName("");
  };
 
  const submitHandler=(e)=>{
    e.preventDefault();

  }
  return (
    <div className="px-4 py-8 flex items-center justify-center w-full">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 ">
          <h2 className="text-2xl font-bold text-gray-800 text-center block mb-5">➕ Add a New Task</h2>
          <form onSubmit={submitHandler} className="flex flex-col sm:flex-row sm:gap-10 gap-4 items-start sm:items-center justify-center">
            <input
              type="text"
              placeholder="Enter your task here..."
              value={todoName}
              onChange={handleNameChange}
              className="flex-1 w-full sm:max-w-4xl px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800"
            />
            <input 
              type="date" 
              value={dueDate} 
              onChange={handleDateChange}
              className="flex-1 shrink px-5 w-full sm:max-w-xs py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-gray-800"
            />
            <button
              type="button"
              onClick={handleAddButtonClicked}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap"
            >
              {editingItem ? '✏️ Update Task' : '+ Add'}
           
            </button>
            {editingItem && (
              <button type="button " onClick={onCancelEdit}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg"
              >
                Cancel Edit X

              </button>
            )}
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
