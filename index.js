const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => { 
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); 

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    } // Status 200: OK Mostra o pokemon

    
} // await só funciona em uma function async

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    // Pega o name e id do API e mostra na tag <span>

    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; // Esse caminho é o caminho para pegar a imagem no API

    input.value = ''; // Limpa o valor sempre que o valor do input é enviado
    searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase()); // toLowerCase transforma todo o texto em input em minúsculo
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);