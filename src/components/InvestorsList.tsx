// InvestorsList.tsx
import React from 'react';
import { User, Briefcase, DollarSign, Layout } from 'lucide-react';

const investors = [
  {
    name: 'Rahul Sharma',
    company: 'Venture Partners India',
    investments: 42,
    sectors: ['CleanTech', 'HealthTech'],
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Priya Patel',
    company: 'Angel Nexus',
    investments: 28,
    sectors: ['EdTech', 'FinTech'],
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Arjun Mehta',
    company: 'SeedSpark Capital',
    investments: 35,
    sectors: ['AI/ML', 'SaaS'],
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

export default function InvestorsList() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">Our Top Investors</h2>
          <p className="mt-4 text-xl text-gray-500">
            Connect with experienced investors in the startup ecosystem
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {investors.map((investor) => (
            <div key={investor.name} className="group bg-white overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <img 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  src={investor.image}
                  alt={investor.name}
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                  {investor.name}
                </h3>
                <div className="mt-2 flex items-center text-gray-500">
                  <Briefcase className="h-5 w-5 mr-2" />
                  <span>{investor.company}</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 pb-6 border-b border-gray-100">
                  <div className="flex items-center">
                    <DollarSign className="h-6 w-6 mr-2 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{investor.investments}+</p>
                      <p className="text-xs text-gray-500">Investments</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Layout className="h-6 w-6 mr-2 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{investor.sectors.length}</p>
                      <p className="text-xs text-gray-500">Sectors</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900">Focus Areas</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {investor.sectors.map((sector) => (
                      <span 
                        key={sector}
                        className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="mt-6 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-[1.02]">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}