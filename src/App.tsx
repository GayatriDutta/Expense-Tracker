import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import AuthForm from "./components/AuthForm";
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

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  useEffect(()=>{
    setMode("login");
  })
  return (
    <AuthForm
      mode={mode}
    />
  );
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
            <Route path="/login" element={<AuthForm mode="login" />} />
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
                <ExpenseList expenses={[]} onEdit={function (): void {
                  throw new Error("Function not implemented.");
                } } onDelete={function (): void {
                  throw new Error("Function not implemented.");
                } }/>
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
