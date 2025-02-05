import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateNote from "./components/CreateNote";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Notes/>}/>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/create-note" element={<CreateNote/>} />
            </Route>
              
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
