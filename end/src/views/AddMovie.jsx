import axios from "axios";
import FormMovie from "../components/FormMovie";
import Toastify from 'toastify-js'
import baseUrl from "../contants/baseUrl";
import { useNavigate } from "react-router";

export default function AddMovie() {
    const navigate = useNavigate()

    async function handleSubmit(e, form) {
        e.preventDefault()
        try {
            await axios.post(`${baseUrl}/apis/movies/movies`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            navigate("/")
            Toastify({
                text: "Succeed add new movie",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#008000",
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
                    background: "#FF0000",
                    border: "medium solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px 0px rgba(0,0,0,1)",
                    color: "#000000",
                    fontWeight: 500
                },
            }).showToast();
        } y
    }

    return (
        <>
            <FormMovie formName={"Add Movie"} handleSubmit={handleSubmit} />
        </>
    )
}