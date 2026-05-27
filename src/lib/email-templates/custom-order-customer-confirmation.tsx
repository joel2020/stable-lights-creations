import * as React from 'react';
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components';
import type { TemplateEntry } from './registry';

interface Props {
  fullName?: string;
  stableName?: string;
  inquiryId?: string;
}

const STEPS = [
  {
    n: '1',
    title: 'We review your logo',
    body: 'Joe personally checks the artwork you sent — usually within 1 business day.',
  },
  {
    n: '2',
    title: 'We send a proof for approval',
    body: 'You\'ll see exactly how your clock will look before anything is built. Reply with changes or a thumbs-up.',
  },
  {
    n: '3',
    title: 'We send an invoice',
    body: 'Only after you approve the proof. Pay by card, check, or however works for you. No charge until this step.',
  },
  {
    n: '4',
    title: 'We build and ship it',
    body: 'Hand-built, packed carefully, and shipped to your door. Standard $25 shipping is on the invoice — if actual postage is more, you\'ll get a separate invoice for the exact difference (not a penny more).',
  },
];

const CustomOrderCustomerConfirmation = ({ fullName = '', stableName = '', inquiryId = '' }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We got your custom order — here's what happens next</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {fullName ? `Thanks, ${fullName}!` : 'Thanks for your order!'}
        </Heading>
        <Text style={lead}>
          We received your custom clock request{stableName ? ` for ${stableName}` : ''}. Joe will personally handle it from here — no accounts, no online checkout, no surprises.
        </Text>

        <Section style={highlight}>
          <Text style={highlightTitle}>You won't be charged until you approve the artwork.</Text>
          <Text style={highlightBody}>
            Nothing is billed today. You'll only see an invoice after you've seen and approved your proof.
          </Text>
        </Section>

        <Heading as="h2" style={h2}>What happens next</Heading>
        {STEPS.map((s) => (
          <Section key={s.n} style={stepRow}>
            <Text style={stepNum}>{s.n}</Text>
            <Text style={stepTitle}>{s.title}</Text>
            <Text style={stepBody}>{s.body}</Text>
          </Section>
        ))}

        <Hr style={hr} />

        <Heading as="h2" style={h2}>Need to reach Joe?</Heading>
        <Text style={text}>
          Call or text: <strong>702-460-9190</strong><br />
          Email: <strong>support@itslitneon.com</strong>
        </Text>
        <Text style={text}>
          Just reply to this email with any photos, color preferences, deadlines, or questions — it goes straight to us.
        </Text>

        {inquiryId ? <Text style={small}>Reference #: {inquiryId}</Text> : null}
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: CustomOrderCustomerConfirmation,
  subject: (d: Record<string, any>) =>
    `We got your custom clock order${d.stableName ? ` — ${d.stableName}` : ''}`,
  displayName: 'Custom order confirmation (customer)',
  previewData: {
    fullName: 'Jane Doe',
    stableName: 'Sunrise Stables',
    inquiryId: 'abc-123',
  },
} satisfies TemplateEntry;

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' };
const container = { padding: '24px 25px', maxWidth: '600px', margin: '0 auto' };
const h1 = { fontSize: '26px', fontWeight: 'bold', color: '#111', margin: '0 0 14px' };
const h2 = { fontSize: '18px', fontWeight: 'bold', color: '#111', margin: '24px 0 12px' };
const lead = { fontSize: '16px', color: '#222', lineHeight: '1.55', margin: '0 0 18px' };
const text = { fontSize: '15px', color: '#222', lineHeight: '1.55', margin: '0 0 12px' };
const highlight = { backgroundColor: '#fff4ec', border: '2px solid #f97316', borderRadius: '10px', padding: '14px 18px', margin: '8px 0 8px' };
const highlightTitle = { fontSize: '16px', fontWeight: 700, color: '#9a3412', margin: '0 0 4px' };
const highlightBody = { fontSize: '14px', color: '#7c2d12', margin: 0, lineHeight: '1.5' };
const stepRow = { backgroundColor: '#f7f7f7', borderRadius: '8px', padding: '12px 16px', margin: '0 0 10px' };
const stepNum = { display: 'inline-block', fontSize: '12px', fontWeight: 700, color: '#fff', backgroundColor: '#f97316', borderRadius: '999px', padding: '2px 10px', margin: '0 0 6px' };
const stepTitle = { fontSize: '15px', fontWeight: 700, color: '#111', margin: '0 0 4px' };
const stepBody = { fontSize: '14px', color: '#444', lineHeight: '1.5', margin: 0 };
const hr = { borderColor: '#e5e5e5', margin: '24px 0 12px' };
const small = { fontSize: '11px', color: '#999', margin: '12px 0 0' };
