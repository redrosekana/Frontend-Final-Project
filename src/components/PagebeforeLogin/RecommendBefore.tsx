function RecommendBefore() {
  return (
    <main>
      <div className="px-5 mt-12 max-w-[1400px] mx-auto">
        <h3 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold">Recommend Boardgame</h3>
        <form className="flex items-center max-w-3xl w-full mx-auto mt-8">   
            <div className="relative w-full h-12">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" className="h-full bg-gray-50 border border-gray-400 text-gray-800 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5" placeholder="Search"/>
            </div>
            <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-limegreen rounded-lg border border-green-500 hover:bg-green-600 focus:ring-2 focus:outline-none focus:ring-green-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
        </form>
      </div>
    </main>
  )
}

export default RecommendBefore
