export default function Card({ product }) {
    return (<>
        <div className="card bg-gray-100 shadow flex flex-row">
            <figure className="flex flex-col">
                <img
                    src={product.imgUrl}
                    alt="product image"
                    className="max-w-sm rounded-lg shadow mb-2"
                />
                <button className="btn btn-accent btn-sm m-1 w-full">Detail</button>
                <button className="btn btn-error btn-sm m-1 w-full">Delete</button>
                <button className="btn btn-warning btn-sm m-1 w-full">Edit</button>
            </figure>
            <div className="card-body flex-1">
                <b>{product.name}</b>
                {product.description}
            </div>
        </div >
    </>)
}