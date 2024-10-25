const teamCount = document.querySelectorAll('.team-count')

// Función para actualizar el badge de la cantidad de Pokémon en Mi Equipo
function updateTeamCount() {
  const team = JSON.parse(localStorage.getItem('pokemonTeam')) || []
  teamCount.forEach((badge) => {
    badge.textContent = team.length
  })
}

// Llamo a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', updateTeamCount)
