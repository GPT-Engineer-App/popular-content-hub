import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import MostWatchedContent from "./pages/MostWatchedContent.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/most-watched" element={<MostWatchedContent />} />
      </Routes>
    </Router>
  );
}

export default App;
