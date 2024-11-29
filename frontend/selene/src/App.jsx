import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePoll from "./components/createPoll.jsx";
import VotePoll from "./components/votePoll.jsx";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<CreatePoll />} />
                    <Route path="/vote/:id" element={<VotePoll />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
