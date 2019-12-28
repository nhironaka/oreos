function compareIntervals(a, b) {
  return a[0] === b[0] || a[0] <= b[1] || b[1] <= a[0];
}

export default function problem({ intervals }) {
  const merged = [];
  const sorted = intervals.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return b[0] - a[0];
  });

  for (let i = 0; i < sorted.length - 1; ) {
    let j = 0;
    while (i + j + 1 < sorted.length && compareIntervals(sorted[i], sorted[i + j + 1])) {
      j++;
    }
    if (compareIntervals(sorted[i], sorted[i + j])) {
      merged.push([sorted[i][0], Math.max(sorted[i][1], sorted[i + j][1])]);
    } else {
      merged.push(sorted[i]);
      j = 1;
    }
    i += j;
  }

  return merged;
}
