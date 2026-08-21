import logo from './assets/hero.svg'
import './App.css'

function App() {
  return (
    <main>
      <section id="center">
        <div className="hero">
          <img src={logo} className="app-logo" alt="logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code>
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
