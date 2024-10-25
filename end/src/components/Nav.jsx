import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
            <nav className="sticky top-0 z-10 p-3 bg-purple-400 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] flex justify-center">
                <div>
                    <Link to="/login" className="text-2xl font-bold px-6 cursor-pointer text-white">
                        <span>Login</span>
                    </Link>
                    <Link to="/" className="text-2xl font-bold px-6 cursor-pointer">
                        <span>Home</span>
                    </Link>
                    <Link to="/add" className="text-2xl font-bold px-6 cursor-pointer">
                        <span>Add Product</span>
                    </Link>
                    <a className="text-2xl font-bold px-6 cursor-pointer text-white"
                        onClick={handleLogout}>
                        <span>Logout</span>
                    </a>
                </div>
            </nav>
        </>
    )
}