import { useState } from "react";
import gearLoad from "../components/assets/Gear-0.2s-264px.svg"

export default function Details() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false)

    return (
        <>
            <main className="px-10 my-8">
                {loading ? (
                    <div className="mt-32 flex justify-center items-center">
                        <img src={gearLoad} />
                    </div>
                ) : (
                    <div className="flex flex-col bg-base-100 my-6 items-center p-20  bg-gray-100 shadow">
                        <img
                            src={product.imgUrl}
                            className="max-w-sm rounded-lg shadow mb-5"
                        />
                        <div>
                            <div className="texts">
                                <h1 className="text-5xl font-bold text-accent-focus">{product.name}</h1>
                                <div className="py-6">
                                    <p>{product.description}</p>
                                    <br></br>
                                    <p>Stock: {product.stock}</p>
                                    <p>Price: {product.price}</p>
                                </div>
                            </div>
                            <div className="buttons">
                                <a className="btn btn-accent">Back</a>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}