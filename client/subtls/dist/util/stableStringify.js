export default function stableStringify(x, replacer = (_, v) => v, indent) {
    const deterministicReplacer = (k, v) => replacer(k, typeof v !== 'object' || v === null || Array.isArray(v) ? v :
        Object.fromEntries(Object.entries(v).sort(([ka], [kb]) => ka < kb ? -1 : ka > kb ? 1 : 0)));
    return JSON.stringify(x, deterministicReplacer, indent);
}
