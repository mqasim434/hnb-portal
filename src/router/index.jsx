import { createBrowserRouter, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import RootLayout from './RootLayout'
import Home from '../pages/public/Home'

const page = (importer) => async () => {
  const m = await importer()
  return { Component: m.default }
}

const staticMarketing = (pageKey) => async () => {
  const { default: StaticMarketingPage } = await import(
    '../pages/public/StaticMarketingPage'
  )
  return {
    Component: function StaticMarketingRoute() {
      return <StaticMarketingPage pageKey={pageKey} />
    },
  }
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },

      /* Freelancers */
      { path: 'freelancers', lazy: page(() => import('../pages/freelancers/FreelancersHub')) },
      {
        path: 'freelancers/openstaande-opdrachten',
        lazy: page(() => import('../pages/freelancers/FreelancerOpenAssignments')),
      },
      {
        path: 'freelancers/hoe-het-werkt',
        lazy: page(() => import('../pages/freelancers/FreelancerHowItWorks')),
      },
      {
        path: 'freelancers/inkomsten-betalingen',
        lazy: page(() => import('../pages/freelancers/FreelancerIncome')),
      },
      {
        path: 'freelancers/jouw-certificering',
        lazy: page(() => import('../pages/freelancers/FreelancerCertification')),
      },
      {
        path: 'freelancers/direct-aanmelden',
        lazy: page(() => import('../pages/freelancers/FreelancerDirectRegister')),
      },

      /* Bedrijven */
      {
        path: 'bedrijven/personeel-aanvragen',
        lazy: page(() => import('../pages/public/HireStaff')),
      },
      {
        path: 'bedrijven/ons-aanbod',
        lazy: page(() => import('../pages/bedrijven/OnsAanbodPage')),
      },
      {
        path: 'bedrijven/tarieven',
        lazy: page(() => import('../pages/bedrijven/TarievenPage')),
      },
      {
        path: 'bedrijven/sectoren',
        lazy: page(() => import('../pages/bedrijven/SectorenPage')),
      },
      { path: 'bedrijven/functies', lazy: page(() => import('../pages/public/Services')) },
      {
        path: 'bedrijven/vaste-samenwerking',
        lazy: page(() => import('../pages/bedrijven/VasteSamenwerkingPage')),
      },

      /* Over H&B */
      { path: 'over-hb/ons-verhaal', lazy: page(() => import('../pages/public/About')) },
      { path: 'over-hb/het-team', lazy: page(() => import('../pages/overhb/HetTeamPage')) },
      {
        path: 'over-hb/werkgebied',
        lazy: page(() => import('../pages/overhb/WerkgebiedPage')),
      },
      {
        path: 'over-hb/onze-aanpak',
        lazy: page(() => import('../pages/overhb/OnzeAanpakPage')),
      },
      {
        path: 'over-hb/vergunningen-compliance',
        lazy: page(() => import('../pages/overhb/VergunningenCompliancePage')),
      },
      { path: 'over-hb/nieuws', lazy: page(() => import('../pages/overhb/NieuwsPage')) },

      /* Juridisch (footer) */
      {
        path: 'juridisch/privacy',
        lazy: staticMarketing('legal-privacy'),
      },
      {
        path: 'juridisch/cookies',
        lazy: staticMarketing('legal-cookies'),
      },
      {
        path: 'juridisch/algemene-voorwaarden',
        lazy: staticMarketing('legal-voorwaarden'),
      },

      { path: 'contact', lazy: page(() => import('../pages/public/Contact')) },
      { path: 'login', lazy: page(() => import('../pages/public/Login')) },

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
        element: <Navigate to="/freelancers/direct-aanmelden" replace />,
      },
      {
        path: 'bedrijven/vind-talent',
        element: <Navigate to="/bedrijven/personeel-aanvragen" replace />,
      },
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
      {
        path: 'over-hb/over-ons',
        element: <Navigate to="/over-hb/ons-verhaal" replace />,
      },
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
        element: <Navigate to="/freelancers/direct-aanmelden" replace />,
      },
      { path: 'register/*', element: <Navigate to="/freelancers/direct-aanmelden" replace /> },

      {
        path: 'portal',
        element: <ProtectedRoute allowedRole="freelancer" />,
        children: [
          { path: 'dashboard', lazy: page(() => import('../pages/portal/PortalDashboard')) },
          { path: 'jobs', lazy: page(() => import('../pages/portal/PortalJobs')) },
          { path: 'hours/new', lazy: page(() => import('../pages/portal/SubmitHours')) },
          { path: 'hours', lazy: page(() => import('../pages/portal/PortalHours')) },
          { path: 'invoices', lazy: page(() => import('../pages/portal/PortalInvoices')) },
        ],
      },

      {
        path: 'admin',
        element: <ProtectedRoute allowedRole="admin" />,
        children: [
          { path: 'dashboard', lazy: page(() => import('../pages/admin/AdminDashboard')) },
          { path: 'users', lazy: page(() => import('../pages/admin/AdminUsers')) },
          { path: 'onboarding', lazy: page(() => import('../pages/admin/AdminOnboarding')) },
          {
            path: 'assignments',
            lazy: page(() => import('../pages/admin/AdminAssignments')),
          },
          { path: 'hours', lazy: page(() => import('../pages/admin/AdminHours')) },
          { path: 'invoices', lazy: page(() => import('../pages/admin/AdminInvoices')) },
          {
            path: 'compliance',
            lazy: page(() => import('../pages/admin/AdminCompliance')),
          },
        ],
      },

      { path: '*', lazy: page(() => import('../pages/public/NotFound')) },
    ],
  },
])
