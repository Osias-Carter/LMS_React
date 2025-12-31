import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section style={styles.wrapper}>
      <div style={styles.left}>
        <h1 style={styles.title}>
          Ta plateforme <span style={{ color: '#2563eb' }}>Académique</span> locale.
        </h1>
        <p style={styles.subtitle}>
          AcademiaLMS centralise tes cours, tes professeurs et le suivi des étudiants
          dans un seul tableau de bord moderne, développé en Node.js et React.
        </p>
        <div style={styles.actions}>
          <Link to="/register" style={styles.primaryBtn}>Commencer maintenant</Link>
          <Link to="/login" style={styles.secondaryBtn}>Se connecter</Link>
        </div>
        <p style={styles.badge}>100% local • Node + React • MySQL</p>
      </div>

      <div style={styles.right}>
        <div style={styles.card}>
          <p style={styles.cardTitle}>Vue rapide du Dashboard</p>
          <ul style={styles.list}>
            <li>Progression des étudiants</li>
            <li>Création de cours en 3 clics</li>
            <li>Gestion des catégories & niveaux</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

const styles = {
  wrapper: {
    padding: '4rem 3rem',
    display: 'grid',
    gridTemplateColumns: '1.3fr 1fr',
    gap: '3rem',
    alignItems: 'center'
  },
  left: {},
  title: {
    fontSize: '2.4rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#0f172a'
  },
  subtitle: {
    color: '#4b5563',
    lineHeight: 1.6,
    maxWidth: '32rem',
    marginBottom: '1.5rem'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '0.5rem'
  },
  primaryBtn: {
    textDecoration: 'none',
    padding: '0.8rem 1.4rem',
    borderRadius: '999px',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: 500
  },
  secondaryBtn: {
    textDecoration: 'none',
    padding: '0.8rem 1.4rem',
    borderRadius: '999px',
    border: '1px solid #d1d5db',
    color: '#111827',
    fontWeight: 500
  },
  badge: {
    marginTop: '0.75rem',
    fontSize: '0.85rem',
    color: '#6b7280'
  },
  right: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    width: '100%',
    maxWidth: '320px',
    padding: '1.5rem',
    borderRadius: '1rem',
    boxShadow: '0 20px 40px rgba(15,23,42,0.12)',
    backgroundColor: '#fff'
  },
  cardTitle: {
    fontWeight: 600,
    marginBottom: '0.75rem',
    color: '#111827'
  },
  list: {
    paddingLeft: '1.2rem',
    color: '#4b5563',
    fontSize: '0.95rem',
    lineHeight: 1.6
  }
}

export default Hero
