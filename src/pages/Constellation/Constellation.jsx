import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import constellations from '../../data/constellations.json';
import './Constellation.scss';

const Constellation = () => {
  const { id } = useParams();
  const constellation = constellations.find(c => c.id === id);

  // Tabs state
  const [activeTab, setActiveTab] = useState('description');

  // Отслеживание размера экрана
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Скролл наверх при загрузке страницы или смене созвездия
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Если созвездие не найдено, редирект
  if (!constellation) {
    return <Navigate to="/catalog" replace />;
  }
  
  // Функция для отображения яркости звездочками
  const renderStars = (brightness) => {
    return '★'.repeat(brightness) + '☆'.repeat(5 - brightness);
  };

  // Табы
  const tabs = [
    { id: 'description', label: 'Описание' },
    { id: 'myth', label: 'Мифология' },
    { id: 'howToFind', label: 'Как найти' },
    { id: 'stars', label: 'Звезды' },
  ];
  
  return (
    <div className="constellation-detail">
      {/* Hero секция */}
      <div
        className="detail-hero"
        style={{
          backgroundImage: isMobile
            ? (constellation.images?.main
              ? `url(${constellation.images.main})`
              : (constellation.images?.photo
                ? `url(${constellation.images.photo})`
                : 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2a2f4a 100%)'))
            : (constellation.images?.photo
              ? `url(${constellation.images.photo})`
              : 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2a2f4a 100%)')
        }}
      >
        <div className="hero-overlay">
          <div className="container">
            <h1>{constellation.name}</h1>
            <p className="latin-name">{constellation.nameLatin}</p>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="characteristics">
          <div className="char-card">
            <span className="char-icon">📅</span>
            <div>
              <h3>Сезон</h3>
              <p>{constellation.season}</p>
            </div>
          </div>
          {constellation.zodiac && (
            <div className="char-card highlight">
              <span className="char-icon">♈</span>
              <div>
                <h3>Зодиак</h3>
                <p>Зодиакальное созвездие</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Табы */}
        <div className="tabs">
          <div className="tabs-header">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-pane">
                <p>{constellation.description}</p>
              </div>
            )}
            
            {activeTab === 'myth' && (
              <div className="tab-pane">
                <h3>Легенда</h3>
                <p>{constellation.myth}</p>
              </div>
            )}
            
            {activeTab === 'howToFind' && (
              <div className="tab-pane">
                <h3>Инструкция по поиску</h3>
                <p>{constellation.howToFind}</p>
              </div>
            )}
            
            {activeTab === 'stars' && (
              <div className="tab-pane">
                <h3>Главные звезды</h3>
                {constellation.mainStars && constellation.mainStars.length > 0 ? (
                  <div className="stars-list">
                    {constellation.mainStars.map((star, index) => (
                      <div key={index} className="star-item">
                        <h4>⭐ {star.name} ({star.nameLatin})</h4>
                        <p><strong>{star.greekLetter}</strong></p>
                        <p>Звёздная величина: {star.magnitude}</p>
                        <p>{star.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Информация о звездах скоро появится!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Constellation;