export function shorten(str: string, max: number) {
  if (str.length <= max) {
    return str;
  }
  return str.slice(0, max - 11) + '...' + str.slice(-8);
}

export function UCFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(text: string) {
  if (!(typeof text === 'string')) {
    console.error(`string expected, ${typeof text} provided`);
    return text;
  }

  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export function camelToSnakeCase(text: string) {
  if (!(typeof text === 'string')) {
    console.error(`string expected, ${typeof text} provided`);
    return text;
  }
  return text.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function snakeToCamelCase(text: string): string {
  if (!(typeof text === 'string')) {
    console.error(`string expected, ${typeof text} provided`);
    return text;
  }
  return text.toLowerCase().replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
}
