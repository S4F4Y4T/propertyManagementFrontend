import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppProvider } from './providers/AppProvider.jsx'
import Layout from "@/template/layout";

import { ThemeProvider } from "@/components/theme-provider"
import ProtectRoute from "@/components/ProtectedRoute"
import PublicRoute from "@/components/PublicRoute"

import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";

import Auth from "@/modules/auth";
import Dashboard from "@/modules/dashboard";

import HouseOwner from "@/modules/admin/houseOwner";
import Tenant from "@/modules/admin/tenant";

import OwnerTenant from "@/modules/owner/tenant";
import Flat from "@/modules/owner/flat";
import BillCategory from "@/modules/owner/billCategory";
import Bill from "@/modules/owner/bill";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <AppProvider>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicRoute />}>
              <Route path="/auth" element={<Auth />} />
            </Route>

            <Route element={<ProtectRoute allowedUser={['admin', 'owner']} />}>
              <Route element={<Layout />}>
                <Route path="/" index element={<Dashboard />} />
              </Route>
            </Route>

            <Route element={<ProtectRoute allowedUser={['admin']} />}>
              <Route element={<Layout />}>
                <Route path="house-owners" element={<HouseOwner />} />
                <Route path="tenants" element={<Tenant />} />
              </Route>
            </Route>

            <Route element={<ProtectRoute allowedUser={['owner']} />}>
              <Route element={<Layout />}>
                <Route path="flats" element={<Flat />} />
                <Route path="bill-categories" element={<BillCategory />} />
                <Route path="owner-tenants" element={<OwnerTenant />} />
                <Route path="bills" element={<Bill />} />

              </Route>
            </Route>

            {/* Fallback 404 route */}
            <Route path="*" element={<NotFound />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </AppProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
