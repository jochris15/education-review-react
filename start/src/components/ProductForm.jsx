import { useState } from "react";

export default function ProductsForm() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState("")
    const [stock, setStock] = useState(0)
    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState([]);

    return (<>
        <form className=" grid grid-cols-2 gap-4 mt-4" >
            <div>
                <label className="label">
                    <span className="text-base label-text">Name</span>
                </label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                    className="w-full input input-bordered input-primary"
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
                    className="w-full input input-bordered input-primary"
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
                    className="w-full input input-bordered input-primary"
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
                    className="w-full input input-bordered input-primary"
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
                    className="w-full input input-bordered input-primary"
                    value={imgUrl}
                />
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Category</span>
                </label>
                <select
                    className="w-full input input-bordered input-primary"
                    onChange={(e) => setCategoryId(e.target.value)}
                    name="category"
                    id=""
                >
                    {categories.map(c => {
                        return <option key={c.id} value={c.id}>{c.name}</option>
                    })}
                </select>
            </div>
            <div>
                <button type="submit" className="w-full btn btn-accent">Add</button>
            </div>
        </form>
    </>)
}