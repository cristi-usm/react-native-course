---
transition: slide-left
layout: top-title
align: c
color: indigo-light
---

:: title ::
# Notare

:: content ::
<style>
.grade-container {
  display: flex;
  justify-content: center;
  align-items: stretch; 
  gap: 20px;
  width: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--neversink-fg-color); 
}
.grade-box {
  background-color: var(--neversink-admon-bg-color);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--neversink-admon-border-color);
}
.grade-box.coursework {
  flex-basis: 65%; 
}
.grade-box.exam {
  flex-basis: 35%;
  justify-content: center; 
}
.grade-title {
  font-size: 3.2em;
  font-weight: 600;
  margin: 0;
  padding-bottom: 10px; 
  border-bottom: 2px solid var(--neversink-border-color); 
  color: var(--neversink-highlight-color); 
}
.grade-subtitle {
  font-size: 1.3em;
  margin-top: 10px;
  margin-bottom: 15px; 
  opacity: 0.9;
}
.coursework-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px; 
  flex-grow: 1;
}
.detail-item {
  background-color: var(--neversink-bg-color);
  padding: 15px;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--neversink-admon-text-color);
}
.detail-item span {
  display: block;
  font-weight: bold;
  font-size: 1.5em;
  margin-top: 5px; 
  color: var(--neversink-fg-code-color);
}
</style>

<div class="grade-container neversink-indigo-light-scheme">
  <div class="grade-box coursework">
    <p class="grade-title">60%</p>
    <p class="grade-subtitle">Activitate Semestrială</p>
    <div class="coursework-details">
      <div class="detail-item">Atestare 1 <span>25%</span></div>
      <div class="detail-item">Atestare 2 <span>25%</span></div>
      <div class="detail-item">Laboratoare <span>25%</span></div>
      <div class="detail-item">LI: Proiect <span>25%</span></div>
    </div>
  </div>
  
  <div class="grade-box exam">
    <p class="grade-title">40%</p>
    <p class="grade-subtitle">Examen Final</p>
  </div>
</div>

---
transition: slide-left 
layout: top-title 
align: c 
color: indigo-light
---
:: title ::

# Lecții

:: content ::

<style>
.attendance-container {
display: flex;
justify-content: center;
align-items: stretch;
gap: 30px;
width: 100%;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
color: var(--neversink-fg-color);
margin-top: 2rem;
}
.attendance-box {
background-color: var(--neversink-admon-bg-color);
padding: 25px;
border-radius: 12px;
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex-basis: 45%;
border: 1px solid var(--neversink-admon-border-color);
}
.attendance-title {
font-size: 2.2em;
font-weight: 600;
margin: 0;
padding-bottom: 15px;
color: var(--neversink-highlight-color);
}
.attendance-icon {
font-size: 4em;
margin-bottom: 15px;
color: var(--neversink-fg-code-color);
}
.attendance-description {
font-size: 1.2em;
opacity: 0.9;
color: var(--neversink-admon-text-color);
margin-bottom: 0;
}
.attendance-description strong {
color: var(--neversink-fg-color);
font-weight: 700;
}
.attendance-note {
font-size: 1em;
font-style: italic;
margin-top: 10px;
opacity: 0.8;
color: var(--neversink-admon-text-color);
}
</style>

<div class="attendance-container neversink-indigo-light-scheme">
<div class="attendance-box">
<div class="attendance-icon">🧪</div>
<p class="attendance-title">Laboratoare</p>
</div>

<div class="attendance-box">
<div class="attendance-icon">👨‍🏫</div>
<p class="attendance-title">Cursuri</p>
</div>
</div>

---
transition: slide-left 
layout: top-title 
align: c 
color: indigo-light
---

:: title ::

# Reguli Esențiale

:: content ::

<style>
.rules-container {
display: flex;
justify-content: center;
align-items: stretch;
gap: 30px;
width: 100%;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
color: var(--neversink-fg-color);
margin-top: 2rem;
}
.rules-box {
background-color: var(--neversink-admon-bg-color);
padding: 25px;
border-radius: 12px;
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex-basis: 45%;
border: 1px solid var(--neversink-admon-border-color);
}
.rules-title {
font-size: 2.2em;
font-weight: 600;
margin: 0;
padding-bottom: 15px;
color: var(--neversink-highlight-color);
}
.rules-icon {
font-size: 4em;
margin-bottom: 15px;
color: var(--neversink-fg-code-color);
}
.rules-description {
font-size: 1.2em;
opacity: 0.9;
color: var(--neversink-admon-text-color);
}
.rules-description strong {
color: var(--neversink-fg-color);
font-weight: 700;
}
</style>

<div class="rules-container neversink-indigo-light-scheme">
<div class="rules-box">
<div class="rules-icon">📅</div>
<p class="rules-title">Termene Limită</p>
<p class="rules-description">Respectarea termenelor este <strong>esențială</strong>. Lucrările trimise cu întârziere nu vor fi evaluate.</p>
</div>

