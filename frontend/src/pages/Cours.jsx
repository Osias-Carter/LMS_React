// frontend/src/pages/Cours.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import '../stylesheets/cours.css'

function Cours() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    titre_cours: '',
    desc_cours: '',
    prix: '',
    duree_minutes: '',
    niveau: 'débutant',
    pre_requis: '',
    categories_id: '',
    date_publication: new Date().toISOString().slice(0, 16)
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Charger les catégories au montage
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/cours/categories', {
          withCredentials: true
        })
        if (res.data.success) {
          setCategories(res.data.categories || [])
          // Sélectionner la première catégorie par défaut si elle existe
          if (res.data.categories && res.data.categories.length > 0) {
            setFormData(prev => ({
              ...prev,
              categories_id: res.data.categories[0].id
            }))
          }
        }
      } catch (err) {
        console.error('Erreur chargement catégories:', err)
        setError('Impossible de charger les catégories')
      } finally {
        setLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Préparer les données pour l'envoi
      const dataToSend = {
        titre_cours: formData.titre_cours,
        desc_cours: formData.desc_cours,
        prix: parseFloat(formData.prix),
        duree_minutes: parseInt(formData.duree_minutes),
        pre_requis: formData.pre_requis,
        categories_id: parseInt(formData.categories_id),
        niveau_id: formData.niveau === 'débutant' ? 1 : formData.niveau === 'intermédiaire' ? 2 : 3,
        date_publication: new Date(formData.date_publication).toISOString()
      }

      console.log('📤 Envoi données:', dataToSend)

      const res = await axios.post('/api/cours/cours', dataToSend, {
        withCredentials: true
      })

      if (res.data.success) {
        setSuccess('Cours créé avec succès !')
        setTimeout(() => navigate('/dashboard'), 1500)
      }
    } catch (err) {
      console.error('❌ Erreur création:', err)
      setError(err.response?.data?.message || 'Erreur lors de la création du cours')
    } finally {
      setLoading(false)
    }
  }

  if (loadingCategories) {
    return (
      <>
        <Navbar />
        <div className="create-course-page">
          <div className="page-container">
            <div className="loading-spinner">Chargement des catégories...</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="create-course-page">
        <div className="page-container">
          <div className="page-header">
            <button className="back-btn" onClick={() => navigate('/dashboard')}>
              <i className="fas fa-arrow-left"></i> Retour
            </button>
            <h1><i className="fas fa-plus"></i> Nouveau Cours</h1>
          </div>
          <div className="form-container">
            {error && <div className="error-message"><i className="fas fa-exclamation-circle"></i> {error}</div>}
            {success && <div className="success-message"><i className="fas fa-check-circle"></i> {success}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Titre du cours *</label>
                <input
                  type="text"
                  placeholder="Ex: Introduction à React.js"
                  value={formData.titre_cours}
                  onChange={(e) => setFormData({...formData, titre_cours: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Décrivez brièvement le contenu du cours..."
                  value={formData.desc_cours}
                  onChange={(e) => setFormData({...formData, desc_cours: e.target.value})}
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Prérequis *</label>
                <textarea
                  placeholder="Listez les connaissances nécessaires avant de suivre ce cours...&#10;Ex:&#10;- Connaissance de base en HTML/CSS&#10;- Maîtrise de JavaScript ES6&#10;- Compréhension des concepts de programmation orientée objet"
                  value={formData.pre_requis}
                  onChange={(e) => setFormData({...formData, pre_requis: e.target.value})}
                  rows="6"
                  required
                />
                <small className="form-hint">Détaillez les compétences ou connaissances que les étudiants doivent avoir</small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Catégorie *</label>
                  <select 
                    value={formData.categories_id} 
                    onChange={(e) => setFormData({...formData, categories_id: e.target.value})}
                    required
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nom_cat}
                      </option>
                    ))}
                  </select>
                  <small className="form-hint">
                    {formData.categories_id && categories.find(c => c.id == formData.categories_id)?.desc_cat}
                  </small>
                </div>

                <div className="form-group">
                  <label>Niveau *</label>
                  <select 
                    value={formData.niveau} 
                    onChange={(e) => setFormData({...formData, niveau: e.target.value})}
                    required
                  >
                    <option value="débutant">Débutant</option>
                    <option value="intermédiaire">Intermédiaire</option>
                    <option value="avancé">Avancé</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Durée (minutes) *</label>
                  <input
                    type="number"
                    placeholder="120"
                    min="1"
                    value={formData.duree_minutes}
                    onChange={(e) => setFormData({...formData, duree_minutes: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Prix (Fcfa) *</label>
                  <input
                    type="number"
                    placeholder="15000"
                    min="0"
                    value={formData.prix}
                    onChange={(e) => setFormData({...formData, prix: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Date de publication *</label>
                <input
                  type="datetime-local"
                  value={formData.date_publication}
                  onChange={(e) => setFormData({...formData, date_publication: e.target.value})}
                  required
                />
                <small className="form-hint">Le cours sera visible à partir de cette date</small>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Création en cours...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i> Créer le cours
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cours