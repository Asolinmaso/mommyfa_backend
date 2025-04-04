import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth, AuthProvider } from '@/hooks/use-auth';
import PersonalDetailsForm from '@/components/forms/personal-details-form';
import BusinessDetailsForm from '@/components/forms/business-details-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

const SellerRegisterPage = () => {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [personalDetails, setPersonalDetails] = useState(null);

  // Check authentication and redirect if needed
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // If already a seller, redirect to seller dashboard
    if (user.role === 'seller') {
      navigate('/seller/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-xl p-6 md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Become a Seller on OrgPick</h1>
          <p className="text-gray-600">Join our marketplace and start selling your organic products today</p>
        </div>
        {step === 1 ? (
          <PersonalDetailsForm 
            onNext={() => setStep(2)} 
            setPersonalDetails={setPersonalDetails} 
          />
        ) : (
          <BusinessDetailsForm 
            onBack={() => setStep(1)} 
            personalDetails={personalDetails} 
          />
        )}
      </div>
    </div>
  );
};

export default function WrappedSellerRegisterPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <SellerRegisterPage />
      </AuthProvider>
    </QueryClientProvider>
  );
}