<div class="rules-box">
<div class="rules-icon">⚠️</div>
<p class="rules-title">Integritate</p>
<p class="rules-description">Toleranță <strong>zero</strong> pentru plagiat. Toate temele și proiectele trebuie să fie individuale.</p>
</div>
</div>

---
transition: slide-left
layout: top-title 
align: c 
color: indigo-light
---

:: title ::

# Prezență & Contact

:: content ::

<style>
.presence-container {
display: flex;
justify-content: center;
align-items: stretch;
gap: 30px;
width: 100%;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
color: var(--neversink-fg-color);
margin-top: 2rem;
}
.presence-box {
background-color: var(--neversink-admon-bg-color);
padding: 25px;
border-radius: 12px;
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex-basis: 45%;
border: 1px solid var(--neversink-admon-border-color);
}
.presence-title {
font-size: 2.2em;
font-weight: 600;
margin: 0;
padding-bottom: 15px;
color: var(--neversink-highlight-color);
}
.presence-icon {
font-size: 4em;
margin-bottom: 15px;
color: var(--neversink-fg-code-color);
}
.presence-description {
font-size: 1.2em;
color: var(--neversink-admon-text-color);
opacity: 0.9;
}
.contact-list {
text-align: left;
width: 100%;
}
.contact-item {
display: flex;
align-items: center;
margin-bottom: 10px;
font-size: 1.1em;
}
.contact-item-icon {
margin-right: 15px;
font-size: 1.5em;
}
</style>

<div class="presence-container neversink-indigo-light-scheme">
<div class="presence-box">
<div class="presence-icon">🕒</div>
<p class="presence-title">Anunțarea Absențelor</p>
<p class="presence-description">Dacă nu puteți frecventa, vă rog să anunțați în prealabil.</p>
</div>

<div class="presence-box">
<div class="presence-icon">📬</div>
<p class="presence-title">Contact</p>
<div class="contact-list">
<div class="contact-item">
<span class="contact-item-icon">✉️</span>
<span>cristian.crudu@usm.md</span>
</div>
<div class="contact-item">
<span class="contact-item-icon">📞</span>
<span>+373 67 277 471</span>
</div>
</div>
</div>
</div>

---
transition: slide-left 
layout: top-title 
align: c 
color: indigo-light
---

:: title ::

# Lucru Individual

:: content ::

