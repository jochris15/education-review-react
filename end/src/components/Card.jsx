import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Toastify from 'toastify-js'
import { useState } from "react";


export default function Card({ product, base_url, fetchProducts }) {
    const [file, setFile] = useState('')
    const navigate = useNavigate()

    async function handleDelete() {
        try {
            const { data } = await axios.delete(`${base_url}/apis/branded-things/products/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
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
            const formData = new FormData();
            formData.append("file", file);

            const { data } = await axios.patch(`${base_url}/apis/branded-things/products/${product.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
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
        }
    }

    return (
        <>
            <div className="card glass shadow-lg">
                <figure className="mt-10">
                    <img
                        src={product.imgUrl}
                        alt="product"
                        className="w-3/4 rounded-xl" />
                </figure>
                <div className="card-body">
                    <b className="text-center text-xl">{product.name}</b>
                    <p className="text-center">{product.description.length > 100 ? product.description.substring(0, 100) + " . . ." : product.description}</p>
                    <div className="divider"></div>
                    <div className="flex justify-center">
                        <i className="fa-solid fa-circle-info fa-2xl m-5"
                            onClick={() => navigate(`/detail/${product.id}`)}></i>
                        <i className="fa-solid fa-trash fa-2xl m-5"
                            onClick={handleDelete}></i>
                        <i className="fa-solid fa-pen-to-square fa-2xl m-5"
                            onClick={() => navigate(`/edit/${product.id}`)}></i>
                    </div>
                    <div className="flex items-center justify-center mt-5">
                        <input type="file" className="file-input file-input-bordered file-input-sm max-w-xs w-3/4"
                            onChange={(e) => setFile(e.target.files[0])} />
                        <i className="fa-solid fa-upload ml-3 fa-xl"
                            onClick={handleUpload}></i>
                    </div>
                </div>
            </div>
        </>
    )
}