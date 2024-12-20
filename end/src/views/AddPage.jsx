import axios from "axios"
import { baseUrl } from "../api/baseUrl"
import Toastify from 'toastify-js'
import { useNavigate } from "react-router";
import ProductsForm from "../components/ProductsForm";

export default function AddPage() {
    const navigate = useNavigate()

    async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/apis/branded-things/products`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            navigate('/')
            Toastify({
                text: `Succeed add new data ${data.data.name}`,
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
            <ProductsForm handleSubmit={handleSubmit} propName="Add Product" />
        </>
    )
}