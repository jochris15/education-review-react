import ProductForm from "../components/ProductForm";
import Toastify from 'toastify-js'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function AddPage({ base_url }) {
    const navigate = useNavigate()

    async function handleSubmit(e, name, description, price, imgUrl, stock, categoryId) {
        e.preventDefault()
        try {
            const body = { name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId }

            const { data } = await axios.post(`${base_url}/apis/branded-things/products`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            navigate("/")
            Toastify({
                text: `Succedd add new product ${data.data.name}`,
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
            <ProductForm base_url={base_url} handleSubmit={handleSubmit}
                nameProp="Add Product" />
        </>
    )
}