<style>
.work-focus-container {
display: flex;
justify-content: center;
align-items: center;
height: 100%;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.work-focus-box {
background-color: var(--neversink-admon-bg-color);
padding: 30px 40px;
border-radius: 12px;
text-align: center;
max-width: 65%;
border: 1px solid var(--neversink-admon-border-color);
}
.work-focus-icon {
font-size: 4.5em;
margin-bottom: 20px;
color: var(--neversink-fg-code-color);
}
.work-focus-text {
font-size: 1.5em;
color: var(--neversink-fg-color);
font-weight: 500;
line-height: 1.4;
}
</style>

<div class="work-focus-container neversink-indigo-light-scheme">
<div class="work-focus-box">
<div class="work-focus-icon">💻</div>
<p class="work-focus-text">
Pe parcursul semestrului veți realiza un proiect individual pe care îl veți prezenta la sfârșit de semestru.
</p>
</div>
</div>

---
transition: slide-left 
layout: top-title 
align: c 
color: indigo-light
---
:: title ::

# Atestări & Examen

:: content ::

<style>
.eval-container {
display: flex;
justify-content: center;
align-items: stretch;
gap: 20px;
width: 100%;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
color: var(--neversink-fg-color);
margin-top: 2rem;
}
.eval-box {
background-color: var(--neversink-admon-bg-color);
padding: 20px;
border-radius: 12px;
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex-basis: 30%;
border: 1px solid var(--neversink-admon-border-color);
}
.eval-title {
font-size: 1.8em;
font-weight: 600;
margin: 0;
padding-bottom: 10px;
color: var(--neversink-highlight-color);
}
.eval-icon {
font-size: 3.5em;
margin-bottom: 15px;
color: var(--neversink-fg-code-color);
}
.eval-description {
font-size: 1.0em;
opacity: 0.9;
color: var(--neversink-admon-text-color);
}
</style>

<div class="eval-container neversink-indigo-light-scheme">
<div class="eval-box">
<div class="eval-icon">1️⃣</div>
<p class="eval-title">Atestare 1</p>
<p class="eval-description">Evaluare teoretică și practică la mijlocul semestrului.</p>
<p>(Moodle)</p>
</div>

<div class="eval-box">
<div class="eval-icon">2️⃣</div>
<p class="eval-title">Atestare 2</p>
<p class="eval-description">A doua evaluare semestrială.</p>
<p>(Moodle)</p>
</div>

<div class="eval-box">
<div class="eval-icon">🏁</div>
<p class="eval-title">Examen Final</p>
<p class="eval-description">Verificarea finală a cunoștințelor acumulate.</p>
<p>(Foaie)</p>
<Ghost :size="40" mood="sad" color="#d6d6d6ff" />
</div>
</div>

---
layout: center
---

<AdmonitionType type="tip" class="text-center">

### Cei care vor rezolva toate sarcinile din clasă și vor avea laboratoarele pe 9-10 vor fi scutiți de atestări.

</AdmonitionType>

---
transition: slide-left 
layout: top-title 
align: c 
color: indigo-light
---

:: title ::

# Laboratoare - Reguli & Proces

:: content ::

<style>
.lab-process-container {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 25px;
width: 100%;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
color: var(--neversink-fg-color);
margin-top: 1.5rem;
}
.lab-process-step {
background-color: var(--neversink-admon-bg-color);
padding: 20px;
border-radius: 12px;
text-align: center;
border: 1px solid var(--neversink-admon-border-color);
display: flex;
flex-direction: column;
align-items: center;
}
.lab-process-icon {
font-size: 3.5em;
margin-bottom: 15px;
color: var(--neversink-fg-code-color);
}
.lab-process-title {
font-size: 1.5em;
font-weight: 600;
margin-bottom: 10px;
color: var(--neversink-highlight-color);
}
.lab-process-description {
font-size: 1.1em;
opacity: 0.9;
color: var(--neversink-admon-text-color);
flex-grow: 1;
}
.lab-process-description strong {
color: var(--neversink-fg-color);
font-weight: 700;
}
.feedback-note {
font-size: 1.0em;
margin-top: 15px;
padding: 8px;
background-color: var(--neversink-bg-color);
border-radius: 6px;
font-style: italic;
width: 100%;
}
</style>

<div class="lab-process-container neversink-indigo-light-scheme">
<div class="lab-process-step">
<div class="lab-process-icon">💡</div>
<p class="lab-process-title">1. Rezolvare</p>
<p class="lab-process-description">Rezolvați individual sarcinile de laborator propuse.</p>
</div>

<div class="lab-process-step">
<div class="lab-process-icon">🚀</div>
<p class="lab-process-title">2. Pull Request</p>
<p class="lab-process-description">Trimiteți soluția ca un <strong>Pull Request (PR)</strong> pe GitHub înainte de termenul limită.</p>
<div class="feedback-note">Includeți la dorință în fiecare PR solicitare de <strong>feedback</strong>.</div>
</div>

<div class="lab-process-step">
<div class="lab-process-icon">💬</div>
<p class="lab-process-title">3. Susținere</p>
<p class="lab-process-description">După închiderea PR-ului, veți susține lucrarea și veți răspunde la întrebări în timpul orelor.</p>
</div>
</div>

---
transition: slide-left 
layout: top-title 
align: c 
color: indigo-light
---

:: title ::

# Laboratoare - Sarcini

:: content ::

<style>
.lab-tasks-container {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 25px;
width: 90%;
margin: 2rem auto 0;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.lab-task-card {
background-color: var(--neversink-admon-bg-color);
padding: 25px;
border-radius: 12px;
border: 1px solid var(--neversink-admon-border-color);
display: flex;
flex-direction: column;
align-items: center;
transition: transform 0.2s, box-shadow 0.2s;
}
.lab-task-card:hover {
transform: translateY(-5px);
box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}
.lab-task-title {
font-size: 1.8em;
font-weight: 600;
color: var(--neversink-highlight-color);
margin-bottom: 15px;
}
.lab-task-link {
display: inline-flex;
align-items: center;
background-color: var(--neversink-bg-code-color);
color: var(--neversink-fg-code-color);
padding: 10px 20px;
border-radius: 8px;
text-decoration: none;
font-weight: 600;
transition: background-color 0.2s;
}
.lab-task-link:hover {
background-color: #c7d2fe; /* A slightly darker shade */
}
.lab-task-link svg {
margin-right: 8px;
}
</style>

<div class="lab-tasks-container neversink-indigo-light-scheme">

<div class="lab-task-card">
<p class="lab-task-title">Lab 1 - Crafting Game</p>
<a href="https://github.com/cristi-usm/lab1-react-native" target="_blank" class="lab-task-link">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
Vezi Sarcini
</a>
</div>

<div class="lab-task-card">
<p class="lab-task-title">Lab 2 - Clasament</p>
<a href="https://github.com/cristi-usm/lab2-react-native" target="_blank" class="lab-task-link">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
Vezi Sarcini
</a>
</div>

<div class="lab-task-card">
<p class="lab-task-title">Laborator 3</p>
<a href="https://github.com/user/repo/link-to-lab3" target="_blank" class="lab-task-link">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
Vezi Sarcini
</a>
</div>

<div class="lab-task-card">
<p class="lab-task-title">Laborator 4</p>
<a href="https://github.com/user/repo/link-to-lab4" target="_blank" class="lab-task-link">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
Vezi Sarcini
</a>
</div>
</div>