import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';

// Login
import Login from './pages/login';

// Citizen
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import RegisterComplaint from './pages/citizen/RegisterComplaint';
import MyComplaints from './pages/citizen/MyComplaints';
import Feedback from './pages/citizen/Feedback';
import ComplaintDetails from './pages/citizen/ComplaintDetails';

// Officer
import OfficerDashboard from './pages/officer/OfficerDashboard';
import AssignedComplaints from './pages/officer/AssignedComplaints';
import CompletedComplaints from './pages/officer/CompletedComplaints';
import OfficerComplaintDetails from './pages/officer/OfficerComplaintDetails';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import ComplaintManagement from './pages/admin/ComplaintManagement';
import CitizenManagement from './pages/admin/CitizenManagement';
import OfficerManagement from './pages/admin/OfficerManagement';
import ComplaintVerification from './pages/admin/ComplaintVerification';
import ComplaintAssignment from './pages/admin/ComplaintAssignment';
import Categories from './pages/admin/Categories';
import FeedbackManagement from './pages/admin/FeedbackManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Unauthorized */}
        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

        {/* Citizen */}
        <Route
          path="/citizen"
          element={
            <ProtectedRoute allowedRoles={['citizen']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CitizenDashboard />} />
          <Route
            path="register"
            element={<RegisterComplaint />}
          />
          <Route
            path="complaints"
            element={<MyComplaints />}
          />
          <Route
            path="complaints/:id"
            element={<ComplaintDetails />}
          />
          <Route
            path="feedback"
            element={<Feedback />}
          />
        </Route>

        {/* Officer */}
        <Route
          path="/officer"
          element={
            <ProtectedRoute allowedRoles={['officer']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OfficerDashboard />} />
          <Route
            path="complaints"
            element={<AssignedComplaints />}
          />
          <Route
            path="complaints/:id"
            element={<OfficerComplaintDetails />}
          />
          <Route
            path="completed"
            element={<CompletedComplaints />}
          />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route
            path="complaints"
            element={<ComplaintManagement />}
          />
          <Route
            path="citizens"
            element={<CitizenManagement />}
          />
          <Route
            path="officers"
            element={<OfficerManagement />}
          />
          <Route
            path="verification"
            element={<ComplaintVerification />}
          />
          <Route
            path="assignment"
            element={<ComplaintAssignment />}
          />
          <Route
            path="categories"
            element={<Categories />}
          />
          <Route
            path="feedback"
            element={<FeedbackManagement />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
