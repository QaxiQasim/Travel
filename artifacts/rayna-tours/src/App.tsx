import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import Home from '@/pages/home';
import DubaiHolidays from '@/pages/dubai-holidays';
import ActivityPage from '@/pages/activity-page';
import ContactPage from '@/pages/contact';
import GalleryPage from '@/pages/gallery';
import AboutPage from '@/pages/about';
import ActivitiesPage from '@/pages/activities';
import ChauffeurPage from '@/pages/chauffeur';
import CarDetailsPage from '@/pages/car-details';
import NotFound from '@/pages/not-found';
import AdminLogin from '@/pages/admin/login';
import AdminDashboard from '@/pages/admin/dashboard';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dubai-holidays" component={DubaiHolidays} />
      <Route path="/activities" component={ActivitiesPage} />
      <Route path="/chauffeur-services" component={ChauffeurPage} />
      <Route path="/chauffeur-services/:slug" component={CarDetailsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/gallery" component={GalleryPage} />
      
      {/* Activity Pages routed to the dynamic component */}
      <Route path="/desert-safari" component={ActivityPage} />
      <Route path="/water-activities" component={ActivityPage} />
      <Route path="/skydiving" component={ActivityPage} />
      <Route path="/car-rental" component={ActivityPage} />
      <Route path="/city-tour" component={ActivityPage} />
      <Route path="/burj-khalifa" component={ActivityPage} />
      <Route path="/dhow-cruise" component={ActivityPage} />
      <Route path="/theme-parks" component={ActivityPage} />
      
      {/* Fallback for dynamic slugs if needed */}
      <Route path="/activity/:slug" component={ActivityPage} />
      
      {/* Admin Pages */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
