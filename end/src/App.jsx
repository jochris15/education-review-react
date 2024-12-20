import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./views/LoginPage";
import BaseLayout from "./views/BaseLayout";
import HomePage from "./views/HomePage";
import AddPage from "./views/AddPage";
import DetailPage from "./views/DetailPage";
import EditPage from "./views/EditPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<BaseLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/add" element={<AddPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
