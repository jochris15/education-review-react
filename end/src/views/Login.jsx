import { useState } from "react"
import axios from 'axios'
import baseUrl from "../contants/baseUrl"
import Toastify from 'toastify-js'
import { Navigate, useNavigate } from "react-router"
import Button from "../components/Button"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/apis/auth/login`, { email, password })

            localStorage.setItem("token", data.data.token)
            navigate("/")
            Toastify({
                text: "Succeed login",
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
        }
    }

    // navguards
    if (localStorage.getItem("token")) {
        Toastify({
            text: "You already logged in",
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
        return <Navigate to="/" />
    }

    return (
        <>
            {/* Login */}
            <div className="min-h-screen flex items-center justify-center w-full">
                <div className="px-8 py-6 w-1/3 bg-blue-400 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium ">Email Address</label>
                            <input type="email" id="email" className="bg-white rounded-lg w-full px-3 py-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]" placeholder="your@email.com" autoComplete="current-email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Password</label>
                            <input type="password" id="password" className="bg-white rounded-lg w-full px-3 py-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]" placeholder="Enter your password" autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button buttonName={"Login"} />
                    </form>
                </div>
            </div>

        </>
    )
}