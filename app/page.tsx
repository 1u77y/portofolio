/* eslint-disable jsx-a11y/no-autofocus */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Language = "en" | "fr";

type CommandId =
  | "whoami"
  | "skills"
  | "experience"
  | "projects"
  | "achievements"
  | "contact"
  | "help"
  | "ls"
  | "history"
  | "clear"
  | "pwd"
  | "about"
  | "unknown";

type HistoryEntry = {
  id: number;
  input: string;
  commandId: CommandId;
  output: React.ReactNode;
  isError?: boolean;
};

type CommandDefinition = {
  name: string;
  description: string;
  aliases?: string[];
};

const COMMANDS: CommandDefinition[] = [
  {
    name: "whoami",
    description: "Show profile summary",
  },
  {
    name: "skills --list",
    description: "List technical skills",
    aliases: ["skills"],
  },
  {
    name: "experience --timeline",
    description: "Show professional experience timeline",
    aliases: ["experience"],
  },
  {
    name: "projects --featured",
    description: "Display featured projects",
    aliases: ["projects"],
  },
  {
    name: "achievements",
    description: "Show shipped production projects with links",
  },
  {
    name: "cat about.txt",
    description: "Short bio",
    aliases: ["about"],
  },
  {
    name: "contact --open",
    description: "Contact information",
    aliases: ["contact"],
  },
  {
    name: "ls",
    description: "List files in the current directory",
  },
  {
    name: "ls projects",
    description: "List projects directory",
  },
  {
    name: "help",
    description: "Show available commands",
  },
  {
    name: "history",
    description: "Show previous commands",
  },
  {
    name: "pwd",
    description: "Print working directory",
  },
  {
    name: "clear",
    description: "Clear the terminal",
  },
];

const PROMPT_USER = "soultone-wassi";
const PROMPT_HOST = "portfolio";
const PROMPT_PATH = "~/workspace";

function WhoAmIOutput() {
  return (
    <div className="space-y-1">
      <img src="/photo.jpg" alt="Wassi Soultone" className="object-cover rounded-full mb-8 w-[14rem] h-[14rem]" />
      <p>
        Name: <span className="font-semibold">WASSI Soultone</span>
      </p>
      <p>
        Role:{" "}
        <span className="font-semibold">
          Senior Web Developer · Frontend & Fullstack
        </span>
      </p>
      <p>
        Experience:{" "}
        <span className="font-semibold">
          ~4+ years
        </span>{" "}
        designing and building web applications end‑to‑end.
      </p>
      <p>
        Focus: modern web applications with React, Next.js and Node.js – from clean UI/UX
        to API integration, performance and deployment.
      </p>
      <p>
        Location: <span className="font-semibold">Benin</span> · Email:{" "}
        <a
          href="mailto:wassisoultone1@gmail.com"
          className="text-sky-400 underline decoration-dotted underline-offset-4 hover:text-sky-300"
        >
          wassisoultone1@gmail.com
        </a>
      </p>
    </div>
  );
}

