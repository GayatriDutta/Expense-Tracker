import React, { useContext, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PiggyBank, Home, Plus, BarChart3, Settings, LogOut, Moon, Sun, Download, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { ThemeContext } from '../contexts/ThemeContext';


interface LayoutProps {
  children: ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const logoutUser = () =>{
    logout(); 
  }
  const handleExport = async () => {
    try {
      const response = await axios.get('/expenses/export', {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expenses.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Add Expense', href: '/add', icon: Plus },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Budgets', href: '/budgets', icon: Target },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}` }>
      <div className={`min-h-screen  transition-colors ${darkMode ? 'bg-gray-900 background-dark' : 'bg-gray-50 background'}`}>
        <div className={`fixed inset-y-0 left-0 z-50 w-64 shadow-lg ${darkMode ? 'bg-gray-800 background-dark' : 'bg-white background'}`}>
          <div className={`flex h-16 items-center gap-3 px-6 border-b ${darkMode ? 'border-gray-700': 'border-gray-200'}`}>
            <div className={`p-2 ${darkMode ? 'bg-blue-900': 'bg-blue-100'}rounded-lg`}>
              <PiggyBank className={`${darkMode ? 'text-blue-400': 'text-blue-600'  }`} size={24} />
            </div>
            <div>
              <h1 className={`text-xl font-bold  ${darkMode ? 'text-white': 'text-gray-900'}`}>ExpenseTracker</h1>
              <p className={`text-xs  ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Welcome, {user?.name}</p>
            </div>
          </div>

          <nav className="mt-6 px-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 ${
                    isActive
                      ? ` ${darkMode ? 'bg-blue-900': 'bg-blue-100'}  ${darkMode ? 'text-blue-300' : 'text-blue-700'}`
                      : ` ${darkMode ? 'hover:bg-gray-700': 'hover:bg-gray-100'}  ${darkMode ? 'text-blue-300' : 'text-blue-700'}`
                  }`}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className={`absolute bottom-0 left-0 right-0 p-3 border-t  ${ darkMode ? 'border-gray-700': 'border-gray-200' }`}>
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-1"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-1"
              >
                <Download size={18} />
                Export
              </button>
              
              <button
                onClick={logoutUser}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-1"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="pl-64">
          {/* <main className="p-8">
            <Outlet />
          </main> */}
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;