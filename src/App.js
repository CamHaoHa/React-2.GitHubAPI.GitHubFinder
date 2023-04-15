import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import AboutPage from './components/pages/AboutPage';
import NotFound from './components/pages/NotFound';
import { GithubProvider } from './context/github/GithubContext';

function App() {
  return (
    <GithubProvider>
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />
          <main>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/about"
                element={<AboutPage />}
              />
              <Route
                path="/notfound"
                element={<NotFound />}
              />
              <Route
                path="/*"
                element={<NotFound />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GithubProvider>
  );
}

export default App;
