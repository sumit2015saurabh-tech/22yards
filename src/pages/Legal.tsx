import { LegalLayout } from '@/components/LegalLayout';

export function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
      <h2>1. About 22yards</h2>
      <p>22yards is an entertainment platform offering cricket-related activities and virtual point-based participation. Points are not legal tender, bank deposits, or securities.</p>
      <h2>2. Eligibility</h2>
      <p>You must be at least 18 years of age and legally permitted to use entertainment platforms in your jurisdiction.</p>
      <h2>3. Virtual points</h2>
      <p>All points are administered offline by authorised 22yards administrators. Deposits and withdrawals require manual verification. No online payment gateway is used.</p>
      <h2>4. No guaranteed outcomes</h2>
      <p>Participation involves risk of losing points. 22yards does not guarantee winnings or returns.</p>
      <h2>5. Responsible participation</h2>
      <p>Users may self-exclude and should participate within personal limits. See our Responsible Play policy.</p>
      <h2>6. Account termination</h2>
      <p>We may suspend accounts for violations, fraud, or regulatory requirements.</p>
      <h2>7. Governing law</h2>
      <p>These terms are governed by the laws of India, subject to applicable local regulations as the platform scales.</p>
    </LegalLayout>
  );
}

export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <h2>Data we collect</h2>
      <p>Name, email, username, state, district, transaction history, and support communications.</p>
      <h2>How we use data</h2>
      <p>Account management, fraud prevention, compliance, and service improvement. We do not sell personal data.</p>
      <h2>Retention</h2>
      <p>Data is retained as required for legal, audit, and operational purposes.</p>
      <h2>Your rights</h2>
      <p>Contact help@22yards.app to request access, correction, or deletion where applicable by law.</p>
      <h2>Cookies</h2>
      <p>Essential session cookies only. No third-party advertising trackers.</p>
    </LegalLayout>
  );
}

export function ResponsiblePlayPage() {
  return (
    <LegalLayout title="Responsible Play">
      <p className="text-lg text-white/80">Entertainment should be fun — never a source of harm.</p>
      <h2>Our commitment</h2>
      <ul>
        <li>18+ age verification at entry</li>
        <li>Self-exclusion tools in your profile</li>
        <li>Clear point balances and transaction history</li>
        <li>Admin-managed deposits — no impulsive online payments</li>
        <li>Support team available for concerns</li>
      </ul>
      <h2>Warning signs</h2>
      <p>If participation affects your finances, relationships, or mental health, pause immediately and seek help.</p>
      <h2>Self-exclusion</h2>
      <p>Visit your Profile to activate self-exclusion for 30, 90, or 180 days.</p>
      <h2>External resources</h2>
      <p>National helplines and counselling services are listed on request via support@22yards.app.</p>
    </LegalLayout>
  );
}
