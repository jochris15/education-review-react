import axios from "axios"
import { baseUrl } from "../api/baseUrl"
import { useEffect, useState } from "react";
import Toastify from 'toastify-js'
import Button from "./Button";

export default function ProductsForm({ product, handleSubmit, propName }) {
    const [categories, setCategories] = useState([])
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        imgUrl: "",
        categoryId: 0
    })

    function handleInput(fieldName, e) {
        let value = e.target.value
        if (fieldName === 'price' || fieldName === 'stock' || fieldName === 'categoryId') {
            value = +e.target.value
        }

        setForm((oldValue) => {
            return {
                ...oldValue,
                [fieldName]: value
            }
        })
    }

    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${baseUrl}/apis/branded-things/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setCategories(data.data)
        } catch (error) {
            Toastify({
                text: error.response.data.error,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#F87171",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();

        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (product) {
            delete product?.authorId
            delete product?.createdAt
            delete product?.updatedAt
            delete product?.id
            delete product?.Category
            delete product?.User

            setForm((oldValue) => {
                return {
                    ...oldValue,
                    ...product
                }
            })
        }
    }, [product])

    return (
        <>
            <form className="p-10 mt-5 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-red-400"
                onSubmit={(e) => handleSubmit(e, form)}>
                <h1 className="text-2xl font-bold text-center mb-4">{propName}</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            <span className="font-bold">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="rounded-lg w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            onChange={(e) => handleInput('name', e)}
                            value={form?.name}
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
                            onChange={(e) => handleInput('description', e)}
                            value={form?.description}
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
                            onChange={(e) => handleInput('price', e)}
                            value={form?.price}
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
                            onChange={(e) => handleInput('stock', e)}
                            value={form?.stock}
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
                            onChange={(e) => handleInput('imgUrl', e)}
                            value={form?.imgUrl}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Category</span>
                        </label>
                        <select
                            className="rounded-lg w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            name="category"
                            onChange={(e) => handleInput('categoryId', e)}
                            value={form?.categoryId ? form?.categoryId : "select"}
                        >
                            <option value="select" disabled>Select Category</option>
                            {categories.map((c) => {
                                return (
                                    <option value={c.id} key={c.id}>{c.name}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="mt-5">
                    <Button nameProp={propName} />
                </div>
            </form>
        </>
    )
}