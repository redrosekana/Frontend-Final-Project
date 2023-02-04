import { Spinner } from "flowbite-react"
import React from "react"

export default function Reload() {
    return (
        <React.Fragment>
            <main className='bg-black opacity-30 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'></main>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <Spinner size="xl" className="absolute top-1/2 left-1/2"/>
            </div>
        </React.Fragment>
    )
}
