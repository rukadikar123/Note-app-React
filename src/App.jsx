import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Notes from "./components/Notes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Notes/>}/>
            </Route>
              
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
