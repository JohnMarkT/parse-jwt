const formatCode = (code) => `\x1b[${code}m`;
const formatValues = (obj) => Object.fromEntries(Object.entries(obj).map(([ key, value ]) => [ key, formatCode(value) ]));

const baseCodes = {
    reset: 0,
    bright: 1,
    dim: 2,
    underscore: 4,
    blink: 5,
    reverse: 7,
    hidden: 8
};

const foregroundCodes = {
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37
};

const backgroundCodes = {
    black: 40,
    red: 41,
    green: 42,
    yellow: 43,
    blue: 44,
    magenta: 45,
    cyan: 46,
    white: 47
};

const base = formatValues(baseCodes);
const foreground = formatValues(foregroundCodes);
const background = formatValues(backgroundCodes);

const colorize = (text, color, fg = true) => {
    const colorSet = fg ? foreground : background;
    const colorCode = colorSet[color] || base.reset;

    return `${colorCode}${text}${base.reset}`;
}

export {
    base,
    foreground,
    background,
    colorize
}