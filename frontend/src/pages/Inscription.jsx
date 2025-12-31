// frontend/src/pages/Inscription.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import '../stylesheets/dashboard.css'

function Inscription() {
  const navigate = useNavigate()
  const location = useLocation()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('mobile-money')

  useEffect(() => {
    if (location.state?.course) {
      setCourse(location.state.course)
    } else {
      navigate('/dashboard')
    }
  }, [location.state, navigate])

  const handleEnroll = async () => {
    if (!course) return
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await axios.post('/api/cours/etudiant/inscription', {
        cours_id: course.id,
        methode_paiement: paymentMethod
      }, { withCredentials: true })

      if (res.data.success) {
        setSuccess('Inscription réussie !')
        setTimeout(() => navigate('/dashboard'), 1500)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur inscription')
    } finally {
      setLoading(false)
    }
  }

  if (!course) return <div>Chargement...</div>

  return (
    <>
      <Navbar />
      <div className="enroll-page">
        <div className="page-container">
          <div className="page-header">
            <button className="back-btn" onClick={() => navigate('/dashboard')}>
              <i className="fas fa-arrow-left"></i> Retour
            </button>
            <h1><i className="fas fa-book"></i> Inscription</h1>
          </div>
          <div className="form-container">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <div className="course-preview">
              <h2>{course.titre_cours}</h2>
              <p>{course.desc_cours || 'Pas de description'}</p>
              <div className="course-price">
                <span className="price">{course.prix} Fcfa</span>
                <span>{course.duree_minutes} min</span>
              </div>
            </div>

            <div className="form-group">
              <label>Paiement</label>
              <div className="payment-options">
                <label>
                  <input
                    type="radio"
                    value="mobile-money"
                    checked={paymentMethod === 'mobile-money'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Mobile Money
                </label>
                <label>
                  <input
                    type="radio"
                    value="carte"
                    checked={paymentMethod === 'carte'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Carte bancaire
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
                Annuler
              </button>
              <button className="btn-primary" onClick={handleEnroll} disabled={loading}>
                {loading ? 'Inscription...' : `S'inscrire (${course.prix} Fcfa)`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Inscription
