import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy · It's Lit Neon" },
      { name: "description", content: "How Light Me Up Productions collects, uses, stores, and protects your personal information, including CCPA/CPRA and GDPR disclosures." },
      { property: "og:title", content: "Privacy Policy · It's Lit Neon" },
      { property: "og:description", content: "How we collect, use, and protect your personal information." },
      { property: "og:url", content: "https://itslitneon.com/privacy" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://itslitneon.com/privacy" }],
  }),
});

function Privacy() {
  const updated = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 md:px-6 py-12 prose prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-[var(--neon-orange)]">
        <h1 className="font-display text-5xl">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Effective Date: {updated}</p>

        <p>
          This Privacy Policy (&ldquo;Policy&rdquo;) describes how <strong>Light Me Up Productions</strong>, a sole proprietorship
          operated by Joseph Dakuras (&ldquo;Light Me Up,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), collects,
          uses, discloses, and safeguards information when you visit <a href="https://itslitneon.com">itslitneon.com</a> (the
          &ldquo;Site&rdquo;), submit an order, or otherwise communicate with us. By using the Site or placing an order, you consent
          to the practices described in this Policy. If you do not agree, do not use the Site.
        </p>

        <h2 className="font-display text-2xl mt-8">1. Information We Collect</h2>
        <p>We collect the following categories of information:</p>
        <ul>
          <li><strong>Identifiers &amp; Contact Information</strong>: name, email address, mailing/shipping address, telephone number.</li>
          <li><strong>Commercial Information</strong>: products purchased or considered, order history, customization details (names, colors, design notes).</li>
          <li><strong>Buyer-Supplied Content</strong>: photographs, logos, or other images you upload for use on your Product.</li>
          <li><strong>Payment Information</strong>: payment-card data is collected directly by our third-party payment processor (e.g., Stripe). <strong>We do not store full payment-card numbers or CVV codes on our servers.</strong> We may receive limited transaction metadata (last 4 digits, brand, authorization status).</li>
          <li><strong>Technical &amp; Usage Data</strong>: IP address, browser type, device identifiers, operating system, referring URL, pages viewed, timestamps, and similar log data collected automatically via cookies, pixels, and analytics tools.</li>
          <li><strong>Communications</strong>: the contents of emails, text messages, or contact-form submissions you send to us.</li>
        </ul>
        <p>
          We do not knowingly collect Social Security numbers, government ID numbers, precise geolocation, biometric data, or
          sensitive personal information. We do not knowingly collect personal information from children under 13.
        </p>

        <h2 className="font-display text-2xl mt-6">2. How We Use Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process, confirm, design, manufacture, fulfill, and ship your order;</li>
          <li>Communicate with you about orders, design approvals, shipping, and customer support;</li>
          <li>Process payments, prevent fraud, and verify identity;</li>
          <li>Operate, maintain, secure, and improve the Site;</li>
          <li>Respond to inquiries and provide technical support;</li>
          <li>Send transactional messages and, with your consent where required, occasional marketing about new clocks or promotions (you may opt out at any time);</li>
          <li>Comply with legal obligations, enforce our Terms, and protect our rights and the safety of others.</li>
        </ul>

        <h2 className="font-display text-2xl mt-6">3. Legal Bases for Processing (EEA/UK)</h2>
        <p>
          If you are located in the European Economic Area or the United Kingdom, we process your personal data on the following legal
          bases: (a) performance of a contract (to fulfill your order); (b) compliance with legal obligations; (c) our legitimate
          interests in operating, securing, and promoting our business; and (d) your consent where required (e.g., for marketing
          messages or non-essential cookies). You may withdraw consent at any time without affecting prior processing.
        </p>

        <h2 className="font-display text-2xl mt-6">4. How We Share Information</h2>
        <p>
          <strong>We do not sell or rent your personal information.</strong> We do not &ldquo;share&rdquo; personal information for
          cross-context behavioral advertising as those terms are defined under the California Consumer Privacy Act, as amended by
          the California Privacy Rights Act (collectively, &ldquo;CCPA/CPRA&rdquo;). We disclose information only as follows:
        </p>
        <ul>
          <li><strong>Service providers</strong> who act on our behalf under written contract: payment processors (e.g., Stripe), shipping carriers (e.g., USPS, UPS, FedEx), email/SMS providers, web hosting, backend infrastructure (Lovable Cloud), analytics, and customer-support tools;</li>
          <li><strong>Legal &amp; safety</strong>: when required by law, subpoena, court order, or to investigate fraud, enforce our Terms, or protect the rights, property, or safety of any person;</li>
          <li><strong>Business transfers</strong>: in connection with a merger, acquisition, financing, reorganization, sale of assets, or bankruptcy, subject to standard confidentiality protections.</li>
        </ul>

        <h2 className="font-display text-2xl mt-6">5. Buyer-Supplied Images &amp; Portfolio Use</h2>
        <p>
          By uploading any photograph, logo, or image to us, you represent and warrant that you own or have all necessary rights to
          use and authorize our use of that content. We use uploaded images to design and produce your clock and may also display
          finished clocks (which may include your uploaded image as incorporated into the Product) in our portfolio, gallery, social
          media, and advertising, unless you notify us in writing at the time of ordering that you wish to opt out of such
          promotional use. See Section 10 of our Terms of Service for the corresponding intellectual-property terms.
        </p>

        <h2 className="font-display text-2xl mt-6">6. Cookies &amp; Tracking Technologies</h2>
        <p>
          We use cookies and similar technologies for essential Site functionality (e.g., session management), preferences, security,
          and analytics. You can configure your browser to refuse cookies, but parts of the Site may not function properly. Where
          required by law, we obtain consent before placing non-essential cookies. We do not currently respond to &ldquo;Do Not
          Track&rdquo; browser signals.
        </p>

        <h2 className="font-display text-2xl mt-6">7. Data Retention</h2>
        <p>
          We retain personal information only as long as necessary for the purposes described in this Policy, to comply with our legal
          obligations (including tax, accounting, and consumer-protection laws), to resolve disputes, and to enforce our agreements.
          Order records are typically retained for seven (7) years for tax and warranty purposes. We then delete or anonymize the
          information in a secure manner.
        </p>

        <h2 className="font-display text-2xl mt-6">8. Data Security</h2>
        <p>
          We implement commercially reasonable administrative, technical, and physical safeguards designed to protect personal
          information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over
          the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security. You use the Site at your own
          risk.
        </p>

        <h2 className="font-display text-2xl mt-6">9. Your Privacy Rights</h2>
        <p>
          Subject to applicable law and verification of your identity, you may have the right to: (a) know what categories and
          specific pieces of personal information we have collected about you; (b) access a copy of your personal information;
          (c) request correction of inaccurate information; (d) request deletion of your information (subject to legal exceptions
          such as tax-record retention); (e) opt out of marketing communications; (f) opt out of sale or sharing for cross-context
          behavioral advertising (we do not engage in either); (g) not receive discriminatory treatment for exercising your rights;
          and, if you are in the EEA/UK, (h) lodge a complaint with your local data-protection authority.
        </p>
        <p>
          To exercise any of these rights, email <a href="mailto:support@itslitneon.com">support@itslitneon.com</a> with the
          subject line &ldquo;Privacy Request.&rdquo; We will respond within the timeframe required by applicable law. We may need
          to verify your identity before fulfilling certain requests. You may designate an authorized agent to act on your behalf
          where permitted by law.
        </p>

        <h2 className="font-display text-2xl mt-6">10. Children&rsquo;s Privacy</h2>
        <p>
          The Site is not directed to children under 13, and we do not knowingly collect personal information from anyone under 13.
          If we learn we have collected such information, we will delete it promptly. Parents or guardians who believe their child
          has provided us with personal information should contact us at the email above.
        </p>

        <h2 className="font-display text-2xl mt-6">11. International Users</h2>
        <p>
          Light Me Up Productions is based in the United States, and any information you provide is processed and stored in the
          United States or in other jurisdictions where our service providers operate. By using the Site or placing an order, you
          consent to the transfer of your information to the United States, which may have data-protection laws different from those
          of your country.
        </p>

        <h2 className="font-display text-2xl mt-6">12. Third-Party Links</h2>
        <p>
          The Site may contain links to third-party websites or services. We are not responsible for the privacy practices or content
          of those third parties. We encourage you to review their privacy policies before providing any personal information.
        </p>

        <h2 className="font-display text-2xl mt-6">13. Changes to This Policy</h2>
        <p>
          We may update this Policy from time to time by posting a revised version on the Site with a new Effective Date. Material
          changes will be highlighted on the Site. Your continued use of the Site after changes are posted constitutes acceptance of
          the revised Policy.
        </p>

        <h2 className="font-display text-2xl mt-6">14. Contact Us</h2>
        <p>
          Light Me Up Productions &mdash; Attn: Joseph Dakuras, Privacy Officer<br />
          Email: <a href="mailto:support@itslitneon.com">support@itslitneon.com</a><br />
          Text/Phone: <a href="sms:+17024609190">702-460-9190</a>
        </p>

        <p className="text-xs text-muted-foreground mt-8">
          <em>Disclaimer: This document is provided for general informational purposes and does not constitute legal advice. Consult a
          licensed attorney to confirm it meets the specific requirements of your jurisdiction and business.</em>
        </p>
      </article>
    </PageShell>
  );
}
