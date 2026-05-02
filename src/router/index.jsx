import { createBrowserRouter, Outlet } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import RootLayout from './RootLayout'

import Home from '../pages/public/Home'
import HireStaff from '../pages/public/HireStaff'
import FindWork from '../pages/public/FindWork'
import Services from '../pages/public/Services'
import About from '../pages/public/About'
import Contact from '../pages/public/Contact'
import Login from '../pages/public/Login'

import RegisterStep1 from '../pages/onboarding/RegisterStep1'
import RegisterStep2 from '../pages/onboarding/RegisterStep2'
import RegisterStep3 from '../pages/onboarding/RegisterStep3'

import PortalDashboard from '../pages/portal/PortalDashboard'
import PortalJobs from '../pages/portal/PortalJobs'
import PortalHours from '../pages/portal/PortalHours'
import SubmitHours from '../pages/portal/SubmitHours'
import PortalInvoices from '../pages/portal/PortalInvoices'

import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminUsers from '../pages/admin/AdminUsers'
import AdminOnboarding from '../pages/admin/AdminOnboarding'
import AdminAssignments from '../pages/admin/AdminAssignments'
import AdminHours from '../pages/admin/AdminHours'
import AdminInvoices from '../pages/admin/AdminInvoices'
import AdminCompliance from '../pages/admin/AdminCompliance'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'hire-staff', element: <HireStaff /> },
      { path: 'find-work', element: <FindWork /> },
      { path: 'services', element: <Services /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },

      {
        path: 'register',
        element: <Outlet />,
        children: [
          { index: true, element: <RegisterStep1 /> },
          { path: 'work-type', element: <RegisterStep2 /> },
          { path: 'compliance', element: <RegisterStep3 /> },
        ],
      },

      {
        path: 'portal',
        element: <ProtectedRoute allowedRole="freelancer" />,
        children: [
          { path: 'dashboard', element: <PortalDashboard /> },
          { path: 'jobs', element: <PortalJobs /> },
          { path: 'hours/new', element: <SubmitHours /> },
          { path: 'hours', element: <PortalHours /> },
          { path: 'invoices', element: <PortalInvoices /> },
        ],
      },

      {
        path: 'admin',
        element: <ProtectedRoute allowedRole="admin" />,
        children: [
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'users', element: <AdminUsers /> },
          { path: 'onboarding', element: <AdminOnboarding /> },
          { path: 'assignments', element: <AdminAssignments /> },
          { path: 'hours', element: <AdminHours /> },
          { path: 'invoices', element: <AdminInvoices /> },
          { path: 'compliance', element: <AdminCompliance /> },
        ],
      },
    ],
  },
])
