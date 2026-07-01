import React from 'react';

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-indigo-400 mb-8">🚀 EdTech Student</h2>
          <nav className="space-y-4">
            <a href="#" className="block py-2 px-4 bg-indigo-600 rounded text-sm font-medium">Dashboard</a>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded text-sm font-medium text-gray-300">My Courses</a>
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded text-sm font-medium text-gray-300">Assignments</a>
          </nav>
        </div>
        <div className="text-xs text-gray-500">Logged in as Student</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 p-4 shadow flex justify-between items-center px-8">
          <h1 className="text-lg font-semibold">Welcome Back, Student!</h1>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-sm font-medium">Logout</button>
        </header>

        {/* Dashboard Panels */}
        <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium">Enrolled Courses</h3>
            <p className="text-3xl font-bold mt-2">4</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium">Pending Tasks</h3>
            <p className="text-3xl font-bold mt-2">2</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium">Platform Status</h3>
            <p className="text-emerald-400 text-sm font-medium mt-2">Connected to Node.js Backend</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;