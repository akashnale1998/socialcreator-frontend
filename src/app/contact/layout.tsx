import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Us | SocialCreator AI',
  description: 'Get in touch with the SocialCreator AI team. We provide support for technical issues, billing inquiries, and creator partnerships.',
  keywords: 'Contact SocialCreator AI, SaaS support, AI tool support, creator partnerships',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
