const characters = require('./mocks/characters')

function findCharacter(id) {
  return characters.find((character) => character.id === Number(id))
}

module.exports = {
  Query: {
    characters: () => characters,

    character: (_, { id }) => findCharacter(id),

    students: () => characters.filter((character) => character.hogwartsStudent),

    staff: () => characters.filter((character) => character.hogwartsStaff),

    nonRelatedToHogwarts: () =>
      characters.filter(
        (character) => !character.hogwartsStudent && !character.hogwartsStaff
      ),
  },

  Mutation: {
    createCharacter: (_, { character }) => {
      const nextId = characters[characters.length - 1].id + 1

      character.id = nextId
      character.alive = true
      character.hogwartsStudent = false
      character.hogwartsStaff = false

      characters.push(character)

      return character
    },

    buyWand: (_, { id }) => {
      const character = findCharacter(id)

      const availableWoods = ['oak', 'cherry', 'walnut', 'birch']

      const availableCores = [
        'phoenix feather',
        'dragon heartstring',
        'unicorn tail-hair',
      ]

      const wand = {
        wood: availableWoods[Math.floor(Math.random() * availableWoods.length)],
        core: availableCores[Math.floor(Math.random() * availableCores.length)],
        length:
          Math.round((Math.random() * (18 - 8) + 8 + Number.EPSILON) * 100) /
          100,
      }

      character.wand = wand

      return wand
    },

    sortingCeremony: (_, { id }) => {
      const character = findCharacter(id)

      const houses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff']

      character.house = houses[Math.floor(Math.random() * houses.length)]
      character.hogwartsStudent = true

      return character.house
    },
  },
}
