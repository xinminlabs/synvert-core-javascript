const convertMatchToSpaces = (match: string) => " ".repeat(match.length);

/**
 * Encode html string, leave only javascript code, replace other html code with whitespace.
 * @param str {string} html string
 * @returns {string} encoded string
 */
export function encode(str: string): string {
  return str.replace(/<\/script>.*?<script.*?>/gsi, convertMatchToSpaces)
            .replace(/^.*?<script.*?>/si, convertMatchToSpaces)
            .replace(/<\/script>.*?$/si, convertMatchToSpaces);
}