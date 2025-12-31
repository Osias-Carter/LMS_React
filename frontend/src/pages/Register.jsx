import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Register() {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    tel: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const res = await axios.post('/api/auth/register', form, {
        withCredentials: true
      })
      setSuccess(res.data?.message || 'Compte créé avec succès.')
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription.")
    }
  }


  return (
    <>
      <Navbar />
      <div style={styles.wrapper}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.title}>Créer un compte</h1>

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}

          <label style={styles.label}>
            Nom 
            <input
              type="text"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </label>

          <label style={styles.label}>
            Prénom
            <input
              type="text"
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </label>

          <label style={styles.label}>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </label>

          <label style={styles.label}>
            Mot de passe
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </label>

          <label style={styles.label}>
            Télèphone 
            <input
              type="tel"
              name="tel"
              value={form.tel}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </label>

          <button type="submit" style={styles.button}>
            Créer mon compte
          </button>

          <p style={styles.small}>
            Déjà inscrit ? <Link to="/login">Se connecter</Link>
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
    maxWidth: '420px',
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
  success: {
    color: '#15803d',
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

export default Register
