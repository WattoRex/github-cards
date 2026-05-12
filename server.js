import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONFIG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

const token = process.env.GITHUB_TOKEN;

if (!token) {
  console.error("❌ GITHUB_TOKEN is missing. Please set it in your .env file.");
  process.exit(1);
}

const headers = {
  Authorization: `token ${token}`,
  Accept: "application/vnd.github+json",
};

async function fetchAvatarBase64(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers,
    });
    const mime = response.headers["content-type"] || "image/png";
    const b64 = Buffer.from(response.data).toString("base64");
    return `data:${mime};base64,${b64}`;
  } catch {
    return null;
  }
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COLORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

const colors = {
  // Web
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Sass: "#a53b70",
  Less: "#1d365d",
  CoffeeScript: "#244776",
  LiveScript: "#499886",
  WebAssembly: "#04133b",
  Handlebars: "#f7931e",
  Pug: "#a86454",
  EJS: "#a91e50",
  Liquid: "#67b8de",
  Twig: "#c1d026",
  Mustache: "#724b3b",
  Nunjucks: "#3d8137",
  Svelte: "#ff3e00",
  Vue: "#41b883",
  Astro: "#ff5a03",
  // Systems & Low-level
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Rust: "#dea584",
  Go: "#00ADD8",
  Zig: "#ec915c",
  Nim: "#ffc200",
  D: "#ba595e",
  Odin: "#60affe",
  Carbon: "#1c1c1c",
  Vala: "#fbe5cd",
  Ada: "#02f88c",
  Pascal: "#e3f171",
  Fortran: "#4d41b1",
  COBOL: "#005ca5",
  Assembly: "#6e4c13",
  NASM: "#6e4c13",
  // JVM & CLR
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Scala: "#c22d40",
  Groovy: "#4298b8",
  Clojure: "#db5855",
  "F#": "#b845fc",
  "Visual Basic .NET": "#945db7",
  "Visual Basic": "#945db7",
  // Scripting & Dynamic
  Python: "#3572A5",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Perl: "#0298c3",
  Perl6: "#0000fb",
  Raku: "#0000fb",
  Lua: "#000080",
  Tcl: "#e4cc98",
  Groovy: "#4298b8",
  Elixir: "#6e4a7e",
  Erlang: "#B83998",
  "Emacs Lisp": "#c065db",
  "Common Lisp": "#3fb68b",
  Scheme: "#1e4aec",
  Racket: "#3c5caa",
  Clojure: "#db5855",
  // Shell & Config
  Shell: "#89e051",
  Bash: "#89e051",
  PowerShell: "#012456",
  Dockerfile: "#384d54",
  Makefile: "#427819",
  CMake: "#DA3434",
  Nix: "#7e7eff",
  HCL: "#844FBA",
  Terraform: "#7B42BC",
  Puppet: "#302B6D",
  Ansible: "#000000",
  // Functional
  Haskell: "#5e5086",
  OCaml: "#3be133",
  "Standard ML": "#dc566d",
  Elm: "#60B5CC",
  PureScript: "#1D222D",
  Idris: "#b30000",
  Agda: "#315665",
  Coq: "#d0b68c",
  "F*": "#572e30",
  // Mobile
  Swift: "#F05138",
  Dart: "#00B4AB",
  "Objective-C": "#438eff",
  "Objective-C++": "#6866fb",
  // Data & ML
  R: "#198CE7",
  Julia: "#a270ba",
  MATLAB: "#e16737",
  "Jupyter Notebook": "#DA5B0B",
  Stan: "#b2011d",
  // Query & Data
  SQL: "#e38c00",
  PLSQL: "#dad8d8",
  PLpgSQL: "#336790",
  HiveQL: "#dce200",
  SPARQL: "#0C4597",
  GraphQL: "#e10098",
  // Systems scripting
  Awk: "#c30e9b",
  Sed: "#64b970",
  // Markup & Docs
  Markdown: "#083fa1",
  reStructuredText: "#141414",
  AsciiDoc: "#73a0c5",
  LaTeX: "#3D6117",
  TeX: "#3D6117",
  // Game & Graphics
  GDScript: "#355570",
  "Game Maker Language": "#71b417",
  GLSL: "#5686a5",
  HLSL: "#aace60",
  ShaderLab: "#222c37",
  // Other notable
  Solidity: "#AA6746",
  Move: "#4a137a",
  Vyper: "#1e1e1e",
  Cairo: "#ff6600",
  Apex: "#1797c0",
  ABAP: "#E8274B",
  AutoHotkey: "#6594b9",
  AutoIt: "#1C3552",
  Gherkin: "#5B2063",
  Cucumber: "#5B2063",
  Smalltalk: "#596706",
  Prolog: "#74283c",
  Mercury: "#ff2b2b",
  Haxe: "#df7900",
  ActionScript: "#882B0F",
  "Visual Basic 6.0": "#945db7",
  VHDL: "#adb2cb",
  Verilog: "#b2b7f8",
  SystemVerilog: "#DAE1C2",
  Mermaid: "#ff3670",
  Lean: "#ffffff",
  "Lean 4": "#ffffff",
  Crystal: "#000100",
  Ceylon: "#dfa535",
  Red: "#f50000",
  Rebol: "#358a5b",
  Forth: "#341708",
  Io: "#a9188d",
  Ioke: "#078193",
  Factor: "#636746",
  Fancy: "#7b9db4",
  Fantom: "#14253c",
  Golo: "#88562A",
  Gosu: "#82937f",
  Hack: "#878787",
  Harbour: "#0e60e3",
  Hy: "#7790B2",
  Nit: "#009917",
  Nu: "#c9df40",
  Pike: "#005390",
  Pony: "#A8497A",
  Reason: "#ff5847",
  Ring: "#2D54CB",
  Seed7: "#2d628b",
  Whiley: "#003952",
  XC: "#99DA07",
  xBase: "#403a40",
  ZAP: "#0d665e",
  ZIL: "#dc75e5",
};

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THEMES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

