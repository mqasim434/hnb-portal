import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import RootLayout from './RootLayout'

import Home from '../pages/public/Home'
import HireStaff from '../pages/public/HireStaff'
import FindWork from '../pages/public/FindWork'
import Services from '../pages/public/Services'
import About from '../pages/public/About'
import Contact from '../pages/public/Contact'
import Login from '../pages/public/Login'
import StaticMarketingPage from '../pages/public/StaticMarketingPage'

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

      /* Freelancers */
      {
        path: 'freelancers/ontdek-mogelijkheden',
        element: <FindWork />,
      },
      {
        path: 'freelancers/zo-werkt-het',
        element: <StaticMarketingPage pageKey="fl-zo-werkt-het" />,
      },
      {
        path: 'freelancers/inkomsten-betalingen',
        element: <StaticMarketingPage pageKey="fl-inkomsten-betalingen" />,
      },
      {
        path: 'freelancers/veiligheid-certificering',
        element: <StaticMarketingPage pageKey="fl-veiligheid-certificering" />,
      },
      {
        path: 'freelancers/werkwijze',
        element: <StaticMarketingPage pageKey="fl-werkwijze" />,
      },
      {
        path: 'freelancers/aan-de-slag',
        element: <StaticMarketingPage pageKey="fl-aan-de-slag" />,
      },

      /* Bedrijven */
      { path: 'bedrijven/vind-talent', element: <HireStaff /> },
      {
        path: 'bedrijven/vergelijk-professionals',
        element: <StaticMarketingPage pageKey="bv-vergelijk-professionals" />,
      },
      {
        path: 'bedrijven/tarieven',
        element: <StaticMarketingPage pageKey="bv-tarieven" />,
      },
      {
        path: 'bedrijven/filters',
        element: <StaticMarketingPage pageKey="bv-filters" />,
      },
      {
        path: 'bedrijven/sectoren',
        element: <StaticMarketingPage pageKey="bv-sectoren" />,
      },
      { path: 'bedrijven/functies', element: <Services /> },
      {
        path: 'bedrijven/flexpools',
        element: <StaticMarketingPage pageKey="bv-flexpools" />,
      },

      /* Over H&B */
      { path: 'over-hb/over-ons', element: <About /> },
      {
        path: 'over-hb/wie-wij-zijn',
        element: <StaticMarketingPage pageKey="hb-wie-wij-zijn" />,
      },
      {
        path: 'over-hb/wat-wij-doen',
        element: <StaticMarketingPage pageKey="hb-wat-wij-doen" />,
      },
      {
        path: 'over-hb/nieuws',
        element: <StaticMarketingPage pageKey="hb-nieuws" />,
      },
      {
        path: 'over-hb/chat',
        element: <StaticMarketingPage pageKey="hb-chat" />,
      },
      {
        path: 'over-hb/netwerk',
        element: <StaticMarketingPage pageKey="hb-netwerk" />,
      },
      {
        path: 'over-hb/beleid',
        element: <StaticMarketingPage pageKey="hb-beleid" />,
      },

      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },

      {
        path: 'hire-staff',
        element: <Navigate to="/bedrijven/vind-talent" replace />,
      },
      {
        path: 'find-work',
        element: <Navigate to="/freelancers/ontdek-mogelijkheden" replace />,
      },
      {
        path: 'services',
        element: <Navigate to="/bedrijven/functies" replace />,
      },
      { path: 'about', element: <Navigate to="/over-hb/over-ons" replace /> },

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
