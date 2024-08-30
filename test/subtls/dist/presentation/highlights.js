import { indentChars } from './appearance.js';
const regex = new RegExp(`  .+|^(${indentChars})+`, 'gm');
const dotColour = 'color: #ddd';
const textColour = 'color: #111';
const mutedColour = 'color: #777';
export function highlightBytes(s, colour) {
    const css = [textColour];
    s = '%c' + s.replace(regex, m => {
        css.push(m.startsWith(indentChars) ? dotColour : `color: ${colour}`, textColour);
        return `%c\u200b${m}\u200b%c`; // note: the zero-length spaces, \u200b, prevent URLs getting mangled
    });
    return [s, ...css];
}
export function highlightColonList(s) {
    const css = [];
    s = s.replace(/^[^:]+:.*$/gm, m => {
        const colonIndex = m.indexOf(':');
        css.push(mutedColour, textColour);
        return `%c${m.slice(0, colonIndex + 1)}%c${m.slice(colonIndex + 1)}`;
    });
    return [s, ...css];
}
