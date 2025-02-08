import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateNote from "./components/CreateNote";
import NoteInfo from "./components/NoteInfo";
import PinnedNotes from "./components/PinnedNotes";
import Trash from "./components/Trash";
import SearchedNote from "./components/SearchedNote";

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
              <Route path="/notes/:id" element={<NoteInfo/>} />
              <Route path="/pinned-notes" element={<PinnedNotes/>} />
              <Route path="/trashed-notes" element={<Trash/>} />
              <Route path="/searched-notes" element={<SearchedNote/>} />
            </Route>
              
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
