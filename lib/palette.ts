
class Palette {

    black: string = '#080808';
    white: string = '#fefefe';
    pink: string = '#ff85a2';
    mint: string = '#a6f0c6';
    lavender: string = '#d7b9ff';
    peach: string = '#ffb27d';
    sky: string = '#87ceeb';
    lemon: string = '#f7ff52';
    navy: string = '#000080';
    maroon: string = '#800000';
    forest: string = '#228b22';
    carrot: string = '#fc5e33';
    plum: string = '#dda0dd';
    chocolate: string = '#d2691e';
    teal: string = '#008080';
    ocean: string = '#328ecc';
    deep: string = '#212377';
    grey: string = '#999999';
    mist: string = '#f3f3f3';
    dark: string = '#212837';
    emphasis: string = '#aa2233';
    snow: string = '#f9f9ff';

    constructor() {
        Object.freeze(this);
    }
}

export const palette  = new Palette();