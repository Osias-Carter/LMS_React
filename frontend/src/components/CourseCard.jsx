function CourseCard({ title, category, level, studentsCount }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.meta}>
        {category} • {level}
      </p>
      <p style={styles.students}>{studentsCount} étudiants inscrits</p>
    </div>
  )
}

const styles = {
  card: {
    padding: '1.25rem',
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb',
    backgroundColor: '#fff'
  },
  title: {
    fontWeight: 600,
    marginBottom: '0.4rem',
    color: '#111827'
  },
  meta: {
    fontSize: '0.85rem',
    color: '#6b7280',
    marginBottom: '0.5rem'
  },
  students: {
    fontSize: '0.85rem',
    color: '#4b5563'
  }
}

export default CourseCard
