import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms of Service · It's Lit Neon" },
      { name: "description", content: "Terms of Service, sale terms, and no-refund policy for Light Me Up Productions custom neon clocks." },
      { property: "og:title", content: "Terms of Service · It's Lit Neon" },
      { property: "og:description", content: "Sale terms and no-refund policy for our made-to-order custom neon clocks." },
      { property: "og:url", content: "https://itslitneon.com/terms" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://itslitneon.com/terms" }],
  }),
});

function Terms() {
  const updated = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 md:px-6 py-12 prose prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-[var(--neon-orange)]">
        <h1 className="font-display text-5xl">Terms of Service &amp; No-Refund Policy</h1>
        <p className="text-sm text-muted-foreground">Effective Date: {updated}</p>

        <p className="text-muted-foreground">
          These Terms of Service (the &ldquo;Terms&rdquo;) constitute a binding legal agreement between you (&ldquo;you,&rdquo; &ldquo;Customer,&rdquo; or &ldquo;Buyer&rdquo;) and
          <strong> Light Me Up Productions</strong>, a sole proprietorship operated by Joseph Dakuras (&ldquo;Light Me Up,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
          governing your access to and use of the website located at <a href="https://itslitneon.com">itslitneon.com</a> (the &ldquo;Site&rdquo;) and any
          purchase of products from us, including made-to-order custom neon clocks and related goods (collectively, the &ldquo;Products&rdquo;).
          BY ACCESSING THE SITE, SUBMITTING AN ORDER, OR PURCHASING ANY PRODUCT, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND
          AGREE TO BE BOUND BY THESE TERMS, INCLUDING THE BINDING ARBITRATION AND CLASS-ACTION WAIVER IN SECTION 15 AND THE NO-REFUND
          POLICY IN SECTION 6. IF YOU DO NOT AGREE, DO NOT USE THE SITE OR PLACE AN ORDER.
        </p>

        <h2 className="font-display text-2xl mt-8">1. Eligibility</h2>
        <p>
          You must be at least 18 years of age and have the legal capacity to enter into a binding contract to place an order. By
          placing an order, you represent and warrant that all information you provide is true, accurate, current, and complete, and
          that you are purchasing for personal or business use and not for resale unless expressly authorized by us in writing.
        </p>

        <h2 className="font-display text-2xl mt-6">2. Products; Made-to-Order Nature</h2>
        <p>
          All clocks sold by Light Me Up Productions are <strong>handcrafted, made-to-order items personalized to the buyer&rsquo;s
          specifications</strong>, including but not limited to names, logos, photos, colors, and
          neon glow color. You acknowledge that:
        </p>
        <ul>
          <li>Each Product is hand-built and may contain minor variations in color, glow intensity, glass shape, weld lines, and overall finish that are inherent to handmade neon work and do not constitute defects.</li>
          <li>Photographs on the Site are representative; actual Products may differ slightly in appearance due to lighting, monitor calibration, and the nature of neon.</li>
          <li>Neon tubing is fragile. You assume all risk of damage caused by improper handling, installation, dropping, voltage spikes, exposure to moisture, or use outside indoor residential environments.</li>
        </ul>

        <h2 className="font-display text-2xl mt-6">3. Orders, Pricing &amp; Payment</h2>
        <p>
          Listed prices are: <strong>Regular Neon Clock $99 plus shipping</strong> and <strong>Custom Neon Clock $125 plus
          shipping</strong>, in U.S. Dollars, exclusive of any applicable taxes and shipping fees, which are calculated at checkout or
          quoted by us in writing. We reserve the right to correct pricing errors, refuse or cancel any order, and limit quantities at
          any time prior to shipment. Submission of an order is an offer to buy; no contract is formed until we accept your order in
          writing (including by email or text from Joe) and your payment has cleared in full. <strong>Production does not begin until
          payment is received in full and the design is confirmed by you in writing.</strong>
        </p>

        <h2 className="font-display text-2xl mt-6">4. Design Approval</h2>
        <p>
          Prior to production we will send you a written design summary or mock-up describing the layout, wording, spelling, colors,
          and any photo or logo placement. <strong>You are solely responsible for reviewing and approving the design, including all
          spelling, names, dates, and colors.</strong> Once you approve the design (by reply email, text, or by clicking an approval
          link), the design is final and you waive any claim arising from errors that were present in the approved design.
        </p>

        <h2 className="font-display text-2xl mt-6">5. Shipping, Title &amp; Risk of Loss</h2>
        <p>
          Stated lead times are estimates only and are not guaranteed. Title and risk of loss pass to you upon our delivery of the
          Product to the common carrier (F.O.B. Origin). We are not responsible for carrier delays, lost, stolen, or damaged shipments
          once tendered to the carrier. Claims for shipping damage must be made directly with the carrier; however, as a courtesy you
          may notify us within seven (7) days of delivery, with date-stamped photographs of the packaging and damaged Product, and we
          will assist with the carrier claim where reasonably possible. Refusal of delivery, undeliverable addresses, or failure to
          retrieve a Product from the carrier does not entitle you to a refund and may result in additional reshipment fees at your
          expense.
        </p>

        <h2 className="font-display text-2xl mt-6">6. NO-REFUND, NO-RETURN, NO-CANCELLATION POLICY</h2>
        <p>
          <strong>ALL SALES ARE FINAL. ALL PRODUCTS ARE NON-REFUNDABLE, NON-RETURNABLE, AND NON-EXCHANGEABLE.</strong> Because every
          Product is custom-made and personalized to the buyer&rsquo;s specifications, we do not accept returns, do not issue refunds,
          do not provide store credit, and do not accept cancellations once an order has been submitted and payment has been received.
          This policy applies to both Regular Neon Clocks and Custom Neon Clocks and applies regardless of the reason for the
          requested refund, including but not limited to:
        </p>
        <ul>
          <li>Buyer&rsquo;s remorse, change of mind, or change of circumstances;</li>
          <li>Delays in production or shipping;</li>
          <li>Variations in color, glow, finish, or appearance inherent to handmade neon;</li>
          <li>Spelling, name, color, or design errors that appeared in a design you approved under Section 4;</li>
          <li>Damage occurring after the carrier takes possession of the Product (see Section 5);</li>
          <li>Receipt of the Product as a gift, or rejection of the Product by the recipient.</li>
        </ul>
        <p>
          Chargebacks, payment reversals, or disputes initiated without first contacting us in writing and giving us a reasonable
          opportunity to resolve the issue constitute a material breach of these Terms. You agree that any such chargeback initiated
          in violation of this Section 6 is wrongful, and you agree to reimburse us for all costs incurred in disputing it, including
          attorneys&rsquo; fees, processor fees, and collection costs.
        </p>

        <h2 className="font-display text-2xl mt-6">7. Limited Manufacturing Warranty</h2>
        <p>
          We warrant that, at the time of shipment, the Product will be free from material defects in workmanship of the neon tubing,
          quartz movement, and chrome bezel under normal indoor use for a period of <strong>thirty (30) days</strong> from the date of
          delivery. This limited warranty is your <strong>sole and exclusive remedy</strong> and, at our option, is limited to repair
          or replacement of the defective component. The warranty does not cover: (a) damage from misuse, abuse, accident, dropping,
          electrical surge, moisture, or outdoor exposure; (b) cosmetic variations inherent to handmade neon; (c) any modification or
          repair performed by anyone other than us; (d) shipping damage; or (e) any Product where the buyer-approved design contains
          the alleged defect. To claim warranty service, contact us in writing within the warranty period with photographs and proof
          of purchase. Buyer is responsible for all shipping costs to and from our facility for warranty service.
        </p>

        <h2 className="font-display text-2xl mt-6">8. Disclaimer of Warranties</h2>
        <p>
          EXCEPT FOR THE LIMITED MANUFACTURING WARRANTY IN SECTION 7, THE SITE AND ALL PRODUCTS ARE PROVIDED <strong>&ldquo;AS IS&rdquo;
          AND &ldquo;AS AVAILABLE,&rdquo;</strong> WITH ALL FAULTS, AND WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER
          EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE. SOME
          JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES, SO PORTIONS OF THIS SECTION MAY NOT APPLY TO YOU.
        </p>

        <h2 className="font-display text-2xl mt-6">9. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL LIGHT ME UP PRODUCTIONS, ITS OWNER, AGENTS, OR
          SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING WITHOUT
          LIMITATION LOST PROFITS, LOST REVENUE, LOST DATA, PROPERTY DAMAGE, OR PERSONAL INJURY, ARISING OUT OF OR RELATED TO THE
          SITE, ANY PRODUCT, OR THESE TERMS, REGARDLESS OF THE THEORY OF LIABILITY AND EVEN IF WE HAVE BEEN ADVISED OF THE
          POSSIBILITY OF SUCH DAMAGES. OUR TOTAL CUMULATIVE LIABILITY ARISING OUT OF OR RELATED TO ANY PRODUCT OR THESE TERMS SHALL
          NOT EXCEED THE AMOUNT YOU ACTUALLY PAID TO US FOR THE SPECIFIC PRODUCT GIVING RISE TO THE CLAIM. THE LIMITATIONS IN THIS
          SECTION APPLY EVEN IF ANY LIMITED REMEDY FAILS OF ITS ESSENTIAL PURPOSE.
        </p>

        <h2 className="font-display text-2xl mt-6">10. Intellectual Property; Buyer-Supplied Content</h2>
        <p>
          All content on the Site, including our name, logo, photographs, gallery images, copy, and clock designs, is owned by or
          licensed to Light Me Up Productions and is protected by U.S. and international copyright, trademark, and unfair-competition
          laws. You may not copy, reproduce, modify, distribute, or create derivative works without our prior written consent.
        </p>
        <p>
          By submitting any image, photograph, logo, name, color scheme, or other content (&ldquo;Buyer Content&rdquo;) to
          us in connection with an order, you represent and warrant that you own or have all necessary rights, licenses, and
          permissions to use that content and to authorize us to reproduce it on a Product, and that the Buyer Content does not
          infringe, misappropriate, or violate any third party&rsquo;s intellectual-property, privacy, publicity, or other rights. You
          grant Light Me Up Productions a perpetual, irrevocable, worldwide, royalty-free, sublicensable license to use, reproduce,
          modify, and display the Buyer Content (i) to produce your Product and (ii) for our portfolio, gallery, social media, and
          advertising, unless you notify us in writing at the time of ordering that you wish to opt out of promotional use.
        </p>
        <p>
          <strong>You agree to indemnify, defend, and hold harmless Light Me Up Productions</strong> and its owner from and against
          any and all claims, damages, liabilities, costs, and expenses (including reasonable attorneys&rsquo; fees) arising from any
          breach of the representations in this Section 10, including any third-party claim that the Buyer Content infringes their
          rights.
        </p>

        <h2 className="font-display text-2xl mt-6">11. Acceptable Use</h2>
        <p>
          You may not use the Site or our Products to harass, defame, infringe, or harm any person; to upload unlawful, obscene,
          threatening, or hateful content; to attempt to circumvent any security or access control; or to violate any applicable law.
          We reserve the right to refuse any order that, in our sole discretion, contains or requests content that is unlawful,
          offensive, infringing, or otherwise inconsistent with our brand.
        </p>

        <h2 className="font-display text-2xl mt-6">12. Third-Party Services</h2>
        <p>
          Payments are processed by third-party payment processors. By submitting payment information you also agree to the terms and
          privacy policies of those processors. We do not store full payment card numbers on our servers. We are not responsible for
          the acts or omissions of any third-party processor, carrier, or service provider.
        </p>

        <h2 className="font-display text-2xl mt-6">13. Force Majeure</h2>
        <p>
          We shall not be liable for any failure or delay in performance caused by events beyond our reasonable control, including
          without limitation acts of God, fire, flood, earthquake, pandemic, epidemic, war, terrorism, civil unrest, governmental
          action, labor disputes, supply-chain disruption, carrier delays, power or internet outages, or shortage of materials.
        </p>

        <h2 className="font-display text-2xl mt-6">14. Governing Law &amp; Venue</h2>
        <p>
          These Terms and any dispute arising out of or related to them or any Product are governed by the laws of the State of
          Nevada, without regard to its conflict-of-laws principles. Subject to Section 15, the exclusive venue for any action not
          subject to arbitration shall lie in the state or federal courts located in Clark County, Nevada, and you irrevocably consent
          to the personal jurisdiction of those courts.
        </p>

        <h2 className="font-display text-2xl mt-6">15. Binding Arbitration; Class-Action Waiver</h2>
        <p>
          <strong>PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.</strong> Except for claims for injunctive relief
          to protect intellectual property or to enforce the no-refund or anti-chargeback provisions, any dispute, claim, or
          controversy arising out of or relating to these Terms or any Product (a &ldquo;Dispute&rdquo;) shall be resolved exclusively
          by <strong>final and binding individual arbitration</strong> administered by the American Arbitration Association under its
          Consumer Arbitration Rules, conducted in Clark County, Nevada, in the English language, before a single arbitrator. The
          arbitrator&rsquo;s decision shall be final and may be entered in any court of competent jurisdiction.
          <strong> YOU AND LIGHT ME UP PRODUCTIONS EACH WAIVE THE RIGHT TO A TRIAL BY JURY AND THE RIGHT TO PARTICIPATE IN A CLASS,
          COLLECTIVE, OR REPRESENTATIVE ACTION.</strong> Claims may be brought only in an individual capacity, and the arbitrator may
          not consolidate more than one person&rsquo;s claims. If this class-action waiver is found unenforceable, the entire
          arbitration provision shall be null and void, but the remainder of the Terms shall remain in effect.
        </p>

        <h2 className="font-display text-2xl mt-6">16. Statute of Limitations</h2>
        <p>
          You agree that any claim arising out of or related to the Site, any Product, or these Terms must be filed within
          <strong> one (1) year</strong> after such claim arose, or be forever barred, to the maximum extent permitted by law.
        </p>

        <h2 className="font-display text-2xl mt-6">17. Severability; Waiver; Assignment; Entire Agreement</h2>
        <p>
          If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall continue in full force and
          effect, and the invalid provision shall be modified to the minimum extent necessary to be enforceable. No waiver of any
          term shall be deemed a continuing waiver. You may not assign or transfer these Terms without our prior written consent; we
          may assign these Terms at any time without notice. These Terms, together with our Privacy Policy and any written order
          confirmation, constitute the entire agreement between the parties and supersede all prior agreements or understandings.
        </p>

        <h2 className="font-display text-2xl mt-6">18. Changes to These Terms</h2>
        <p>
          We may update these Terms at any time by posting a revised version on the Site with a new Effective Date. The version in
          effect at the time of your order governs that order. Your continued use of the Site after changes are posted constitutes
          acceptance of the revised Terms.
        </p>

        <h2 className="font-display text-2xl mt-6">19. Contact</h2>
        <p>
          Light Me Up Productions &mdash; Attn: Joseph Dakuras<br />
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
