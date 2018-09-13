///<reference path="models/Highlight.ts"/>
///<reference path="models/Letter.ts"/>
///<reference path="views/HTMLOutput.ts"/>
var HighlighterApp = /** @class */ (function () {
    function HighlighterApp() {
        this.highlights = [];
        this.letters = [];
    }
    HighlighterApp.prototype.highlight = function (highlights, selectorForEmptyDiv, text) {
        this.target = document.querySelector(selectorForEmptyDiv);
        if (this.target == undefined) {
            console.log("No Target Found");
            return;
        }
        this.parseHighlights(highlights);
        this.parseLetters(text);
        this.applyHighlights();
        var output = new HTMLOutput(this.letters, this.target);
        output.render();
    };
    HighlighterApp.prototype.parseHighlights = function (highlights) {
        for (var i = 0; i < highlights.length; i++) {
            var h = highlights[i];
            this.highlights.push(new Highlight(h["startOffset"], h["endOffset"], h["color"], h["priority"]));
        }
        this.highlights.sort(HighlighterApp.compareHighlights);
    };
    HighlighterApp.prototype.parseLetters = function (string) {
        this.letters = [];
        for (var i = 0; i < string.length; i++) {
            var character = string[i];
            var letter = new Letter(character);
            this.letters.push(letter);
        }
    };
    HighlighterApp.prototype.applyHighlights = function () {
        for (var h = 0; h < this.highlights.length; h++) {
            var highlight = this.highlights[h];
            for (var i = highlight.startOffset; i < highlight.endOffset; i++) {
                this.letters[i].color = highlight.color;
            }
        }
    };
    HighlighterApp.compareHighlights = function (h1, h2) {
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
    };
    return HighlighterApp;
}());
//# sourceMappingURL=HighlighterApp.js.map