import Card from "../components/Card";
import axios from 'axios';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import gearLoad from "../components/assets/Gear-0.2s-264px.svg"

export default function HomePage({ url }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    const config = {
        headers: { Authorization: `Bearer ${localStorage.access_token}` }
    }

    async function fetchProducts() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${url}/apis/pub/branded-things/products?q=${search}&limit=8&page=1&sort=ASC`);
            setProducts(data.data.query);
            console.log(data.data.query);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.error,
            });
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id) {
        try {
            await axios.delete(`${url}/apis/branded-things/products/${id}`, config)
            Swal.fire({
                icon: "success",
                title: "Delete success"
            });
            fetchProducts()
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            });
        }
    }

    // search
    function searchOnChange(event) {
        let newSearch = event.target.value;
        setSearch(newSearch);
    }

    useEffect(() => {
        fetchProducts();
    }, [search])

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
                            return <Card key={product.id} product={product} handleDelete={handleDelete} />
                        })}
                    </main>
                )}
            </div >
        </>
    )
}