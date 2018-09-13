class Highlight {

    startOffset: number;
    endOffset: number;
    color: string;
    priority: number;

    constructor(startOffset: number, endOffset: number, color: string, priority: number) {
        this.startOffset = startOffset;
        this.endOffset = endOffset;
        this.color = color;
        this.priority = priority;
    }
}