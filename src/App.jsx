import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetail/ProjectDetailPage";
import ContactPage from "./pages/Contact/ContactPage";
import AboutPage from "./pages/About/AboutPage";
import LegalNoticePage from "./pages/Legal/LegalNoticePage";
import PrivacyPolicyPage from "./pages/Privacy/PrivacyPolicyPage";
import CookiePolicyPage from "./pages/Cookies/CookiePolicyPage";
import NotFound from "./pages/NotFound/NotFound";
import { routes } from "./config/routes";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={routes.home.es} element={<HomePage lang="es" />} />
        <Route path={routes.projects.es} element={<ProjectsPage lang="es" />} />
        <Route path={routes.projectDetail.es} element={<ProjectDetailPage lang="es" />} />
        <Route path={routes.about.es} element={<AboutPage lang="es" />} />
        <Route path={routes.contact.es} element={<ContactPage lang="es" />} />
        <Route path={routes.privacy.es} element={<PrivacyPolicyPage lang="es" />} />
        <Route path={routes.legal.es} element={<LegalNoticePage lang="es" />} />
        <Route path={routes.cookies.es} element={<CookiePolicyPage lang="es" />} />
        <Route path={routes.notFound.es} element={<NotFound />} />

        <Route path={routes.home.en} element={<HomePage lang="en" />} />
        <Route path={routes.projects.en} element={<ProjectsPage lang="en" />} />
        <Route path={routes.projectDetail.en} element={<ProjectDetailPage lang="en" />} />
        <Route path={routes.about.en} element={<AboutPage lang="en" />} />
        <Route path={routes.contact.en} element={<ContactPage lang="en" />} />
        <Route path={routes.privacy.en} element={<PrivacyPolicyPage lang="en" />} />
        <Route path={routes.legal.en} element={<LegalNoticePage lang="en" />} />
        <Route path={routes.cookies.en} element={<CookiePolicyPage lang="en" />} />
        <Route path={routes.notFound.en} element={<NotFound />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
