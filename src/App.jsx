import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroll from './components/SmoothScroll';

// Temporary dummy pages to test routing and Layout
const DummyPage = ({ title }) => (
  <div className="container mx-auto px-6 md:px-12 py-20 flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-display text-accent font-serif text-center mb-6">{title}</h1>
    <p className="text-ink-muted text-center text-title-3 max-w-2xl">
      This is a placeholder for the {title} page content.
    </p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DummyPage title="Home" />} />
            <Route path="about" element={<DummyPage title="About Us" />} />
            <Route path="practice-areas" element={<DummyPage title="Practice Areas" />} />
            <Route path="insights" element={<DummyPage title="Insights" />} />
            <Route path="contact" element={<DummyPage title="Contact" />} />
            <Route path="*" element={<DummyPage title="404 Not Found" />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
