function getTypesAndWeaknesses(pokemon) {
    const totalTypes = {};
    const totalWeaknesses = {};
    let type = [];
    let weaknesses = [];
    let poke = {};

    for (let i = 0; i < pokemon.length; i++) {
        poke = pokemon[i];
        type = poke.type;
        weaknesses = poke.weaknesses;

        for (let j = 0; j < type.length; j++) {
            if (!(type[j] in totalTypes)) {
                totalTypes[type[j]] = false;
            }
        }

        for (let j = 0; j < weaknesses.length; j++) {
            if (!(weaknesses in totalWeaknesses)) {
                totalWeaknesses[weaknesses[j]] = false;
            }
        }
    }

    return {
        types: totalTypes,
        weaknesses: totalWeaknesses,
    }
}

export default getTypesAndWeaknesses;
