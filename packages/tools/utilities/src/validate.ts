export function emailIsValid(email: string): boolean {
  if (!(typeof email === 'string')) {
    console.error(`string expected, ${typeof email} provided`);
    return false;
  }
  const expression = /\S+@\S+\.\S+/;
  return expression.test(email);
}
