import Card from "../components/Card";
import { useState } from "react";
import gearLoad from "../components/assets/Gear-0.2s-264px.svg"

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    // search
    function searchOnChange(event) {
        let newSearch = event.target.value;
        setSearch(newSearch);
    }

    return (
        <>
            <div id="PAGE-HOME" className="p-3">
                {/* search */}
                <form action="" method="get" className="flex justify-center items-center">
                    <input
                        type="search"
                        name="search"
                        placeholder="Search"
                        className="input input-bordered input-accent md:w-auto mx-1 mt-5 input-sm"
                        onChange={searchOnChange}
                    />
                </form>


                {loading ? (
                    <div className="mt-32 flex justify-center items-center">
                        <img src={gearLoad} />
                    </div>
                ) : (
                    <main className="grid grid-cols-2 gap-5 px-10 my-8 bg-white">
                        {products.map(product => {
                            return <Card key={product.id} product={product} />
                        })}
                    </main>
                )}
            </div >
        </>
    )
}