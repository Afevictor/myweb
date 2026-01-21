import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useParams, useNavigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { VideosPage } from './pages/VideosPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { ServicesPage } from './pages/ServicesPage';
import ServiceDetail from './components/ServiceDetail';

const ServiceDetailWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) return null; // Or a custom 404

  return <ServiceDetail serviceId={id} onBack={() => navigate(-1)} />;
};

const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="videos" element={<VideosPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:id" element={<ServiceDetailWrapper />} />
      </Route>
    </Routes>
  );
};

export default App;