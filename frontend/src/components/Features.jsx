function Features() {
  const items = [
    {
      title: 'Professeurs',
      desc: 'Créer, publier et gérer les cours avec des catégories et niveaux.'
    },
    {
      title: 'Étudiants',
      desc: 'S’inscrire aux cours, suivre la progression et consulter les notes.'
    },
    {
      title: 'Admin',
      desc: 'Superviser les utilisateurs, les cours et les statistiques globales.'
    }
  ]

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Pensé pour ton école</h2>
      <p style={styles.subtitle}>
        Une interface simple qui sépare clairement les rôles : admin, professeur et étudiant.
      </p>
      <div style={styles.grid}>
        {items.map((f) => (
          <div key={f.title} style={styles.card}>
            <h3 style={styles.cardTitle}>{f.title}</h3>
            <p style={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '3rem 3rem',
    backgroundColor: '#f9fafb'
  },
  title: {
    textAlign: 'center',
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#0f172a'
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '2rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
    gap: '1.5rem'
  },
  card: {
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb',
    backgroundColor: '#fff'
  },
  cardTitle: {
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: '#111827'
  },
  cardDesc: {
    color: '#6b7280',
    fontSize: '0.95rem'
  }
}

export default Features
