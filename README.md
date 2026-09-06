# Dezvoltarea Aplicațiilor Mobile cu React Native

Suportul de curs, construit cu [Slidev](https://sli.dev/). Fiecare lecție este o
prezentare independentă, cu propriul server de dezvoltare.

## Pornire rapidă

```bash
pnpm install
pnpm dev            # toate prezentările
pnpm dev:hub        # doar pagina principală, pe http://localhost:3030
```

Porturi: `3030` pentru hub, `3030 + numărul lecției` pentru fiecare lecție.
Legăturile dintre prezentări duc la `localhost:<port>`, deci prezentarea spre care
navigați trebuie să ruleze.

## Structura

| Cale | Conținut |
|---|---|
| `slides/00-hub/` | Pagina principală cu grila de lecții |
| `slides/NN-.../` | Câte o prezentare pentru fiecare lecție |
| `common/lessons.json` | Lista lecțiilor: numere, titluri, porturi, module |
| `common/components/` | Componente Vue folosite în toate prezentările |
| `scripts/` | Pornirea serverelor, build-ul și sincronizarea headmatter-ului |
| `legacy/` | Versiunea veche a cursului, păstrată doar ca arhivă |

Structura cursului se modifică într-un singur loc, `common/lessons.json`. Grila de pe
pagina principală, navigarea dintre lecții și titlurile prezentărilor se generează din el.

## Build

```bash
pnpm build          # totul în dist/
pnpm preview
```

Site-ul se publică automat pe GitHub Pages la fiecare push pe `main`.

## Contribuții

Dacă descoperiți erori sau aveți idei de îmbunătățire, contribuțiile sunt încurajate.
Puteți trimite pull request-uri cu modificările sugerate.
