<div align="center">

<h1>NHworks — Education &amp; Online Learning Platform</h1>

<p><strong>Learn Today. Build Tomorrow.</strong></p>

<p>A career-focused learning platform designed to help students and aspiring professionals develop practical digital and technology skills through structured, self-paced, project-based learning.</p>

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Vanilla_JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JavaScript">
  <img src="https://img.shields.io/badge/Responsive-Design-059669?style=for-the-badge" alt="Responsive Design">
  <img src="https://img.shields.io/badge/Accessibility-Focused-10b981?style=for-the-badge" alt="Accessibility">
  <img src="https://img.shields.io/badge/Build_Dependencies-Zero-0f172a?style=for-the-badge" alt="Zero Build Dependencies">
</p>

<p>
  <a href="#overview">Overview</a> ·
  <a href="#features">Features</a> ·
  <a href="#courses">Courses</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#usage">Usage</a>
</p>

</div>

<div align="center">
  <img src="assets/images/nhworks-homepage.png"
       alt="NHworks Education Platform homepage: 'Your Learning Journey Starts Here' hero with course search, Explore Courses and Watch Video buttons"
       width="100%">
  <br>
  <sub>The NHworks homepage</sub>
</div>

---

## Overview

NHworks is a career-focused online education platform built for:

- Students
- Beginners learning technology
- Aspiring professionals
- Career changers
- Anyone developing practical digital skills

**Core learning principles**

| Principle | What it means |
|---|---|
| Hands-on | Project-based, practical learning |
| Self-paced | Study anytime, anywhere |
| Structured | Clear learning progression |
| Transparent | Level, duration, lessons and price shown up front |
| Responsive | Works across desktop, tablet and mobile |

---

## Features

### Learning experience

- Modern homepage and responsive navigation
- Course search and interactive category filtering
- Dynamic course catalog
- Course detail dialogs with syllabus checklists
- Course level, duration, lesson count and price information
- Empty search-result state
- Learning benefits and educational resources
- Animated statistics
- Student testimonial carousel
- Interactive platform tour
- Contact and academic advising form
- Login and registration interface
- Responsive mobile navigation
- Back-to-top control

> **Note:** Login, registration and the contact form are front-end interfaces. Unless a backend is added, they do not create real accounts or send messages (see the [Roadmap](#roadmap)).

### Accessibility and UX

- Semantic HTML5
- Keyboard-accessible dialogs and controls where implemented
- Escape-to-close modal support
- Focus management and focus trapping where implemented
- Scroll locking while modals are open
- Reduced-motion preference support
- Browser-based form validation
- Clear interactive states

---

## Courses

<table>
  <tr>
    <td width="33%" valign="top"><strong>🌐 Web Development</strong><br>HTML5, CSS3, JavaScript, React.js, Advanced JavaScript</td>
    <td width="33%" valign="top"><strong>💻 Programming</strong><br>Python, Node.js, Express APIs, backend development</td>
    <td width="33%" valign="top"><strong>📊 Data Science</strong><br>Data analytics, statistics, visualization, Python data libraries</td>
  </tr>
  <tr>
    <td valign="top"><strong>🎨 UI/UX Design</strong><br>Figma, wireframes, design systems, prototyping</td>
    <td valign="top"><strong>🧩 Business Analysis</strong><br>Requirements gathering, process mapping, workflow modeling</td>
    <td valign="top"><strong>📣 Digital Marketing</strong><br>SEO, conversion funnels, campaign analytics, social media growth</td>
  </tr>
</table>

---

## Architecture

> The tree below is the **expected** structure. Compare it with your repository and adjust any entries that differ.

```text
nhworks-education-website/
├── index.html
├── serve.js
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── favicon.svg
    ├── icons/            # logo, search, users, laptop, award, web, code,
    │                     # data, design, business, marketing, clock,
    │                     # tools, path, device (.svg)
    └── images/
        ├── nhworks-homepage.png      # README preview
        ├── hero-student-education.jpg
        ├── about-learning-community.jpg
        ├── workspace-modern-desk.jpg
        ├── course-*.jpg              # one image per course
        └── avatar-[1-3].svg
```

| File | Responsibility |
|---|---|
| `index.html` | Semantic page structure and modal markup |
| `css/style.css` | Design tokens, layout, animations and responsive styles |
| `js/script.js` | Course data, searching, filtering, modals and dynamic statistics |
| `serve.js` | Lightweight local Node.js development server |
| `assets/` | Icons, photography and other visual resources |

---

## Installation

### Option 1: Local server (Windows, macOS, Linux)

Requires [Node.js](https://nodejs.org/). Check with `node --version`.

```bash
git clone <YOUR_REPOSITORY_URL>
cd nhworks-education-website
node serve.js
```

Then open the URL printed in your terminal.

<!-- TODO: confirm the port and any PORT environment variable in serve.js, then state the exact URL here. -->

### Option 2: Open the file directly

Open `index.html` in a modern browser. The site is plain HTML, CSS and JavaScript, so no build step is expected. If any asset fails to load from `file://`, use Option 1.

---

## Usage

1. Use the header search or the category cards to filter courses.
2. Open a course to view its details, syllabus and pricing.
3. Select **Watch Video** / **Watch Our Story** to open the story modal.
4. Use **Login** / **Get Started** to open the account modal.
5. Use the contact section to reach academic advising.

### How it works

- A central `COURSES` array holds the course data.
- Course cards are generated from that data.
- Search and category filters update the visible catalog.
- Course details open in a modal.
- Category totals and statistics are calculated from the course data.

Adding or updating a course in the central data source should update the related views automatically.

> Verify these details against `js/script.js` before publishing.

### Page flow

1. Header and Navigation
2. Hero Section
3. Popular Categories
4. Featured Courses
5. About / Why NHworks
6. Learning Statistics and Resources
7. Student Testimonials
8. Get Started CTA
9. Contact and Academic Advising
10. Footer

Modals: Course Details · Watch Our Story · Login / Get Started

---

## Design System

- Emerald-green primary accents
- White and light backgrounds
- Dark navy text
- Rounded cards and controls with soft shadows
- Clear spacing and hierarchy
- High-quality education imagery
- Responsive layouts for desktop, tablet and mobile
- Motion effects that respect reduced-motion settings

---

## Roadmap

These are **future ideas**, not existing features.

- [ ] Expand the course catalog
- [ ] Add real student account authentication
- [ ] Add persistent enrollment records
- [ ] Introduce learner progress tracking
- [ ] Add course completion certificates
- [ ] Integrate payment processing
- [ ] Add instructor and course administration
- [ ] Connect contact submissions to a backend
- [ ] Add automated testing and CI workflows

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a pull request.

## License

No license has been specified yet.

---

<div align="center">
  <sub><strong>NHworks</strong> — Learn Today. Build Tomorrow.</sub>
</div>
