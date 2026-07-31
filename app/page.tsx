/* eslint-disable jsx-a11y/no-autofocus */
"use client";

import { useMemo, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import Image from "next/image";

type Language = "en" | "fr";

type Link = {
  label: string;
  href: string;
  external?: boolean;
};

type Experience = {
  company: string;
  role: string;
  period: string;
  stack?: string;
  highlights: { fr: string; en: string }[];
};

type Project = {
  name: string;
  tagline?: { fr: string; en: string };
  description: { fr: string; en: string };
  features?: { fr: string[]; en: string[] };
  featuresLabel?: { fr: string; en: string };
  href?: string;
  tags: string[];
  featured?: boolean;
};

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700/80">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm">
      {children}
    </span>
  );
}

function PillLink({ link }: { link: Link }) {
  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-base font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
    >
      {link.label}
      <span className="text-slate-500">{link.external ? "↗" : "→"}</span>
    </a>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.10)] backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={reduced ? undefined : { opacity: 0, y: 14 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </m.div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (fr: string, en: string) => (language === "fr" ? fr : en);

  const navLinks: Link[] = useMemo(
    () => [
      { label: t("À propos", "About"), href: "#about" },
      { label: t("Expérience", "Experience"), href: "#experience" },
      { label: t("Projets", "Projects"), href: "#projects" },
      { label: t("Compétences", "Skills"), href: "#skills" },
      { label: t("Contact", "Contact"), href: "#contact" },
    ],
    [language],
  );

  const experiences: Experience[] = useMemo(
    () => [
      {
        company: "Faseya",
        role: t("Développeur Fullstack", "Fullstack Developer"),
        period: t("Sept. 2023 → Avril 2024", "Sep 2023 → Apr 2024"),
        stack: "Next.js · React · Node.js · WordPress · Docker",
        highlights: [
          {
            fr: "Pilotage technique du projet Yatouze, plateforme de gestion d'entreprise : définition de l'architecture, choix technologiques, encadrement de l'équipe et suivi des livrables.",
            en: "Technical lead on Yatouze, a business management platform: architecture definition, technology choices, team guidance, and delivery tracking.",
          },
          {
            fr: "Refonte et développement du site vitrine faseya.com sous WordPress, en parallèle de nombreux projets de développement interne.",
            en: "Redesign and development of the faseya.com showcase site on WordPress, alongside numerous internal development projects.",
          },
          {
            fr: "Mise en place de processus CI/CD et gestion de containers Docker pour automatiser les déploiements.",
            en: "Set up CI/CD pipelines and Docker containers to automate deployments.",
          },
          {
            fr: "Collaboration étroite avec les équipes produit et design pour assurer la cohérence fonctionnelle et technique des livrables.",
            en: "Worked closely with product and design teams to keep deliverables functionally and technically consistent.",
          },
        ],
      },
      {
        company: "ASIN",
        role: t("SOC Analyst (Stage professionnel)", "SOC Analyst (Internship)"),
        period: t("Mars 2023 → Août 2023", "Mar 2023 → Aug 2023"),
        stack: "Dev interne · Scripting · Sécurité",
        highlights: [
          {
            fr: "Développement d'un outil interne de monitoring du cyberespace béninois.",
            en: "Built an internal tool for monitoring the Beninese cyberspace.",
          },
          {
            fr: "Scripting et automatisation pour l'exploitation de vulnérabilités et la rédaction de bulletins d'alerte.",
            en: "Scripting and automation for vulnerability testing and alert-bulletin writing.",
          },
        ],
      },
      {
        company: "Payplus",
        role: t("Développeur SDK JS (Freelance)", "JS SDK Developer (Freelance)"),
        period: t("Nov. 2021 → Déc. 2022", "Nov 2021 → Dec 2022"),
        stack: "JavaScript Vanilla · WebSocket · SDK",
        highlights: [
          {
            fr: "Conception et développement du SDK PayPlusWeb en JavaScript Vanilla, avec une architecture modulaire pour une intégration facile dans des sites tiers.",
            en: "Designed and built the PayPlusWeb SDK in vanilla JavaScript, with a modular architecture for easy integration into third-party sites.",
          },
          {
            fr: "Implémentation d'un système de validation dynamique des données côté client pour garantir la conformité des informations transmises au backend.",
            en: "Built client-side dynamic data validation to ensure information sent to the backend was always valid.",
          },
          {
            fr: "Développement d'un client WebSocket pour la réception en temps réel des notifications de paiement (statuts, confirmations, erreurs).",
            en: "Built a WebSocket client for real-time payment notifications (statuses, confirmations, errors).",
          },
          {
            fr: "Documentation du SDK et accompagnement technique des équipes intégratrices.",
            en: "SDK documentation and technical support for integrating teams.",
          },
        ],
      },
      {
        company: "ReselForm",
        role: t("Développeur Front-End ReactJS (Freelance)", "Front-End ReactJS Developer (Freelance)"),
        period: t("Mars 2021 → 2022", "Mar 2021 → 2022"),
        stack: "React · Tailwind · Figma/Adobe XD",
        highlights: [
          {
            fr: "Intégration de maquettes Figma/Adobe XD en interfaces web interactives et responsives.",
            en: "Turned Figma/Adobe XD designs into interactive, responsive web interfaces.",
          },
          {
            fr: "Développement de pages responsives avec React et TailwindCSS, dans le respect des bonnes pratiques UX/UI.",
            en: "Built responsive pages with React and TailwindCSS, following UX/UI best practices.",
          },
          {
            fr: "Collaboration étroite avec les équipes design et backend pour assurer la conformité fonctionnelle et visuelle des livrables.",
            en: "Worked closely with design and backend teams to keep deliverables functionally and visually on-spec.",
          },
        ],
      },
      {
        company: "ICT Consulting",
        role: t("Développeur JavaScript & WordPress", "JavaScript & WordPress Developer"),
        period: t("Janv. 2020 → Janv. 2021", "Jan 2020 → Jan 2021"),
        stack: "WordPress · Elementor · JavaScript",
        highlights: [
          {
            fr: "Création et personnalisation de sites WordPress avec le constructeur Elementor, dont le site vitrine cybersécurité Erugis (erugis.net), pour des clients variés (entreprises, institutions, particuliers).",
            en: "Built and customized WordPress sites with the Elementor builder, including the Erugis cybersecurity showcase site (erugis.net), for a range of clients (companies, institutions, individuals).",
          },
          {
            fr: "Intégration de fonctionnalités dynamiques en JavaScript : sliders, formulaires interactifs, animations sur mesure.",
            en: "Added dynamic JavaScript features: sliders, interactive forms, custom animations.",
          },
          {
            fr: "Maintenance évolutive et corrective sur plusieurs projets WordPress (plugins, thèmes, compatibilité des mises à jour).",
            en: "Ongoing maintenance and bug fixes across several WordPress projects (plugins, themes, update compatibility).",
          },
          {
            fr: "Debugging front-end sur des projets tiers en Angular et Vue.js, et optimisation des performances (chargement, accessibilité mobile, SEO technique).",
            en: "Front-end debugging on third-party Angular and Vue.js projects, plus performance tuning (load times, mobile accessibility, technical SEO).",
          },
        ],
      },
      {
        company: "Global Optim",
        role: t("Développeur Front-End Vue.js", "Vue.js Front-End Developer"),
        period: t("Fév. 2018 → Fév. 2019", "Feb 2018 → Feb 2019"),
        stack: "Vue.js · REST · Fintech UI",
        highlights: [
          {
            fr: "Intégration UI/UX responsive avec Vue.js pour des applications web liées aux transactions financières et à la blockchain.",
            en: "Built responsive UI/UX with Vue.js for web applications tied to financial transactions and blockchain.",
          },
          {
            fr: "Consommation sécurisée d'API REST et affichage dynamique de données sensibles (transactions, soldes, historiques).",
            en: "Consumed REST APIs securely and rendered sensitive data dynamically (transactions, balances, history).",
          },
          {
            fr: "Mise en place de composants réutilisables et optimisation des performances d'affichage sur les tableaux de bord.",
            en: "Built reusable components and tuned rendering performance on dashboards.",
          },
        ],
      },
    ],
    [language],
  );

  const projects: Project[] = useMemo(
    () => [
      {
        name: "Yatouze",
        href: "https://yatouze.com/",
        featured: true,
        tagline: {
          fr: "Plateforme de gestion d'entreprise + site vitrine WordPress",
          en: "Business management platform + WordPress showcase site",
        },
        description: {
          fr: "Projet piloté en tant que Technical Lead chez Faseya : définition de l'architecture, choix technologiques et encadrement de l'équipe pour la plateforme de gestion d'entreprise. Le site public yatouze.com a été conçu et développé sous WordPress.",
          en: "Led as Technical Lead at Faseya: architecture, technology choices, and team guidance for the business management platform. The public site yatouze.com was designed and built on WordPress.",
        },
        featuresLabel: { fr: "Points clés", en: "Key points" },
        features: {
          fr: [
            "Site vitrine yatouze.com développé sous WordPress",
            "Technical Lead sur la plateforme applicative : architecture & stack",
            "Encadrement technique de l'équipe de développement",
            "Suivi des livrables avec les équipes produit et design",
          ],
          en: [
            "yatouze.com showcase site built on WordPress",
            "Technical Lead on the app platform: architecture & stack",
            "Technical guidance for the development team",
            "Delivery tracking with product and design teams",
          ],
        },
        tags: ["WordPress", "Technical Lead", "Next.js/React", "Node.js"],
      },
      {
        name: "Faseya",
        href: "https://faseya.com/",
        featured: true,
        tagline: {
          fr: "Refonte complète du site vitrine sous WordPress",
          en: "Full WordPress showcase site redesign",
        },
        description: {
          fr: "Refonte et développement du site vitrine faseya.com sous WordPress : nouvelle architecture de navigation, design modernisé, entièrement responsive et optimisé pour le référencement.",
          en: "Redesign and development of the faseya.com showcase site on WordPress: new navigation architecture, modernized design, fully responsive and SEO-optimized.",
        },
        tags: ["WordPress", "Responsive", "SEO"],
      },
      {
        name: "Erugis",
        href: "https://erugis.net/",
        featured: true,
        tagline: {
          fr: "Vitrine WordPress pour une société de cybersécurité",
          en: "WordPress showcase for a cybersecurity company",
        },
        description: {
          fr: "Site vitrine corporate d'Erugis, réalisé avec WordPress et le constructeur Elementor : services, expertises et page contact, avec un design sobre aligné sur les codes du secteur de la cybersécurité.",
          en: "Erugis' corporate showcase site, built with WordPress and the Elementor builder: services, expertise, and contact page, with a sober design matching cybersecurity industry codes.",
        },
        tags: ["WordPress", "Elementor", "SEO", "Responsive"],
      },
      {
        name: "Wall Of Share",
        href: "https://wall-of-share.com/",
        tagline: {
          fr: "Plateforme de freelancing, mise en relation freelances / entreprises",
          en: "Freelancing platform connecting freelancers and companies",
        },
        description: {
          fr: "Plateforme web de mise en relation entre freelances et entreprises : profils, candidatures et suivi des missions depuis une interface unifiée.",
          en: "Web platform matching freelancers and companies: profiles, applications, and mission tracking from a unified interface.",
        },
        tags: ["React", "REST"],
      },
      {
        name: "Gobi",
        href: "https://app.gobiworld.com",
        tagline: {
          fr: "Plateforme de transactions financières blockchain",
          en: "Blockchain financial transactions platform",
        },
        description: {
          fr: "Interfaces web pour une plateforme de transactions blockchain : portefeuille, historique des transactions et dashboard de solde, avec une attention forte à la fiabilité d'affichage des données sensibles.",
          en: "Web interfaces for a blockchain transactions platform: wallet, transaction history, and balance dashboard, with strong focus on reliably displaying sensitive data.",
        },
        tags: ["Vue.js", "REST", "Blockchain"],
      },
      {
        name: "Elephorm",
        href: "https://elephorm.com",
        tagline: {
          fr: "Plateforme d'apprentissage en ligne",
          en: "Online learning platform",
        },
        description: {
          fr: "Contribution au développement front-end d'Elephorm, plateforme de formations en ligne : navigation dans les catalogues de cours et lecture de contenus.",
          en: "Contributed to Elephorm's front-end, an online course platform: catalog browsing and course-content viewing.",
        },
        tags: ["Front-end", "E-learning"],
      },
      {
        name: "i-Oasis",
        href: "https://i-oasis.fr",
        tagline: {
          fr: "Plateforme de formation en réalité virtuelle",
          en: "Virtual-reality training platform",
        },
        description: {
          fr: "Développement d'interfaces web pour i-Oasis, plateforme de formation en réalité virtuelle : gestion des parcours de formation et suivi des utilisateurs.",
          en: "Built web interfaces for i-Oasis, a virtual-reality training platform: training-path management and learner tracking.",
        },
        tags: ["Front-end", "EdTech"],
      },
    ],
    [language],
  );

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-[radial-gradient(1200px_circle_at_18%_-10%,rgba(37,99,235,0.18),transparent_55%),radial-gradient(900px_circle_at_88%_0%,rgba(56,189,248,0.20),transparent_50%),linear-gradient(to_bottom,#ffffff,#f1f5ff_45%,#ffffff)] text-slate-950">
        <div className="relative mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Ambient animated blobs */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="animated-blob absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="animated-blob absolute -right-28 top-10 h-80 w-80 rounded-full bg-sky-500/12 blur-3xl [animation-delay:1.2s]" />
            <div className="animated-blob absolute left-1/3 top-[38rem] h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl [animation-delay:2.2s]" />
          </div>
        {/* Header */}
        <m.header
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="sticky top-0 z-30 -mx-4 mb-8 border-b border-slate-200/70 bg-white/70 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <a href="#" className="group flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/10 via-white to-sky-500/10 ring-1 ring-slate-200/80">
                <span className="text-sm font-semibold text-slate-900">WS</span>
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-950">WASSI Soultone</p>
                <p className="text-xs text-slate-600">
                  {t("Développeur Web · WordPress / React / Vue.js", "Web Developer · WordPress / React / Vue.js")}
                </p>
              </div>
            </a>

            <nav className="hidden items-center gap-2 lg:flex">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-900/5 hover:text-slate-950"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/70 p-1 text-[11px] shadow-sm">
                <button
                  type="button"
                  onClick={() => setLanguage("fr")}
                  className={cx(
                    "rounded-full px-3 py-1 transition",
                    language === "fr"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-950",
                  )}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={cx(
                    "rounded-full px-3 py-1 transition",
                    language === "en"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-950",
                  )}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </m.header>

        {/* Hero */}
        <Reveal className="mb-10">
          <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10">
            <div className="pointer-events-none absolute inset-0 animated-gradient bg-[radial-gradient(900px_circle_at_20%_0%,rgba(37,99,235,0.12),transparent_55%),radial-gradient(700px_circle_at_95%_10%,rgba(56,189,248,0.14),transparent_55%)]" />

            <div className="relative grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div className="order-2 lg:order-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{t("Disponible — CDI / Freelance", "Available — Full-time / Freelance")}</Badge>
                  <Badge>{t("Basé au Bénin (remote ok)", "Based in Benin (remote ok)")}</Badge>
                </div>

                <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  {t("Développeur Web Fullstack", "Fullstack Web Developer")}
                </h1>
                <p className="mt-2 text-lg font-semibold text-slate-700">
                  {t("WordPress · React / Next.js · Vue.js · Sites vitrines & plateformes web", "WordPress · React / Next.js · Vue.js · Showcase sites & web platforms")}
                </p>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
                  {t(
                    "Développeur web fullstack avec plus de 6 ans d'expérience : sites vitrines WordPress, applications React/Next.js et Vue.js, SDK et API sur mesure. Une double compétence en cybersécurité renforce la fiabilité et la sécurité des solutions que je livre.",
                    "Fullstack web developer with 6+ years of experience: WordPress showcase sites, React/Next.js and Vue.js applications, and custom SDKs/APIs. A background in cybersecurity adds an extra layer of reliability and security to everything I ship.",
                  )}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <m.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                  >
                    {t("Voir les projets", "See projects")}
                    <span className="text-white/80">↘</span>
                  </m.a>
                  <m.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="mailto:wassisoultone1@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-5 py-2.5 text-base font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-white"
                  >
                    {t("Me contacter", "Contact me")}
                    <span className="text-slate-500">↗</span>
                  </m.a>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-3 sm:items-stretch">
                  {[
                    { k: "6+", v: t("ans d'expérience web", "years of web experience") },
                    { k: "WordPress", v: t("Elementor, thèmes, plugins", "Elementor, themes, plugins") },
                    { k: "React/Vue", v: t("Next.js, Node.js, Tailwind", "Next.js, Node.js, Tailwind") },
                  ].map((x) => (
                    <div
                      key={x.k}
                      className="flex h-full min-h-[5.5rem] flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/70 p-4"
                    >
                      <p className="text-lg font-semibold text-slate-950">{x.k}</p>
                      <p className="mt-1 text-sm text-slate-600">{x.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 flex justify-center lg:order-2 lg:-mt-14 lg:justify-end">
                <div className="w-full max-w-sm">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src="/photo.png"
                      alt="WASSI Soultone"
                      fill
                      sizes="(max-width: 1024px) 320px, 360px"
                      priority
                      className="object-cover object-[50%_-10%] mix-blend-multiply"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f8fbff] via-[#f8fbff]/70 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* About */}
        <Reveal className="mt-14">
          <section id="about" className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <SectionTitle
              eyebrow={t("Profil", "Profile")}
              title={t("Développeur web, du CMS au sur-mesure", "Web developer, from CMS to custom builds")}
              description={t(
                "Je passe naturellement d'un site vitrine WordPress à une plateforme applicative en React/Next.js, selon le besoin réel du projet.",
                "I move naturally from a WordPress showcase site to a full React/Next.js platform, depending on what the project actually needs.",
              )}
            />
            <div className="flex flex-wrap gap-2">
              <Badge>WordPress</Badge>
              <Badge>Elementor</Badge>
              <Badge>PHP / Laravel</Badge>
              <Badge>React / Next.js</Badge>
              <Badge>Vue.js</Badge>
              <Badge>JavaScript</Badge>
              <Badge>TailwindCSS</Badge>
              <Badge>Node.js</Badge>
              <Badge>Docker</Badge>
            </div>
          </div>

          <Card className="lg:col-span-2">
            <p className="text-base leading-relaxed text-slate-800 sm:text-lg">
              {t(
                "Depuis 2018, je construis des sites et applications web de bout en bout : sites vitrines et institutionnels sous WordPress (Elementor, JavaScript sur mesure), interfaces modernes en React, Next.js et Vue.js, et SDK/API pour des besoins métier spécifiques (paiement, gestion d'entreprise, blockchain). J'ai aussi piloté techniquement une plateforme de gestion d'entreprise (Yatouze) en tant que Technical Lead : architecture, choix technologiques et encadrement d'équipe.",
                "Since 2018, I've built websites and web applications end to end: showcase and institutional sites on WordPress (Elementor, custom JavaScript), modern interfaces in React, Next.js and Vue.js, and SDKs/APIs for specific business needs (payments, business management, blockchain). I also served as Technical Lead on a business management platform (Yatouze): architecture, technology choices, and team guidance.",
              )}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:items-stretch">
              <div className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/75 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700/80">
                      {t("Ce que j'apporte", "What I bring")}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {t(
                        "Livraison rapide + qualité + sécurité.",
                        "Fast delivery + quality + security.",
                      )}
                    </p>
                  </div>
                  <span className="rounded-2xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">
                    {t("Valeur", "Value")}
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-base text-slate-800">
                  <div className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-600/80" />
                    <p>
                      <span className="font-semibold">{t("Sites WordPress", "WordPress sites")}</span>{" "}
                      {t(
                        "sur mesure avec Elementor, performants, responsives et optimisés SEO.",
                        "custom-built with Elementor, fast, responsive and SEO-optimized.",
                      )}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-600/80" />
                    <p>
                      <span className="font-semibold">{t("Applications React/Vue", "React/Vue applications")}</span>{" "}
                      {t(
                        "modernes, réutilisables et connectées à des APIs REST.",
                        "modern, reusable, and connected to REST APIs.",
                      )}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-600/80" />
                    <p>
                      <span className="font-semibold">{t("Sensibilité sécurité", "Security awareness")}</span>{" "}
                      {t(
                        "issue de mon expérience en pentesting et analyse de menaces.",
                        "from my hands-on experience in pentesting and threat analysis.",
                      )}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-600/80" />
                    <p>
                      <span className="font-semibold">{t("Autonomie", "Autonomy")}</span>{" "}
                      {t(
                        "sur tout le cycle projet, du cahier des charges à la mise en production.",
                        "across the full project cycle, from requirements to production.",
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/75 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700/80">
                      {t("Ce que je cherche", "What I'm looking for")}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {t(
                        "Un poste de développeur web où je peux livrer et grandir.",
                        "A web developer role where I can ship and grow.",
                      )}
                    </p>
                  </div>
                  <span className="rounded-2xl bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 ring-1 ring-sky-100">
                    {t("Objectif", "Goal")}
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-base text-slate-800">
                  {[
                    t("Poste de développeur web (WordPress / React / Vue.js)", "Web developer role (WordPress / React / Vue.js)"),
                    t("Sites vitrines, sites institutionnels, plateformes métier", "Showcase sites, institutional sites, business platforms"),
                    t("Équipe exigeante sur la qualité et le produit", "Quality- and product-focused team"),
                    t("Bonnes pratiques web et un peu de sécurité en bonus", "Good web practices, with a bit of security as a bonus"),
                  ].map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 flex-none rounded-full bg-sky-500/80" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          </section>
        </Reveal>

        {/* Experience */}
        <Reveal className="mt-14">
          <section id="experience">
          <SectionTitle
            eyebrow={t("Parcours", "Journey")}
            title={t("Expériences professionnelles", "Professional experience")}
            description={t(
              "Sélection d'expériences en développement web, du WordPress au fullstack React/Next.js.",
              "Selected roles across web development, from WordPress to fullstack React/Next.js.",
            )}
          />

          <div className="grid gap-4">
            {experiences.map((e) => (
              <m.div
                key={`${e.company}-${e.period}`}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      {e.role} · <span className="text-blue-700">{e.company}</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-600">{e.period}</p>
                  </div>
                  {e.stack ? (
                    <span className="mono inline-flex w-fit items-center rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-[11px] text-slate-700">
                      {e.stack}
                    </span>
                  ) : null}
                </div>
                <ul className="mt-4 space-y-2 text-base text-slate-800">
                  {e.highlights.map((h, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue-600/80" />
                      <span>{language === "fr" ? h.fr : h.en}</span>
                    </li>
                  ))}
                </ul>
                </Card>
              </m.div>
            ))}
          </div>
          </section>
        </Reveal>

        {/* Projects */}
        <Reveal className="mt-14">
          <section id="projects">
          <SectionTitle
            eyebrow={t("Portfolio", "Portfolio")}
            title={t("Projets web sélectionnés", "Selected web projects")}
            description={t(
              "Sites WordPress, plateformes React/Vue et SDK — un aperçu de mon niveau de livraison et de ma polyvalence.",
              "WordPress sites, React/Vue platforms and SDKs — a snapshot of my delivery level and versatility.",
            )}
          />

          <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
            {projects.map((p) => (
              <m.div
                key={p.name}
                className="flex h-full flex-col"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  className={cx(
                    "flex h-full flex-col p-6",
                    p.featured && "ring-2 ring-blue-200/80",
                  )}
                >
                  <div className="flex min-h-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-base font-semibold text-slate-950">{p.name}</p>
                          {p.featured ? (
                            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                              WordPress
                            </span>
                          ) : null}
                        </div>
                        {p.tagline ? (
                          <p className="mt-1 text-sm font-semibold text-blue-800/90">
                            {language === "fr" ? p.tagline.fr : p.tagline.en}
                          </p>
                        ) : null}
                        <p className="mt-3 text-base leading-relaxed text-slate-700">
                          {language === "fr" ? p.description.fr : p.description.en}
                        </p>
                        {p.features && p.featuresLabel ? (
                          <div className="mt-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                              {language === "fr" ? p.featuresLabel.fr : p.featuresLabel.en}
                            </p>
                            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700">
                              {(language === "fr" ? p.features.fr : p.features.en).map((line) => (
                                <li key={line}>{line}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                      {p.href ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm transition hover:border-slate-300 hover:text-blue-600"
                        >
                          {t("Ouvrir", "Open")} ↗
                        </a>
                      ) : null}
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2 border-t border-slate-200/70 pt-5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-50/70 px-3 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </m.div>
            ))}
          </div>
          </section>
        </Reveal>

        {/* Skills */}
        <Reveal className="mt-14">
          <section id="skills">
          <SectionTitle
            eyebrow={t("Stack", "Stack")}
            title={t("Compétences", "Skills")}
            description={t(
              "Une base web solide (WordPress → React/Vue), complétée par une vraie sensibilité sécurité.",
              "A solid web foundation (WordPress → React/Vue), backed by genuine security awareness.",
            )}
          />

          <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
            <m.div
              className="flex h-full flex-col"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="flex h-full flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {t("CMS & Front-end", "CMS & Front-end")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "WordPress",
                  "Elementor",
                  "React",
                  "Next.js",
                  "Vue.js",
                  "JavaScript",
                  "TailwindCSS",
                  "Figma → Code",
                ].map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
              <p className="mt-auto pt-6 text-base text-slate-700">
                {t(
                  "Sites vitrines WordPress sur mesure et interfaces React/Vue modernes, responsives et rapides.",
                  "Custom WordPress showcase sites and modern, responsive, fast React/Vue interfaces.",
                )}
              </p>
              </Card>
            </m.div>

            <m.div
              className="flex h-full flex-col"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="flex h-full flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {t("Back-end & Outils", "Back-end & Tools")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "PHP",
                  "Laravel",
                  "Node.js",
                  "Express",
                  "Python",
                  "Flask",
                  "REST",
                  "Docker",
                  "Git",
                  "CI/CD",
                ].map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
              <p className="mt-auto pt-6 text-base text-slate-700">
                {t(
                  "APIs et SDK sur mesure, containerisation et pipelines de déploiement.",
                  "Custom APIs and SDKs, containerization, and deployment pipelines.",
                )}
              </p>
              </Card>
            </m.div>

            <m.div
              className="flex h-full flex-col"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="flex h-full flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {t("Sécurité (bonus)", "Security (bonus)")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Pentesting Web",
                  "OWASP",
                  "DevSecOps",
                  "YARA",
                  "Bash",
                  "PowerShell",
                ].map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
              <p className="mt-auto pt-6 text-base text-slate-700">
                {t(
                  "Analyste cybersécurité en parallèle : je code en gardant les réflexes de sécurité en tête.",
                  "Cybersecurity analyst on the side: I code with security reflexes built in.",
                )}
              </p>
              </Card>
            </m.div>
          </div>
          </section>
        </Reveal>

        {/* Contact */}
        <Reveal className="mt-14 pb-16">
          <section id="contact">
          <SectionTitle
            eyebrow={t("Contact", "Contact")}
            title={t("Construisons quelque chose de solide", "Let's build something solid")}
            description={t(
              "Si tu recrutes un développeur web WordPress/React/Vue.js avec une vraie sensibilité produit et sécurité : je suis partant.",
              "If you're hiring a WordPress/React/Vue.js web developer with strong product and security awareness: let's talk.",
            )}
          />

          <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
            <Card className="flex h-full flex-col lg:col-span-2">
              <div className="flex flex-wrap gap-3">
                <PillLink
                  link={{
                    label: t("Email", "Email"),
                    href: "mailto:wassisoultone1@gmail.com",
                    external: true,
                  }}
                />
                <PillLink
                  link={{
                    label: t("Téléphone", "Phone"),
                    href: "tel:+2290154344382",
                    external: true,
                  }}
                />
                <PillLink
                  link={{
                    label: t("Localisation : Bénin", "Location: Benin"),
                    href: "#",
                  }}
                />
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/75 p-5">
                <p className="text-sm font-semibold text-slate-950">
                  {t("Pour un poste de développeur web", "For a web developer role")}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {t(
                    "Je peux t'aider à livrer vite sans casser la qualité : site WordPress propre et rapide, front React/Vue moderne, API sur mesure, et une vigilance sécurité en plus.",
                    "I can help you ship fast without sacrificing quality: a clean, fast WordPress site, a modern React/Vue front-end, custom APIs, and extra security vigilance.",
                  )}
                </p>
              </div>
            </Card>

            <Card className="flex h-full flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {t("Infos", "Info")}
              </p>
              <div className="mt-4 space-y-3 text-base text-slate-800">
                <p>
                  <span className="text-slate-600">{t("Email", "Email")}</span>
                  <br />
                  <a
                    href="mailto:wassisoultone1@gmail.com"
                    className="font-semibold text-blue-700 hover:text-blue-600"
                  >
                    wassisoultone1@gmail.com
                  </a>
                </p>
                <p>
                  <span className="text-slate-600">{t("Téléphone", "Phone")}</span>
                  <br />
                  <span className="font-semibold text-slate-950">+229 01 54 34 43 82</span>
                </p>
                <p>
                  <span className="text-slate-600">{t("Langues", "Languages")}</span>
                  <br />
                  <span className="font-semibold text-slate-950">
                    {t("Français (courant) · Anglais (pro)", "French (fluent) · English (professional)")}
                  </span>
                </p>
              </div>
            </Card>
          </div>

          <footer className="mt-10 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} WASSI Soultone · {t("Conçu avec Next.js", "Built with Next.js")}
          </footer>
          </section>
        </Reveal>
        </div>
      </main>
    </LazyMotion>
  );
}
