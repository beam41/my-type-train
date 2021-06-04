export class PrevSentence {
  sentence: string
  inputSentence: string

  constructor(sentence: any, inputSentence: any) {
    this.sentence = sentence
    this.inputSentence = inputSentence
  }

  get isIncorrect(): boolean {
    if (this.inputSentence.length === 0) {
      return true
    }
    return !new RegExp(`^${this.inputSentence}`).test(this.sentence)
  }
}
