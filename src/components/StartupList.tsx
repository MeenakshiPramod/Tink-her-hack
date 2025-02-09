import React from 'react';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

const startups = [
  {
    name: 'EcoTech Solutions',
    description: 'Sustainable energy solutions for urban environments',
    raised: '₹75,00,000',
    target: '₹1,50,00,000',
    investors: 234,
    growth: '+15%',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'CleanTech',
  },
  {
    name: 'HealthAI',
    description: 'AI-powered healthcare diagnostics platform',
    raised: '₹1,20,00,000',
    target: '₹2,00,00,000',
    investors: 456,
    growth: '+25%',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'HealthTech',
  },
  {
    name: 'FinLearn',
    description: 'Financial literacy education platform',
    raised: '₹45,00,000',
    target: '₹80,00,000',
    investors: 178,
    growth: '+10%',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'EdTech',
  },
];

export default function StartupList() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">Featured Startups</h2>
          <p className="mt-4 text-xl text-gray-500">
            Discover innovative startups looking for funding
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {startups.map((startup) => (
            <div key={startup.name} className="group bg-white overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" src={startup.image} alt={startup.name} />
                <span className="absolute top-4 right-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-orange-500">
                  {startup.category}
                </span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                  {startup.name}
                </h3>
                <p className="mt-3 text-gray-500 leading-relaxed">{startup.description}</p>
                
                <div className="mt-8 grid grid-cols-3 gap-4 pb-6 border-b border-gray-100">
                  <div className="text-center">
                    <DollarSign className="h-6 w-6 mx-auto text-orange-500" />
                    <p className="mt-2 text-sm font-medium text-gray-900">{startup.raised}</p>
                    <p className="text-xs text-gray-500">Raised</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-6 w-6 mx-auto text-orange-500" />
                    <p className="mt-2 text-sm font-medium text-gray-900">{startup.investors}</p>
                    <p className="text-xs text-gray-500">Investors</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-6 w-6 mx-auto text-orange-500" />
                    <p className="mt-2 text-sm font-medium text-gray-900">{startup.growth}</p>
                    <p className="text-xs text-gray-500">Growth</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="relative pt-1">
                    <div className="flex mb-3 items-center justify-between">
                      <div>
                        <span className="text-sm font-semibold inline-block text-orange-500">
                          Funding Progress
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold inline-block text-orange-500">
                          {Math.round((parseInt(startup.raised.replace(/[^0-9]/g, '')) / parseInt(startup.target.replace(/[^0-9]/g, ''))) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-orange-100">
                      <div
                        style={{ width: `${(parseInt(startup.raised.replace(/[^0-9]/g, '')) / parseInt(startup.target.replace(/[^0-9]/g, ''))) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300 group-hover:from-orange-600 group-hover:to-amber-600"
                      ></div>
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}