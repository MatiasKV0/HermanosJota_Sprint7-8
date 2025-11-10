import Hero from "./components/Hero";
import DestacadosContainer from "./components/DestacadosContainer";
import About from "./components/About";
import Reviews from "./components/Reviews";

import "./home.css";

export default function Home() {
  return (
    <main className="home">
      <Hero />
      <DestacadosContainer />
      <About />
      <Reviews />
    </main>
  );
}