function SkillsOutput({ language }: { language: Language }) {
  return (
    <div className="space-y-2">
      <p className="text-slate-300">Frontend</p>
      <ul className="ml-4 list-disc space-y-0.5 text-slate-200">
        <li>React, Next.js, Vue.js</li>
        <li>TypeScript, JavaScript (ES6+)</li>
        <li>Tailwind CSS, CSS Modules, modern UI libraries</li>
        <li>
          {language === "en"
            ? "Integration of REST APIs and real-time WebSocket updates"
            : "Intégration d’API REST et mises à jour en temps réel via WebSocket"}
        </li>
      </ul>
      <p className="mt-3 text-slate-300">Backend &amp; APIs</p>
      <ul className="ml-4 list-disc space-y-0.5 text-slate-200">
        <li>Node.js (Express), PHP (Laravel), Python (Flask)</li>
        <li>
          {language === "en"
            ? "REST API design, integration & testing"
            : "Conception, intégration et tests d’API REST"}
        </li>
        <li>
          {language === "en"
            ? "Authentication & authorization, secure data flows"
            : "Authentification, autorisation et flux de données sécurisés"}
        </li>
        <li>
          {language === "en"
            ? "Automation and scripting with Bash & PowerShell"
            : "Automatisation et scripting avec Bash & PowerShell"}
        </li>
      </ul>
      <p className="mt-3 text-slate-300">
        {language === "en" ? "Tooling & Quality" : "Outils & Qualité"}
      </p>
      <ul className="ml-4 list-disc space-y-0.5 text-slate-200">
        <li>Git, CI/CD pipelines, Docker</li>
        <li>
          {language === "en"
            ? "Infrastructure as Code with Ansible"
            : "Infrastructure as Code avec Ansible"}
        </li>
        <li>
          {language === "en"
            ? "ESLint, Prettier, clean and maintainable code practices"
            : "ESLint, Prettier et pratiques de code propre et maintenable"}
        </li>
      </ul>
      <p className="mt-3 text-slate-300">
        {language === "en" ? "Reliability & Maintainability" : "Fiabilité & Maintenabilité"}
      </p>
      <ul className="ml-4 list-disc space-y-0.5 text-slate-200">
        <li>
          {language === "en"
            ? "Robust error handling and resilient frontends that degrade gracefully"
            : "Gestion robuste des erreurs et interfaces résilientes qui se dégradent proprement"}
        </li>
        <li>
          {language === "en"
            ? "Monitoring of frontend performance and user experience"
            : "Suivi des performances front et de l’expérience utilisateur"}
        </li>
        <li>
          {language === "en"
            ? "Clean architecture, reusable components and clear coding standards"
            : "Architecture propre, composants réutilisables et standards de code clairs"}
        </li>
      </ul>
    </div>
  );
}

