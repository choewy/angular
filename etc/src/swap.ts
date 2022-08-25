const func = (__from: number, __to: number) => {
  const categories = [
    { id: 1, sequence: 1 },
    { id: 2, sequence: 2 },
    { id: 3, sequence: 3 },
    { id: 4, sequence: 4 },
    { id: 5, sequence: 5 },
    { id: 6, sequence: 6 },
  ];

  const [from, to] = [__from, __to].sort((from, to) => from - to);

  const current = categories.find((category) => category.sequence === __from);
  const next = categories.find((category) => category.sequence === __to);
  if (!current || !next) {
    throw new Error('current or next is undefined');
  }

  const [from_, to_] = current.sequence - next.sequence > 0 ? [-1, 0] : [0, 1];
  const add_ = from_ + to_;
  const reverse_ = add_ * -1;
  categories
    .filter(
      (category) =>
        category.sequence > from + from_ && category.sequence < to + to_,
    )
    .forEach((category) => {
      category.sequence = category.sequence + reverse_;
    });

  current.sequence = next.sequence + add_;

  return categories.sort((x, y) => x.sequence - y.sequence);
};

const test = (from: number, to: number, expect: any[]) => {
  const result = func(from, to);
  console.log(result);
  console.log(expect.toString() === result.toString());
};

const cases = [
  {
    from: 2,
    to: 5,
    expect: [
      { id: 1, sequence: 1 },
      { id: 3, sequence: 2 },
      { id: 4, sequence: 3 },
      { id: 5, sequence: 4 },
      { id: 2, sequence: 5 },
      { id: 6, sequence: 6 },
    ],
  },
  {
    from: 5,
    to: 2,
    expect: [
      { id: 1, sequence: 1 },
      { id: 5, sequence: 2 },
      { id: 2, sequence: 3 },
      { id: 3, sequence: 4 },
      { id: 4, sequence: 5 },
      { id: 6, sequence: 6 },
    ],
  },
];

cases.forEach((c) => {
  const { from, to, expect } = c;
  test(from, to, expect);
});
