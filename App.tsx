import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProviders } from './components/Contexts';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { AIStylist } from './components/AI/AIStylist';

const App: React.FC = () => {
  return (
    <AppProviders>
      <Router>
        <div className="flex flex-col min-h-screen transition-colors duration-300">
          <Navbar />
          <main className="flex-grow bg-gray-50 dark:bg-gray-950">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <AIStylist />
          <Footer />
        </div>
      </Router>
    </AppProviders>
  );
};

export default App;