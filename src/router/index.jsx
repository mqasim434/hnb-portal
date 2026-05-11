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
        path: 'freelancers/openstaande-opdrachten',
        element: <FindWork />,
      },
      {
        path: 'freelancers/hoe-het-werkt',
        element: <StaticMarketingPage pageKey="fl-zo-werkt-het" />,
      },
      {
        path: 'freelancers/inkomsten-betalingen',
        element: <StaticMarketingPage pageKey="fl-inkomsten-betalingen" />,
      },
      {
        path: 'freelancers/jouw-certificering',
        element: <StaticMarketingPage pageKey="fl-veiligheid-certificering" />,
      },

      /* Bedrijven */
      { path: 'bedrijven/personeel-aanvragen', element: <HireStaff /> },
      {
        path: 'bedrijven/ons-aanbod',
        element: <StaticMarketingPage pageKey="bv-ons-aanbod" />,
      },
      {
        path: 'bedrijven/tarieven',
        element: <StaticMarketingPage pageKey="bv-tarieven" />,
      },
      {
        path: 'bedrijven/sectoren',
        element: <StaticMarketingPage pageKey="bv-sectoren" />,
      },
      { path: 'bedrijven/functies', element: <Services /> },
      {
        path: 'bedrijven/vaste-samenwerking',
        element: <StaticMarketingPage pageKey="bv-flexpools" />,
      },

      /* Over H&B */
      { path: 'over-hb/ons-verhaal', element: <About /> },
      {
        path: 'over-hb/het-team',
        element: <StaticMarketingPage pageKey="hb-wie-wij-zijn" />,
      },
      {
        path: 'over-hb/werkgebied',
        element: <StaticMarketingPage pageKey="hb-werkgebied" />,
      },
      {
        path: 'over-hb/onze-aanpak',
        element: <StaticMarketingPage pageKey="hb-wat-wij-doen" />,
      },
      {
        path: 'over-hb/vergunningen-compliance',
        element: <StaticMarketingPage pageKey="hb-vergunningen" />,
      },
      {
        path: 'over-hb/nieuws',
        element: <StaticMarketingPage pageKey="hb-nieuws" />,
      },

      /* Juridisch (footer) */
      {
        path: 'juridisch/privacy',
        element: <StaticMarketingPage pageKey="legal-privacy" />,
      },
      {
        path: 'juridisch/cookies',
        element: <StaticMarketingPage pageKey="legal-cookies" />,
      },
      {
        path: 'juridisch/algemene-voorwaarden',
        element: <StaticMarketingPage pageKey="legal-voorwaarden" />,
      },

      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },

      /* Legacy URL’s */
      {
        path: 'freelancers/ontdek-mogelijkheden',
        element: <Navigate to="/freelancers/openstaande-opdrachten" replace />,
      },
      {
        path: 'freelancers/zo-werkt-het',
        element: <Navigate to="/freelancers/hoe-het-werkt" replace />,
      },
      {
        path: 'freelancers/veiligheid-certificering',
        element: <Navigate to="/freelancers/jouw-certificering" replace />,
      },
      {
        path: 'freelancers/werkwijze',
        element: <Navigate to="/freelancers/hoe-het-werkt" replace />,
      },
      {
        path: 'freelancers/aan-de-slag',
        element: <Navigate to="/register" replace />,
      },
      { path: 'bedrijven/vind-talent', element: <Navigate to="/bedrijven/personeel-aanvragen" replace /> },
      {
        path: 'bedrijven/vergelijk-professionals',
        element: <Navigate to="/bedrijven/ons-aanbod" replace />,
      },
      {
        path: 'bedrijven/filters',
        element: <Navigate to="/bedrijven/ons-aanbod" replace />,
      },
      {
        path: 'bedrijven/flexpools',
        element: <Navigate to="/bedrijven/vaste-samenwerking" replace />,
      },
      { path: 'over-hb/over-ons', element: <Navigate to="/over-hb/ons-verhaal" replace /> },
      {
        path: 'over-hb/wie-wij-zijn',
        element: <Navigate to="/over-hb/het-team" replace />,
      },
      {
        path: 'over-hb/wat-wij-doen',
        element: <Navigate to="/over-hb/onze-aanpak" replace />,
      },
      {
        path: 'over-hb/chat',
        element: <Navigate to="/contact" replace />,
      },
      {
        path: 'over-hb/netwerk',
        element: <Navigate to="/over-hb/het-team" replace />,
      },
      {
        path: 'over-hb/beleid',
        element: <Navigate to="/juridisch/privacy" replace />,
      },
      {
        path: 'hire-staff',
        element: <Navigate to="/bedrijven/personeel-aanvragen" replace />,
      },
      {
        path: 'find-work',
        element: <Navigate to="/freelancers/openstaande-opdrachten" replace />,
      },
      {
        path: 'services',
        element: <Navigate to="/bedrijven/functies" replace />,
      },
      {
        path: 'about',
        element: <Navigate to="/over-hb/ons-verhaal" replace />,
      },

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
