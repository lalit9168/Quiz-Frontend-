import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  LoginPage,
  HomePage,
  QuizPage,
  PrivateRoute,
  QuizDash,
  AttemptQuiz,
  CreateGuestQuiz,
  GuestQuizEntry,
  GuestAttemptQuiz,
} from './Components/exports';
import AdminSubmissions from './Components/Quiz/AdminSubmissions';

// ✅ New pages for landing and static content
import Hero from './Components/LandingPage/Hero';
import Contact from './Components/LandingPage/Contact';
import Feedback from './Components/LandingPage/Feedback';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Landing Page - default entry */}
        <Route path="/" element={<Hero />} />

        {/* ✅ Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />

        {/* ✅ Protected Home */}
        <Route path="/home" element={<HomePage />} />

        {/* ✅ Admin Routes */}
        <Route
          path="/quiz"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <QuizPage />
            </PrivateRoute>
          }
        />
        <Route path="/quizdash" element={<QuizDash />} />
        <Route
          path="/admin/submissions"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminSubmissions />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-guest"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <CreateGuestQuiz />
            </PrivateRoute>
          }
        />

        {/* ✅ Guest & User Quiz Attempt Routes */}
        <Route path="/attempt/:code" element={<AttemptQuiz />} />
        <Route path="/guest-quiz-entry" element={<GuestQuizEntry />} />
        <Route path="/guest-attempt/:quizCode" element={<GuestAttemptQuiz />} />

        {/* ✅ Static Info Pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
