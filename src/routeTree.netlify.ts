/* eslint-disable */
// @ts-nocheck

// Netlify/SPA build route tree — uses __root.netlify.tsx (no SSR shell APIs).
// Keep in sync with routeTree.gen.ts if routes change.

import { Route as rootRouteImport } from './routes/__root.netlify'
import { Route as TermsRouteImport } from './routes/terms'
import { Route as SymptomCheckerRouteImport } from './routes/symptom-checker'
import { Route as ServicesRouteImport } from './routes/services'
import { Route as ProvidersRouteImport } from './routes/providers'
import { Route as PrivacyRouteImport } from './routes/privacy'
import { Route as ParentRouteImport } from './routes/parent'
import { Route as NpRouteImport } from './routes/np'
import { Route as LoginRouteImport } from './routes/login'
import { Route as ContactRouteImport } from './routes/contact'
import { Route as BookRouteImport } from './routes/book'
import { Route as BlogRouteImport } from './routes/blog'
import { Route as AdminRouteImport } from './routes/admin'
import { Route as AboutRouteImport } from './routes/about'
import { Route as IndexRouteImport } from './routes/index'
import { Route as LocationsIndexRouteImport } from './routes/locations.index'
import { Route as ParentVaccinationsRouteImport } from './routes/parent.vaccinations'
import { Route as ParentSettingsRouteImport } from './routes/parent.settings'
import { Route as ParentGrowthRouteImport } from './routes/parent.growth'
import { Route as ParentDocumentsRouteImport } from './routes/parent.documents'
import { Route as ParentDashboardRouteImport } from './routes/parent.dashboard'
import { Route as ParentChildrenRouteImport } from './routes/parent.children'
import { Route as ParentAppointmentsRouteImport } from './routes/parent.appointments'
import { Route as NpStatsRouteImport } from './routes/np.stats'
import { Route as NpSettingsRouteImport } from './routes/np.settings'
import { Route as NpScheduleRouteImport } from './routes/np.schedule'
import { Route as NpPatientRouteImport } from './routes/np.patient'
import { Route as LocationsCityRouteImport } from './routes/locations.$city'
import { Route as AdminUsersRouteImport } from './routes/admin.users'
import { Route as AdminSupportRouteImport } from './routes/admin.support'
import { Route as AdminSettingsRouteImport } from './routes/admin.settings'
import { Route as AdminRevenueRouteImport } from './routes/admin.revenue'
import { Route as AdminReportsRouteImport } from './routes/admin.reports'
import { Route as AdminProvidersRouteImport } from './routes/admin.providers'
import { Route as AdminInsightsRouteImport } from './routes/admin.insights'
import { Route as AdminDashboardRouteImport } from './routes/admin.dashboard'
import { Route as AdminAuditRouteImport } from './routes/admin.audit'
import { Route as AdminAppointmentsRouteImport } from './routes/admin.appointments'
import { Route as NpDocumentVisitIdRouteImport } from './routes/np.document.$visitId'

const TermsRoute = TermsRouteImport.update({ id: '/terms', path: '/terms', getParentRoute: () => rootRouteImport } as any)
const SymptomCheckerRoute = SymptomCheckerRouteImport.update({ id: '/symptom-checker', path: '/symptom-checker', getParentRoute: () => rootRouteImport } as any)
const ServicesRoute = ServicesRouteImport.update({ id: '/services', path: '/services', getParentRoute: () => rootRouteImport } as any)
const ProvidersRoute = ProvidersRouteImport.update({ id: '/providers', path: '/providers', getParentRoute: () => rootRouteImport } as any)
const PrivacyRoute = PrivacyRouteImport.update({ id: '/privacy', path: '/privacy', getParentRoute: () => rootRouteImport } as any)
const ParentRoute = ParentRouteImport.update({ id: '/parent', path: '/parent', getParentRoute: () => rootRouteImport } as any)
const NpRoute = NpRouteImport.update({ id: '/np', path: '/np', getParentRoute: () => rootRouteImport } as any)
const LoginRoute = LoginRouteImport.update({ id: '/login', path: '/login', getParentRoute: () => rootRouteImport } as any)
const ContactRoute = ContactRouteImport.update({ id: '/contact', path: '/contact', getParentRoute: () => rootRouteImport } as any)
const BookRoute = BookRouteImport.update({ id: '/book', path: '/book', getParentRoute: () => rootRouteImport } as any)
const BlogRoute = BlogRouteImport.update({ id: '/blog', path: '/blog', getParentRoute: () => rootRouteImport } as any)
const AdminRoute = AdminRouteImport.update({ id: '/admin', path: '/admin', getParentRoute: () => rootRouteImport } as any)
const AboutRoute = AboutRouteImport.update({ id: '/about', path: '/about', getParentRoute: () => rootRouteImport } as any)
const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const LocationsIndexRoute = LocationsIndexRouteImport.update({ id: '/locations/', path: '/locations/', getParentRoute: () => rootRouteImport } as any)