const themes = {
  dark: {
    bg: "#0d1117",
    card: "#161b22",
    border: "#30363d",
    text: "#e6edf3",
    subtext: "#8b949e",
    bar_bg: "#21262d",
  },
  light: {
    bg: "#ffffff",
    card: "#f6f8fa",
    border: "#d0d7de",
    text: "#1f2328",
    subtext: "#656d76",
    bar_bg: "#eaeef2",
  },
  neon: {
    bg: "#141321",
    card: "#1e1b38",
    border: "#fe428e",
    text: "#ffffff",
    subtext: "#a9fef7",
    bar_bg: "#2e2a52",
  },
  night: {
    bg: "#1a1b27",
    card: "#24283b",
    border: "#414868",
    text: "#c0caf5",
    subtext: "#7aa2f7",
    bar_bg: "#2f3549",
  },
  purple: {
    bg: "#282a36",
    card: "#343746",
    border: "#6272a4",
    text: "#f8f8f2",
    subtext: "#bd93f9",
    bar_bg: "#44475a",
  },
  forest: {
    bg: "#272822",
    card: "#3e3d32",
    border: "#75715e",
    text: "#f8f8f2",
    subtext: "#a6e22e",
    bar_bg: "#49483e",
  },
  nord: {
    bg: "#2e3440",
    card: "#3b4252",
    border: "#4c566a",
    text: "#eceff4",
    subtext: "#88c0d0",
    bar_bg: "#434c5e",
  },
  catppuccin: {
    bg: "#1e1e2e",
    card: "#313244",
    border: "#585b70",
    text: "#cdd6f4",
    subtext: "#89b4fa",
    bar_bg: "#45475a",
  },
};

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LOCALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

