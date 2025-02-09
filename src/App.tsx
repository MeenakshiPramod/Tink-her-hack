import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import StartupList from './components/StartupList';
import InvestorsList from './components/InvestorsList';
import Footer from './components/Footer';
import SignIn from './components/Login';
import Chatbot from './components/chatbot'; // Add this import

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <StartupList />
              <InvestorsList />
            </>
          } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/chatbot" element={<Chatbot />} /> {/* Add this route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;