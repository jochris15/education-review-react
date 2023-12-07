import { useNavigate } from "react-router-dom";

export default function Card({ product, handleDelete }) {
    const navigate = useNavigate()

    function handleDetail(id) {
        navigate(`detail/${id}`)
    }

    return (<>
        <div className="card bg-gray-100 shadow flex flex-row">
            <figure className="flex flex-col">
                <img
                    src={product.imgUrl}
                    alt="product image"
                    className="max-w-sm rounded-lg shadow mb-2"
                />
                <button onClick={() => handleDetail(product.id)} className="btn btn-accent btn-sm m-1 w-full">Detail</button>
                <button onClick={() => handleDelete(product.id)} className="btn btn-error btn-sm m-1 w-full">Delete</button>
            </figure>
            <div className="card-body flex-1">
                <b>{product.name}</b>
                {product.description}
            </div>
        </div >
    </>)
}