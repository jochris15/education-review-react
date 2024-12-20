import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Toastify from 'toastify-js'

export default function BaseLayout() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.access_token) {
            Toastify({
                text: "Please login first",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#F87171",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();
            navigate('/login')
        }
    }, [navigate])

    return (
        <>
            <div className="p-5">
                <Navbar />
                <Outlet />
            </div>

        </>
    )
}