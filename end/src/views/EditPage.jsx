import { useNavigate, useParams } from "react-router";
import ProductsForm from "../components/ProductsForm";
import axios from "axios";
import { baseUrl } from "../api/baseUrl";
import Toastify from 'toastify-js'
import { useEffect, useState } from "react";

export default function EditPage() {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const navigate = useNavigate("")

    async function fetchProduct() {
        try {
            const { data } = await axios.get(`${baseUrl}/apis/pub/branded-things/products/${id}`)

            setProduct(data.data)
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

    async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${baseUrl}/apis/branded-things/products/${id}`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            navigate('/')
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

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <>
            <ProductsForm product={product} handleSubmit={handleSubmit} propName="Edit Product" />
        </>
    )
}