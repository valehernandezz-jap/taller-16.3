// Selecciono el lugar donde se insertará el header
const header = document.createElement('header')

// Defino el contenido del header
header.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
      <a
        class="navbar-brand d-flex align-items-center justify-content-center p-0 m-0"
        href="/"
        style="font-family: var(--font-family-vt323); font-size: 2rem"
      >
        <img
          src="img/favicon.svg"
          alt="Pokeball"
          width="32"
          height="32"
          class="me-2"
        />
        Pokémon Team Builder
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center" href="team.html">
              Mi equipo
              <span class="badge text-bg-light team-count ms-2">0</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`

// Inserto el navbar al inicio del body
document.body.prepend(header)
