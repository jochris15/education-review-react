

export default function Nav() {
    return (<>
        <nav className="navbar sticky top-0 z-10 p-3 bg-gray-100 shadow">
            <div className="navbar-start">
                <a className="text-2xl font-bold px-6">
                    <span className="text-accent">Review React</span>
                </a>
            </div>
            <div className="navbar-end">
            </div>
            <div className="navbar-end">
                <a className="btn btn-accent btn-sm mx-1">Add Product</a>
                <a className="btn btn-neutral btn-sm mx-1">
                    Login
                </a>
                <a className="btn btn-error btn-sm mx-1">
                    Logout
                </a>
            </div>
        </nav>
    </>)
}