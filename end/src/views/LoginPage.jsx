import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js'

export default function LoginPage({ base_url }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${base_url}/apis/login`, { email, password })
            localStorage.setItem("token", data.data.access_token);
            navigate("/");
        } catch (error) {
            console.log(error);

            Toastify({
                text: error.response.data.error,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#FF0000",
                },
                onClick: function () { } // Callback after click
            }).showToast();
        }
    }

    function emailOnChange(event) {
        setEmail(event.target.value);
    }

    function passwordOnChange(event) {
        setPassword(event.target.value);
    }

    return (
        <>
            <div className="relative flex flex-col justify-center h-[85dvh] overflow-hidden bg-base-100">
                <div className="w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-200">
                    <h1 className="text-3xl font-semibold text-center text-accent-focus">
                        Log In
                    </h1>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Email"
                                className="w-full input input-bordered input-accent"
                                onChange={emailOnChange}
                                autoComplete='current-email'
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="w-full input input-bordered input-accent"
                                onChange={passwordOnChange}
                                autoComplete='current-password'
                            />
                        </div>
                        <div>
                            <button className="btn btn-accent w-full mt-5">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}