// Selecciono el lugar donde se insertará el footer
const footer = document.createElement('footer')

// Defino el contenido del footer
footer.innerHTML = `
  <footer
    class="text-light text-center py-4"
    style="background-color: #140e0c; color: white; padding: 20px 0"
  >
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-4 d-flex justify-content-start align-items-center mb-3 mb-md-0">
          <h5 class="mb-0">Taller - Semana 16</h5>
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-center align-items-center mb-3 mb-md-0">
          <img
            src="img/jap-logo.png"
            alt="Logo Jóvenes a Programar"
            class="img-fluid"
            style="max-height: 50px"
          />
        </div>
        <div
          class="col-12 col-md-4 d-flex justify-content-end align-items-center"
          style="transition: transform 0.3s ease; transform: scale(1)"
          onmouseover="this.style.transform='scale(1.025)';"
          onmouseout="this.style.transform='scale(1)';"
        >
          <a
            class="text-decoration-none d-flex align-items-center"
            href="https://github.com/ValeHernandezz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://avatars.githubusercontent.com/u/128721976?v=4"
              alt="Valentina Hernández Modino"
              class="rounded-circle img-hover"
              style="width: 30px; height: 30px; object-fit: cover; margin-right: 10px;"
            />
            <h5 class="mb-0 text-hover">Valentina Hernández Modino</h5>
          </a>
        </div>
      </div>
    </div>
  </footer>
`

// Inserto el footer al final del body
document.body.appendChild(footer)
