import "./ConstellationTags.scss"

const ConstellationTags = ({ constellation, className = '' }) => {

  return (
    <div className={`constellation-tags ${className}`}>
      {constellation.zodiac && (
        <span className="badge badge-zodiac">Зодиак</span>
      )}
      {constellation.season === 'круглый год' && (
        <span className="badge badge-full-year">Круглый год</span>
      )}
    </div>
  );
};

export default ConstellationTags;
