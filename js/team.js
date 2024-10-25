const teamList = document.getElementById('team-list')
let pokemonTeam = JSON.parse(localStorage.getItem('pokemonTeam')) || []

// Función para mostrar el equipo de Pokémon en pantalla
function displayTeam() {
  teamList.innerHTML = '' // Limpio la lista de Pokémon

  if (pokemonTeam.length === 0) {
    teamList.innerHTML =
      '<p class="text-center fs-5">No has agregado ningún Pokémon a tu equipo.</p>'
  } else {
    pokemonTeam.forEach(({ id, name, img }) => {
      console.log(id)
      console.log(name)
      console.log(img)

      const pokemonElement = document.createElement('div')
      // Aplicamos las clases para el grid responsive
      pokemonElement.classList.add(
        'col-sm-12',
        'col-md-4',
        'col-lg-2',
        'text-center'
      )

      pokemonElement.innerHTML = `
        <div class="card">
          <img src="${img}" class="card-img-top" alt="${name}" loading="lazy">
          <div class="card-body">
            <h5 class="card-title mb-3">${
              name.charAt(0).toUpperCase() + name.slice(1)
            }</h5>
            <button class="btn btn-danger btn-sm remove-from-team" data-id="${id}">
              <i class="bi bi-x-lg me-2"></i>Quitar
            </button>
          </div>
        </div>
      `
      teamList.appendChild(pokemonElement)
    })

    // Añado evento a los botones "Quitar"
    document.querySelectorAll('.remove-from-team').forEach((button) => {
      button.addEventListener('click', (event) => {
        const pokemonId = event.target.getAttribute('data-id')
        removeFromTeam(pokemonId)
      })
    })
  }
}

// Función para eliminar Pokémon del equipo y del localStorage
function removeFromTeam(pokemonId) {
  // Filtro el equipo para excluir el Pokémon que queremos quitar por su ID
  pokemonTeam = pokemonTeam.filter((pokemon) => pokemon.id !== pokemonId)
  // Actualizo el localStorage con el nuevo equipo
  localStorage.setItem('pokemonTeam', JSON.stringify(pokemonTeam))
  // Recargo la lista de Pokémon
  displayTeam()
  updateTeamCount() // Actualizo el badge cuando se elimine el Pokémon elegido
}

// Llamo a la función para mostrar el equipo al cargar la página
displayTeam()