const ParentVaccinationsRoute = ParentVaccinationsRouteImport.update({ id: '/vaccinations', path: '/vaccinations', getParentRoute: () => ParentRoute } as any)
const ParentSettingsRoute = ParentSettingsRouteImport.update({ id: '/settings', path: '/settings', getParentRoute: () => ParentRoute } as any)
const ParentGrowthRoute = ParentGrowthRouteImport.update({ id: '/growth', path: '/growth', getParentRoute: () => ParentRoute } as any)
const ParentDocumentsRoute = ParentDocumentsRouteImport.update({ id: '/documents', path: '/documents', getParentRoute: () => ParentRoute } as any)
const ParentDashboardRoute = ParentDashboardRouteImport.update({ id: '/dashboard', path: '/dashboard', getParentRoute: () => ParentRoute } as any)
const ParentChildrenRoute = ParentChildrenRouteImport.update({ id: '/children', path: '/children', getParentRoute: () => ParentRoute } as any)
const ParentAppointmentsRoute = ParentAppointmentsRouteImport.update({ id: '/appointments', path: '/appointments', getParentRoute: () => ParentRoute } as any)

const NpStatsRoute = NpStatsRouteImport.update({ id: '/stats', path: '/stats', getParentRoute: () => NpRoute } as any)
const NpSettingsRoute = NpSettingsRouteImport.update({ id: '/settings', path: '/settings', getParentRoute: () => NpRoute } as any)
const NpScheduleRoute = NpScheduleRouteImport.update({ id: '/schedule', path: '/schedule', getParentRoute: () => NpRoute } as any)
const NpPatientRoute = NpPatientRouteImport.update({ id: '/patient', path: '/patient', getParentRoute: () => NpRoute } as any)
const NpDocumentVisitIdRoute = NpDocumentVisitIdRouteImport.update({ id: '/document/$visitId', path: '/document/$visitId', getParentRoute: () => NpRoute } as any)

const LocationsCityRoute = LocationsCityRouteImport.update({ id: '/locations/$city', path: '/locations/$city', getParentRoute: () => rootRouteImport } as any)

const AdminUsersRoute = AdminUsersRouteImport.update({ id: '/users', path: '/users', getParentRoute: () => AdminRoute } as any)
const AdminSupportRoute = AdminSupportRouteImport.update({ id: '/support', path: '/support', getParentRoute: () => AdminRoute } as any)
const AdminSettingsRoute = AdminSettingsRouteImport.update({ id: '/settings', path: '/settings', getParentRoute: () => AdminRoute } as any)
const AdminRevenueRoute = AdminRevenueRouteImport.update({ id: '/revenue', path: '/revenue', getParentRoute: () => AdminRoute } as any)
const AdminReportsRoute = AdminReportsRouteImport.update({ id: '/reports', path: '/reports', getParentRoute: () => AdminRoute } as any)
const AdminProvidersRoute = AdminProvidersRouteImport.update({ id: '/providers', path: '/providers', getParentRoute: () => AdminRoute } as any)
const AdminInsightsRoute = AdminInsightsRouteImport.update({ id: '/insights', path: '/insights', getParentRoute: () => AdminRoute } as any)
const AdminDashboardRoute = AdminDashboardRouteImport.update({ id: '/dashboard', path: '/dashboard', getParentRoute: () => AdminRoute } as any)
const AdminAuditRoute = AdminAuditRouteImport.update({ id: '/audit', path: '/audit', getParentRoute: () => AdminRoute } as any)
const AdminAppointmentsRoute = AdminAppointmentsRouteImport.update({ id: '/appointments', path: '/appointments', getParentRoute: () => AdminRoute } as any)

const AdminRouteWithChildren = AdminRoute._addFileChildren({
  AdminAppointmentsRoute,
  AdminAuditRoute,
  AdminDashboardRoute,
  AdminInsightsRoute,
  AdminProvidersRoute,
  AdminReportsRoute,
  AdminRevenueRoute,
  AdminSettingsRoute,
  AdminSupportRoute,
  AdminUsersRoute,
})

const NpRouteWithChildren = NpRoute._addFileChildren({
  NpPatientRoute,
  NpScheduleRoute,
  NpSettingsRoute,
  NpStatsRoute,
  NpDocumentVisitIdRoute,
})

const ParentRouteWithChildren = ParentRoute._addFileChildren({
  ParentAppointmentsRoute,
  ParentChildrenRoute,
  ParentDashboardRoute,
  ParentDocumentsRoute,
  ParentGrowthRoute,
  ParentSettingsRoute,
  ParentVaccinationsRoute,
})

export const routeTree = rootRouteImport._addFileChildren({
  IndexRoute,
  AboutRoute,
  AdminRoute: AdminRouteWithChildren,
  BlogRoute,
  BookRoute,
  ContactRoute,
  LoginRoute,
  NpRoute: NpRouteWithChildren,
  ParentRoute: ParentRouteWithChildren,
  PrivacyRoute,
  ProvidersRoute,
  ServicesRoute,
  SymptomCheckerRoute,
  TermsRoute,
  LocationsCityRoute,
  LocationsIndexRoute,
})
