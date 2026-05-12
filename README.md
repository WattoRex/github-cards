# GitHub Cards

A self-hosted Express server that generates two types of dynamic SVG cards for GitHub profiles — a **Stats Card** and a **Most Used Languages Card**.

Both are theme-aware, customizable, and ready to embed in any Markdown file.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Stats Card](#stats-card)
- [Most Used Languages Card](#most-used-languages-card)
- [Shared Options](#shared-options)
- [Deploying](#deploying)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [GitHub Personal Access Token](https://github.com/settings/tokens) (with `repo` scope for private repos)

### Installation

```bash
git clone https://github.com/WattoRex/github-cards.git
cd github-cards
npm install
```

### Configuration

Create a `.env` file at the root of the project:

```env
GITHUB_TOKEN=your_github_token_here
PORT=3000
```

### Run

```bash
node server.js
```

The server starts at `http://localhost:3000`.

---

## Stats Card

Displays a profile overview: stars, commits, PRs, issues, contributions, and a dynamically computed **grade** shown as a badge in the card header.

### Endpoint

```
GET /stats/:username
```

### Example

```
http://localhost:3000/stats/torvalds
```

Embed in a Markdown file:

```md
![GitHub Stats](http://localhost:3000/stats/your-username)
```

### Grade System

The grade is calculated from a weighted score:

```
score = stars×0.3 + commits×0.35 + PRs×0.2 + issues×0.1 + contributions×0.05
```

Two display styles are available via the `grade_style` parameter:

#### Letter Style (`grade_style=letter`) — default

A compact pill badge showing a letter grade.

| Score  | Grade |
| ------ | ----- |
| ≥ 3000 | S     |
| ≥ 1500 | A++   |
| ≥ 700  | A+    |
| ≥ 300  | A     |
| ≥ 150  | B+    |
| ≥ 60   | B     |
| ≥ 20   | C     |
| < 20   | D     |

#### RPG Style (`grade_style=rpg`)

A wider badge whose width adapts to the title text, displaying a fantasy-inspired rank.

| Score  | Title                |
| ------ | -------------------- |
| ≥ 3000 | Legendary Architect  |
| ≥ 1500 | Master Engineer      |
| ≥ 700  | Senior Adventurer    |
| ≥ 300  | Experienced Coder    |
| ≥ 150  | Apprentice Developer |
| ≥ 60   | Novice Scripter      |
| ≥ 20   | Initiate             |
| < 20   | Unranked Wanderer    |

### Query Parameters

| Parameter      | Type    | Default                     | Description                               |
| -------------- | ------- | --------------------------- | ----------------------------------------- |
| `theme`        | string  | `dark`                      | Card theme (see [Themes](#themes))        |
| `grade_style`  | string  | `letter`                    | Grade display style: `letter` or `rpg`    |
| `hide_border`  | boolean | `false`                     | Hide the card border                      |
| `show_avatar`  | boolean | `true`                      | Show the user's GitHub avatar             |
| `card_width`   | number  | `520`                       | Card width in pixels (min: 300, max: 800) |
| `custom_title` | string  | `{username}'s GitHub Stats` | Override the card title                   |

### Examples

```
/stats/your-username?theme=tokyonight&grade_style=letter
/stats/your-username?theme=dracula&grade_style=rpg
/stats/your-username?theme=radical&hide_border=true&show_avatar=false&grade_style=rpg
```

---

## Most Used Languages Card

Displays the most used programming languages across a user's repositories, with colored progress bars and percentage breakdown.

### Endpoint

```
GET /languages/:username
```

### Example

```
http://localhost:3000/languages/torvalds
```

Embed in a Markdown file:

```md
![Most Used Languages](http://localhost:3000/languages/your-username)
```

### Query Parameters

| Parameter         | Type    | Default            | Description                                    |
| ----------------- | ------- | ------------------ | ---------------------------------------------- |
| `theme`           | string  | `dark`             | Card theme (see [Themes](#themes))             |
| `locale`          | string  | `en`               | Label language (see [Locales](#locales))       |
| `count`           | number  | `8`                | Number of languages to display (max: 15)       |
| `card_width`      | number  | `500`              | Card width in pixels (min: 300, max: 800)      |
| `show_icons`      | boolean | `true`             | Show colored dot next to each language         |
| `hide_border`     | boolean | `false`            | Hide the card border                           |
| `compact`         | boolean | `false`            | Use a more compact row height                  |
| `show_repo_count` | boolean | `false`            | Show repo and language count in subtitle       |
| `show_avatar`     | boolean | `true`             | Show the user's GitHub avatar                  |
| `custom_title`    | string  | _(locale default)_ | Override the card title                        |
| `private`         | boolean | `false`            | Include private repositories ⚠️ See note below |
| `forks`           | boolean | `true`             | Include forked repositories                    |
| `archived`        | boolean | `false`            | Include archived repositories                  |
| `exclude`         | string  | —                  | Comma-separated repo names to exclude          |
| `exclude_langs`   | string  | —                  | Comma-separated languages to exclude           |

> **⚠️ Note on private repositories**
> `private=true` only works if the server uses **your own** `GITHUB_TOKEN` — one that has access to your private repos.
> If you are using a public demo instance hosted by someone else, this parameter will have no effect or may return an error.
> To use it, [self-host the server](#deploying) and set your own token in the environment variables.

### Example with Options

```
/languages/your-username?theme=radical&locale=fr&count=5&exclude_langs=HTML,CSS&show_repo_count=true
```

### Supported Languages

130+ languages with official GitHub Linguist colors, including:

**Web:** JavaScript, TypeScript, HTML, CSS, SCSS, Sass, Less, CoffeeScript, WebAssembly, Handlebars, Pug, EJS, Liquid, Twig, Mustache, Nunjucks, Svelte, Vue, Astro

**Systems & Low-level:** C, C++, C#, Rust, Go, Zig, Nim, D, Odin, Carbon, Vala, Ada, Pascal, Fortran, COBOL, Assembly

**JVM & CLR:** Java, Kotlin, Scala, Groovy, Clojure, F#, Visual Basic .NET

**Scripting & Dynamic:** Python, Ruby, PHP, Perl, Raku, Lua, Tcl, Elixir, Erlang, Emacs Lisp, Common Lisp, Scheme, Racket

**Shell & Config:** Shell/Bash, PowerShell, Dockerfile, Makefile, CMake, Nix, HCL, Terraform, Puppet

**Functional:** Haskell, OCaml, Standard ML, Elm, PureScript, Idris, Agda, Coq

**Mobile:** Swift, Dart, Objective-C, Objective-C++

**Data & ML:** R, Julia, MATLAB, Jupyter Notebook, Stan

**Query & Data:** SQL, PLpgSQL, HiveQL, SPARQL, GraphQL

**Markup & Docs:** Markdown, LaTeX, TeX, AsciiDoc

**Game & Graphics:** GDScript, GLSL, HLSL, ShaderLab

**Blockchain:** Solidity, Move, Vyper, Cairo

**Other:** Apex, ABAP, AutoHotkey, Gherkin, Smalltalk, Prolog, Haxe, ActionScript, VHDL, Verilog, Crystal, Hack, Reason, and many more. Any language not listed renders with a neutral gray.

### Locales

| Code | Language   |
| ---- | ---------- |
| `en` | English    |
| `fr` | French     |
| `de` | German     |
| `es` | Spanish    |
| `pt` | Portuguese |
| `ja` | Japanese   |
| `zh` | Chinese    |

---

## Shared Options

### Themes

Both cards support the same 8 themes:

| Name         | Style              |
| ------------ | ------------------ |
| `dark`       | Dark GitHub-style  |
| `light`      | Light GitHub-style |
| `radical`    | Hot pink neon      |
| `tokyonight` | Tokyo Night blue   |
| `dracula`    | Dracula purple     |
| `monokai`    | Monokai green      |
| `nord`       | Nord arctic        |
| `catppuccin` | Catppuccin blue    |

### Side by Side in a Profile README

```md
![Stats](http://localhost:3000/stats/your-username?theme=tokyonight&grade_style=rpg)
![Languages](http://localhost:3000/languages/your-username?theme=tokyonight)
```

---

## Deploying

This is a standard Express app. You can host it on any Node.

> If you want `private=true` to work, you must self-host this server with your own `GITHUB_TOKEN`. A shared or public instance cannot access another user's private repositories.

js-compatible platform:

- [Railway](https://railway.app)
- [Render](https://render.com)
- [Fly.io](https://fly.io)
- [Vercel](https://vercel.com) (with a serverless adapter)
- Your own VPS

Make sure to set `GITHUB_TOKEN` as an environment variable on your host.

---

## License

MIT
