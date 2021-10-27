/*
1. Research the PokeAPI to learn how I might get a random Pokemon to show the user.
    -How to randomize?
2. Research how to use CSS(or something) to create a silhouette of the Pokemon, based on the front_default sprite(image).
*/

const LAST_POKEMON_ID = 809 //End of Generation 7

const main = document.querySelector("main")
const getRandomId = (maxId = LAST_POKEMON_ID) => {
    return Math.floor(Math.random() * maxId + 1)
}

const toNameCase = word => word[0].toUpperCase() + word.slice(1)

fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomId()}`)
    .then(response => response.json())
    .then(renderPokemon)

    function renderPokemon(pokemon) {
        const sprite = document.createElement("img")
        sprite.src = pokemon.sprites.front_default
        sprite.classList.add("sprite", "silhouette")
        sprite.dataset.pokemon = pokemon.name

        const h3 = document.createElement("h3")
        h3.classList.add("pokemon-title", "hidden")
        h3.append(toNameCase(pokemon.name))
        
        main.append(sprite)
        main.append(h3)
    }

document
    .querySelector("#pokemon-guess-form")
    .addEventListener("submit", event => {
        event.preventDefault()

        const form = event.target
        const guess = form.elements.guess.value.toLowerCase()
        const pokemonElement = document.querySelector("main > .sprite")
        if (guess === pokemonElement.dataset.pokemon) {
           pokemonElement.classList.add("glow") 
        }
        pokemonElement
            .classList
            .remove("silhouette")

        document.querySelector("main > .pokemon-title")
        .classList
        .remove("hidden")

    })