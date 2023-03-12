export function measureTime<T extends (...args: any[]) => any>(func: T, label: string) {
  if (typeof func !== 'function') {
    console.error(`func must be a valid function, ${typeof func} provided`);
    return;
  }
  console.time(label);
  func();
  console.timeEnd(label);
}
