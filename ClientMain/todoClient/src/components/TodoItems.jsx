import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick, onMarkedCompleted,onEditClick }) => {
  // Separate completed and uncompleted tasks
  const uncompletedItems = todoItems.filter(item => !item.completed);
  const completedItems = todoItems.filter(item => item.completed);

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Uncompleted Tasks */}
        {uncompletedItems.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📌 Active Tasks ({uncompletedItems.length})</h2>
            <div>
              {uncompletedItems.map((item) => (
                <TodoItem
                   key={item.id}
                   id={item.id}
                  completed={item.completed}
                  todoDate={item.dueDate}
                  todoName={item.name}
                  onDeleteClick={onDeleteClick}
                  onMarkedCompleted={onMarkedCompleted}
                  onEditClick={onEditClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {completedItems.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-500 mb-6">✅ Completed Tasks ({completedItems.length})</h2>
            <div className="opacity-75">
              {completedItems.map((item) => (
                <TodoItem
                   key={item.id}
                   id={item.id}
                  completed={item.completed}
                  todoDate={item.dueDate}
                  todoName={item.name}
                  onDeleteClick={onDeleteClick}
                  onMarkedCompleted={onMarkedCompleted}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {uncompletedItems.length === 0 && completedItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-3xl mb-2">🎉</p>
            <p className="text-xl text-gray-600">No tasks yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItems;
