import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import BackToTop from './BackToTop';
import Preloader from './Preloader';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Preloader />
      <Header />
      <main className="flex-grow pt-24">
        {/* The Outlet renders the current route's component */}
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
