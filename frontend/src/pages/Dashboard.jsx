// frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../stylesheets/dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('') // 'dash-etudiant', 'dash-prof', 'cours', 'cours-crud', 'explorer', 'compte'
  const [coursProf, setCoursProf] = useState([])
  const [coursEtudiant, setCoursEtudiant] = useState([])
  const [loadingUser, setLoadingUser] = useState(true)
  const [loadingCours, setLoadingCours] = useState(false)

  // Charger l'utilisateur connecté via la session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/auth/user-info', {
          withCredentials: true
        })
        if (!res.data?.success) {
          window.location.href = '/login'
          return
        }
        const u = res.data.user
        setUser(u)
        // Tab par défaut selon le rôle
        setActiveTab(u.roles_id === 1 ? 'dash-etudiant' : 'dash-prof')
      } catch (err) {
        console.error(err)
        window.location.href = '/login'
      } finally {
        setLoadingUser(false)
      }
    }

    fetchUser()
  }, [])

  // Charger les cours prof
  const loadCoursProf = async () => {
    setLoadingCours(true)
    try {
      const res = await axios.get('/api/cours/professeur/cours-list', {
        withCredentials: true
      })
      setCoursProf(res.data?.cours || [])
    } catch (err) {
      console.error(err)
      setCoursProf([])
    } finally {
      setLoadingCours(false)
    }
  }

  // Charger les cours étudiant
  const loadCoursEtudiant = async () => {
    setLoadingCours(true)
    try {
      const res = await axios.get('/api/cours/etudiant/tous-cours', {
        withCredentials: true
      })
      setCoursEtudiant(res.data?.cours || [])
    } catch (err) {
      console.error(err)
      setCoursEtudiant([])
    } finally {
      setLoadingCours(false)
    }
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    if (tab === 'cours-crud') loadCoursProf()
    if (tab === 'cours' || tab === 'explorer') loadCoursEtudiant()
  }

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true })
    } catch (e) {}
    window.location.href = '/login'
  }

  if (loadingUser) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Chargement du tableau de bord...</div>
  }

  if (!user) return null

  const isStudent = user.roles_id == 1
  const isTeacher = user.roles_id == 2

  return (
    <>
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo">
            <i className="fas fa-graduation-cap"></i>
            <span>Academia<span className="logo-highlight">LMS</span></span>
          </div>

          <nav className="admin-nav">
            {isStudent && (
              <>
                <button
                  className={`nav-link ${activeTab === 'dash-etudiant' ? 'active' : ''}`}
                  onClick={() => handleTabClick('dash-etudiant')}
                >
                  <i className="fas fa-tachometer-alt"></i><span>Dashboard</span>
                </button>
                <button
                  className={`nav-link ${activeTab === 'cours' ? 'active' : ''}`}
                  onClick={() => handleTabClick('cours')}
                >
                  <i className="fas fa-book-open"></i><span>Cours</span>
                </button>
                <button
                  className={`nav-link ${activeTab === 'explorer' ? 'active' : ''}`}
                  onClick={() => handleTabClick('explorer')}
                >
                  <i className="fas fa-search"></i><span>Explorer</span>
                </button>
                <button
                  className={`nav-link ${activeTab === 'compte' ? 'active' : ''}`}
                  onClick={() => handleTabClick('compte')}
                >
                  <i className="fas fa-user-circle"></i><span>Compte</span>
                </button>
              </>
            )}

            {isTeacher && (
              <>
                <button
                  className={`nav-link ${activeTab === 'dash-prof' ? 'active' : ''}`}
                  onClick={() => handleTabClick('dash-prof')}
                >
                  <i className="fas fa-chalkboard-teacher"></i><span>Dashboard</span>
                </button>
                <button
                  className={`nav-link ${activeTab === 'cours-crud' ? 'active' : ''}`}
                  onClick={() => handleTabClick('cours-crud')}
                >
                  <i className="fas fa-book"></i><span>Gestion Cours</span>
                </button>
                <button
                  className={`nav-link ${activeTab === 'compte' ? 'active' : ''}`}
                  onClick={() => handleTabClick('compte')}
                >
                  <i className="fas fa-user-circle"></i><span>Compte</span>
                </button>
              </>
            )}
          </nav>

          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i><span>Déconnexion</span>
          </button>
        </aside>

        {/* Contenu principal */}
        <main className="main-content">
          {/* Dashboard Étudiant */}
          {isStudent && activeTab === 'dash-etudiant' && (
            <section className="tab-content">
              <div className="dash-grid">
                {/* Colonne gauche : stats */}
                <div>
                  <div className="header">
                    <h2><i className="fas fa-tachometer-alt"></i> Dashboard Étudiant</h2>
                  </div>
                  <div className="stats-section">
                    <h3>Vos statistiques</h3>
                    <div className="stats-grid">
                      <div className="stat-card">
                        <div className="stat-icon"><i className="fas fa-book"></i></div>
                        <h4>Cours Actifs</h4>
                        <p>12</p>
                      </div>
                      <div className="stat-card">
                        <div className="stat-icon"><i className="fas fa-clock"></i></div>
                        <h4>Heures Complétées</h4>
                        <p>45h</p>
                      </div>
                      <div className="stat-card">
                        <div className="stat-icon"><i className="fas fa-star"></i></div>
                        <h4>Moyenne</h4>
                        <p>4.8/5</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colonne droite : activité récente / cours à continuer */}
                <div className="side-panel">
                  <h3>Activité récente</h3>
                  <ul className="activity-list">
                    <li>Vous avez complété "JavaScript Avancé".</li>
                    <li>Nouvelle note : 18/20 en Base de données.</li>
                    <li>3 nouveaux cours recommandés.</li>
                  </ul>

                  <h3 style={{ marginTop: '1rem' }}>Cours à continuer</h3>
                  <ul className="activity-list">
                    <li>Architecture Web – 60% complété.</li>
                    <li>Node.js & Express – 35% complété.</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Dashboard Professeur */}
          {isTeacher && activeTab === 'dash-prof' && (
            <section className="tab-content">
              <div className="header">
                <h2><i className="fas fa-chalkboard-teacher"></i> Dashboard Professeur</h2>
              </div>
              <div className="stats-section">
                <h3>Statistiques</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon"><i className="fas fa-book"></i></div>
                    <h4>Cours Créés</h4>
                    <p>8</p>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon"><i className="fas fa-users"></i></div>
                    <h4>Étudiants</h4>
                    <p>247</p>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon"><i className="fas fa-euro-sign"></i></div>
                    <h4>Revenus</h4>
                    <p>1 240 Fcfa</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Cours étudiant - AVEC BOUTON S'INSCRIRE */}
          {isStudent && activeTab === 'cours' && (
            <section className="tab-content">
              <div className="header">
                <h2><i className="fas fa-book-open"></i> Mes Cours</h2>
              </div>
              {loadingCours ? (
                <div className="loading-spinner">Chargement de vos cours...</div>
              ) : (
                <div id="etudiant-liste" className="cours-grid">
                  {coursEtudiant.length === 0 ? (
                    <p>Aucun cours disponible.</p>
                  ) : (
                    coursEtudiant.map((cours) => (
                      <div key={cours.id} className="cours-card">
                        <h3>{cours.titre_cours}</h3>
                        <p className="desc">{cours.desc_cours || ''}</p>
                        <div className="meta">
                          <span>{cours.duree_minutes || 0} min</span>
                          <span>{cours.prix || 0} Fcfa</span>
                          {/* Bouton S'inscrire pour les étudiants */}
                          <button
                            className="enroll-btn-small"
                            onClick={() => navigate('/cours-inscription', { state: { course: cours } })}
                          >
                            <i className="fas fa-play"></i> S'inscrire
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </section>
          )}

          {/* Explorer (mêmes cours mais pour découverte) */}
          {isStudent && activeTab === 'explorer' && (
            <section className="tab-content">
              <div className="header">
                <h2><i className="fas fa-search"></i> Explorer les Cours</h2>
              </div>
              {loadingCours ? (
                <div className="loading-spinner">Chargement des cours...</div>
              ) : (
                <div className="cours-grid">
                  {coursEtudiant.length === 0 ? (
                    <p>Aucun cours disponible.</p>
                  ) : (
                    coursEtudiant.map((cours) => (
                      <div key={cours.id} className="cours-card">
                        <h3>{cours.titre_cours}</h3>
                        <p className="desc">{cours.desc_cours || ''}</p>
                        <div className="meta">
                          <span>{cours.duree_minutes || 0} min</span>
                          <span>{cours.prix || 0} Fcfa</span>
                          <button
                            className="enroll-btn-small"
                            onClick={() => navigate('/cours-inscription', { state: { course: cours } })}
                          >
                            <i className="fas fa-play"></i> S'inscrire
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </section>
          )}

          {/* Gestion cours prof */}
          {isTeacher && activeTab === 'cours-crud' && (
            <section className="tab-content">
              <div className="header">
                <h2><i className="fas fa-book"></i> Gestion Cours</h2>
                <button
                  className="add-course-btn"
                  onClick={() => navigate('/cours-create')}
                >
                  <i className="fas fa-plus"></i> Nouveau cours
                </button>
              </div>
              {loadingCours ? (
                <div className="loading-spinner">Chargement de vos cours...</div>
              ) : (
                <div id="liste" className="cours-grid">
                  {coursProf.length === 0 ? (
                    <p>Aucun cours pour le moment.</p>
                  ) : (
                    coursProf.map((cours) => (
                      <div key={cours.id} className="cours-card">
                        <h3>{cours.titre_cours}</h3>
                        <p className="desc">{cours.desc_cours || ''}</p>
                        <div className="meta">
                          <span>{cours.duree_minutes || 0} min</span>
                          <span>{cours.prix || 0} Fcfa</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </section>
          )}

          {/* Compte */}
          {activeTab === 'compte' && (
            <section className="tab-content">
              <div className="header">
                <h2><i className="fas fa-user-circle"></i> Mon Compte</h2>
              </div>
              <div className="account-section">
                <div className="account-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div className="account-info">
                  <h3>{user.nom} {user.prenom}</h3>
                  <p className="account-email">{user.email}</p>
                </div>
                <div className="account-details">
                  <div className="detail-row">
                    <label>Téléphone</label>
                    <span>{user.tel || '-'}</span>
                  </div>
                  <div className="detail-row">
                    <label>Rôle</label>
                    <span>{isStudent ? 'Étudiant' : 'Professeur'}</span>
                  </div>
                  <div className="detail-row">
                    <label>Date d'inscription</label>
                    <span>
                      {user.joined_at
                        ? new Date(user.joined_at).toLocaleDateString()
                        : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  )
}

export default Dashboard
