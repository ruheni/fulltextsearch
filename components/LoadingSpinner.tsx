const LoadingSpinner = () => (
  <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-24 w-24 mb-4"></div>
    <h2 className="text-center text-slate-900 text-xl font-semibold">
      Loading...
    </h2>
  </div>
)

export default LoadingSpinner
