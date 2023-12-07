import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from '../views/LoginPage'
import BaseLayout from '../views/BaseLayout'
import HomePage from '../views/HomePage'
import DetailPage from '../views/DetailPage'
import AddPage from '../views/AddPage'

const url = 'https://phase2-aio.vercel.app'

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage url={url} />,
        loader: async () => {
            if (localStorage.access_token) {
                return redirect('/')
            }

            return null
        }
    },
    {
        element: <BaseLayout />,
        loader: async () => {
            if (!localStorage.access_token) {
                return redirect('/login')
            }

            return null
        },
        children: [
            {
                path: "/",
                element: <HomePage url={url} />
            },
            {
                path: "/detail/:id",
                element: <DetailPage url={url} />
            },
            {
                path: "/add",
                element: <AddPage url={url} />
            }
        ]
    }
]);

export default router