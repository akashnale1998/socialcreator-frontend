'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Mail, Clock, HelpCircle, MessageSquare, Handshake, Send } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for the contact form
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#030014] text-gray-300 selection:bg-primary/30 font-sans">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <main className="relative z-10 pt-32 pb-24 px-6 sm:px-12 max-w-6xl mx-auto">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Whether you have a question about our AI tools, need assistance with your creator account, or want to explore partnership opportunities, we’re here to help.
          </p>
        </header>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Contact Information Cards (Left Side) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                  <Mail size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Support & Inquiries</h3>
              </div>
              <p className="text-gray-400 mb-2">For technical help and general questions.</p>
              <a href="mailto:support@socialcreatorapp.com" className="text-purple-400 font-medium hover:text-purple-300 transition-colors">
                support@socialcreatorapp.com
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                  <Handshake size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Partnerships</h3>
              </div>
              <p className="text-gray-400 mb-2">For business inquiries and creator collaborations.</p>
              <a href="mailto:partners@socialcreatorapp.com" className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
                partners@socialcreatorapp.com
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-2">
                <Clock className="text-gray-400" size={20} />
                <h3 className="text-lg font-bold text-white">Response Time</h3>
              </div>
              <p className="text-gray-400 pl-9">
                Our support team typically responds within <strong>24-48 business hours</strong>. We prioritize critical technical issues.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/20 rounded-2xl p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <HelpCircle className="text-pink-400" size={24} />
                  <h3 className="text-xl font-bold text-white">Quick Answers</h3>
                </div>
                <p className="text-gray-300">
                  Find fast solutions to common issues regarding billing, account limits, and AI generation credits.
                </p>
                <Link href="/faq" className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                  <MessageSquare size={16} />
                  Visit our FAQ
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Side) */}
          <div className="lg:col-span-3">
            <div className="bg-[#0a0614] border border-white/10 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
              
              {submitSuccess ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-400 mb-2">
                    <Send size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                  <p className="text-gray-400">
                    Thanks for reaching out. Our team will get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0f0a1c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all appearance-none"
                    >
                      <option value="" disabled className="text-gray-500">Select a topic...</option>
                      <option value="General Technical Support">General Technical Support</option>
                      <option value="Billing & Subscriptions">Billing & Subscription Issue</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Partnership / Agency">Partnership / Agency Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-y"
                      placeholder="How can we help you today?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-bold text-lg rounded-xl px-8 py-4 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-6">
              By submitting this form, you agree to our <Link href="/privacy" className="underline hover:text-gray-300">Privacy Policy</Link>.
            </p>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
