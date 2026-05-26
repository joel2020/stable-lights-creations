import * as React from 'react';
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from '@react-email/components';
import type { TemplateEntry } from './registry';

interface Props {
  fullName?: string;
  email?: string;
  phone?: string;
  shippingAddress?: string;
  stableName?: string;
  logoUrl?: string;
  logoFilename?: string;
  notes?: string;
  inquiryId?: string;
}

const CustomOrderInquiry = ({
  fullName = '',
  email = '',
  phone = '',
  shippingAddress = '',
  stableName = '',
  logoUrl = '',
  logoFilename = '',
  notes = '',
  inquiryId = '',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New custom order inquiry — {fullName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New custom order inquiry</Heading>
        <Text style={text}>
          A new horse-racing custom order came in. No charge has been taken — review the logo and send a proof + invoice when ready.
        </Text>

        <Section style={card}>
          <Text style={sectionTitle}>Customer</Text>
          <Row label="Name" value={fullName} />
          <Row label="Email" value={email} />
          <Row label="Phone" value={phone} />
          <Row label="Ship to" value={shippingAddress} />
          <Row label="Stable" value={stableName} />
        </Section>

        <Section style={card}>
          <Text style={sectionTitle}>Artwork</Text>
          {logoUrl ? (
            <Text style={row}>
              <span style={rowLabel}>Logo:</span>{' '}
              <Link href={logoUrl} style={linkStyle}>{logoFilename || 'View uploaded logo'}</Link>
            </Text>
          ) : (
            <Row label="Logo" value="(none uploaded)" />
          )}
          <Row label="Notes" value={notes} />
        </Section>

        <Hr style={hr} />
        <Text style={small}>Inquiry ID: {inquiryId}</Text>
      </Container>
    </Body>
  </Html>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <Text style={row}>
    <span style={rowLabel}>{label}:</span> {value || '—'}
  </Text>
);

export const template = {
  component: CustomOrderInquiry,
  to: 'support@itslitneon.com',
  subject: (d: Record<string, any>) =>
    `[Custom Order] ${d.fullName || 'New customer'}${d.stableName ? ' — ' + d.stableName : ''}`,
  displayName: 'Custom order inquiry (ops)',
  previewData: {
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+17025551234',
    shippingAddress: '123 Main St, Las Vegas NV 89101',
    stableName: 'Sunrise Stables',
    logoUrl: 'https://example.com/logo.png',
    logoFilename: 'sunrise-logo.png',
    notes: 'Would love it before the Kentucky Derby.',
    inquiryId: 'abc-123',
  },
} satisfies TemplateEntry;

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' };
const container = { padding: '20px 25px', maxWidth: '600px', margin: '0 auto' };
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#000', margin: '0 0 16px' };
const text = { fontSize: '15px', color: '#111', margin: '0 0 16px' };
const sectionTitle = { fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: '#888', margin: '0 0 8px', fontWeight: 700 };
const card = { backgroundColor: '#f7f7f7', borderRadius: '8px', padding: '14px 18px', margin: '12px 0' };
const row = { fontSize: '14px', color: '#222', margin: '0 0 6px', lineHeight: '1.5' };
const rowLabel = { color: '#666', fontWeight: 600 };
const linkStyle = { color: '#c2410c', textDecoration: 'underline' };
const hr = { borderColor: '#e5e5e5', margin: '20px 0 12px' };
const small = { fontSize: '11px', color: '#999', margin: 0 };
