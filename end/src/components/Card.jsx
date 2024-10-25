import axios from 'axios'
import Toastify from 'toastify-js'
import { useEffect, useState } from "react";
import uploadLoading from './assets/loadingUpload.svg'
import { Link } from 'react-router-dom';

export default function Card({ product, base_url, fetchProducts }) {
    const [file, setFile] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        try {
            const { data } = await axios.delete(`${base_url}/apis/branded-things/products/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            fetchProducts()
            Toastify({
                text: `Succedd delete data`,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#008000",
                },
                onClick: function () { } // Callback after click
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
                    background: "#FF0000",
                },
                onClick: function () { } // Callback after click
            }).showToast();
        }
    }

    async function handleUpload() {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("file", file);

            const { data } = await axios.patch(`${base_url}/apis/branded-things/products/${product.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            fetchProducts()
            Toastify({
                text: data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#008000",
                },
                onClick: function () { } // Callback after click
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
                    background: "#FF0000",
                },
                onClick: function () { } // Callback after click
            }).showToast();
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (file) handleUpload()
    }, [file])

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
                    <p>
                        {product.description.length > 100 ? product.description.substring(0, 100) + " . . ." : product.description}
                    </p>
                </div>
                <hr className="border-black w-full" />
                <div className="flex justify-center mt-10 w-full">
                    <Link to={`/detail/${product.id}`} className="fa-solid fa-circle-info fa-2xl m-5" />
                    <a className="fa-solid fa-trash fa-2xl m-5"
                        onClick={handleDelete} />
                    <Link to={`/edit/${product.id}`} className="fa-solid fa-pen-to-square fa-2xl m-5" />
                    {loading ? (
                        <img src={uploadLoading} className='w-1/6' />
                    ) : (
                        <>
                            <label
                                className="fa-solid fa-upload fa-2xl m-5"
                                htmlFor="uploadFile"
                            />
                            <input type="file" id="uploadFile" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}