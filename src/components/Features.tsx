import React from 'react';
import { Shield, TrendingUp, Users, Lightbulb, FileText, PieChart } from 'lucide-react';

const features = [
  {
    name: 'Secure Authentication',
    description: 'Sign in securely using your Gmail account or register for a new account.',
    icon: Shield,
  },
  {
    name: 'AI-Powered Insights',
    description: 'Get detailed analysis and insights about startups through our AI system.',
    icon: Lightbulb,
  },
  {
    name: 'Document Verification',
    description: 'Verified startups with complete documentation for transparency.',
    icon: FileText,
  },
  {
    name: 'Investment Tracking',
    description: 'Track your investments and monitor startup performance in real-time.',
    icon: TrendingUp,
  },
  {
    name: 'Community Driven',
    description: 'Join a community of investors and entrepreneurs.',
    icon: Users,
  },
  {
    name: 'Dividend Distribution',
    description: 'Transparent and automated profit sharing system.',
    icon: PieChart,
  },
];

export default function Features() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-4xl font-extrabold text-gray-900 lg:text-5xl">
            Everything you need to invest in startups
          </p>
          <div className="mt-4 max-w-3xl mx-auto">
            <p className="text-xl text-gray-500 leading-relaxed">
              Our platform provides all the tools and features you need to make informed investment decisions.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="absolute -top-6 left-6">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="mt-4 text-base text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}