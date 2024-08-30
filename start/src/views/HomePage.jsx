import Card from "../components/Card";
import { useState } from "react";
import gearLoad from "../components/assets/Gear-0.2s-264px.svg"

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')


    return (
        <>
            <div id="PAGE-HOME" className="flex items-center flex-col">
                {/* search */}
                <form className="input input-md w-1/2 input-accent flex items-center mt-10">
                    <input type="text" className="grow" placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)} />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </form>


                {loading ? (
                    <div className="mt-32 flex justify-center items-center">
                        <img src={gearLoad} />
                    </div>
                ) : (
                    <>
                        <main className="grid grid-cols-4 gap-10 p-10">
                            {products.map(product => {
                                return <Card key={product.id} product={product} />
                            })}
                        </main>
                    </>

                )}
            </div >
        </>
    )
}