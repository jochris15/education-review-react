
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./views/Login";
import BaseLayout from "./views/BaseLayout";
import Home from "./views/Home";
import Detail from "./views/Detail";
import AddMovie from "./views/AddMovie";
import EditMovie from "./views/EditMovie";

function App() {
  return (
    <>
      <div className="p-5">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<BaseLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/add" element={<AddMovie />} />
              <Route path="/edit/:id" element={<EditMovie />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
