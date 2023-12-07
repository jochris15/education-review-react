import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

export default function ProductsForm({ url }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState("")
    const [stock, setStock] = useState(0)
    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()

    const config = {
        headers: { Authorization: `Bearer ${localStorage.access_token}` }
    }

    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${url}/apis/branded-things/categories`, config);

            setCategories(data.data);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            });
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        const addedData = { name, description, price: +price, imgUrl, stock: +stock, categoryId };
        try {
            const { data } = await axios.post(`${url}/apis/branded-things/products`, addedData, config);
            console.log(data.data);
            navigate('/')
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.error
            });
        }
    }

    return (
        <>
            <ProductForm
                handleSubmit={handleSubmit}
                setName={setName}
                setDescription={setDescription}
                setPrice={setPrice}
                setImgUrl={setImgUrl}
                setStock={setStock}
                setCategoryId={setCategoryId}
                categories={categories}
            />
        </>
    )
}