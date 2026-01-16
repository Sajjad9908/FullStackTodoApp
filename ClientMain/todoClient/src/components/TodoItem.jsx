const TodoItem = ({id, todoName, todoDate, completed, onDeleteClick, onMarkedCompleted, onEditClick }) => {
  // Format date to show only date part (remove time if present)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    // If it contains 'T', it's ISO format with time, extract just the date part
    if (dateString.includes('T')) {
      return dateString.split('T')[0];
    }
    return dateString;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className={`text-lg font-semibold ${completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {todoName}
          </p>
          <p className="text-sm text-gray-500 mt-2">📅 {formatDate(todoDate)}</p>
          {completed && <span className="inline-block mt-2 px-3 py-1 bg-green-200 text-green-800 text-xs font-bold rounded-full">✓ Completed</span>}
        </div>
        <button
          type="button"
          onClick={() => onDeleteClick(id)}
          className="w-full sm:w-auto px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition duration-300 shadow-md hover:shadow-lg"
        >
          Delete
        </button>
          <button
          type="button"
          onClick={() => onMarkedCompleted(id)}
          className="w-full sm:w-auto px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition duration-300 shadow-md hover:shadow-lg"
        >
          Mark as Completed
        </button>
        <button
        type="button"
        onClick={() => onEditClick({id,name:todoName, dueDate: todoDate})}
        className="w-full sm:w-auto px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-300 shadow-md hover:shadow-lg"
>
        
          Edit
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
