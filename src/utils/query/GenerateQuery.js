export function GenerateQuery(query) {
  const queries = [
    'INNER',
    'JOIN',
    'UPDATE',
    'DELETE',
    'BY',
    'IN',
    'LEFT',
    'RIGHT',
    'TRIGGER',
    'PROCEDURE',
  ];

  while (query.length < 10) {
    let random = queries[Math.floor(Math.random() * queries.length)];
    if (query.indexOf(random) === -1) {
      query.push(random);
    } else {
      continue;
    }
  }

  query = Shuffle(query);
  return query;
}

function Shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
