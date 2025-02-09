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
import Categories from "./components/Categories";
import { updatedNotesFunc } from "./redux/NoteSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {

  const notes = useSelector((state) => state.noteSlice?.notes);
  
  const dispatch = useDispatch();
  const moveNote=(fromIndex, toIndex)=>{
    const updatedNotes=[...notes]
    const [movedNote]=updatedNotes.splice(fromIndex,1)
    updatedNotes.splice(toIndex, 0, movedNote)

    dispatch(updatedNotesFunc(updatedNotes))
  }
  
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Notes moveNote={moveNote}/>}/>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/create-note" element={<CreateNote/>} />
              <Route path="/notes/:id" element={<NoteInfo/>} />
              <Route path="/pinned-notes" element={<PinnedNotes moveNote={moveNote}/>} />
              <Route path="/trashed-notes" element={<Trash/>} />
              <Route path="/searched-notes" element={<SearchedNote moveNote={moveNote}/>} />
              <Route path="/category" element={<Categories moveNote={moveNote}/>} />
            </Route>
              
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
