import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import { RoleRoute } from "./auth/RoleRoute";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { FeedbackForm } from "./pages/Feedback/FeedbackForm";
import DashboardLayout from "./components/layout/DashboardLayout";
import { ROUTES } from "./constants";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route
            path={ROUTES.FEEDBACK}
            element={
              <RoleRoute role="user">
                <FeedbackForm />
              </RoleRoute>
            }
          />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <RoleRoute role="admin">
                <DashboardLayout />
              </RoleRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
