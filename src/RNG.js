const Alea = require('alea');

const VOWELS = [
    { value: 'a', probability: 81 },
    { value: 'e', probability: 110 },
    { value: 'i', probability: 50 },
    { value: 'o', probability: 50 },
    { value: 'u', probability: 27 },
    { value: 'y', probability: 25 }
];

const VOWELS_LETTERS = VOWELS.map(object => object.value);

const CONSONANTS = [
    { value: 'b', probability: 14 },
    { value: 'c', probability: 27 },
    { value: 'd', probability: 42 },
    { value: 'f', probability: 22 },
    { value: 'g', probability: 20 },
    { value: 'h', probability: 50 },
    { value: 'j', probability: 1 },
    { value: 'k', probability: 7 },
    { value: 'l', probability: 40 },
    { value: 'm', probability: 24 },
    { value: 'n', probability: 67 },
    { value: 'p', probability: 19 },
    { value: 'q', probability: 1 },
    { value: 'r', probability: 59 },
    { value: 's', probability: 63 },
    { value: 't', probability: 90 },
    { value: 'v', probability: 9 },
    { value: 'w', probability: 23 },
    { value: 'x', probability: 1 },
    { value: 'z', probability: 1 }
];

const CONSONANTS_LETTERS = CONSONANTS.map(object => object.value);

const COMPOUND = ['-', "'"];

const MIN_NAME_LENGTH_FOR_COMPOUND_CHARACTER = 4;
const MIN_POSITION_FOR_COMPOUND_CHARACTER = 3;
const MAX_POSITION_TO_END_FOR_COMPOUND_CHARACTER = 3;

// RNG is not a singleton class.
class RNG {
    init(seed) {
        if (!this.rng) {
            this.seed = seed === undefined ? this.newSeed : seed;
            this.rng = new Alea(this.seed);
            return this;
        } else {
            throw new Error('RNG already initialized.');
        }
    }

    initUnseeded() {
        if (!this.rng) {
            this.rng = new Alea();
            return this;
        } else {
            throw new Error('RNG already initialized.');
        }
    }

    get newSeed() {
        return Math.random();
    }

    get next() {
        return this.rng();
    }

    get name() {
        const nameLength = this.range(4, 9);

        let name = '';
        let hasCompoundCharacter = false;
        for (let i = 0; i < nameLength; i++) {
            let character;
            const penultimateCharacter = name[name.length - 2] || '';
            const lastCharacter = name[name.length - 1] || '';
            const compoundCharacter = this.pickElement(COMPOUND);
            if (
                // compound character is not suitable for short names
                nameLength >= MIN_NAME_LENGTH_FOR_COMPOUND_CHARACTER &&
                // compound character is not suitable as first letter
                name &&
                // compound character is not suitable as last letter
                name.length !== nameLength - 1 &&
                // only one compound character per name
                !hasCompoundCharacter &&
                // name must already be a certain size
                name.length >= MIN_POSITION_FOR_COMPOUND_CHARACTER &&
                // name can not be already greater than a certain size
                name.length <
                    nameLength - MAX_POSITION_TO_END_FOR_COMPOUND_CHARACTER &&
                // compound characters can't be consecutive
                !COMPOUND.includes(lastCharacter) &&
                // the same compound character can't appear more than once
                !name.includes(compoundCharacter) &&
                // 20% chance of having a compound character
                this.chance(0.2)
            ) {
                character = compoundCharacter;
                hasCompoundCharacter = true;
            } else {
                if (
                    // can't have more than 2 consecutive consonants
                    (!VOWELS_LETTERS.includes(lastCharacter) &&
                        !VOWELS_LETTERS.includes(penultimateCharacter)) ||
                    // 25% chance that vowels will be consecutive
                    ((this.chance(0.25) ||
                        !VOWELS_LETTERS.includes(lastCharacter)) &&
                        // 80% chance of having a vowel
                        this.chance(0.8))
                ) {
                    character = this.pickElementDistributed(VOWELS);
                } else {
                    if (
                        CONSONANTS_LETTERS.includes(lastCharacter) &&
                        // 40% chance of repeating the same consonant
                        this.chance(0.4)
                    ) {
                        character = lastCharacter;
                    } else {
                        character = this.pickElementDistributed(CONSONANTS);
                    }
                }
            }

            name += character;
        }

        return name && name[0].toUpperCase() + name.slice(1);
    }

    range(min = 0, max = 100) {
        if (min > max) {
            throw new Error(`Min "${min}" greater than max "${max}".`);
        }

        return Math.floor(this.rng() * (max - min + 1)) + min;
    }

    // each element has an equal chance of being picked
    // e.g.: ['mace', 'sword', 'bow', 'health potion']
    pickElement(array) {
        if (array.length === 0) {
            return null;
        }

        const index = this.range(0, array.length - 1);

        return array[index];
    }

    // each element has a custom probability to be picked
    // e.g.: [{ value: 'cave', probablity: 0.1, value: 'forest', probablity: 0.15 }]
    pickElementDistributed(arrayWithProbabilities) {
        let max = 0;
        const arrayWithCumulativeProbabilities = arrayWithProbabilities.reduce(
            (array, element) => {
                array.push({
                    ...element,
                    threshold: max
                });
                max = Number(
                    Number.parseFloat(max + element.probability).toPrecision(2)
                );
                return array;
            },
            []
        );

        const randomValue = this.next * max;

        const firstElement = arrayWithCumulativeProbabilities[0];
        let selectedValue =
            firstElement.value === undefined
                ? firstElement
                : firstElement.value;
        for (let i = arrayWithCumulativeProbabilities.length - 1; i > 0; i--) {
            const element = arrayWithCumulativeProbabilities[i];
            if (randomValue > element.threshold) {
                selectedValue =
                    element.value === undefined ? element : element.value;
                break;
            }
        }
        return selectedValue;
    }

    // checks if a randomly generated number is below or equal to a certain threshold/probability
    // e.g.: 0.8 means that there is 80% chance that the check will succeed
    chance(probability, description) {
        const randomValue = this.next;
        const actualized = probability >= randomValue;
        console.debug(
            description
                ? { description, probability, randomValue, actualized }
                : '__QUIET__'
        );
        return actualized;
    }
}

module.exports = RNG;
