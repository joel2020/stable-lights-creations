import type { ComponentType } from 'react';
import { template as orderConfirmation } from './order-confirmation';
import { template as orderNotification } from './order-notification';
import { template as customOrderInquiry } from './custom-order-inquiry';
import { template as customOrderCustomerConfirmation } from './custom-order-customer-confirmation';

export interface TemplateEntry {
  component: ComponentType<any>;
  subject: string | ((data: Record<string, any>) => string);
  displayName?: string;
  previewData?: Record<string, any>;
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string;
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'order-confirmation': orderConfirmation,
  'order-notification': orderNotification,
  'custom-order-inquiry': customOrderInquiry,
  'custom-order-customer-confirmation': customOrderCustomerConfirmation,
};

