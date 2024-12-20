import { useNavigate } from "react-router"
import axios from "axios";
import { baseUrl } from "../api/baseUrl";
import Toastify from 'toastify-js'
import { useState } from "react";
import loadingGif from '../components/assets/loadingUpload.svg'

export default function Card({ product, fetchProduct }) {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleDelete() {
        try {
            const { data } = await axios.delete(`${baseUrl}/apis/branded-things/products/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            fetchProduct()
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

    async function handleUpload(e) {
        try {
            setLoading(true)
            const images = e.target.files[0]
            const formData = new FormData
            formData.append('file', images)

            const { data } = await axios.patch(`${baseUrl}/apis/branded-things/products/${product.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            fetchProduct()
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

    return (
        <>
            <div className="flex flex-col flex-start items-center bg-yellow-400 border-2 border-black p-5 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] h-full">
                <div>
                    <img
                        src={product?.imgUrl}
                        alt="product image"
                        className="border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
                    />
                </div>
                <div className="flex flex-col h-full w-full">
                    <b className="mt-5">
                        {product?.name}
                    </b>
                    <hr className="border-black w-full" />
                    <p>
                        {product?.description.length > 100 ? product?.description.substring(0, 100) + "..." : product?.description}
                    </p>
                </div>
                <hr className="border-black w-full" />
                <div className="flex justify-center mt-10 w-full">
                    <a className="fa-solid fa-circle-info fa-2xl m-5 cursor-pointer" onClick={() => navigate(`/detail/${product.id}`)} />
                    <a className="fa-solid fa-trash fa-2xl m-5 cursor-pointer"
                        onClick={handleDelete} />
                    <a className="fa-solid fa-pen-to-square fa-2xl m-5 cursor-pointer" onClick={() => navigate(`/edit/${product.id}`)} />
                    {loading ? (
                        <img src={loadingGif} className="w-1/6" />
                    ) : (
                        <>
                            <label
                                className="fa-solid fa-upload fa-2xl m-5 cursor-pointer"
                                htmlFor={`uploadFile${product.id}`}
                            />
                            <input type="file" id={`uploadFile${product.id}`} className="hidden" onChange={handleUpload} />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}