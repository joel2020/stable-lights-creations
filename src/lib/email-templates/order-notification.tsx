import * as React from 'react';
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components';
import type { TemplateEntry } from './registry';

interface Props {
  productName?: string;
  orderTotal?: string;
  orderId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: string;
  stable?: string;
  horse?: string;
  trainer?: string;
  colors?: string;
  neonColor?: string;
  photoName?: string;
  notes?: string;
}

const OrderNotification = ({
  productName = 'Neon Clock',
  orderTotal = '',
  orderId = '',
  customerName = '',
  customerEmail = '',
  customerPhone = '',
  shippingAddress = '',
  stable = '',
  horse = '',
  trainer = '',
  colors = '',
  neonColor = '',
  photoName = '',
  notes = '',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New order — {productName} — {orderTotal}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New paid order</Heading>
        <Text style={text}><strong>{productName}</strong> — {orderTotal}</Text>

        <Section style={card}>
          <Text style={sectionTitle}>Customer</Text>
          <Row label="Name" value={customerName} />
          <Row label="Email" value={customerEmail} />
          <Row label="Phone" value={customerPhone} />
          <Row label="Ship to" value={shippingAddress} />
        </Section>

        <Section style={card}>
          <Text style={sectionTitle}>Design details</Text>
          <Row label="Name / Business" value={stable} />
          <Row label="Subtitle" value={horse} />
          <Row label="Tagline" value={trainer} />
          <Row label="Customer colors" value={colors} />
          <Row label="Neon glow" value={neonColor} />
          <Row label="Photo uploaded" value={photoName || '(none — ask customer to email)'} />
          <Row label="Notes" value={notes} />
        </Section>

        <Hr style={hr} />
        <Text style={small}>Order ID: {orderId}</Text>
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
  component: OrderNotification,
  subject: (d: Record<string, any>) =>
    `[New Order] ${d.productName || 'Neon Clock'} — ${d.customerName || 'Customer'} — ${d.orderTotal || ''}`,
  displayName: 'Order notification (ops)',
  previewData: {
    productName: 'Custom Neon Clock',
    orderTotal: '$150.00',
    orderId: 'cs_test_abc',
    customerName: 'Jane Doe',
    customerEmail: 'jane@example.com',
    customerPhone: '+17025551234',
    shippingAddress: '123 Main St, Las Vegas NV 89101',
    stable: "Miller's Garage",
    horse: 'Est 1987',
    trainer: '',
    colors: 'Orange + chrome',
    neonColor: 'orange',
    photoName: 'logo.png',
    notes: 'Wants delivery before June 15',
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
const hr = { borderColor: '#e5e5e5', margin: '20px 0 12px' };
const small = { fontSize: '11px', color: '#999', margin: 0 };
