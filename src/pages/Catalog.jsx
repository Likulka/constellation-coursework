import { useState } from "react";
import constellations from "../data/constellations.json";
import ConstellationCard from "../components/features/ConstellationCard/ConstellationCard";
import "./Catalog.scss";

const SEASONS = ["все", "весна", "лето", "осень", "зима", "круглый год"];

function Catalog() {
  const [season, setSeason] = useState("все");
  const [onlyZodiac, setOnlyZodiac] = useState(false);

  const filtered = constellations.filter(c => {
    const matchSeason = season === "все" || c.season.toLowerCase().includes(season) || c.season === "круглый год";
    const matchZodiac = !onlyZodiac || c.zodiac;
    return matchSeason && matchZodiac;
  });

  return (
    <div className="catalog">
      <div className="catalog__container">
        <h1 className="catalog__title">Каталог созвездий</h1>

        {/* Фильтры */}
        <div className="catalog__filters">
          <div className="filter-group">
            <label className="filter-label">Сезон:</label>
            <div className="filter-buttons">
              {SEASONS.map(s => (
                <button
                  key={s}
                  className={`filter-btn ${season === s ? "active" : ""}`}
                  onClick={() => setSeason(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={onlyZodiac}
              onChange={e => setOnlyZodiac(e.target.checked)}
            />
            <span>Только зодиакальные</span>
          </label>
        </div>

        {/* Результаты */}
        <p className="catalog__count">Найдено: {filtered.length}</p>

        {/* Сетка карточек */}
        <div className="catalog__grid">
          {filtered.map(constellation => (
            <ConstellationCard key={constellation.id} constellation={constellation} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="catalog__empty">Созвездия не найдены</p>
        )}
      </div>
    </div>
  );
}

export default Catalog;
