import { Navigate, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Toastify from 'toastify-js'

export default function BaseLayout() {
    if (!localStorage.getItem("token")) {
        Toastify({
            text: "Please login first",
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
        return <Navigate to="/login" />
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}