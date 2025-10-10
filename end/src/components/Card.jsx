import { Link } from "react-router";
import baseUrl from "../constant/url";
import axios from 'axios'
import Toastify from 'toastify-js'
import loadingGif from '../assets/loadingUpload.svg'
import { useState } from "react";

export default function Card({ product, fetchProducts }) {
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        try {
            const { data } = await axios.delete(`${baseUrl}/apis/products/products/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            Toastify({
                text: data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#34D399",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();

            fetchProducts()
        } catch (error) {
            Toastify({
                text: error.response.data.message,
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

    async function handleUpload(e) {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("file", e.target.files[0])

            const { data } = await axios.patch(`${baseUrl}/apis/products/products/${product.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })

            fetchProducts()
        } catch (error) {
            console.log(error);

            Toastify({
                text: error.response.data.message,
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
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex flex-col flex-start items-center bg-yellow-400 border-2 border-black p-5 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] h-full">
                <div>
                    <img
                        src={product.imgUrl}
                        alt="product image"
                        className="border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
                    />
                </div>
                <div className="flex flex-col h-full w-full">
                    <b className="mt-5">
                        {product.name}
                    </b>
                    <hr className="border-black w-full" />
                    <p className="line-clamp-4">
                        {product.description}
                    </p>
                </div>
                <hr className="border-black w-full" />
                <div className="flex justify-center mt-10 w-full">
                    <Link to={`/detail/${product.id}`} className="fa-solid fa-circle-info fa-2xl m-5 cursor-pointer" />
                    <a onClick={handleDelete} className="fa-solid fa-trash fa-2xl m-5 cursor-pointer" />
                    <Link to={`/edit/${product.id}`} className="fa-solid fa-pen-to-square fa-2xl m-5 cursor-pointer" />
                    {loading ? (
                        <>
                            <img src={loadingGif} className="w-1/6" />
                        </>
                    ) : (
                        <>
                            <label className="fa-solid fa-upload fa-2xl m-5 cursor-pointer">
                                <input type="file" className="hidden" onChange={handleUpload} />
                            </label>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}