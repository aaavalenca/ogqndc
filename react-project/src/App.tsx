import ComicReader from "./Components/ComicReader";
import Sidebar from "./Components/Sidebar";
import styles from "./ComicViews.module.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App" style={{ display: "flex" }}>
        <Sidebar />
        <div>
          <Routes>
            <Route path="/comic/:id" element={<ComicReader />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