function ExperienceOutput({ language }: { language: Language }) {
  if (language === "en") {
    return (
      <div className="space-y-3">
        <div>
          <p className="font-semibold text-slate-100">
            2023 — 2024 · Fullstack Developer · Faseya
          </p>
          <p className="text-slate-300">
            Technical lead on <span className="font-semibold">Yatouze</span>, an enterprise
            management platform: architecture design, tech stack choices, CI/CD pipelines and
            Docker-based deployments, plus redesign and development of{" "}
            <span className="font-semibold">faseya.com</span>.
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-100">
            2021 — 2022 · JavaScript SDK Developer · PayPlus
          </p>
          <p className="text-slate-300">
            Designed and developed the <span className="font-semibold">PayPlusWeb</span> SDK in
            vanilla JavaScript with a modular architecture, dynamic client-side validation and
            real-time payment notifications over WebSocket.
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-100">
            2021 — 2022 · Frontend Developer (React) · ReselForm
          </p>
          <p className="text-slate-300">
            Turned Figma/Adobe XD mockups into interactive, responsive React interfaces, optimized
            performance and collaborated closely with design and backend teams.
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-100">
            2020 — 2021 · JavaScript &amp; WordPress Developer · ICT Consulting
          </p>
          <p className="text-slate-300">
            Built and customized WordPress sites with Elementor, added dynamic JavaScript
            features, and focused on performance improvements and technical SEO.
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-100">
            2018 — 2019 · Frontend Developer (Vue.js) · Global Optim
          </p>
          <p className="text-slate-300">
            Developed responsive UI/UX with Vue.js for apps related to financial transactions and
            blockchain, including reusable components and secure REST API consumption.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="font-semibold text-slate-100">
          2023 — 2024 · Développeur Fullstack · Faseya
        </p>
        <p className="text-slate-300">
          Technical lead sur <span className="font-semibold">Yatouze</span>, une plateforme de
          gestion d&apos;entreprise : conception de l’architecture, choix technologiques, mise en
          place de pipelines CI/CD et déploiements Docker, ainsi que la refonte et le
          développement du site <span className="font-semibold">faseya.com</span>.
        </p>
      </div>
      <div>
        <p className="font-semibold text-slate-100">
          2021 — 2022 · Développeur SDK JavaScript · PayPlus
        </p>
        <p className="text-slate-300">
          Conception et développement du SDK{" "}
          <span className="font-semibold">PayPlusWeb</span> en JavaScript Vanilla avec une
          architecture modulaire, validation dynamique côté client et notifications de paiement en
          temps réel via WebSocket.
        </p>
      </div>
      <div>
        <p className="font-semibold text-slate-100">
          2021 — 2022 · Développeur Frontend (React) · ReselForm
        </p>
        <p className="text-slate-300">
          Intégration de maquettes Figma/Adobe XD en interfaces React interactives et responsives,
          optimisation des performances et collaboration étroite avec les équipes design et
          backend.
        </p>
      </div>
      <div>
        <p className="font-semibold text-slate-100">
          2020 — 2021 · Développeur JavaScript &amp; WordPress · ICT Consulting
        </p>
        <p className="text-slate-300">
          Création et personnalisation de sites WordPress avec Elementor, ajout de
          fonctionnalités dynamiques en JavaScript, maintenance évolutive et amélioration des
          performances et du SEO technique.
        </p>
      </div>
      <div>
        <p className="font-semibold text-slate-100">
          2018 — 2019 · Développeur Frontend (Vue.js) · Global Optim
        </p>
        <p className="text-slate-300">
          Intégration UI/UX responsive avec Vue.js pour des applications liées aux transactions
          financières et à la blockchain, conception de composants réutilisables et consommation
          sécurisée d&apos;API REST.
        </p>
      </div>
    </div>
  );
}

function ProjectsOutput({ language }: { language: Language }) {
  if (language === "en") {
    return (
      <div className="space-y-3">
        <div>
          <p className="font-semibold text-slate-100">erugis.net</p>
          <p className="text-slate-300">
            Showcase website for a cybersecurity company, with a modern, fast and clear front‑end.
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-100">app.gobiworld.com</p>
          <p className="text-slate-300">
            Blockchain-based financial transactions platform with rich dashboards and custom UI
            components.
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-100">wall-of-share.com</p>
          <p className="text-slate-300">
            Freelancing platform connecting companies and freelancers with profile management,
            projects and online interactions.
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-100">faseya.com</p>
          <p className="text-slate-300">
            Modernized corporate website to present company services with a responsive design and
            special attention to UX/UI.
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-100">yatouze.com</p>
          <p className="text-slate-300">
            Enterprise management platform led as Technical Lead: business modules, dashboards and
            integrations with external services.
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-100">
            todo-4mbo.onrender.com (Todo App)
          </p>
          <p className="text-slate-300">
            Task management app built with Vue.js, TypeScript and Supabase, showcasing a modern
            fullstack approach (reactive frontend + backend as a service).
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-100">
            Functional Testing Platform for REST APIs
          </p>
          <p className="text-slate-300">
            Tool for running automated functional tests on REST APIs with fuzzing and advanced
            scenarios, built with a strong focus on developer experience.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="font-semibold text-slate-100">erugis.net</p>
        <p className="text-slate-300">
          Site vitrine pour une entreprise de cybersécurité, avec un accent sur la clarté des
          messages, la performance et une présentation professionnelle des services.
        </p>
      </div>
      <div>
        <p className="font-semibold text-slate-100">app.gobiworld.com</p>
        <p className="text-slate-300">
          Plateforme de transactions financières blockchain : intégration d&apos;API, gestion
          sécurisée des flux de données et interfaces orientées finance.
        </p>
      </div>
      <div>
        <p className="font-semibold text-slate-100">wall-of-share.com</p>
        <p className="text-slate-300">
          Plateforme de freelancing permettant de connecter entreprises et freelances, avec
          gestion de profils, missions et interactions en ligne.
        </p>
      </div>
      <div>
        <p className="font-semibold text-slate-100">faseya.com</p>
        <p className="text-slate-300">
          Site vitrine modernisé pour présenter les services de l&apos;entreprise, avec un
          design responsive et une attention particulière à l&apos;UX/UI.
        </p>
      </div>
      <div>
        <p className="font-semibold text-slate-100">yatouze.com</p>
        <p className="text-slate-300">
          Plateforme de gestion d&apos;entreprise pilotée en tant que Technical Lead : modules
          métier, tableaux de bord et intégration avec des services externes.
        </p>
      </div>
      <div>
        <p className="font-semibold text-slate-100">
          todo-4mbo.onrender.com (Todo App)
        </p>
        <p className="text-slate-300">
          Application de gestion de tâches construite avec Vue.js, TypeScript et Supabase,
          illustrant une approche moderne fullstack (frontend réactif + backend as a service).
        </p>
      </div>
      <div>
        <p className="font-semibold text-slate-100">
          Plateforme de Test Fonctionnel des API REST
        </p>
        <p className="text-slate-300">
          Outil de tests fonctionnels pour APIs REST intégrant fuzzing et scénarios avancés, avec
          une forte attention portée à l’expérience développeur.
        </p>
      </div>
    </div>
  );
}

function AchievementsOutput({ language }: { language: Language }) {
  return (
    <div className="space-y-2">
      <p className="text-slate-300">
        {language === "en"
          ? "Some production websites and platforms I have worked on:"
          : "Quelques sites et plateformes en production sur lesquels j’ai travaillé :"}
      </p>
      <ul className="ml-4 list-disc space-y-1 text-sky-400">
        <li>
          <a
            href="https://erugis.net/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-300 underline decoration-dotted underline-offset-4"
          >
            erugis.net
          </a>{" "}
          <span className="text-slate-400">
            —{" "}
            {language === "en"
              ? "Corporate website for a cybersecurity company (front‑end and UX work)"
              : "Site vitrine d’une entreprise de cybersécurité (travail front‑end et UX)"}
          </span>
        </li>
        <li>
          <a
            href="https://app.gobiworld.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-300 underline decoration-dotted underline-offset-4"
          >
            app.gobiworld.com
          </a>{" "}
          <span className="text-slate-400">
            —{" "}
            {language === "en"
              ? "Blockchain financial transactions platform"
              : "Plateforme de transactions financières blockchain"}
          </span>
        </li>
        <li>
          <a
            href="https://predilib.fr/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-300 underline decoration-dotted underline-offset-4"
          >
            predilib.fr
          </a>{" "}
          <span className="text-slate-400">
            —{" "}
            {language === "en"
              ? "Platform in the publishing / education space"
              : "Plateforme dans l’univers édition / éducation"}
          </span>
        </li>
        <li>
          <a
            href="https://wall-of-share.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-300 underline decoration-dotted underline-offset-4"
          >
            wall-of-share.com
          </a>{" "}
          <span className="text-slate-400">
            —{" "}
            {language === "en"
              ? "Freelancing marketplace"
              : "Plateforme de freelancing"}
          </span>
        </li>
        <li>
          <a
            href="https://faseya.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-300 underline decoration-dotted underline-offset-4"
          >
            faseya.com
          </a>{" "}
          <span className="text-slate-400">
            —{" "}
            {language === "en"
              ? "Corporate site for Faseya"
              : "Site vitrine de l’entreprise Faseya"}
          </span>
        </li>
        <li>
          <a
            href="https://yatouze.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-300 underline decoration-dotted underline-offset-4"
          >
            yatouze.com
          </a>{" "}
          <span className="text-slate-400">
            —{" "}
            {language === "en"
              ? "Enterprise management platform"
              : "Plateforme de gestion d’entreprise"}
          </span>
        </li>
      </ul>
    </div>
  );
}

function ContactOutput({ language }: { language: Language }) {
  return (
    <div className="space-y-1">
      <p>
        {language === "en" ? "Email" : "E-mail"}:{" "}
        <a
          href="mailto:wassisoultone1@gmail.com"
          className="text-sky-400 underline decoration-dotted underline-offset-4 hover:text-sky-300"
        >
          wassisoultone1@gmail.com
        </a>
      </p>
      <p>
        {language === "en" ? "Phone" : "Téléphone"}:{" "}
        <span className="font-semibold">+229 01 62 09 40 57</span>
      </p>
      <p>{language === "en" ? "Location: Benin" : "Localisation : Bénin"}</p>
    </div>
  );
}

function AboutOutput({ language }: { language: Language }) {
  if (language === "en") {
    return (
      <div className="space-y-1">
        <p>
          I&apos;m a web developer focused on building modern, responsive applications with
          React, Vue, Next.js and Node.js.
        </p>
        <p>
          I enjoy turning product ideas into polished user interfaces, integrating APIs, and
          setting up the tooling (CI/CD, code quality, deployment) needed for reliable web apps.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <p>
        Je suis développeur web, spécialisé dans la création d&apos;applications modernes et
        responsives avec React, Vue, Next.js et Node.js.
      </p>
      <p>
        J&apos;aime transformer des idées produit en interfaces finies, intégrer des APIs et
        mettre en place l&apos;outillage (CI/CD, qualité de code, déploiement) nécessaire à des
        applications web fiables.
      </p>
    </div>
  );
}

function HelpOutput({ language }: { language: Language }) {
  return (
    <div className="space-y-1">
      <p className="text-slate-200">
        {language === "en" ? "Available commands:" : "Commandes disponibles :"}
      </p>
      <ul className="ml-4 list-disc space-y-0.5 text-slate-300">
        <li>
          <span className="token-keyword">whoami</span> —{" "}
          {language === "en"
            ? "Show profile summary"
            : "Afficher le résumé du profil"}
        </li>
        <li>
          <span className="token-keyword">skills --list</span> —{" "}
          {language === "en"
            ? "List technical skills"
            : "Lister les compétences techniques"}
        </li>
        <li>
          <span className="token-keyword">experience --timeline</span> —{" "}
          {language === "en"
            ? "Show professional timeline"
            : "Afficher le parcours professionnel"}
        </li>
        <li>
          <span className="token-keyword">projects --featured</span> —{" "}
          {language === "en"
            ? "Display featured projects"
            : "Afficher les projets phares"}
        </li>
        <li>
          <span className="token-keyword">achievements</span> —{" "}
          {language === "en"
            ? "Show shipped production projects with links"
            : "Afficher les projets en production avec les liens"}
        </li>
        <li>
          <span className="token-keyword">cat about.txt</span> —{" "}
          {language === "en" ? "Short bio" : "Courte biographie"}
        </li>
        <li>
          <span className="token-keyword">contact --open</span> —{" "}
          {language === "en"
            ? "Contact information"
            : "Informations de contact"}
        </li>
        <li>
          <span className="token-keyword">ls</span>,{" "}
          <span className="token-keyword">ls projects</span> —{" "}
          {language === "en"
            ? "Explore pseudo file system"
            : "Explorer le pseudo-système de fichiers"}
        </li>
        <li>
          <span className="token-keyword">history</span> —{" "}
          {language === "en"
            ? "Show previous commands"
            : "Afficher l’historique des commandes"}
        </li>
        <li>
          <span className="token-keyword">clear</span> —{" "}
          {language === "en"
            ? "Clear terminal output"
            : "Effacer la sortie du terminal"}
        </li>
      </ul>
    </div>
  );
}

function NotFoundOutput({
  command,
  language,
}: {
  command: string;
  language: Language;
}) {
  return (
    <p className="token-error">
      bash: {command}:{" "}
      {language === "en"
        ? "command not found. Try"
        : "commande introuvable. Essayez"}{" "}
      <span className="token-keyword">help</span>.
    </p>
  );
}

function LsOutput({ path }: { path?: string }) {
  if (path === "projects") {
    return (
      <p>
        erugis/ gobiworld/ predilib/ wall-of-share/ faseya/ yatouze/
      </p>
    );
  }

  return (
    <p>
      about.txt skills.json experience.log projects/ contact.md
    </p>
  );
}

function PwdOutput() {
  return <p>/home/dev/workspace</p>;
}

function TerminalPrompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="terminal-prompt shrink-0">
        {PROMPT_USER}@{PROMPT_HOST}
        <span className="text-slate-500">:</span>
        <span className="terminal-path">{PROMPT_PATH}</span>
        <span className="text-slate-500">$</span>
      </span>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function useAutofocus(ref: React.RefObject<HTMLInputElement | null>) {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [autocompleteIndex, setAutocompleteIndex] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useAutofocus(inputRef);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history.length]);

  const normalizedCommands = useMemo(
    () =>
      COMMANDS.flatMap((cmd) => {
        const base = [cmd.name];
        if (cmd.aliases) {
          base.push(...cmd.aliases);
        }
        return base;
      }),
    []
  );

  const suggestions = useMemo(() => {
    if (!input.trim()) return [];
    const value = input.toLowerCase();
    return normalizedCommands.filter((cmd) => cmd.toLowerCase().startsWith(value));
  }, [input, normalizedCommands]);

  const executeCommand = useCallback(
    (rawInput: string) => {
      const trimmed = rawInput.trim();

      if (!trimmed) {
        const id = Date.now();
        setHistory((prev) => [
          ...prev,
          {
            id,
            input: "",
            commandId: "unknown",
            output: null,
          },
        ]);
        return;
      }

      if (trimmed === "clear") {
        setHistory([]);
        return;
      }

      const [cmd, ...rest] = trimmed.split(" ");
      const args = rest.join(" ");
      const lower = cmd.toLowerCase();

      let commandId: CommandId = "unknown";
      let output: React.ReactNode = null;
      let isError = false;

      if (lower === "whoami") {
        commandId = "whoami";
        output = <WhoAmIOutput />;
      } else if (lower === "skills") {
        commandId = "skills";
        output = <SkillsOutput language={language} />;
      } else if (lower === "experience") {
        commandId = "experience";
        output = <ExperienceOutput language={language} />;
      } else if (lower === "projects") {
        commandId = "projects";
        output = <ProjectsOutput language={language} />;
      } else if (lower === "achievements") {
        commandId = "achievements";
        output = <AchievementsOutput language={language} />;
      } else if (lower === "contact") {
        commandId = "contact";
        output = <ContactOutput language={language} />;
      } else if (lower === "cat") {
        if (args === "about.txt") {
          commandId = "about";
          output = <AboutOutput language={language} />;
        } else {
          commandId = "unknown";
          isError = true;
          output = (
            <NotFoundOutput command={trimmed} language={language} />
          );
        }
      } else if (lower === "help") {
        commandId = "help";
        output = <HelpOutput language={language} />;
      } else if (lower === "ls") {
        commandId = "ls";
        const path = args.trim();
        output = <LsOutput path={path} />;
      } else if (lower === "pwd") {
        commandId = "pwd";
        output = <PwdOutput />;
      } else if (lower === "history") {
        commandId = "history";
        output = (
          <div className="space-y-0.5 text-slate-300">
            {commandLog.length === 0 && (
              <p>
                {language === "en"
                  ? "No previous commands."
                  : "Aucune commande précédente."}
              </p>
            )}
            {commandLog.map((c, idx) => (
              <p key={`${c}-${idx}`}>
                {idx + 1} {c}
              </p>
            ))}
          </div>
        );
      } else {
        commandId = "unknown";
        isError = true;
        output = <NotFoundOutput command={cmd} language={language} />;
      }

      const id = Date.now();
      setHistory((prev) => [
        ...prev,
        {
          id,
          input: trimmed,
          commandId,
          output,
          isError,
        },
      ]);
    },
    [commandLog, language]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (isProcessing) return;

      const value = input;
      setIsProcessing(true);
      setCommandLog((prev) => [...prev, value]);
      setHistoryIndex(null);
      setAutocompleteIndex(null);

      executeCommand(value);
      setInput("");
      setIsProcessing(false);
    },
    [executeCommand, input, isProcessing]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (commandLog.length === 0) return;

        setHistoryIndex((prev) => {
          const nextIndex =
            prev === null ? commandLog.length - 1 : Math.max(0, prev - 1);
          setInput(commandLog[nextIndex] ?? "");
          return nextIndex;
        });
        setAutocompleteIndex(null);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (commandLog.length === 0) return;

        setHistoryIndex((prev) => {
          if (prev === null) {
            return null;
          }
          const nextIndex = prev + 1;
          if (nextIndex >= commandLog.length) {
            setInput("");
            return null;
          }
          setInput(commandLog[nextIndex] ?? "");
          return nextIndex;
        });
        setAutocompleteIndex(null);
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        if (suggestions.length === 0) return;

        setAutocompleteIndex((prev) => {
          const nextIndex =
            prev === null
              ? 0
              : (prev + 1) % suggestions.length;
          const value = suggestions[nextIndex] ?? suggestions[0];
          setInput(value);
          return nextIndex;
        });
        return;
      }

      if (event.key === "Escape") {
        setAutocompleteIndex(null);
        return;
      }

      if (event.ctrlKey && (event.key === "l" || event.key === "L")) {
        event.preventDefault();
        setHistory([]);
        return;
      }
    },
    [commandLog, suggestions.length]
  );

  return (
    <main className="flex min-h-screen w-full terminal-bg px-0 py-0 text-slate-100">
      <section
        className="terminal-window flex min-h-screen w-full flex-col overflow-hidden"
        role="region"
        aria-label="Developer portfolio terminal"
      >
        <header className="terminal-header flex items-center justify-between px-4 py-2 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="terminal-header-buttons flex items-center gap-1.5">
              <span />
              <span />
              <span />
            </div>
            <p className="text-[11px] text-slate-400 text-white">
              {PROMPT_USER}@{PROMPT_HOST}: {PROMPT_PATH} 
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden text-[11px] text-slate-500 sm:block text-white">
              React + TypeScript · Next.js
            </p>
            <div className="flex items-center gap-1 rounded border border-slate-700/70 bg-slate-900/60 p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded ${
                  language === "en"
                    ? "bg-sky-600 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("fr")}
                className={`px-2 py-0.5 rounded ${
                  language === "fr"
                    ? "bg-sky-600 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                FR
              </button>
            </div>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="terminal-body flex-1 overflow-y-auto px-4 py-3 text-sm"
        >
          <div className="mb-3 text-xs text-slate-500">
            {language === "en" ? (
              <>
                Type <span className="token-keyword">help</span> to see available commands.
              </>
            ) : (
              <>
                Tapez <span className="token-keyword">help</span> pour voir les commandes
                disponibles.
              </>
            )}
          </div>

          <div className="space-y-2">
            {history.map((entry) => (
              <div key={entry.id} className="space-y-1">
                <TerminalPrompt>
                  <span className="terminal-command break-words">
                    {entry.input}
                  </span>
                </TerminalPrompt>
                {entry.output && (
                  <div className="pl-[calc(1.2rem+3ch)] text-slate-200">
                    {entry.output}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-3 flex items-center gap-2"
            aria-label="Terminal command form"
          >
            <span className="terminal-prompt shrink-0">
              {PROMPT_USER}@{PROMPT_HOST}
              <span className="text-slate-500">:</span>
              <span className="terminal-path">{PROMPT_PATH}</span>
              <span className="text-slate-500">$</span>
            </span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  setHistoryIndex(null);
                  setAutocompleteIndex(null);
                }}
                onKeyDown={handleKeyDown}
                className="terminal-input-field w-full border-none bg-transparent"
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="none"
                aria-label="Terminal command input"
                autoFocus
              />
              

              {suggestions.length > 0 && (
                <div className="autocomplete-panel absolute left-0 top-7 z-10 w-72 overflow-hidden text-xs text-slate-200 shadow-lg">
                  <div className="border-b border-slate-700/80 px-3 py-1.5 text-[10px] uppercase tracking-wide text-slate-500">
                    Suggestions
                  </div>
                  <ul className="max-h-40 overflow-y-auto py-1">
                    {suggestions.map((s, index) => (
                      <li
                        key={s}
                        className={`cursor-default px-3 py-1.5 ${
                          index === autocompleteIndex
                            ? "autocomplete-item-active"
                            : "hover:bg-slate-800/90"
                        }`}
                      >
                        <span className="token-keyword">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
