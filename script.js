const pokeApi = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0";

const apiResponse = async (api = pokeApi) => {
    let response = await fetch(api);
    return await response.json();
};

const createTable = async () => {
    const pokes = await apiResponse();
    let tbodyHtml = ``;
    let c = 0;
    await pokes.results.map(async (pokemon, i) => {
        try {
            const pokemonData = await apiResponse(pokemon.url);
            const abilities = pokemonData.abilities.map(ele => ele.ability.name)
            const moves = pokemonData.moves.map(ele => ele.move.name);
            document.querySelector("#tbody").innerHTML += `<tr>
    <td>${i + 1}</td>
    <td>${pokemon.name}</td>
    <td>${pokemonData.weight}</td>
    <td>${abilities}</td>
    <td>${moves}</td>
    </tr>`

            document.getElementById("pokemonTable").hidden = false;
            document.getElementById("loader").hidden = true;

        } catch (error) {
            console.log("error")

        }
    })};
 createTable();
