import { useEffect, useState } from "react";
import axios from 'axios'
import Button from '../components/Button'

export default function ProductsForm({ base_url, product, handleSubmit, nameProp }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState("")
    const [stock, setStock] = useState(0)
    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState([]);

    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${base_url}/apis/branded-things/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setCategories(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (product) {
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setStock(product.stock)
            setImgUrl(product.imgUrl)
            setCategoryId(product.categoryId)
        }
    }, [product])


    return (
        <>
            <form className="p-10 mt-10 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-red-400" onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, stock, categoryId)}>
                <h1 className="text-2xl font-bold text-center mb-4">Add New Product</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            <span className="font-bold">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="rounded-lg w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Description</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Description"
                            className="rounded-lg w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Price</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Price"
                            className="rounded-lg w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Stock</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Stock"
                            className="rounded-lg w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Image (URL)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Image URL"
                            className="rounded-lg w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Category</span>
                        </label>
                        <select
                            className="rounded-lg w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            name="category"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value="" disabled>Select Category</option>
                            {categories.map((c) => {
                                return (
                                    <option value={c.id} key={c.id}>{c.name}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="mt-5">
                    <Button nameProp={nameProp} />
                </div>
            </form>
        </>
    )
}