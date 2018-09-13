///<reference path="../models/Letter.ts"/>

class HTMLOutput {

    letters: Array<Letter>;
    target: Element;

    constructor(letters: Array<Letter>, target: Element) {
        this.letters = letters;
        this.target = target;
    }

    private static span(lastColor: string, text: string) {
        return "<span style=\"background-color:" +
            lastColor +
            "\">" +
            text +
            "</span>";
    }

    public get(): string {

        let output = [];
        let lastColor = undefined;
        let outputLetters = [];

        for (let i = 0; i < this.letters.length; i++) {

            let letter = this.letters[i];

            // Defer rendering span until color change to avoid unnecessary spans.
            if (letter.color != lastColor && lastColor != undefined) {
                output.push(HTMLOutput.span(lastColor, outputLetters.join('')));
                outputLetters = [];
            }

            outputLetters.push(letter.value);

            lastColor = letter.color;

        }

        output.push(HTMLOutput.span(lastColor, outputLetters.join('')));

        return output.join('');
    }

    public render() {
        this.target.innerHTML = this.get();
    }

}