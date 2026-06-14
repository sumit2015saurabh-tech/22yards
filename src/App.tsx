import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { BetSlipProvider } from '@/context/BetSlipContext';
import { Layout } from '@/components/Layout';
import { AgeGate, CookieBanner } from '@/components/Compliance';
import { HomePage } from '@/pages/Home';
import { SportsPage } from '@/pages/Sports';
import { WalletPage } from '@/pages/Wallet';
import { LoginPage, RegisterPage } from '@/pages/Auth';
import { AdminPage } from '@/pages/Admin';
import { TermsPage, PrivacyPage, ResponsiblePlayPage } from '@/pages/Legal';
import { CasinoPage, PromotionsPage } from '@/pages/Casino';
import { ProfilePage, SupportPage } from '@/pages/Profile';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <AuthProvider>
        <BetSlipProvider>
          <AgeGate>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sports" element={<SportsPage />} />
                <Route path="/casino" element={<CasinoPage />} />
                <Route path="/promotions" element={<PromotionsPage />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/responsible-play" element={<ResponsiblePlayPage />} />
              </Routes>
            </Layout>
            <CookieBanner />
          </AgeGate>
        </BetSlipProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
