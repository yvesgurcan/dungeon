export const Functions = {
  IndefiniteArticle(word, capitalize) {
    if (word) {

      const Vowels = ["a","e","i","u","o"]

      if (isNaN(word) && Vowels.includes(word[0].toLowerCase())) {
        if (capitalize) {
          return "An"
        }
        else {
          return "an"
        }
      }
      else {
        if (capitalize) {
          return "A"
        }
        else {
          return "a"
        }
      }
    }
    else {
      return ""
    }
  }
}

export default Functions