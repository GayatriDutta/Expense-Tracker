import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import RedirectLogin from "./pages/Redirect";
import './App.css';
import Budgets from "./pages/Budgets";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundary";
import "./toastStyles.css";
import LandingPage from "./pages/LandingPage";

const AuthPage: React.FC = () => {
  return <LandingPage  />;
};

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (user) {
    return (
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/add"
              element={
                <RedirectLogin>
                  <ExpenseForm />
                </RedirectLogin>
              }
            />
            <Route
              path="/analytics"
              element={
                <ExpenseList/>
              }
            />
            <Route path="/settings" element={<div>Settings Page</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
             <Route path="/budgets" element={<Budgets />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    );
  }
};

function App() {
  return (
    <ErrorBoundary>
    <Router>
      <ToastContainer toastClassName="custom-toast" // add custom class
        className="custom-toast-body"
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable/>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
    </ErrorBoundary>
  );
}
export default App;
