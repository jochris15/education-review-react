import { useEffect, useState } from "react";
import FormMovie from "../components/FormMovie";
import axios from "axios";
import baseUrl from "../contants/baseUrl";
import { useParams } from "react-router";
import Toastify from 'toastify-js'
import { useNavigate } from "react-router";

export default function EditMovie() {
    const [movie, setMovie] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    async function fetchMovie() {
        try {
            const { data } = await axios.get(`${baseUrl}/apis/pub/movies/movies/${id}`)

            setMovie(data.data)
        } catch (error) {
            console.log(error.response);
        }
    }

    async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            await axios.put(`${baseUrl}/apis/movies/movies/${id}`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            navigate("/")
            Toastify({
                text: "Succeed edit movie",
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

    useEffect(() => {
        fetchMovie()
    }, [])
    return (
        <>
            <FormMovie formName={"Edit Movie"} movie={movie} handleSubmit={handleSubmit} />
        </>
    )
}