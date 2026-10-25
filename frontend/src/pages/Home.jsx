import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MenuSection from '../components/MenuSection';
import WhyUs from '../components/WhyUs';
import Reviews from '../components/Reviews';
import QuickOrder from '../components/QuickOrder';
import Offers from '../components/Offers';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="home-page-root">
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <WhyUs />
        <Reviews />
        <QuickOrder />
        <Offers />
      </main>
      <Contact />
    </div>
  );
}
