import axios from "axios";
import { Link } from "react-router";
import Toastify from 'toastify-js'
import baseUrl from "../contants/baseUrl";
import { useState } from "react";
import loadingButtonGIF from "../assets/loadingUpload.svg"

export default function Card({ movie, idx, fetchMovies }) {
    const [loadingButton, setLoadingButton] = useState(false)

    async function handleDelete() {
        try {
            await axios.delete(`${baseUrl}/apis/movies/movies/${movie.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            fetchMovies()

            Toastify({
                text: "Succeed delete movie",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#4ade80",
                    border: "medium solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px 0px rgba(0,0,0,1)",
                    color: "#000000",
                    fontWeight: 500
                },
            }).showToast();
        } catch (error) {
            Toastify({
                text: error.response.data.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#f87171",
                    border: "medium solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px 0px rgba(0,0,0,1)",
                    color: "#000000",
                    fontWeight: 500
                },
            }).showToast();
        }
    }

    async function handleUpload(e) {
        try {
            setLoadingButton(true)
            const formData = new FormData()
            const images = e.target.files[0]
            formData.append("file", images)

            await axios.patch(`${baseUrl}/apis/movies/movies/${movie.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            fetchMovies()

            Toastify({
                text: "Succeed update image",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#4ade80",
                    border: "medium solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px 0px rgba(0,0,0,1)",
                    color: "#000000",
                    fontWeight: 500
                },
            }).showToast();
        } catch (error) {
            Toastify({
                text: error.response.data.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#f87171",
                    border: "medium solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px 0px rgba(0,0,0,1)",
                    color: "#000000",
                    fontWeight: 500
                },
            }).showToast();
        } finally {
            // setLoadingButton(false)
        }
    }

    return (
        <>
            {/* card 1 */}
            <div className={`gap-5 flex flex-col justify-center items-center border-2 border-black p-5 rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] ${idx % 2 === 0 ? "bg-yellow-400" : "bg-blue-400"}`}>
                <div className="h-full">
                    <img src={movie.imgUrl} alt="product image" className="border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
                </div>
                <div className="h-full">
                    <b className="mt-5">{movie.title}</b>
                    <hr className="border-black w-full mt-2" />
                    <p className="mt-2 line-clamp-3">
                        {movie.synopsis}
                    </p>
                </div>
                <hr className="border-black w-full" />
                <div className="flex items-center justify-between w-full my-5">
                    <Link to={`/detail/${movie.id}`} className="fa-solid fa-circle-info fa-2xl cursor-pointer" />
                    <a onClick={handleDelete} className="fa-solid fa-trash fa-2xl cursor-pointer" />
                    <Link to={`/edit/${movie.id}`} className="fa-solid fa-pen-to-square fa-2xl cursor-pointer" />
                    {loadingButton ? (
                        <div className="flex items-center justify-center w-10 h-10">
                            <img src={loadingButtonGIF} alt="loading" className="w-full h-full object-cover block" />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-10 h-10">
                            <label className="fa-solid fa-upload fa-2xl cursor-pointer">
                                <input type="file" className="hidden" onChange={handleUpload} />
                            </label>
                        </div>
                    )}
                </div >
            </div >
        </>
    )
}