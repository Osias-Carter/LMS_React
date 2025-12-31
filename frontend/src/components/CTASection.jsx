import { Link } from 'react-router-dom'

function CTASection() {
  return (
    <section style={styles.wrapper}>
      <div>
        <h2 style={styles.title}>Prêt à lancer AcademiaLMS ?</h2>
        <p style={styles.subtitle}>
          Crée un compte professeur pour commencer à publier tes premiers cours dès aujourd’hui.
        </p>
      </div>
      <Link to="/register" style={styles.button}>Créer un compte</Link>
    </section>
  )
}

const styles = {
  wrapper: {
    padding: '2.5rem 3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: '#111827',
    color: '#f9fafb'
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 600,
    marginBottom: '0.3rem'
  },
  subtitle: {
    color: '#e5e7eb',
    fontSize: '0.95rem'
  },
  button: {
    textDecoration: 'none',
    padding: '0.8rem 1.4rem',
    borderRadius: '999px',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: 500,
    whiteSpace: 'nowrap'
  }
}

export default CTASection
