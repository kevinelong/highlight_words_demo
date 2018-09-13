///<reference path="models/Highlight.ts"/>
///<reference path="models/Letter.ts"/>
///<reference path="views/HTMLOutput.ts"/>

class HighlighterApp {

    private highlights: Array<Highlight> = [];
    private letters: Array<Letter> = [];
    private target: Element;


    public highlight(highlights: Array<object>, selectorForEmptyDiv: string, text: string) {

        this.target = document.querySelector(selectorForEmptyDiv);

        if (this.target == undefined) {
            console.log("No Target Found");
            return;
        }

        this.parseHighlights(highlights);
        this.parseLetters(text);

        this.applyHighlights();

        let output = new HTMLOutput(this.letters, this.target);
        output.render();

    }


    private parseHighlights(highlights: Array<object>) {

        for (let i = 0; i < highlights.length; i++) {
            let h = highlights[i];
            this.highlights.push(new Highlight(h["startOffset"], h["endOffset"], h["color"], h["priority"]));
        }

        this.highlights.sort(HighlighterApp.compareHighlights);

    }


    private parseLetters(string) {

        this.letters = [];

        for (let i = 0; i < string.length; i++) {
            let character = string[i];
            let letter = new Letter(character);
            this.letters.push(letter);
        }
    }


    private applyHighlights() {

        for (let h = 0; h < this.highlights.length; h++) {

            let highlight = this.highlights[h];

            for (let i = highlight.startOffset; i < highlight.endOffset; i++) {
                this.letters[i].color = highlight.color;
            }
        }
    }


    protected static compareHighlights(h1: Highlight, h2: Highlight) {

        //Sort primarily by priority
        if (h1.priority > h1.priority) {
            return -1;
        }
        if (h1.priority < h2.priority) {
            return 1;
        }

        //Sort secondarily by startOffset
        if (h1.startOffset < h1.startOffset) {
            return -1;
        }
        if (h1.startOffset > h2.startOffset) {
            return 1;
        }

        //Sort lastly by startOffset
        if (h1.endOffset < h1.endOffset) {
            return -1;
        }
        if (h1.endOffset > h2.endOffset) {
            return 1;
        }

        return 0;
    }

}