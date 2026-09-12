import Logo from './components/Logo';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink font-sans transition-colors duration-300 flex flex-col items-center justify-center p-8">
      <div className="absolute top-8 right-8">
        <ThemeToggle />
      </div>
      
      <div className="max-w-md w-full mb-8">
        <Logo className="w-48 h-auto mx-auto" />
      </div>

      <h1 className="text-display text-accent font-serif text-center">Alzina Attorneys</h1>
      <p className="text-ink-muted mt-4 text-center text-title-3 max-w-2xl mx-auto">
        Corporate & Commercial Law Practice
      </p>

      <div className="mt-8 flex gap-4">
        <button className="px-8 py-4 bg-accent text-white font-medium rounded-sm shadow-md hover:bg-oxblood-700 transition-colors">
          Book Consultation
        </button>
        <button className="px-8 py-4 border border-accent text-accent font-medium rounded-sm hover:bg-bg-subtle transition-colors">
          Our Practice
        </button>
      </div>
    </div>
  )
}
