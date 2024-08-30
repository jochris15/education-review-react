import { useEffect, useState } from "react";
import axios from 'axios'



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
                    Authorization: `Bearer ${localStorage.token}`
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
            <form onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, stock, categoryId)} >
                <div className=" grid grid-cols-2 gap-4 mt-4" >
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Name</span>
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Name"
                            className="w-full input input-bordered input-accent"
                            value={name}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Description</span>
                        </label>
                        <input
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            placeholder="Enter Description"
                            className="w-full input input-bordered input-accent"
                            value={description}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Price</span>
                        </label>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            placeholder="Enter Price"
                            className="w-full input input-bordered input-accent"
                            value={price}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Stock</span>
                        </label>
                        <input
                            onChange={(e) => setStock(e.target.value)}
                            type="number"
                            placeholder="Enter Stock"
                            className="w-full input input-bordered input-accent"
                            value={stock}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Image (URL)</span>
                        </label>
                        <input
                            onChange={(e) => setImgUrl(e.target.value)}
                            type="text"
                            placeholder="Image URL"
                            className="w-full input input-bordered input-accent"
                            value={imgUrl}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Category</span>
                        </label>
                        <select
                            className="w-full input input-bordered input-accent"
                            onChange={(e) => setCategoryId(e.target.value)}
                            name="category"
                            id=""
                            value={categoryId}
                        >
                            {categories.map(c => {
                                return <option key={c.id} value={c.id}>{c.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full btn btn-accent mt-10">{nameProp}</button>
                </div>
            </form>
        </>)
}