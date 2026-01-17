import { useEffect, useRef, useState } from "react";
import ConstellationCard from "../ConstellationCard/ConstellationCard";
import "./TodaySlider.scss";

function TodaySlider({ constellations }) {
    const trackRef = useRef(null);

    const [currentCardIndex, setcurrentCardIndex] = useState(0);
    const [visibleCardCount, setVisibleCardCount] = useState(3)

    // Считаем когда выключать кнопку
    const maxcurrentCardIndex = Math.max(constellations.length - visibleCardCount, 0)

    // Устанавливаем сколько карточек видно
    function calculateVisibleCardCount() {
        const width = window.innerWidth;
        if (width < 600) return 1;
        if (width < 1024) return 2;
        return 3;
    }

    // Считаем сдвиг
    function calculateShift() {
        const gap = trackRef.current
        ? parseInt(getComputedStyle(trackRef.current).gap)
        : 0;

        const step = trackRef.current
        ? trackRef.current.children[0]?.offsetWidth + gap
        : 0

        return currentCardIndex * step;
    }

    // Обновляем visibleCardCount при resize
    useEffect(() => {
        function handleResize() {
            setVisibleCardCount(calculateVisibleCardCount());
            setcurrentCardIndex(0)
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    }, [])

   

    // Обработчики
    function handlePrev() {
        setcurrentCardIndex(prev => Math.max(prev - 1, 0));
    }

    function handleNext() {
        setcurrentCardIndex(prev => Math.min(prev + 1, maxcurrentCardIndex))
    }

    return (
        <section className="today-slider">
            <div className="today-slider__header">
                <h2>Видно сегодня в СПБ</h2>
            </div>
            <div className="today-slider__body">
                 <button onClick={handlePrev} disabled={currentCardIndex === 0}>←</button>

                <div className="today-slider__window">
                <div 
                    className="today-slider__track"
                    ref={trackRef}
                    style={{transform: `translateX(-${calculateShift()}px)`}}
                >
                    {constellations.map(constellation => (
                        <div className="today-slider__slide" key={constellation.id}>
                            <ConstellationCard constellation={constellation} />
                        </div>
                    ) )}

                </div>
            </div>

                 <button onClick={handleNext} disabled={currentCardIndex === maxcurrentCardIndex}>→</button>
            </div>
            
        </section>
    )
}

export default TodaySlider