const locales = {
  en: {
    title: "Most Used Languages",
    repos: "repos",
    languages: "languages",
  },
  fr: {
    title: "Langages les plus utilisés",
    repos: "dépôts",
    languages: "langages",
  },
  de: {
    title: "Meist verwendete Sprachen",
    repos: "Repos",
    languages: "Sprachen",
  },
  es: {
    title: "Lenguajes más usados",
    repos: "repositorios",
    languages: "lenguajes",
  },
  pt: {
    title: "Linguagens mais usadas",
    repos: "repositórios",
    languages: "linguagens",
  },
  ja: {
    title: "使用言語",
    repos: "リポジトリ",
    languages: "言語",
  },
  zh: {
    title: "常用语言",
    repos: "仓库",
    languages: "语言",
  },
};

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SVG GENERATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

function generateSVG(username, avatar, languages, options = {}) {
  const {
    theme = "dark",
    locale = "en",
    show_icons = true,
    hide_border = false,
    compact = false,
    card_width = 500,
    custom_title,
    show_repo_count = false,
    repo_count = 0,
    show_avatar = true,
  } = options;

  const t = themes[theme] || themes.dark;
  const l = locales[locale] || locales.en;
  const title = custom_title || l.title;

  const PADDING = 30;
  const AVATAR_SIZE = 52;
  const PERCENT_LABEL_WIDTH = 52; // reserved space for "100.0%" label
  const GAP = 10; // gap between bar end and percent label
  const BAR_MAX_WIDTH =
    card_width - PADDING * 2 - 130 - PERCENT_LABEL_WIDTH - GAP;

  // Header height
  const HEADER_HEIGHT = 90;
  const ROW_HEIGHT = compact ? 28 : 38;
  const BODY_START = HEADER_HEIGHT + 20;

  const totalHeight = BODY_START + languages.length * ROW_HEIGHT + PADDING;

  const bars = languages
    .map(([lang, percent], i) => {
      const barWidth = Math.max(4, (percent / 100) * BAR_MAX_WIDTH);
      const color = colors[lang] || "#888888";
      const y = BODY_START + i * ROW_HEIGHT;
      const midY = y + ROW_HEIGHT / 2;

      const dot = show_icons
        ? `<circle cx="${PADDING}" cy="${midY}" r="5" fill="${color}"/>`
        : "";

      const labelX = show_icons ? PADDING + 14 : PADDING;

      return `
        ${dot}
        <text x="${labelX}" y="${midY + 4}" fill="${t.text}" font-size="${compact ? 11 : 12}" font-family="'Segoe UI', 'Ubuntu', sans-serif" font-weight="500">
          ${lang}
        </text>
        <rect x="${card_width - PADDING - PERCENT_LABEL_WIDTH - GAP - BAR_MAX_WIDTH}" y="${midY - 6}" width="${BAR_MAX_WIDTH}" height="10" rx="5" fill="${t.bar_bg}"/>
        <rect x="${card_width - PADDING - PERCENT_LABEL_WIDTH - GAP - BAR_MAX_WIDTH}" y="${midY - 6}" width="${barWidth}" height="10" rx="5" fill="${color}"/>
        <text x="${card_width - PADDING}" y="${midY + 4}" fill="${t.subtext}" font-size="${compact ? 10 : 11}" font-family="'Segoe UI', 'Ubuntu', sans-serif" text-anchor="end">
          ${percent.toFixed(1)}%
        </text>
      `;
    })
    .join("");

  const border = hide_border
    ? ""
    : `<rect width="${card_width}" height="${totalHeight}" rx="12" fill="none" stroke="${t.border}" stroke-width="1"/>`;

  const avatarBlock =
    show_avatar && avatar
      ? `
      <clipPath id="avatar-clip">
        <circle cx="${PADDING + AVATAR_SIZE / 2}" cy="34" r="${AVATAR_SIZE / 2}"/>
      </clipPath>
      <image href="${avatar}" x="${PADDING}" y="${34 - AVATAR_SIZE / 2}" width="${AVATAR_SIZE}" height="${AVATAR_SIZE}" clip-path="url(#avatar-clip)"/>
    `
      : "";

  const usernameX =
    show_avatar && avatar ? PADDING + AVATAR_SIZE + 12 : PADDING;
  const repoCountText = show_repo_count
    ? `<text x="${usernameX}" y="58" fill="${t.subtext}" font-size="11" font-family="'Segoe UI', 'Ubuntu', sans-serif">${repo_count} ${l.repos} · ${languages.length} ${l.languages}</text>`
    : `<text x="${usernameX}" y="58" fill="${t.subtext}" font-size="11" font-family="'Segoe UI', 'Ubuntu', sans-serif">${title}</text>`;

  return `
<svg width="${card_width}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="${card_width}" height="${totalHeight}" rx="12" fill="${t.bg}"/>
  ${border}
  ${avatarBlock}
  <text x="${usernameX}" y="40" fill="${t.text}" font-size="16" font-weight="600" font-family="'Segoe UI', 'Ubuntu', sans-serif">
    ${username}
  </text>
  ${repoCountText}
  <line x1="${PADDING}" y1="${HEADER_HEIGHT}" x2="${card_width - PADDING}" y2="${HEADER_HEIGHT}" stroke="${t.border}" stroke-width="1"/>
  ${bars}
</svg>`.trim();
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROUTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET /languages/:username

Query params:
  theme         dark | light | neon | night | purple | forest | nord | catppuccin
  locale        en | fr | de | es | pt | ja | zh
  private       true | false (default: false)
  forks         true | false (default: true)
  archived      true | false (default: false)
  exclude       repo1,repo2,...
  exclude_langs lang1,lang2,...
  count         number of languages to show (default: 8, max: 15)
  hide_border   true | false (default: false)
  show_icons    true | false (default: true)
  compact       true | false (default: false)
  card_width    number in px (default: 500)
  custom_title  string
  show_repo_count true | false (default: false)
  show_avatar   true | false (default: true)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

app.get("/languages/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Parse options
    const includePrivate = req.query.private === "true";
    const includeForks = req.query.forks !== "false";
    const includeArchived = req.query.archived === "true";
    const excludeRepos = req.query.exclude ? req.query.exclude.split(",") : [];
    const excludeLangs = req.query.exclude_langs
      ? req.query.exclude_langs.split(",")
      : [];
    const langCount = Math.min(parseInt(req.query.count) || 8, 15);
    const theme = req.query.theme || "dark";
    const locale = req.query.locale || "en";
    const hide_border = req.query.hide_border === "true";
    const show_icons = req.query.show_icons !== "false";
    const compact = req.query.compact === "true";
    const card_width = Math.max(
      300,
      Math.min(parseInt(req.query.card_width) || 500, 800),
    );
    const custom_title = req.query.custom_title || null;
    const show_repo_count = req.query.show_repo_count === "true";
    const show_avatar = req.query.show_avatar !== "false";

    // Validate theme
    if (!themes[theme]) {
      return res.status(400).json({
        error: true,
        message: `Unknown theme "${theme}". Available: ${Object.keys(themes).join(", ")}`,
      });
    }

    // Fetch user
    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`,
      { headers },
    );
    const avatar = userResponse.data.avatar_url;

    // Fetch repos
    let repos = [];

    const publicRepos = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers },
    );
    repos.push(...publicRepos.data);

    if (includePrivate) {
      const privateRepos = await axios.get(
        `https://api.github.com/user/repos?per_page=100&visibility=private`,
        { headers },
      );
      repos.push(
        ...privateRepos.data.filter(
          (r) => r.owner.login.toLowerCase() === username.toLowerCase(),
        ),
      );
    }

    // Apply filters
    repos = repos.filter((repo) => {
      if (!includeForks && repo.fork) return false;
      if (!includeArchived && repo.archived) return false;
      if (excludeRepos.includes(repo.name)) return false;
      return true;
    });

    // Aggregate languages
    const languageTotals = {};

    for (const repo of repos) {
      try {
        const langResponse = await axios.get(repo.languages_url, { headers });
        for (const [lang, bytes] of Object.entries(langResponse.data)) {
          if (!excludeLangs.includes(lang)) {
            languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
          }
        }
      } catch {
        continue;
      }
    }

    // Compute percentages
    const total = Object.values(languageTotals).reduce((a, b) => a + b, 0);

    const sorted = Object.entries(languageTotals)
      .map(([lang, bytes]) => [lang, (bytes / total) * 100])
      .sort((a, b) => b[1] - a[1])
      .slice(0, langCount);

    // Generate SVG
    const svg = generateSVG(username, avatar, sorted, {
      theme,
      locale,
      hide_border,
      show_icons,
      compact,
      card_width,
      custom_title,
      show_repo_count,
      repo_count: repos.length,
      show_avatar,
    });

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(svg);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      error: true,
      message: err.response?.data?.message || err.message,
    });
  }
});

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STATS SVG GENERATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

