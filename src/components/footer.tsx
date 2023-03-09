function Footer() {
    return (
        <main className="mt-16 lg:mt-40 bg-slate-100 px-5 py-8">
            <h3 className="text-3xl lg:text-4xl text-center font-bold mt-6">Board Game RecCommu</h3>
            <div className="text-center mt-4 lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi inventore quos et illum quaerat optio, saepe minima beatae
            </div>
            
            <div className="mt-4 p-4 flex justify-center gap-x-3">
                <button className="bg-slate-200 hover:bg-slate-300 p-2 rounded-3xl w-28 transition-colors duration-200 ease-in">Insights</button>
                <button className="bg-slate-200  hover:bg-slate-300 p-2 rounded-3xl w-28 transition-colors duration-200 ease-in">Contact</button>
            </div>

            <div className="flex justify-center mt-6 px-8">
                <hr  className="h-[2px] sm:w-max-[1000px] w-full bg-gray-300"/>
            </div>

            <div className="flex flex-col items-center gap-y-4 mt-6 lg:flex-row lg:justify-around">
                <div>
                    <img src="/Logo.png" alt="skeleton" className="w-24 h-24" />
                </div>

                <div className="text-center text-lg lg:text-xl lg:translate-x-14">&copy; 2023 BoardGame RecCommu. All Rights Reserved. </div>

                <div className="flex gap-4">
                    <a href="https://www.facebook.com/nkana.jung" target="_blank"><img src="/facebook.svg" alt="facebook" className="w-[50px] cursor-pointer"/></a>
                    <a href="https://www.instagram.com/kanadss" target="_blank"><img src="/ig.svg" alt="instagram" className="w-[50px] cursor-pointer" /></a>
                    <a href="https://twitter.com/" target="_blank"><img src="/twitter.svg" alt="twitter" className="w-[50px] cursor-pointer" /></a>
                </div>
            </div>
        </main>
    )
}

export default Footer
