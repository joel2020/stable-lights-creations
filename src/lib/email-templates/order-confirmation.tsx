import * as React from 'react';
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components';
import type { TemplateEntry } from './registry';

const SITE_NAME = "It's Lit Neon";

interface Props {
  customerName?: string;
  productName?: string;
  orderTotal?: string;
  orderId?: string;
  shippingAddress?: string;
  designSummary?: string;
}

const OrderConfirmation = ({
  customerName,
  productName = 'Neon Clock',
  orderTotal = '',
  orderId = '',
  shippingAddress = '',
  designSummary = '',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {SITE_NAME} order is confirmed</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{customerName ? `Thanks, ${customerName}!` : 'Thanks for your order!'}</Heading>
        <Text style={text}>
          We received your order for a <strong>{productName}</strong>. Joe will review your design and
          reach out within 1 business day to confirm the details before production begins.
        </Text>
        <Section style={card}>
          <Text style={cardLabel}>Order ID</Text>
          <Text style={cardValue}>{orderId}</Text>
          <Hr style={hr} />
          <Text style={cardLabel}>Total charged</Text>
          <Text style={cardValue}>{orderTotal}</Text>
          {shippingAddress && (
            <>
              <Hr style={hr} />
              <Text style={cardLabel}>Shipping to</Text>
              <Text style={cardValue}>{shippingAddress}</Text>
            </>
          )}
          {designSummary && (
            <>
              <Hr style={hr} />
              <Text style={cardLabel}>Your design</Text>
              <Text style={cardValueSmall}>{designSummary}</Text>
            </>
          )}
        </Section>
        <Text style={text}>
          If you uploaded a logo or photo during checkout, please reply to this email and attach
          the high-resolution file so Joe can use it for your build.
        </Text>
        <Text style={text}>
          Questions? Email us at{' '}
          <a href="mailto:support@itslitneon.com" style={link}>support@itslitneon.com</a>.
        </Text>
        <Text style={footer}>— The {SITE_NAME} Team</Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: OrderConfirmation,
  subject: (d: Record<string, any>) =>
    `Your ${SITE_NAME} order is confirmed${d.orderId ? ` (#${String(d.orderId).slice(0, 8)})` : ''}`,
  displayName: 'Order confirmation (customer)',
  previewData: {
    customerName: 'Jane',
    productName: 'Custom Neon Clock',
    orderTotal: '$150.00',
    orderId: 'cs_test_abc123',
    shippingAddress: '123 Main St, Las Vegas NV 89101',
    designSummary: "Stable: Miller's Garage · Subtitle: Est 1987 · Neon: Orange",
  },
} satisfies TemplateEntry;

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' };
const container = { padding: '20px 25px', maxWidth: '600px', margin: '0 auto' };
const h1 = { fontSize: '24px', fontWeight: 'bold', color: '#000000', margin: '0 0 20px' };
const text = { fontSize: '15px', color: '#333', lineHeight: '1.6', margin: '0 0 16px' };
const card = { backgroundColor: '#f7f7f7', borderRadius: '8px', padding: '18px 20px', margin: '20px 0' };
const cardLabel = { fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#888', margin: '0 0 4px' };
const cardValue = { fontSize: '15px', color: '#111', margin: '0 0 10px', fontWeight: 600 };
const cardValueSmall = { fontSize: '13px', color: '#333', margin: '0', lineHeight: '1.5' };
const hr = { borderColor: '#e5e5e5', margin: '12px 0' };
const link = { color: '#ff7a18', textDecoration: 'underline' };
const footer = { fontSize: '12px', color: '#999', margin: '30px 0 0' };
