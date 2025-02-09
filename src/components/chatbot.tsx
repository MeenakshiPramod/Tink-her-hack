import React, { useState } from 'react';

export default function Chatbot() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResponse('');

    try {
      const res = await fetch('http://127.0.0.1:8000/chatbot', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      if (data.status === 'success' && data.response.candidates.length > 0) {
        setResponse(data.response.candidates[0].content.parts[0].text);
      } else {
        setError('No response from chatbot');
      }
    } catch (err) {
      setError('Error fetching response');
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Chat with Gemini
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Ask anything you want to know
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div>
                <label htmlFor="query" className="block text-sm font-medium text-gray-700">
                  Your Question
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="query"
                    name="query"
                    type="text"
                    required
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Ask me anything..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Ask
              </button>
            </form>

            {response && (
              <div className="mt-6 text-center">
                <p className="text-lg text-gray-700">
                  {response}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}