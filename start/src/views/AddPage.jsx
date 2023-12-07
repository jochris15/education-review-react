import { useState } from "react";
import ProductForm from "../components/ProductForm";

export default function ProductsForm() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState("")
    const [stock, setStock] = useState(0)
    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState([]);

    return (
        <>
            <ProductForm
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