import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';


export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1120, margin: '0 auto', padding: 16 }}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
