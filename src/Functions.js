export const Functions = {
    IndefiniteArticle(word, capitalize) {
        if (word) {
            const Vowels = ['a', 'e', 'i', 'u', 'o'];

            if (isNaN(word) && Vowels.includes(word[0].toLowerCase())) {
                if (capitalize) {
                    return 'An';
                } else {
                    return 'an';
                }
            } else {
                if (capitalize) {
                    return 'A';
                } else {
                    return 'a';
                }
            }
        } else {
            return '';
        }
    },

    RandomIntegerFromRange(min, max) {
        return (
            Math.floor(
                Math.random() * (Math.floor(max) - Math.floor(min) + 1)
            ) + Math.floor(min)
        );
    },

    RandomFloatFromRange(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
};

export default Functions;
