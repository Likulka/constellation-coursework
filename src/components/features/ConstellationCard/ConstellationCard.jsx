import { Link } from "react-router-dom";
import './ConstellationCard.scss'
import ConstellationTags from '../../ui/ConstellationTags';

function ConstellationCard({constellation}) {
  const isBrief = constellation.images?.main 

  const CardContent = (
    <div className="constellation-card">
      {/* Изображение */}
      { isBrief
      ? ( <div className="card-image">
            <img
              src={constellation.images?.main}
              alt={`Созвездие ${constellation.name}`}
            />
          </div>)
      : ( <div className="card-icon">
            <svg width="50" height="50" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.9998 2.66663L20.1198 11.0133L29.3332 12.36L22.6665 18.8533L24.2398 28.0266L15.9998 23.6933L7.75984 28.0266L9.33317 18.8533L2.6665 12.36L11.8798 11.0133L15.9998 2.66663Z"/>
            </svg>
          </div>)
      }

      {/* Контент карточки */}
      <div className="card-content">
        {/* Название */}
        <h3 className="card-title">{constellation.name}</h3>
        <p className="card-latin">{constellation.nameLatin}</p>

        {/* Информация */}
        <div className="card-info">
          {/* Сезон */}
          <div className="info-item">
            <span className="info-icon">📅</span>
            <span className="info-text">{constellation.season}</span>
          </div>
        </div>

        {/* Теги */}
        <ConstellationTags constellation={constellation} />

        <div className="card-button">
          Подробнее
        </div>
      </div>
    </div>
  );


  if (constellation.description) {
    return (
      <Link
      to={`/constellation/${constellation.id}`}
      className="constellation-card-link"
    >
      {CardContent}
    </Link>
    )
  }

  return (
    <a href={constellation.externalLink} target="_blank">
        {CardContent}
      </a>
  )

}

export default ConstellationCard