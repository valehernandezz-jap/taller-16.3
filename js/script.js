const regionSelect = document.getElementById('region-select')
const pokemonList = document.getElementById('pokemon-list')

// Caché de los datos de los Pokémon
const pokemonCache = {}

// Función para obtener las regiones desde la PokéAPI
fetch('https://pokeapi.co/api/v2/pokedex/')
  .then((response) => response.json())
  .then(({ results }) => {
    results.forEach((region) => {
      const option = document.createElement('option')
      option.value = region.url
      option.textContent = region.name.charAt(0).toUpperCase() + region.name.slice(1)
      regionSelect.appendChild(option)
    })
  })

// Evento que se dispara cuando selecciono una región
regionSelect.addEventListener('change', () => {
  const regionUrl = regionSelect.value
  if (regionUrl) {
    fetchPokemonList(regionUrl)
  }
})

// Función para obtener los pokémon de una región específica
function fetchPokemonList(regionUrl) {
  fetch(regionUrl)
    .then((response) => response.json())
    .then(({ pokemon_entries }) => {
      const pokemonEntries = pokemon_entries.slice(0, 50) // Limito a 50 Pokémon
      displayPokemonList(pokemonEntries)
    })
}

// Función para mostrar los Pokémon y almacenar en caché
function displayPokemonList(pokemonEntries) {
  pokemonList.innerHTML = '' // Limpio la lista

  pokemonEntries.forEach(({ pokemon_species: { url } }) => {
    const pokemonUrl = url

    // Verifico si el Pokémon ya está en caché
    if (pokemonCache[pokemonUrl]) {
      // Si está en caché, uso los datos guardados
      renderPokemonCard(pokemonCache[pokemonUrl])
    } else {
      // Si no está en caché, hago la solicitud
      fetch(pokemonUrl)
        .then((response) => response.json())
        .then((pokemonData) => {
          fetch(pokemonData.varieties[0].pokemon.url)
            .then((response) => response.json())
            .then((pokemonDetails) => {
              // Almaceno en caché los detalles del Pokémon
              pokemonCache[pokemonUrl] = pokemonDetails
              renderPokemonCard(pokemonDetails)
            })
        })
    }
  })
}

// Función para renderizar la card de Pokémon
function renderPokemonCard({ sprites: { front_default }, types, name, id }) {
  const pokemonElement = document.createElement('div')
  pokemonElement.classList.add(
    'col-sm-12',
    'col-md-4',
    'col-lg-2',
    'text-center'
  )
  const pokemonImage = front_default
  const pokemonTypes = types.map((type) => type.type.name).join(', ')

  pokemonElement.innerHTML = `
    <div class="card">
      <img src="${pokemonImage}" class="card-img-top" alt="${name}" loading="lazy">
      <div class="card-body">
        <h3 class="card-title">${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
        <p class="card-text text-light"><strong>Tipo:</strong> ${pokemonTypes}</p>
        <button class="btn btn-primary btn-sm add-to-team" data-name="${name}" data-img="${pokemonImage}" data-id="${id}">
          <i class="bi bi-plus-lg me-2"></i>
          Agregar
        </button>
      </div>
    </div>
  `
  pokemonList.appendChild(pokemonElement)

  // Agrego el evento para agregar a Mi Equipo
  pokemonElement
    .querySelector('.add-to-team')
    .addEventListener('click', addToTeam)
}

// Función para agregar a Mi Equipo el Pokémon elegido
function addToTeam(event) {
  const pokemonName = event.target.getAttribute('data-name')
  const pokemonImg = event.target.getAttribute('data-img')
  const pokemonId = event.target.getAttribute('data-id')

  // Guardo los datos en el localStorage
  let team = JSON.parse(localStorage.getItem('pokemonTeam')) || []
  team.push({ id: pokemonId, name: pokemonName, img: pokemonImg })
  localStorage.setItem('pokemonTeam', JSON.stringify(team))

  Swal.fire({
    icon: 'success',
    title: '✅ ¡Éxito!',
    text: `${pokemonName} fue agregado a tu equipo!`,
    showConfirmButton: false, // No muestra el botón de confirmación
    timer: 2000,              // Se cierra automáticamente después de 2 segundo
    background: '#080605',
    color: '#fff',
    padding: '4em'
  })

  updateTeamCount() // Actualizo el badge cuando se agregue un nuevo Pokémon
}
