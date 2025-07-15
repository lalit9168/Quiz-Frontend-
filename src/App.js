import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestAttemptQuiz from "./Components/Guest/GuestAttemptQuiz";
// ...import other components as needed

function App() {
  return (
    <Router>
      <Routes>
        {/* ...other routes... */}
        <Route path="/guest-quiz-entry/:quizCode" element={<GuestAttemptQuiz />} />
        {/* ...other routes... */}
      </Routes>
    </Router>
  );
}

export default App;