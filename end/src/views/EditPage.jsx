import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import axios from 'axios'
import { useParams } from "react-router-dom";
import Toastify from 'toastify-js'
import { useNavigate } from "react-router-dom";

export default function EditPage({ base_url }) {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    async function handleSubmit(e, name, description, price, imgUrl, stock, categoryId) {
        e.preventDefault()
        try {
            const body = { name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId }

            const { data } = await axios.put(`${base_url}/apis/branded-things/products/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            navigate("/")
            Toastify({
                text: `Succedd edit product`,
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

    async function fetchProduct() {
        try {
            const { data } = await axios.get(`${base_url}/apis/pub/branded-things/products/${id}`)

            setProduct(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <>
            <ProductForm base_url={base_url} product={product} handleSubmit={handleSubmit}
                nameProp="Edit Product" />
        </>
    )
}