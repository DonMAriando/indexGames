# Sala de juegos

Índice público de los juegos de [Software Society](https://github.com/DonMAriando). Se publica en GitHub Pages:

**https://donmariando.github.io/indexGames/**

## Cómo agregar un juego

1. Sumá una ficha en `games.js` (el objeto `CATALOG.games`).
2. Poné una tapa en `covers/` (JPG, PNG o SVG) y apuntá `cover` a ese archivo.
3. Si ya está online, llená `play`. Si todavía no, dejalo vacío: la ficha muestra el repo igual.
4. Push a `main`. El workflow republica el sitio.

Campos de cada ficha:

| Campo | Para qué |
|---|---|
| `id` | Identificador estable, en kebab-case |
| `title` / `subtitle` / `blurb` | Nombre, línea corta y párrafo de la ficha |
| `status` | `jugable`, `demo` o `prototipo` |
| `year` | Año que se muestra en la ficha |
| `tags` | Filtros del catálogo (`arcade`, `narrativa`, etc.) |
| `cover` | Ruta a la tapa |
| `accent` | Color del botón Jugar y del hover |
| `play` | URL para jugar (vacío si todavía no hay) |
| `repo` | URL del repositorio |
| `featured` | `true` en uno solo, para la ficha ancha de arriba |

## Publicar

En el repo: **Settings → Pages → Source: GitHub Actions**. El workflow `.github/workflows/pages.yml` despliega en cada push a `main`.

En local también sirve abrir `index.html` con doble clic. El catálogo vive en `games.js`, no hace falta un servidor para listar las fichas.
