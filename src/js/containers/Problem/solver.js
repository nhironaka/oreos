export default function solver(input) {
  function merge(intervals) {
    const merged = [];
    const sorted = intervals.sort((b, a) => {
      if (a[0] === b[0]) {
        return b[1] - a[1];
      }
      return b[0] - a[0];
    });

    for (let i = 0; i < intervals.length; i++) {
      const lastRtnEnd = i === 0 ? 0 : merged[merged.length - 1][1];
      if (i === 0 || sorted[i][0] > lastRtnEnd) {
        merged.push(sorted[i]);
      } else {
        merged[merged.length - 1][1] = Math.max(lastRtnEnd, sorted[i][1]);
      }
    }

    return merged;
  }
  return JSON.stringify(merge(input));
}
