

const WelcomeMessage = () => {
  return (
    <div className="w-full px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-linear-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-xl p-16 text-center border-2 border-blue-300">
          <p className="text-5xl mb-6">👋</p>
          <p className="text-4xl font-bold text-gray-800 mb-4">Welcome!</p>
          <p className="text-xl text-gray-700 mb-4 font-semibold">Enjoy Your Day</p>
          <p className="text-lg text-gray-600">Add a new task using the form above to get started →</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
