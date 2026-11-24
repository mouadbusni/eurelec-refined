import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Facebook,
  GraduationCap,
  Instagram,
  Mail,
  Menu,
  MonitorCog,
  Network,
  Phone,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import accreditationAsset from "@/assets/accredited-programs.png.asset.json";
import campusCommunityAsset from "@/assets/campus-community.jpg.asset.json";
import campusOutdoorsAsset from "@/assets/campus-outdoors.jpg.asset.json";
import campusProjectsAsset from "@/assets/campus-projects.jpeg.asset.json";
import ciscoAsset from "@/assets/cisco.png.asset.json";
import federationAsset from "@/assets/federation-europeenne.png.asset.json";
import heroAsset from "@/assets/graduate-class.jpg.asset.json";
import logoAsset from "@/assets/eurelec-logo.png.asset.json";
import masterAsset from "@/assets/programme-master.jpg.asset.json";
import technicianAsset from "@/assets/programme-technicien.jpg.asset.json";
import specialistAsset from "@/assets/programme-technicien-specialise.jpg.asset.json";
import campusStudyAsset from "@/assets/study-together.jpg.asset.json";
import studentsAsset from "@/assets/students-on-campus.jpg.asset.json";

const registrationUrl = "https://eurelec.ma/inscription/";
const programsUrl = "https://eurelec.ma/formations/";

const navigation = [
  { label: "Notre école", href: "#notre-ecole" },
  { label: "Vie étudiante", href: "#vie-etudiante" },
  { label: "Formations", href: "#formations" },
  { label: "Contact", href: "#contact" },
];

const programs: {
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Licence professionnelle",
    category: "Bac +3",
    description: "Informatique & réseaux, management ou développement web.",
    image: campusProjectsAsset.url,
    alt: "Étudiants Eurelec présentant leur projet",
    icon: BookOpen,
  },
  {
    title: "Parcours Bachelor",
    category: "Bac +3",
    description: "Des parcours en systèmes, réseaux et développement informatique.",
    image: masterAsset.url,
    alt: "Étudiant avec son sac à dos sur le campus",
    icon: Network,
  },
  {
    title: "Technicien spécialisé",
    category: "Formation métier",
    description: "Support, maintenance informatique et réseaux, au plus près du terrain.",
    image: specialistAsset.url,
    alt: "Étudiante en cursus technique",
    icon: MonitorCog,
  },
  {
    title: "Cycle Master",
    category: "Bac +5",
    description: "Informatique, cybersécurité, management et pilotage des organisations.",
    image: technicianAsset.url,
    alt: "Étudiant en formation informatique",
    icon: BriefcaseBusiness,
  },
];

const strengths: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Apprendre en pratiquant",
    description: "Des connaissances qui prennent vie dans des projets concrets.",
    icon: MonitorCog,
  },
  {
    title: "Être accompagné",
    description: "Un encadrement attentif, pensé pour chaque parcours.",
    icon: UsersRound,
  },
  {
    title: "Se préparer au métier",
    description: "Des compétences en phase avec les attentes des entreprises.",
    icon: BriefcaseBusiness,
  },
];

