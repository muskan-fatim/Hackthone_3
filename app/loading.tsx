function MainLoader() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-75"></div>
          <p className="mt-4 text-lg text-blue-600 font-semibold">Loading, please wait...</p>
        </div>
      </div>
    );
  }
  export default MainLoader;