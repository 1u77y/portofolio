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
      { label: t("Certifs", "Certificates"), href: "#certificates" },
      { label: t("Contact", "Contact"), href: "#contact" },
    ],
    [language],
  );

  const experiences: Experience[] = useMemo(
    () => [
      {
        company: "Predilis",
        role: t("Développeur Fullstack", "Fullstack Developer"),
        period: t("Août 2024 → Janv. 2025", "Aug 2024 → Jan 2025"),
        stack: "React · Django REST · RGPD/HDS",
        highlights: [
          {
            fr: "Développement des interfaces React d'une plateforme santé : dashboards cliniques, formulaires de bilans structurés et suivi longitudinal des patients.",
            en: "Developed React interfaces for a healthcare platform: clinical dashboards, structured assessment forms, and longitudinal patient follow-up.",
          },
          {
            fr: "Intégration d'APIs REST Django sur des écrans manipulant des données médicales sensibles, avec respect strict des exigences RGPD et certification HDS.",
            en: "Integrated Django REST APIs on screens handling sensitive medical data, with strict GDPR requirements and HDS compliance.",
          },
          {
            fr: "Conception d'une bibliothèque de composants réutilisables (desktop/tablette), en collaboration directe avec les équipes produit et backend.",
            en: "Built a library of reusable components (desktop/tablet), working hand-in-hand with product and backend teams.",
          },
        ],
      },
      {
        company: "Wall Of Share",
        role: t("Développeur Front-end", "Front-end Developer"),
        period: t("Mars 2024 → Mars 2025", "Mar 2024 → Mar 2025"),
        stack: "React · REST · State management",
        highlights: [
          {
            fr: "Conception et développement des écrans produit principaux : dashboard freelance, profils, tunnel de recrutement, suivi de missions et module paiements.",
            en: "Designed and built main product screens: freelance dashboard, profiles, hiring funnel, mission tracking, and payments module.",
          },
          {
            fr: "Optimisation des performances d'affichage : réduction des re-renders, stratégie de chargement lazy et découpage des composants pour une navigation fluide.",
            en: "Tuned display performance: fewer re-renders, lazy loading strategy, and component splitting for a smoother experience.",
          },
          {
            fr: "Mise en place d'une architecture de state management scalable pour gérer les états complexes (sessions, filtres, flux temps réel).",
            en: "Introduced a scalable state-management architecture for complex state (sessions, filters, real-time flows).",
          },
        ],
      },
      {
        company: "Yatouze",
        role: t("Lead Développeur Fullstack", "Lead Fullstack Developer"),
        period: t("Fév. 2024 → Déc. 2024", "Feb 2024 → Dec 2024"),
        stack: "Next.js · React · Node.js · Zustand",
        highlights: [
          {
            fr: "Lead technique sur la migration complète ReactJS → Next.js : SSR, refonte du routing et gain mesurable sur les Core Web Vitals.",
            en: "Led the full ReactJS → Next.js migration: SSR, routing overhaul, and measurable Core Web Vitals gains.",
          },
          {
            fr: "Refonte du parcours d'authentification : sessions sécurisées, refresh tokens, gestion des rôles et droits d'accès granulaires.",
            en: "Redesigned authentication: secure sessions, refresh tokens, roles, and fine-grained access control.",
          },
          {
            fr: "Développement des modules métiers clés : bureau virtuel, time tracking, gestion des congés avec workflow d'approbation, et dashboards de pilotage.",
            en: "Shipped key business modules: virtual office, time tracking, leave management with approval workflow, and management dashboards.",
          },
          {
            fr: "Intégration d'une solution de visioconférence et coordination technique de l'équipe de développement.",
            en: "Integrated a video-conferencing solution and coordinated the engineering team technically.",
          },
        ],
      },
      {
        company: "EV8lution",
        role: t("Développeur Fullstack", "Fullstack Developer"),
        period: t("Mars 2022 → Oct. 2022", "Mar 2022 → Oct 2022"),
        stack: "React · AdonisJS · Recoil",
        highlights: [
          {
            fr: "Développement end-to-end du parcours utilisateur : onboarding, matching mentor/mentoré, sessions de mentorat, messagerie interne et dashboards de suivi.",
            en: "End-to-end user journey: onboarding, mentor/mentee matching, mentoring sessions, internal messaging, and follow-up dashboards.",
          },
          {
            fr: "Conception de l'API AdonisJS : gestion des comptes, profils, algorithme de matching et sessions, avec optimisation des performances front/back.",
            en: "Designed the AdonisJS API: accounts, profiles, matching algorithm, and sessions, with front/back performance tuning.",
          },
          {
            fr: "Interfaces React pixel-perfect, fidèles aux maquettes, avec une attention particulière à l'expérience des deux profils (mentor et mentoré).",
            en: "Pixel-perfect React UIs against designs, with strong UX for both mentor and mentee roles.",
          },
        ],
      },
      {
        company: "Vyvroo",
        role: t("Développeur Fullstack", "Fullstack Developer"),
        period: t("Août 2021 → Janv. 2022", "Aug 2021 → Jan 2022"),
        stack: "React · AdonisJS · SQL",
        highlights: [
          {
            fr: "Développement d'un moteur de recherche géographique avec filtres avancés, auto-complétion et affichage dynamique des résultats en temps réel.",
            en: "Built a geographic search engine with advanced filters, autocomplete, and real-time result rendering.",
          },
          {
            fr: "Backend AdonisJS : endpoints de recherche, géolocalisation, gestion des données et stratégie de cache pour réduire la latence des requêtes fréquentes.",
            en: "AdonisJS backend: search endpoints, geolocation, data management, and caching to cut latency on frequent queries.",
          },
        ],
      },
      {
        company: "Faseya",
        role: t("Développeur Web", "Web Developer"),
        period: t("Janv. 2021 → Juil. 2021", "Jan 2021 → Jul 2021"),
        stack: "React · HTML/CSS · SEO",
        highlights: [
          {
            fr: "Refonte complète du site vitrine : nouvelle architecture de navigation, pages services et portfolio, design modernisé et entièrement responsive.",
            en: "Full showcase redesign: new navigation, services and portfolio pages, modern responsive design.",
          },
          {
            fr: "Optimisation SEO (balises sémantiques, meta, Open Graph), performances Lighthouse et accessibilité, avec animations légères pour fluidifier la navigation.",
            en: "SEO (semantic tags, meta, Open Graph), Lighthouse performance and a11y, with light motion for smoother navigation.",
          },
        ],
      },
      {
        company: "Erugis",
        role: t("Développeur WordPress", "WordPress Developer"),
        period: t("Nov. 2020 → Déc. 2020", "Nov 2020 → Dec 2020"),
        stack: "WordPress · PHP · SEO",
        highlights: [
          {
            fr: "Développement d'un site vitrine corporate orienté cybersécurité : services, expertises, page contact avec formulaire sécurisé et éléments de preuve sociale.",
            en: "Corporate cybersecurity showcase: services, expertise, contact with secure form and trust signals.",
          },
          {
            fr: "Design responsive, SEO on-page optimisé et chargement rapide pour maximiser la crédibilité et la visibilité organique.",
            en: "Responsive layout, on-page SEO, and fast loads for credibility and organic visibility.",
          },
        ],
      },
      {
        company: "Gobi App",
        role: t("Développeur Front-end Vue.js", "Vue.js Front-end Developer"),
        period: t("Août 2020 → Nov. 2020", "Aug 2020 → Nov 2020"),
        stack: "Vue.js · REST · Blockchain UI",
        highlights: [
          {
            fr: "Développement des interfaces principales de la plateforme : portefeuille crypto, historique des transactions, dashboard de solde et écrans d'envoi/réception d'actifs.",
            en: "Built main platform UIs: crypto wallet, transaction history, balance dashboard, send/receive flows.",
          },
          {
            fr: "Intégration des APIs blockchain et attention particulière à l'affichage fiable des données critiques : soldes, confirmations de transactions et statuts en temps réel.",
            en: "Integrated blockchain APIs with reliable display of critical data: balances, confirmations, and real-time status.",
          },
        ],
      },
    ],
    [language],
  );

  const projects: Project[] = useMemo(
    () => [
      {
        name: "Predilis",
        tagline: {
          fr: "Plateforme santé pour professionnels : prévention, bilans et suivi patient",
          en: "Healthcare platform for professionals: prevention, assessments, and patient follow-up",
        },
        description: {
          fr: "Application web orientée parcours de prévention et bilans de santé : interfaces cliniques pour les équipes médicales, formulaires structurés et suivi longitudinal des patients. Intégration d’APIs Django REST sur des flux sensibles, avec exigences fortes de conformité (RGPD, HDS) et focus sur la performance d’affichage.",
          en: "Web app for prevention pathways and health checkups: clinical interfaces for medical teams, structured forms, and longitudinal patient follow-up. Django REST integration on sensitive flows with strong compliance (GDPR, HDS) and a focus on display performance.",
        },
        featuresLabel: { fr: "Features clés", en: "Key features" },
        features: {
          fr: [
            "Dashboards et écrans cliniques pour le pilotage des parcours de prévention",
            "Formulaires de bilans structurés et suivi des consultations",
            "Consommation d’APIs REST Django sur données médicales sensibles",
            "Bibliothèque de composants réutilisables (desktop / tablette)",
          ],
          en: [
            "Dashboards and clinical screens for prevention pathway management",
            "Structured assessment forms and consultation tracking",
            "Django REST APIs for sensitive medical data",
            "Reusable component library (desktop / tablet)",
          ],
        },
        tags: ["React", "Django REST", "RGPD", "HDS", "Healthcare"],
      },
      {
        name: "Wall Of Share",
        href: "https://wall-of-share.com/",
        tagline: {
          fr: "Connecter freelances et entreprises, de la candidature au paiement",
          en: "Connecting freelancers and companies from application to payout",
        },
        description: {
          fr: "Application web complète de mise en relation : les freelances construisent leur profil, postulent aux missions et encaissent leurs paiements depuis une interface unifiée. Les recruteurs publient, filtrent et suivent leurs recrutements en temps réel. Accent fort sur la fluidité de navigation et la performance des listes.",
          en: "End-to-end web app for matching: freelancers build profiles, apply to missions, and get paid from one unified interface. Recruiters publish, filter, and track hiring in real time—strong focus on smooth navigation and list performance.",
        },
        featuresLabel: { fr: "Features clés", en: "Key features" },
        features: {
          fr: [
            "Profils freelances : portfolio, disponibilité, TJM et évaluations",
            "Tunnel missions : publication, candidature, sélection et suivi d'avancement",
            "Module paiements intégré avec historique et statuts",
            "Architecture state management scalable pour les flux temps réel",
          ],
          en: [
            "Freelancer profiles: portfolio, availability, day rate, and reviews",
            "Mission funnel: publish, apply, select, and track progress",
            "Integrated payments module with history and statuses",
            "Scalable state-management architecture for real-time flows",
          ],
        },
        tags: ["React", "REST", "State management", "Real-time"],
      },
      {
        name: "Yatouze",
        href: "https://yatouze.com/",
        tagline: {
          fr: "Suite de gestion d'entreprise pilotée en lead technique",
          en: "Enterprise management suite led as technical lead",
        },
        description: {
          fr: "Plateforme RH et opérationnelle pour PME : suivi du temps, gestion des congés, bureau virtuel et tableaux de bord de pilotage. Rôle de lead technique sur la migration complète ReactJS → Next.js, incluant la refonte de l'architecture d'authentification et l'intégration d'une solution de visio.",
          en: "HR and operations platform for SMBs: time tracking, leave management, virtual office, and executive dashboards. Technical lead on the full ReactJS → Next.js migration, including authentication architecture redesign and video-conferencing integration.",
        },
        featuresLabel: { fr: "Features clés", en: "Key features" },
        features: {
          fr: [
            "Migration ReactJS → Next.js avec SSR et amélioration des Core Web Vitals",
            "Auth refonte : refresh tokens, rôles et permissions granulaires",
            "Time tracking, congés avec workflow d'approbation, bureau virtuel",
            "Intégration visioconférence et dashboards de pilotage RH",
          ],
          en: [
            "ReactJS → Next.js migration with SSR and Core Web Vitals improvements",
            "Auth overhaul: refresh tokens, roles, and granular permissions",
            "Time tracking, leave with approval workflow, virtual office",
            "Video-conferencing integration and HR steering dashboards",
          ],
        },
        tags: ["Next.js", "React", "Node.js", "Zustand", "Lead"],
      },
      {
        name: "Erugis",
        href: "https://erugis.net/",
        tagline: {
          fr: "Vitrine digitale pour une société de cybersécurité",
          en: "Digital showcase for a cybersecurity company",
        },
        description: {
          fr: "Conception et développement du site vitrine corporate d'Erugis, spécialiste en cybersécurité. Design sobre et professionnel aligné avec les codes du secteur, entièrement responsive, avec un score Lighthouse optimisé et un balisage SEO structuré pour maximiser la visibilité organique.",
          en: "Designed and built Erugis’ corporate website for cybersecurity. Clean, professional design aligned with industry standards, fully responsive, with strong Lighthouse scores and structured SEO for organic visibility.",
        },
        tags: ["Corporate", "SEO", "Performance", "Responsive"],
      },
      {
        name: "Global Solidarity for Human Dignity",
        href: "https://en.globalsolidarity.ngo/",
        tagline: {
          fr: "Présence web orientée impact et conversion pour une ONG internationale",
          en: "Impact- and conversion-focused web presence for an international NGO",
        },
        description: {
          fr: "Site institutionnel conçu pour maximiser la lisibilité de la mission et convertir les visiteurs en donateurs ou partenaires. Navigation claire par région d'intervention, sections structurées (mission, projets terrain, actualités) et parcours de don optimisé pour minimiser les frictions.",
          en: "Institutional site to make the mission easy to grasp and turn visitors into donors or partners. Clear regional navigation, structured sections (mission, field projects, news), and a low-friction donation path.",
        },
        tags: ["NGO", "UX", "Content", "Conversion"],
      },
      {
        name: t("API Security Tester", "API Security Tester"),
        tagline: {
          fr: "Centraliser, automatiser et fiabiliser les audits de sécurité d'APIs REST",
          en: "Centralize, automate, and make REST API security audits reliable",
        },
        description: {
          fr: "Tester la sécurité d'une API manuellement est fragmenté et peu reproductible. Cet outil desktop unifie les tests fonctionnels, le fuzzing automatisé et la détection de vulnérabilités courantes — IDOR, injections, exposition de données, erreurs verboses — dans une interface pensée pour les pentesters et les équipes sécurité.",
          en: "Manual API security testing is fragmented and hard to repeat. This desktop tool unifies functional tests, automated fuzzing, and common vulnerability detection (IDOR, injections, data exposure, verbose errors) in an interface built for pentesters and security teams.",
        },
        featuresLabel: { fr: "Capacités", en: "Capabilities" },
        features: {
          fr: [
            "Tests fonctionnels d'endpoints : méthodes, headers, auth, codes de réponse attendus",
            "Fuzzing automatique des paramètres pour détecter les comportements inattendus",
            "Détection de vulnérabilités OWASP : IDOR, injections, données sensibles exposées",
            "Export de rapport structuré pour restitution client ou équipe sécurité",
          ],
          en: [
            "Functional endpoint tests: methods, headers, auth, expected status codes",
            "Automated parameter fuzzing to surface unexpected behavior",
            "OWASP-style detection: IDOR, injections, sensitive data exposure",
            "Structured report export for clients or the security team",
          ],
        },
        tags: ["API", "Pentest", "OWASP", "Python", "Automation"],
      },
    ],
    [language],
  );

  const certificates = useMemo(
    () => [
      "C|EH Practical",
      "FCF (Fortinet Certified Fundamentals)",
      "FCA (Fortinet Certified Associate)",
      "Fortigate Administrator (NSE 4)",
      "MAD20 CTI – Cyber Threat Intelligence",
      "MAD20 SOC Assessment",
      "MAD20 MITRE ATT&CK Fundamentals",
      "MAD20 Purple Teaming",
      t("PNPT — en cours", "PNPT — in progress"),
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
                  {t("Fullstack (Python/Django) · Cyber · DevOps", "Fullstack (Python/Django) · Cyber · DevOps")}
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

        {/* Hero (simple & professional) */}
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
                  {t("Développeur Fullstack Python/Django", "Fullstack Python/Django Developer")}
                </h1>
                <p className="mt-2 text-lg font-semibold text-slate-700">
                  {t("Cybersécurité · DevOps · Produits web", "Cybersecurity · DevOps · Web products")}
                </p>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
                  {t(
                    "Je construis des APIs Django robustes, des interfaces modernes (Next.js/React) et des pipelines de livraison (Docker/CI/CD). Mon background SOC/pentest aide à intégrer la sécurité dès la conception.",
                    "I build robust Django APIs, modern UIs (Next.js/React) and delivery pipelines (Docker/CI/CD). My SOC/pentest background helps integrate security from day one.",
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
                    { k: "5+", v: t("ans d’expérience", "years experience") },
                    { k: "Django", v: t("APIs & sécurité", "APIs & security") },
                    { k: "DevOps", v: t("Docker · CI/CD", "Docker · CI/CD") },
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
              title={t("Dev + sécurité, pas l’un ou l’autre", "Dev + security, not one or the other")}
              description={t(
                "Je combine développement produit, sécurité applicative et DevOps pour livrer des apps web rapides, maintenables et plus sûres.",
                "I combine product engineering, app security and DevOps to ship fast, maintainable and safer web apps.",
              )}
            />
            <div className="flex flex-wrap gap-2">
              <Badge>Python</Badge>
              <Badge>Django / DRF</Badge>
              <Badge>React / Next.js</Badge>
              <Badge>PostgreSQL</Badge>
              <Badge>Docker</Badge>
              <Badge>CI/CD</Badge>
              <Badge>ELK</Badge>
              <Badge>Wazuh</Badge>
            </div>
          </div>

          <Card className="lg:col-span-2">
            <p className="text-base leading-relaxed text-slate-800 sm:text-lg">
              {t(
                "Passionné par la cybersécurité offensive et défensive, j’ai une solide expérience en SOC/pentesting, automatisation (n8n/Ansible) et analyse de menaces. Côté développement, je construis des applications web API-driven et des interfaces propres, avec une attention particulière aux performances, à la qualité et aux workflows de livraison.",
                "Passionate about offensive and defensive security, I have solid SOC/pentesting experience, automation (n8n/Ansible) and threat analysis. On the engineering side, I build API-driven web apps and polished UIs with a strong focus on performance, quality and delivery workflows.",
              )}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:items-stretch">
              <div className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/75 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700/80">
                      {t("Ce que j’apporte", "What I bring")}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {t(
                        "Livraison produit + qualité + sécurité.",
                        "Product delivery + quality + security.",
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
                      <span className="font-semibold">{t("APIs Django", "Django APIs")}</span>{" "}
                      {t(
                        "propres (auth/permissions), testables et faciles à maintenir.",
                        "that are clean (auth/permissions), testable and maintainable.",
                      )}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-600/80" />
                    <p>
                      <span className="font-semibold">{t("UI moderne", "Modern UI")}</span>{" "}
                      {t(
                        "(Next.js/React) responsive, rapide et orientée conversion.",
                        "(Next.js/React) responsive, fast and conversion-minded.",
                      )}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-600/80" />
                    <p>
                      <span className="font-semibold">{t("DevOps pragmatique", "Pragmatic DevOps")}</span>{" "}
                      {t(
                        "avec Docker, CI/CD et bonnes pratiques de release.",
                        "with Docker, CI/CD and solid release practices.",
                      )}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-600/80" />
                    <p>
                      <span className="font-semibold">{t("Sécurité intégrée", "Security built-in")}</span>{" "}
                      {t(
                        "(OWASP, durcissement, monitoring) dès la conception.",
                        "(OWASP, hardening, monitoring) from day one.",
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
                        "Un poste où je peux livrer et grandir.",
                        "A role where I can ship and grow.",
                      )}
                    </p>
                  </div>
                  <span className="rounded-2xl bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 ring-1 ring-sky-100">
                    {t("Objectif", "Goal")}
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-base text-slate-800">
                  {[
                    t("Poste fullstack Python/Django", "Fullstack Python/Django role"),
                    t("Produits B2B / plateformes", "B2B products / platforms"),
                    t("Équipe exigeante sur la qualité", "Quality-focused team"),
                    t("Culture sécurité bienvenue", "Security-friendly culture"),
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
              "Sélection d’expériences orientées produit (web) et sécurité (SOC/infra).",
              "Selected roles across product engineering (web) and security (SOC/infra).",
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
            title={t("Projets sélectionnés", "Selected projects")}
            description={t(
              "Quelques réalisations (prod + démos) qui montrent mon niveau de livraison, de rigueur et de polyvalence.",
              "A few projects (prod + demos) that showcase delivery, rigor and versatility.",
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
                <Card className="flex h-full flex-col p-6">
                  <div className="flex min-h-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-semibold text-slate-950">{p.name}</p>
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
            title={t("Compétences (Fullstack · Cyber · DevOps)", "Skills (Fullstack · Cyber · DevOps)")}
            description={t(
              "Je mets l’accent sur la livraison : architecture, qualité, sécurité et déploiement.",
              "I focus on shipping: architecture, quality, security and deployment.",
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
                {t("Backend", "Backend")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Python", "Django", "DRF", "Node.js", "Express", "REST", "Auth", "SQL"].map(
                  (s) => (
                    <Badge key={s}>{s}</Badge>
                  ),
                )}
              </div>
              <p className="mt-auto pt-6 text-base text-slate-700">
                {t(
                  "APIs robustes, modélisation, permissions, intégration et tests.",
                  "Robust APIs, modeling, permissions, integration and testing.",
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
                {t("Frontend", "Frontend")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind", "Redux", "Zustand", "UI/UX"].map(
                  (s) => (
                    <Badge key={s}>{s}</Badge>
                  ),
                )}
              </div>
              <p className="mt-auto pt-6 text-base text-slate-700">
                {t(
                  "Interfaces clean, responsive, scalables, et focus performance.",
                  "Clean, responsive and scalable UIs with a performance mindset.",
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
                {t("DevOps & Sécurité", "DevOps & Security")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Docker",
                  "CI/CD",
                  "Ansible",
                  "Linux",
                  "Wazuh",
                  "ELK",
                  "TheHive",
                  "Honeypots",
                  "YARA",
                  "MITRE ATT&CK",
                ].map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
              <p className="mt-auto pt-6 text-base text-slate-700">
                {t(
                  "Automatisation, observabilité, réponse à incidents et hardening.",
                  "Automation, observability, incident response and hardening.",
                )}
              </p>
              </Card>
            </m.div>
          </div>
          </section>
        </Reveal>

        {/* Certificates */}
        <Reveal className="mt-14">
          <section id="certificates">
          <SectionTitle
            eyebrow={t("Crédibilité", "Credentials")}
            title={t("Certifications & apprentissages", "Certificates & learning")}
          />

          <Card className="p-6">
            <div className="flex flex-wrap gap-2">
              {certificates.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm"
                >
                  {c}
                </span>
              ))}
            </div>
          </Card>
          </section>
        </Reveal>

        {/* Contact */}
        <Reveal className="mt-14 pb-16">
          <section id="contact">
          <SectionTitle
            eyebrow={t("Contact", "Contact")}
            title={t("Construisons quelque chose de solide", "Let’s build something solid")}
            description={t(
              "Si tu recrutes un fullstack Python/Django avec une vraie sensibilité sécurité et DevOps : je suis partant.",
              "If you’re hiring a Python/Django fullstack engineer with strong security and DevOps awareness: let’s talk.",
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
                    href: "tel:+2290162094057",
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
                  {t("Pour un poste Fullstack Django", "For a Fullstack Django role")}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {t(
                    "Je peux t’aider à livrer vite sans casser la qualité : API Django clean (auth/permissions), front Next.js, logs/monitoring, Docker/CI/CD — et je garde la sécurité en tête (OWASP, durcissement, détection).",
                    "I can help you ship fast without sacrificing quality: clean Django APIs (auth/permissions), Next.js front-end, logging/monitoring, Docker/CI/CD — with security in mind (OWASP, hardening, detection).",
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
                  <span className="font-semibold text-slate-950">+229 01 62 09 40 57</span>
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
