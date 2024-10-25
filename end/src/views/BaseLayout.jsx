import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'

export default function BaseLayout() {
    return (
        <>
            <div className="p-5">
                <Nav />
                <Outlet />
            </div>
        </>
    )
}