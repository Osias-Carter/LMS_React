function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} AcademiaLMS. Projet local Node.js + React.</p>
    </footer>
  )
}

const styles = {
  footer: {
    padding: '1.5rem 3rem',
    textAlign: 'center',
    fontSize: '0.85rem',
    color: '#6b7280',
    borderTop: '1px solid #e5e7eb'
  }
}

export default Footer
