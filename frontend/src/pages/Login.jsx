import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError('')
      const res = await axios.post('/api/auth/login', { email, password })
      // const { roles_id } = res.data.user
      // if (roles_id == '1') navigate('/EtudiantDash')
      // else if (roles_id == '2') navigate('/ProfDash')
      // else navigate('/')
      navigate('/Dashboard')
    } catch (err) {
      setError("Identifiants invalides.")
    }
  }

  return (
    <>
      <Navbar />
      <div style={styles.wrapper}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.title}>Connexion</h1>
          {error && <p style={styles.error}>{error}</p>}
          <label style={styles.label}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>Se connecter</button>
          <p style={styles.small}>
            Pas de compte ? <Link to="/register">Créer un compte</Link>
          </p>
        </form>
      </div>
    </>
  )
}

const styles = {
  wrapper: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    maxWidth: '380px',
    padding: '2rem',
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb',
    backgroundColor: '#fff',
    boxShadow: '0 10px 25px rgba(15,23,42,0.08)'
  },
  title: {
    marginBottom: '1rem',
    fontSize: '1.4rem',
    fontWeight: 600,
    textAlign: 'center'
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    marginBottom: '0.75rem',
    color: '#374151'
  },
  input: {
    width: '100%',
    marginTop: '0.25rem',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem'
  },
  button: {
    marginTop: '0.5rem',
    width: '100%',
    padding: '0.7rem',
    borderRadius: '0.5rem',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: 500,
    cursor: 'pointer'
  },
  error: {
    color: '#b91c1c',
    fontSize: '0.85rem',
    marginBottom: '0.5rem'
  },
  small: {
    marginTop: '0.75rem',
    fontSize: '0.85rem',
    textAlign: 'center',
    color: '#6b7280'
  }
}

export default Login
