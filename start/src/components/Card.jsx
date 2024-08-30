
export default function Card({ product }) {
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
                    <p className="text-center">{product?.description.length > 100 ? product?.description.substring(0, 100) + " . . ." : product.description}</p>
                    <div className="divider"></div>
                    <div className="flex justify-center">
                        <i className="fa-solid fa-circle-info fa-2xl m-5"></i>
                        <i className="fa-solid fa-trash fa-2xl m-5"></i>
                        <i className="fa-solid fa-pen-to-square fa-2xl m-5"></i>
                    </div>
                    <div className="flex items-center justify-center mt-5">
                        <input type="file" className="file-input file-input-bordered file-input-sm max-w-xs w-3/4" />
                        <i className="fa-solid fa-upload ml-3 fa-xl"></i>
                    </div>
                </div>
            </div>
        </>
    )
}