function computeGrade(
  stars,
  commits,
  prs,
  issues,
  contribs,
  gradeStyle = "letter",
) {
  const score =
    stars * 0.3 + commits * 0.35 + prs * 0.2 + issues * 0.1 + contribs * 0.05;

  if (gradeStyle === "rpg") {
    const tiers = [
      { threshold: 3000, label: "Legendary Architect", color: "#FFD700" },
      { threshold: 1500, label: "Master Engineer", color: "#c084fc" },
      { threshold: 700, label: "Senior Adventurer", color: "#818cf8" },
      { threshold: 300, label: "Experienced Coder", color: "#60a5fa" },
      { threshold: 150, label: "Apprentice Developer", color: "#34d399" },
      { threshold: 60, label: "Novice Scripter", color: "#4ade80" },
      { threshold: 20, label: "Initiate", color: "#facc15" },
      { threshold: 0, label: "Unranked Wanderer", color: "#f87171" },
    ];
    for (let i = 0; i < tiers.length; i++) {
      if (score >= tiers[i].threshold) {
        const current = tiers[i];
        const prev = tiers[i - 1] || null; // next rank (higher)
        const nextThreshold = prev ? prev.threshold : null;
        const currentThreshold = current.threshold;
        const progress = nextThreshold
          ? Math.min(
              1,
              (score - currentThreshold) / (nextThreshold - currentThreshold),
            )
          : 1;
        return {
          label: current.label,
          color: current.color,
          rpg: true,
          score,
          progress,
          nextLabel: prev ? prev.label : null,
          nextThreshold,
        };
      }
    }
  }

  // Default: letter grades
  const tiers = [
    { threshold: 3000, label: "S", color: "#FFD700" },
    { threshold: 1500, label: "A++", color: "#c084fc" },
    { threshold: 700, label: "A+", color: "#818cf8" },
    { threshold: 300, label: "A", color: "#60a5fa" },
    { threshold: 150, label: "B+", color: "#34d399" },
    { threshold: 60, label: "B", color: "#4ade80" },
    { threshold: 20, label: "C", color: "#facc15" },
    { threshold: 0, label: "D", color: "#f87171" },
  ];
  for (let i = 0; i < tiers.length; i++) {
    if (score >= tiers[i].threshold) {
      const current = tiers[i];
      const prev = tiers[i - 1] || null;
      const nextThreshold = prev ? prev.threshold : null;
      const currentThreshold = current.threshold;
      const progress = nextThreshold
        ? Math.min(
            1,
            (score - currentThreshold) / (nextThreshold - currentThreshold),
          )
        : 1;
      return {
        label: current.label,
        color: current.color,
        score,
        progress,
        nextLabel: prev ? prev.label : null,
        nextThreshold,
      };
    }
  }
}

