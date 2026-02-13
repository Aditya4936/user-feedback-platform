import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { FeedbackForm } from './pages/Feedback/FeedbackForm';
import { Dashboard } from './pages/dashboard/Dashboard';

// // Protected Route Wrapper
// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const { isAuthenticated } = useAuth();
//   if (!isAuthenticated) return <Navigate to="/login" replace />;
//   return <>{children}</>;
// };

// Simple Layout for authenticated users
const AppLayout = () => {
  // const { logout, user } = useAuth();
  return (
    <div>
      {/* Simple Floating Header */}
      <header className="fixed top-0 right-0 p-4 z-50 flex items-center gap-4">
        <div className="text-slate-300 text-sm">
          Logged in as <span className="text-white font-medium">name show</span>
        </div>
        <button
          // onClick={logout}
          className="px-4 py-2 text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full transition-colors"
        >
          Sign Out
        </button>
      </header>
      <Outlet />
    </div>
  )
}

// Route Configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />, // Default to login as requested
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/feedback', // Keeping the path as 'dashboard' but rendering FeedbackForm
    element: (
      // <ProtectedRoute>
      <AppLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <FeedbackForm />,
      },
    ],
  },
]);

function App() {
  return (
    // <AuthProvider>
      <RouterProvider router={router} />
    // </AuthProvider>
  );
}

export default App;
