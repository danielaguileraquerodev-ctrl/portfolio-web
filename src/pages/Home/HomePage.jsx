import Header from "../../components/Header/Header";
import Hero from "../../sections/Hero/Hero";
import FeaturedProjects from "../../sections/FeaturedProyects/FeaturedProjects";
import ProfileSystem from "../../sections/ProfileSystem/ProfileSystem";
import ContactCTA from "../../sections/ContactCTA/ContactCTA";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";

function HomePage({ lang = "es" }) {
  return (
    <main className="site home-page">
      <Header />
      <Hero lang={lang} />
      <FeaturedProjects lang={lang} />
      <ProfileSystem lang={lang} />
      <ContactCTA lang={lang} />
      <Footer />
    </main>
  );
}

export default HomePage;