function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

function hexPath(cx, cy, r) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  });
  return `M ${pts.join(" L ")} Z`;
}

function hexPerimeter(r) {
  return 6 * r; // perimeter of regular hexagon = 6 * side = 6 * r (flat-top)
}

// SVG icon paths (24x24 viewBox, centered at 0,0 — scaled via transform)
const statIcons = {
  stars: `<path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" fill="FILL" stroke="none"/>`,
  commits: `<path d="M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" fill="none" stroke="FILL" stroke-width="1.5" stroke-linecap="round"/>`,
  prs: `<path d="M18 3a3 3 0 0 1 .75 5.91V13a3 3 0 0 1-3 3H9.83a3 3 0 1 1 0-2H15.75a1 1 0 0 0 1-1V8.91A3 3 0 0 1 18 3zM6 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm12-13a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="FILL"/>`,
  issues: `<path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 12 7z" fill="FILL"/>`,
  contribs: `<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="FILL"/>`,
};

function generateStatsSVG(username, avatar, stats, options = {}) {
  const {
    theme = "dark",
    hide_border = false,
    show_avatar = true,
    custom_title,
    card_width = 480,
    grade_style = "letter",
  } = options;

  const t = themes[theme] || themes.dark;
  const { stars, commits, prs, issues, contribs } = stats;
  const grade = computeGrade(
    stars,
    commits,
    prs,
    issues,
    contribs,
    grade_style,
  );
  const title = custom_title || `${username}'s GitHub Stats`;

  // Layout constants — minimal row-based design
  const PAD = 24;
  const PROGRESS_BAR_H = grade.nextLabel ? 10 : 0; // extra space for progress bar (bar only, no text)
  const HEADER_H = 58 + PROGRESS_BAR_H;
  const DIVIDER_Y = HEADER_H + 4;
  const ROW_H = 34;
  const ROWS_TOP = DIVIDER_Y + 16;
  const AV = 36;

  const statRows = [
    { key: "stars", label: "Stars", value: formatNum(stars) },
    { key: "commits", label: "Commits", value: formatNum(commits) },
    { key: "prs", label: "Pull Requests", value: formatNum(prs) },
    { key: "issues", label: "Issues", value: formatNum(issues) },
    { key: "contribs", label: "Contributed to", value: formatNum(contribs) },
  ];

  // ── Grade badge ──────────────────────────────────────────────
  // RPG: pill whose width adapts to the title text
  // Letter: compact fixed-width pill (original look)

  let gradeBadge;
  // Badge is always anchored at y=18 (top area), independent of header growth
  const BADGE_FIXED_Y = 18;

  if (grade.rpg) {
    // Estimate text width: ~6.5px per char at font-size 10, plus 20px padding
    const textLen = grade.label.length;
    const BADGE_H = 20;
    const BADGE_W = Math.max(60, textLen * 6.5 + 20);
    const BADGE_X = card_width - PAD - BADGE_W;
    const BADGE_Y = BADGE_FIXED_Y;

    gradeBadge = `
    <rect x="${BADGE_X}" y="${BADGE_Y}" width="${BADGE_W}" height="${BADGE_H}" rx="5"
      fill="${grade.color}" opacity="0.13"/>
    <rect x="${BADGE_X}" y="${BADGE_Y}" width="${BADGE_W}" height="${BADGE_H}" rx="5"
      fill="none" stroke="${grade.color}" stroke-width="1" opacity="0.6"/>
    <text x="${BADGE_X + BADGE_W / 2}" y="${BADGE_Y + BADGE_H / 2 + 3.5}"
      font-size="9.5" font-weight="700" letter-spacing="0.3"
      font-family="'Segoe UI','Ubuntu',sans-serif"
      fill="${grade.color}" text-anchor="middle">${grade.label.toUpperCase()}</text>
  `;

    // Progress bar just below badge
    if (grade.nextLabel) {
      const BAR_Y = BADGE_Y + BADGE_H + 4;
      const BAR_W = BADGE_W;
      const FILL_W = Math.max(4, grade.progress * BAR_W);
      gradeBadge += `
    <rect x="${BADGE_X}" y="${BAR_Y}" width="${BAR_W}" height="4" rx="2" fill="${t.bar_bg}"/>
    <rect x="${BADGE_X}" y="${BAR_Y}" width="${FILL_W}" height="4" rx="2" fill="${grade.color}" opacity="0.85"/>
    `;
    }
  } else {
    const BADGE_W = 42;
    const BADGE_H = 22;
    const BADGE_X = card_width - PAD - BADGE_W;
    const BADGE_Y = BADGE_FIXED_Y;

    gradeBadge = `
    <rect x="${BADGE_X}" y="${BADGE_Y}" width="${BADGE_W}" height="${BADGE_H}" rx="6"
      fill="${grade.color}" opacity="0.12"/>
    <rect x="${BADGE_X}" y="${BADGE_Y}" width="${BADGE_W}" height="${BADGE_H}" rx="6"
      fill="none" stroke="${grade.color}" stroke-width="1" opacity="0.5"/>
    <text x="${BADGE_X + BADGE_W / 2}" y="${BADGE_Y + BADGE_H / 2 + 4.5}"
      font-size="${grade.label.length > 2 ? 10 : 12}" font-weight="700"
      font-family="'Segoe UI','Ubuntu',sans-serif"
      fill="${grade.color}" text-anchor="middle">${grade.label}</text>
  `;

    // Progress bar just below badge
    if (grade.nextLabel) {
      const BAR_Y = BADGE_Y + BADGE_H + 4;
      const BAR_W = BADGE_W;
      const FILL_W = Math.max(4, grade.progress * BAR_W);
      gradeBadge += `
    <rect x="${BADGE_X}" y="${BAR_Y}" width="${BAR_W}" height="4" rx="2" fill="${t.bar_bg}"/>
    <rect x="${BADGE_X}" y="${BAR_Y}" width="${FILL_W}" height="4" rx="2" fill="${grade.color}" opacity="0.85"/>
    `;
    }
  }

  // Total card height
  const CARD_H = ROWS_TOP + statRows.length * ROW_H + PAD;

  const border = hide_border
    ? ""
    : `<rect width="${card_width}" height="${CARD_H}" rx="12" fill="none" stroke="${t.border}" stroke-width="1"/>`;

  // Avatar — simple circle
  const avX = PAD;
  const avCX = avX + AV / 2;
  const avCY = HEADER_H / 2;

  const avatarBlock =
    show_avatar && avatar
      ? `
    <clipPath id="av-circle">
      <circle cx="${avCX}" cy="${avCY}" r="${AV / 2}"/>
    </clipPath>
    <circle cx="${avCX}" cy="${avCY}" r="${AV / 2}" fill="${t.card}" stroke="${t.border}" stroke-width="1"/>
    <image href="${avatar}" x="${avX}" y="${avCY - AV / 2}" width="${AV}" height="${AV}" clip-path="url(#av-circle)"/>
  `
      : "";

  const nameX = show_avatar && avatar ? avX + AV + 12 : PAD;

  // Stat rows — label left, value right, subtle separator
  const rowsSVG = statRows
    .map(({ key, label, value }, i) => {
      const y = ROWS_TOP + i * ROW_H;
      const midY = y + ROW_H / 2;
      const iconScale = 12 / 24;
      const iconSVG = (statIcons[key] || "").replace(/FILL/g, t.subtext);
      const iconBlock = `<g transform="translate(${PAD},${midY - 6}) scale(${iconScale})">${iconSVG}</g>`;
      const sep =
        i < statRows.length - 1
          ? `<line x1="${PAD}" y1="${y + ROW_H}" x2="${card_width - PAD}" y2="${y + ROW_H}" stroke="${t.border}" stroke-width="0.5" opacity="0.5"/>`
          : "";
      return `
      ${iconBlock}
      <text x="${PAD + 20}" y="${midY + 4}" font-size="12"
        font-family="'Segoe UI','Ubuntu',sans-serif" fill="${t.subtext}">${label}</text>
      <text x="${card_width - PAD}" y="${midY + 4}" font-size="12" font-weight="600"
        font-family="'Segoe UI','Ubuntu',sans-serif" fill="${t.text}" text-anchor="end">${value}</text>
      ${sep}
    `;
    })
    .join("");

  // Grade badge — rendered above
  const gradeBadgeSVG = gradeBadge;

  return `
<svg width="${card_width}" height="${CARD_H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

  <!-- Background -->
  <rect width="${card_width}" height="${CARD_H}" rx="12" fill="${t.bg}"/>
  ${border}

  <!-- Avatar -->
  ${avatarBlock}

  <!-- Username + subtitle -->
  <text x="${nameX}" y="${HEADER_H / 2 - 5}" font-size="14" font-weight="600"
    font-family="'Segoe UI','Ubuntu',sans-serif" fill="${t.text}">${username}</text>
  <text x="${nameX}" y="${HEADER_H / 2 + 12}" font-size="10"
    font-family="'Segoe UI','Ubuntu',sans-serif" fill="${t.subtext}">${title.replace(username + "'s ", "")}</text>

  <!-- Grade badge -->
  ${gradeBadgeSVG}

  <!-- Divider -->
  <line x1="${PAD}" y1="${DIVIDER_Y + 8}" x2="${card_width - PAD}" y2="${DIVIDER_Y + 8}"
    stroke="${t.border}" stroke-width="1"/>

  <!-- Stat rows -->
  ${rowsSVG}

</svg>`.trim();
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STATS ROUTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET /stats/:username

Query params:
  theme         dark | light | neon | night | purple | forest | nord | catppuccin
  hide_border   true | false (default: false)
  show_avatar   true | false (default: true)
  card_width    number in px (default: 520)
  custom_title  string
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

app.get("/stats/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const theme = req.query.theme || "dark";
    const hide_border = req.query.hide_border === "true";
    const show_avatar = req.query.show_avatar !== "false";
    const card_width = Math.max(
      300,
      Math.min(parseInt(req.query.card_width) || 520, 800),
    );
    const custom_title = req.query.custom_title || null;
    const grade_style = ["letter", "rpg"].includes(req.query.grade_style)
      ? req.query.grade_style
      : "letter";

    if (!themes[theme]) {
      return res.status(400).json({
        error: true,
        message: `Unknown theme "${theme}". Available: ${Object.keys(themes).join(", ")}`,
      });
    }

    // Fetch user profile
    const userRes = await axios.get(
      `https://api.github.com/users/${username}`,
      { headers },
    );
    const user = userRes.data;
    const avatar = await fetchAvatarBase64(user.avatar_url);

    // Fetch repos
    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
      { headers },
    );
    const repos = reposRes.data;

    // Stars
    const stars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

    // Commits (sum across all repos — GitHub API doesn't give a total directly)
    let commits = 0;
    for (const repo of repos) {
      try {
        const contribRes = await axios.get(
          `https://api.github.com/repos/${username}/${repo.name}/contributors`,
          { headers },
        );
        const me = contribRes.data.find(
          (c) => c.login.toLowerCase() === username.toLowerCase(),
        );
        if (me) commits += me.contributions;
      } catch {
        continue;
      }
    }

    // PRs, Issues, Contributed-to via search API
    const [prsRes, issuesRes, contribsRes] = await Promise.all([
      axios.get(
        `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=1`,
        { headers },
      ),
      axios.get(
        `https://api.github.com/search/issues?q=author:${username}+type:issue&per_page=1`,
        { headers },
      ),
      axios.get(
        `https://api.github.com/search/repositories?q=user:${username}&per_page=1`,
        { headers },
      ),
    ]);

    const prs = prsRes.data.total_count || 0;
    const issues = issuesRes.data.total_count || 0;
    const contribs = user.public_repos || 0;

    const svg = generateStatsSVG(
      username,
      avatar,
      { stars, commits, prs, issues, contribs, repos: repos.length },
      {
        theme,
        hide_border,
        show_avatar,
        card_width,
        custom_title,
        grade_style,
      },
    );

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(svg);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      error: true,
      message: err.response?.data?.message || err.message,
    });
  }
});

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
START
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
