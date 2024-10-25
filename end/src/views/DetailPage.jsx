import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import gifLoading from '../components/assets/loading.svg'

export default function Details({ base_url }) {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    async function fetchProduct() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${base_url}/apis/pub/branded-things/products/${id}`)

            setProduct(data.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <>
            {loading ? (
                <>
                    <div className="flex justify-center mt-32">
                        <img src={gifLoading} className="w-1/5" />
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-start bg-yellow-400 border-2 border-black p-5 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] h-full mt-10">
                        <div>
                            <img
                                src={product.imgUrl}
                                alt="product image"
                                className="border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] h-full"
                            />
                        </div>
                        <div className="flex mx-10 flex-col w-1/2 justify-between">
                            <b className="text-4xl mb-5">
                                {product.name}
                            </b>
                            <p className="h-full">
                                {product.description}
                            </p>
                            <div>
                                <Link to="/" className="fa-solid fa-arrow-left fa-2xl mb-5" >Back</Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}