import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import CategoryPage from "@/pages/category-page";
import AdminDashboard from "@/pages/admin";
import UsersPage from "@/pages/admin/users";
import SellerDashboard from "@/pages/seller";
import BuyerDashboard from "@/pages/buyer";
import SellerRegistrationPage from "@/pages/seller-registration";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/category/:id" component={CategoryPage} />
      <ProtectedRoute path="/admin" component={AdminDashboard} />
      <ProtectedRoute path="/admin/users" component={UsersPage} />
      <ProtectedRoute path="/seller" component={SellerDashboard} />
      <ProtectedRoute path="/buyer" component={BuyerDashboard} />
      <Route path="/seller/register" component={SellerRegistrationPage} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
