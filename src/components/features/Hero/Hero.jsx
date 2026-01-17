import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../../data/constellations.json"
import "./Hero.scss"

function Hero(){
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const searchRef = useRef(null);

    const suggestions = query
    ? data.filter(constellation => 
        constellation.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)
    : [];

    function handleSelect(id) {
        setQuery("")
        navigate(`/constellation/${id}`)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setQuery("");
            }
            }

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            };
    }, []);

    return (
        <section className="hero">
            <h1>Созвездия ночного неба</h1>
            <p>Найди созвездие на ночном небе</p>
            
            <div className="hero-search" ref={searchRef}>
                <input 
                    type="text"
                    placeholder="Введите название созвездия..."
                    value={query}
                    onChange={e => setQuery(e.target.value)} 
                />
                {query && (
                <ul className="hero-search__dropdown">
                    {suggestions.length > 0
                    ? (suggestions.map(constellation => (
                        <li key={constellation.id} onClick={() => handleSelect(constellation.id)}>
                            <h3 className="hero-search__title">{constellation.name}</h3>
                            <span className="hero-search__subtitle">{constellation.nameLatin}</span>
                        </li>
                    ) ))
                    : <li>Ничего не найдено</li>
                    }
                </ul>
                )}
            </div>
        </section>
    );
}

export default Hero