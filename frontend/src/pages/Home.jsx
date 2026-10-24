import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Offers from '../components/Offers';
import WhyUs from '../components/WhyUs';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="home-page-root">
      <Navbar />
      <main>
        <Hero />
        <Offers />
        <WhyUs />
      </main>
      <Contact />
    </div>
  );
}
