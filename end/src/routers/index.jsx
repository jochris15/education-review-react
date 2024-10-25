import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from '../views/LoginPage'
import HomePage from '../views/HomePage'
import DetailPage from '../views/DetailPage'
import AddPage from '../views/AddPage'
import BaseLayout from '../views/BaseLayout'
import EditPage from "../views/EditPage";
import Toastify from 'toastify-js'

const base_url = 'https://h8-phase2-gc.vercel.app'

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage base_url={base_url} />,
        loader: () => {
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
                return redirect('/')
            }

            return null
        }
    },
    {
        element: <BaseLayout />,
        loader: () => {
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
                return redirect('/login')
            }

            return null
        },
        children: [
            {
                path: "/",
                element: <HomePage base_url={base_url} />
            },
            {
                path: "/add",
                element: <AddPage base_url={base_url} />
            },
            {
                path: "/detail/:id",
                element: <DetailPage base_url={base_url} />
            },
            {
                path: "/edit/:id",
                element: <EditPage base_url={base_url} />
            }
        ]
    }
])

export default router