import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { BetSlipProvider } from '@/context/BetSlipContext';
import { AppShell } from '@/components/layout/Shell';
import { DemoBanner } from '@/components/DemoBanner';
import { AgeGate, CookieBanner } from '@/components/Compliance';
import { HomePage, ExchangeHomePage, InPlayPage } from '@/pages/Exchange';
import { SportPage, FullMarketPage, BallByBallPage, MultiMarketPage } from '@/pages/Markets';
import {
  LiveCasinoPage, VimaanPage, VirtualSportsPage, LotteryPage, TipsPage, PromotionsPage,
} from '@/pages/CasinoHub';
import {
  AccountHubPage, AccountStatementPage, BetHistoryPage, ProfitLossPage,
  ActivityLogPage, SettingsPage, KycPage, ProfileDetailPage,
} from '@/pages/Account';
import { WalletPage } from '@/pages/Wallet';
import { LoginPage, RegisterPage } from '@/pages/Auth';
import { AdminPage } from '@/pages/Admin';
import { TermsPage, PrivacyPage, ResponsiblePlayPage } from '@/pages/Legal';
import { ProfilePage, SupportPage } from '@/pages/Profile';

function RedirectFrom404() {
  const navigate = useNavigate();
  useEffect(() => {
    const path = sessionStorage.getItem('22yards_redirect');
    if (path) {
      sessionStorage.removeItem('22yards_redirect');
      navigate(path, { replace: true });
    }
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <AuthProvider>
        <BetSlipProvider>
          <RedirectFrom404 />
          <AgeGate>
            <DemoBanner />
            <AppShell>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/exchange" element={<ExchangeHomePage />} />
                <Route path="/inplay" element={<InPlayPage />} />
                <Route path="/multimarket" element={<MultiMarketPage />} />
                <Route path="/sport/:slug" element={<SportPage />} />
                <Route path="/market/:eventId" element={<FullMarketPage />} />
                <Route path="/ball-by-ball/:eventId" element={<BallByBallPage />} />
                <Route path="/live-casino" element={<LiveCasinoPage />} />
                <Route path="/vimaan" element={<VimaanPage />} />
                <Route path="/virtual-sports" element={<VirtualSportsPage />} />
                <Route path="/lottery" element={<LotteryPage />} />
                <Route path="/tips" element={<TipsPage />} />
                <Route path="/promotions" element={<PromotionsPage />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route path="/account" element={<AccountHubPage />} />
                <Route path="/account/profile" element={<ProfileDetailPage />} />
                <Route path="/account/statement" element={<AccountStatementPage />} />
                <Route path="/account/bets" element={<BetHistoryPage />} />
                <Route path="/account/pnl" element={<ProfitLossPage />} />
                <Route path="/account/activity" element={<ActivityLogPage />} />
                <Route path="/account/settings" element={<SettingsPage />} />
                <Route path="/kyc" element={<KycPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/responsible-play" element={<ResponsiblePlayPage />} />
              </Routes>
            </AppShell>
            <CookieBanner />
          </AgeGate>
        </BetSlipProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
