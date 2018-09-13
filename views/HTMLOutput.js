///<reference path="../models/Letter.ts"/>
var HTMLOutput = /** @class */ (function () {
    function HTMLOutput(letters, target) {
        this.letters = letters;
        this.target = target;
    }
    HTMLOutput.span = function (lastColor, text) {
        return "<span style=\"background-color:" +
            lastColor +
            "\">" +
            text +
            "</span>";
    };
    HTMLOutput.prototype.get = function () {
        var output = [];
        var lastColor = undefined;
        var outputLetters = [];
        for (var i = 0; i < this.letters.length; i++) {
            var letter = this.letters[i];
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
    };
    HTMLOutput.prototype.render = function () {
        this.target.innerHTML = this.get();
    };
    return HTMLOutput;
}());
//# sourceMappingURL=HTMLOutput.js.map