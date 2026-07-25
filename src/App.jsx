import Masthead from './components/Masthead'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Exhibits from './components/Exhibits'
import FieldReports from './components/FieldReports'
import Education from './components/Education'
import Footer from './components/Footer'

import NotFound from './components/NotFound'

function App() {
  const path = window.location.pathname;
  if (path !== '/' && path !== '/index.html') {
    return <NotFound />
  }

  return (
    <div className="wrap">
      <Masthead />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Exhibits />
      <FieldReports />
      <Education />
      <Footer />
    </div>
  )
}

export default App
