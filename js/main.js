const pokemonList = document.querySelector('#pokemonList')
const btnHeader = document.querySelectorAll('.btn-header')
const url = 'https://pokeapi.co/api/v2/pokemon/'

for (let i = 1; i <= 151; i++) {
    fetch(url + i).then((response) => response.json()).then(data => showPokemon(data))
}

function showPokemon(data) {

    let types = data.types.map((type) => `<p class="${type.type.name} type">${type.type.name}</p>`)
    types = types.join('')

    let pokeId = data.id.toString()
    if (pokeId.length === 1) {
        pokeId = '00' + pokeId
    } else if (pokeId.length === 2) {
        pokeId = '0' + pokeId
    }

    const div = document.createElement('div')
    div.classList.add('pokemon')
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-image">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="">
        </div>
        <div class="pokemon-info">
            <div class="name-container">
                <p class="pokemo-id">#${pokeId}</p>
                <h2 class="pokemon-name">${data.name}</h2>
            </div>
            <div class="type-pokemon">
                ${types}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${data.height}m</p>
                <p class="stat">${data.weight}g</p>
            </div>
        </div>
    `;
    pokemonList.appendChild(div);
}

btnHeader.forEach(button => button.addEventListener('click', (event) => {
    const btnId = event.currentTarget.id;

    pokemonList.innerHTML = '';

    for (let i = 1; i <= 151; i++) {
        fetch(url + i).then((response) => response.json()).then(data => {

            if (btnId === 'all') {
                showPokemon(data);
            } else {
                const types = data.types.map(type => type.type.name)
                if (types.some(type => type.includes(btnId))) {
                    showPokemon(data);
                }
            }
        })
    }
}))







