import React from 'react';
import { Link } from 'react-router-dom';
import { CircleDollarSign, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <CircleDollarSign className="h-8 w-8 text-orange-500 transform transition-transform group-hover:scale-110 group-hover:rotate-12" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                CrowwdBank
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link to="/startups" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Browse Startups
            </Link>
            <Link to="/insights" className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              AI Insights
            </Link>
            <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              Sign In
            </button>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden absolute w-full bg-white/95 backdrop-blur-md shadow-lg">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link to="/startups" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 rounded-md transition-colors">
              Browse Startups
            </Link>
            <Link to="/insights" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500 rounded-md transition-colors">
              AI Insights
            </Link>
            <button className="mt-2 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-300">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}