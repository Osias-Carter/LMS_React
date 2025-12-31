// src/components/Navbar.jsx
import { Link } from 'react-router-dom'

function Navbar({ user }) {
  // Si l'utilisateur est connecté, on ne rend rien
  if (user) {
    return null
  }

  return (
    <header style={styles.header}>
      <div style={styles.logo}>AcademiaLMS</div>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Accueil</Link>
        <Link to="/login" style={styles.link}>Connexion</Link>
        <Link to="/register" style={styles.button}>Créer un compte</Link>
      </nav>
    </header>
  )
}

const styles = {
  header: {
    padding: '1rem 3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 10
  },
  logo: {
    fontWeight: '700',
    fontSize: '1.4rem',
    color: '#2563eb'
  },
  nav: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none',
    color: '#111827',
    fontSize: '0.95rem'
  },
  button: {
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '999px',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '0.95rem'
  }
}

export default Navbar
