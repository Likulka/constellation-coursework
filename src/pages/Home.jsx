import constellationsData from "../data/constellations.json"
import Hero from "../components/features/Hero/Hero";
import TodaySlider from "../components/features/TodaySlider/TodaySlider";

function Home() {
  const todayVisible = constellationsData.filter(c => 
    (c.season.toLowerCase().includes("зима") || c.season.toLowerCase().includes("круглый год")) 
  )

  return (
    <>
      <Hero/>
      <TodaySlider constellations={todayVisible} />

    </>
  );

}

export default Home