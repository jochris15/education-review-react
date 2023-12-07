import { useState } from 'react'

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


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

                    <form className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Email"
                                className="w-full input input-bordered input-accent"
                                onChange={emailOnChange}
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
                            />
                        </div>
                        <div>
                            <button className="btn btn-accent">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}