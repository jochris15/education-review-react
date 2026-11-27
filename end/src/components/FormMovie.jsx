import { useEffect, useState } from "react"
import baseUrl from "../contants/baseUrl";
import axios from "axios";
import Toastify from 'toastify-js'
import Button from "./Button";

export default function FormMovie({ formName, handleSubmit, movie }) {
    const [genre, setGenre] = useState([])
    const [form, setForm] = useState({
        title: "",
        synopsis: "",
        trailerUrl: "",
        imgUrl: "",
        rating: 0,
        genreId: 0
    })

    function handleForm(value, fieldName) {
        setForm((oldValue) => {
            return {
                ...oldValue,
                [fieldName]: value
            }
        })
    }

    async function fetchGenre() {
        try {
            const { data } = await axios.get(`${baseUrl}/apis/movies/genres`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            setGenre(data.data)

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

    useEffect(() => {
        fetchGenre()
    }, [])

    useEffect(() => {
        if (movie) {
            setForm({
                title: movie.title,
                synopsis: movie.synopsis,
                trailerUrl: movie.trailerUrl,
                imgUrl: movie.imgUrl,
                rating: movie.rating,
                genreId: movie.genreId
            })
        }
    }, [movie])

    return (
        <>
            <form className="p-10 mt-5 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-red-400" onSubmit={(e) => handleSubmit(e, form)}>
                <h1 className="text-2xl font-bold text-center mb-4">{formName}</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            <span className="font-bold">Title</span>
                        </label>
                        <input type="text" placeholder="Enter Title" className="bg-white w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            onChange={(e) => handleForm(e.target.value, "title")}
                            value={form.title}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Synopsis</span>
                        </label>
                        <input type="text" placeholder="Enter Synopsis" className="bg-white w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            onChange={(e) => handleForm(e.target.value, "synopsis")}
                            value={form.synopsis}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Trailer (URL)</span>
                        </label>
                        <input type="text" placeholder="Enter Trailer Url" className="bg-white w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            value={form.trailerUrl}
                            onChange={(e) => handleForm(e.target.value, "trailerUrl")}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Image (URL)</span>
                        </label>
                        <input type="text" placeholder="Enter Image URL" className="bg-white w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            value={form.imgUrl}
                            onChange={(e) => handleForm(e.target.value, "imgUrl")}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Rating</span>
                        </label>
                        <input type="number" placeholder="Enter Rating" className="bg-white w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            value={form.rating}
                            onChange={(e) => handleForm(+e.target.value, "rating")}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Genre</span>
                        </label>
                        <select className="bg-white w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]" name="genre"
                            value={form.genreId}
                            onChange={(e) => handleForm(+e.target.value, "genreId")}
                        >
                            {genre.map((g) => {
                                return <option value={g.id} key={g.id}>{g.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="mt-5">
                    <Button buttonName={formName} />
                </div>
            </form>
        </>
    )
}