const campusGallery = [
  { image: campusProjectsAsset.url, alt: "Étudiants présentant leurs projets" },
  { image: campusCommunityAsset.url, alt: "Étudiants réunis en plein air" },
  { image: campusOutdoorsAsset.url, alt: "Sortie de groupe des étudiants Eurelec" },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "EURELEC — École supérieure au Maroc depuis 1968" },
      {
        name: "description",
        content:
          "Formez-vous en informatique, réseaux et management à EURELEC. Depuis 1968, une pédagogie pratique et des parcours tournés vers les métiers de demain.",
      },
      { property: "og:title", content: "EURELEC — Les compétences d’aujourd’hui" },
      {
        property: "og:description",
        content:
          "58 ans d’expertise au service de la formation supérieure. Découvrez les formations EURELEC et préparez votre avenir.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            activeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -36px 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const updateScrollVisuals = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);

        if (!reduceMotion && heroImageRef.current) {
          heroImageRef.current.style.setProperty("--parallax-y", `${Math.min(window.scrollY * 0.07, 38)}px`);
        }
      });
    };

    updateScrollVisuals();
    window.addEventListener("scroll", updateScrollVisuals, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrollVisuals);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell" id="top">
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="site-header">
        <div className="utility-bar">
          <div className="page-container utility-inner">
            <p>Institut supérieur depuis 1968</p>
            <div className="utility-contact">
              <a href="tel:+212664727007" aria-label="Appeler Eurelec au plus 212 664 727007">
                <Phone aria-hidden="true" size={14} /> +212 664-727007
              </a>
              <span className="utility-divider" aria-hidden="true" />
              <span>Inscriptions 2026 ouvertes</span>
            </div>
          </div>
        </div>

        <div className="main-nav">
          <div className="page-container nav-inner">
            <a className="brand-link" href="#top" aria-label="Eurelec, accueil">
              <img src={logoAsset.url} alt="EURELEC — La formation par la pratique" />
            </a>

            <nav className="desktop-nav" aria-label="Navigation principale">
              {navigation.map((item) => (
                <a className="nav-link" href={item.href} key={item.label}>
                  {item.label}
                </a>
              ))}
              <Button asChild className="nav-cta">
                <a href={registrationUrl}>
                  S’inscrire <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </nav>

            <Button
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              size="icon"
              variant="outline"
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>

          {menuOpen && (
            <nav className="mobile-nav" id="mobile-navigation" aria-label="Navigation mobile">
              {navigation.map((item, index) => (
                <a
                  className="mobile-nav-link"
                  href={item.href}
                  key={item.label}
                  onClick={closeMenu}
                  style={{ transitionDelay: `${index * 45}ms` }}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
              <Button asChild className="mobile-nav-cta">
                <a href={registrationUrl} onClick={closeMenu}>
                  Commencer mon inscription <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </nav>
          )}
        </div>
      </header>

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true">
          <img ref={heroImageRef} className="hero-photo" src={heroAsset.url} alt="" />
          <div className="hero-scrim" />
        </div>
        <div className="page-container hero-content">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="eyebrow-mark" /> L’institut qui forme par la pratique
            </p>
            <h1 id="hero-title">Les compétences d’aujourd’hui. Les carrières de demain.</h1>
            <p className="hero-intro">
              Informatique, réseaux et management : des formations ancrées dans le réel, pour tracer
              votre propre voie.
            </p>
            <div className="hero-actions">
              <Button asChild className="button-light" size="lg">
                <a href={registrationUrl}>
                  Découvrir les inscriptions <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <a className="hero-text-link" href="#formations">
                Explorer nos formations <ArrowDownRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-anniversary" data-reveal>
            <span className="anniversary-rule" />
            <span className="anniversary-years">1968 <i>—</i> 2026</span>
            <strong>58</strong>
            <span className="anniversary-label">ans d’expertise</span>
          </div>
          <a className="hero-scroll-cue" href="#notre-ecole">
            <span>Défiler pour découvrir</span>
            <ArrowDownRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="proof-band" aria-label="Eurelec en quelques chiffres">
        <div className="page-container proof-grid">
          <div className="proof-intro" data-reveal>
            <span className="eyebrow eyebrow-dark">Un héritage qui avance</span>
            <p>La confiance d’une école qui évolue avec son temps.</p>
          </div>
          <div className="proof-stat" data-reveal>
            <strong><AnimatedNumber value={58} /></strong>
            <span>ans d’expérience</span>
          </div>
          <div className="proof-stat" data-reveal>
            <strong><AnimatedNumber value={2430} suffix="+" /></strong>
            <span>lauréats</span>
          </div>
          <div className="proof-stat" data-reveal>
            <strong><AnimatedNumber value={6} /></strong>
            <span>filières accréditées</span>
          </div>
        </div>
      </section>

      <section className="story-section section-pad" id="notre-ecole">
        <div className="page-container story-layout">
          <div className="story-visual reveal" data-reveal>
            <div className="story-image-frame">
              <img src={campusStudyAsset.url} alt="Étudiants échangeant et travaillant ensemble" />
              <div className="story-image-note">
                <GraduationCap aria-hidden="true" />
                <span>La formation<br />par la pratique</span>
              </div>
            </div>
            <div className="story-orbit" aria-hidden="true" />
          </div>

          <div className="story-copy" data-reveal>
            <p className="eyebrow eyebrow-dark">Notre école</p>
            <h2>Une expérience qui se construit <em>depuis 1968.</em></h2>
            <p className="story-lead">
              EURELEC accompagne les talents qui veulent comprendre, créer et faire avancer le monde
              professionnel.
            </p>
            <p className="story-body">
              Institut spécialisé en électronique et informatique de gestion, EURELEC mise sur un
              enseignement pratique, pluridisciplinaire et tourné vers l’insertion professionnelle.
              Ses programmes accrédités et son accompagnement personnalisé donnent du sens à chaque
              étape du parcours.
            </p>
            <a className="underlined-link" href="https://eurelec.ma/mission-2/">
              Découvrir notre mission <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="program-section section-pad" id="formations">
        <div className="page-container">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow eyebrow-dark">Nos formations</p>
              <h2>Le bon parcours pour <em>aller plus loin.</em></h2>
            </div>
            <p className="section-heading-aside">
              Des filières conçues pour faire grandir vos compétences et ouvrir de nouvelles
              perspectives.
            </p>
          </div>

          <div className="program-grid">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <a
                  className="program-card reveal"
                  data-reveal
                  href={programsUrl}
                  key={program.title}
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <div className="program-image-wrap">
                    <img src={program.image} alt={program.alt} loading="lazy" />
                    <span className="program-image-index">0{index + 1}</span>
                  </div>
                  <div className="program-card-copy">
                    <div className="program-card-meta">
                      <span>{program.category}</span>
                      <Icon aria-hidden="true" />
                    </div>
                    <h3>{program.title}</h3>
                    <p>{program.description}</p>
                    <span className="program-card-link">
                      En savoir plus <ArrowUpRight aria-hidden="true" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="program-footer" data-reveal>
            <span>Un projet précis en tête ?</span>
            <a className="underlined-link" href={programsUrl}>
              Voir toutes les formations <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="strength-section section-pad" id="vie-etudiante">
        <div className="page-container">
          <div className="strength-heading" data-reveal>
            <p className="eyebrow eyebrow-light">Votre réussite, notre engagement</p>
            <h2>Grandir, apprendre, <em>prendre sa place.</em></h2>
          </div>
          <div className="strength-grid">
            {strengths.map((strength, index) => {
              const Icon = strength.icon;
              return (
                <article
                  className="strength-item reveal"
                  data-reveal
                  key={strength.title}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="strength-icon"><Icon aria-hidden="true" /></span>
                  <span className="strength-index">0{index + 1}</span>
                  <h3>{strength.title}</h3>
                  <p>{strength.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="campus-section section-pad">
        <div className="page-container">
          <div className="section-heading campus-heading" data-reveal>
            <div>
              <p className="eyebrow eyebrow-dark">La vie à EURELEC</p>
              <h2>Les idées prennent vie <em>ensemble.</em></h2>
            </div>
            <p className="section-heading-aside">
              Projets, rencontres et expériences partagées rythment la vie de l’institut.
            </p>
          </div>
          <div className="campus-gallery">
            {campusGallery.map((item, index) => (
              <figure className="gallery-frame reveal" data-reveal key={item.alt}>
                <img src={item.image} alt={item.alt} loading="lazy" />
                <figcaption><span>La vie étudiante</span><span>0{index + 1}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonial-section section-pad">
        <div className="page-container testimonial-layout">
          <div className="testimonial-intro" data-reveal>
            <p className="eyebrow eyebrow-dark">Leurs parcours, leurs mots</p>
            <h2>Ils avancent avec <em>EURELEC.</em></h2>
            <p>Des expériences vécues, et des projets qui prennent forme.</p>
          </div>
          <figure className="testimonial-quote" data-reveal>
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote>
              Grâce à EURELEC, j’ai pu effectuer un stage dans une grande entreprise dès la fin de ma
              formation. Aujourd’hui, je travaille dans le secteur que j’ai toujours visé.
            </blockquote>
            <figcaption>
              <span className="quote-avatar" aria-hidden="true">YT</span>
              <span><strong>Yassine T.</strong><small>Développeur web</small></span>
              <span className="quote-mark-small">Témoignage étudiant</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="admissions-section" aria-labelledby="admissions-title">
        <div className="admissions-photo" aria-hidden="true">
          <img src={studentsAsset.url} alt="" loading="lazy" />
          <div className="admissions-scrim" />
        </div>
        <div className="page-container admissions-content" data-reveal>
          <p className="eyebrow eyebrow-light">Votre prochain chapitre commence ici</p>
          <h2 id="admissions-title">Faites de votre ambition <em>un vrai parcours.</em></h2>
          <p>Rejoignez une école où l’on apprend à faire, pour aller plus loin.</p>
          <Button asChild className="button-light" size="lg">
            <a href={registrationUrl}>
              Inscrivez-vous maintenant <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
        <span className="admissions-side-note" aria-hidden="true">EURELEC · 1968 — 2026</span>
      </section>

      <section className="partner-section" aria-label="Partenaires et accréditations">
        <div className="page-container partner-inner">
          <p className="eyebrow eyebrow-dark">Des programmes reconnus</p>
          <div className="partner-logos">
            <img src={accreditationAsset.url} alt="Programmes accrédités" loading="lazy" />
            <span className="partner-divider" aria-hidden="true" />
            <img src={federationAsset.url} alt="FEDE — Fédération européenne des écoles" loading="lazy" />
            <span className="partner-divider" aria-hidden="true" />
            <img src={ciscoAsset.url} alt="Cisco" loading="lazy" />
          </div>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="page-container footer-main">
          <div className="footer-brand-block">
            <a href="#top" aria-label="Eurelec, retour en haut">
              <img className="footer-logo" src={logoAsset.url} alt="EURELEC" loading="lazy" />
            </a>
            <p>La formation par la pratique.<br />Former aujourd’hui, réussir demain.</p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/eurelec.ma/" aria-label="Eurelec sur Instagram" target="_blank" rel="noreferrer"><Instagram aria-hidden="true" /></a>
              <a href="https://www.facebook.com/Eurelec" aria-label="Eurelec sur Facebook" target="_blank" rel="noreferrer"><Facebook aria-hidden="true" /></a>
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-title">Explorer</p>
            <a href="#notre-ecole">Notre école</a>
            <a href="#formations">Nos formations</a>
            <a href="#vie-etudiante">Vie étudiante</a>
            <a href="https://eurelec.ma/notre-ecole/">Notre mission</a>
          </div>

          <div className="footer-column footer-contact">
            <p className="footer-title">Parlons de votre avenir</p>
            <a href="tel:+212664727007"><Phone aria-hidden="true" /> +212 664-727007</a>
            <a href="mailto:contact@eurelec.com"><Mail aria-hidden="true" /> contact@eurelec.com</a>
            <Button asChild className="footer-cta">
              <a href={registrationUrl}>Nous contacter <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="page-container footer-bottom-inner">
            <span>© 2026 EURELEC. Tous droits réservés.</span>
            <span>Institut Européen d’Électronique et d’Informatique</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const formattedValue = new Intl.NumberFormat("fr-FR").format(value);

  useEffect(() => {
    const element = numberRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        let startedAt = 0;
        const duration = 1450;
        const numberFormat = new Intl.NumberFormat("fr-FR");

        const step = (timestamp: number) => {
          if (!startedAt) startedAt = timestamp;
          const progress = Math.min((timestamp - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = `${numberFormat.format(Math.round(value * eased))}${suffix}`;
          if (progress < 1) window.requestAnimationFrame(step);
        };

        window.requestAnimationFrame(step);
        activeObserver.disconnect();
      },
      { threshold: 0.7 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [suffix, value]);

  return (
    <>
      <span className="sr-only">{formattedValue}{suffix}</span>
      <span ref={numberRef} aria-hidden="true">{formattedValue}{suffix}</span>
    </>
  );
}