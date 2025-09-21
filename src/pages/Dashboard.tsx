export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900">🚀 Dashboard Working!</h1>
      <p className="mt-4 text-gray-600">
        If you can see this, the React app is working correctly.
      </p>
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-900">Next Steps:</h2>
        <ul className="mt-2 text-blue-800">
          <li>• The development server is running on http://localhost:3000</li>
          <li>• The mock API is running on http://localhost:3001</li>
          <li>• Check the README.md for assignment instructions</li>
        </ul>
      </div>
    </div>
  )
}