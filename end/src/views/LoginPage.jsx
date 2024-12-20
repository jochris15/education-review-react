import { useState } from "react"
import axios from 'axios'
import { baseUrl } from "../api/baseUrl"
import { useNavigate } from "react-router"
import Toastify from 'toastify-js'
import { useEffect } from "react"
import Button from "../components/Button"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.access_token) {
            Toastify({
                text: "You already logged in",
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
            navigate('/')
        }
    }, [navigate])

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseUrl}/apis/login`, { email, password })

            localStorage.setItem('access_token', data?.data?.access_token)
            navigate('/')
            Toastify({
                text: "Succeed Login",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#34D399",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();
        } catch (error) {
            Toastify({
                text: error.response.data.error,
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
        }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center w-full">
                <div className="px-8 py-6 w-1/3 bg-blue-400 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium ">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="rounded-lg w-full px-3 py-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="your@email.com"
                                autoComplete="current-email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="rounded-lg w-full px-3 py-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button nameProp="Login" />
                    </form>
                </div>
            </div>

        </>
    )
}