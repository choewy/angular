import { Row } from './types';

export class SwapService {
  public swapSequence(
    rows: Array<Row>,
    from: number,
    to: number,
    current: Row,
    target: Row,
  ): void {
    const [start, end] = [from, to].sort((x, y) => x - y);
    const [alpha, omega] =
      current.sequence - target.sequence > 0 ? [-1, 0] : [0, 1];

    const increment = alpha + omega;
    const reverse = increment * -1;

    rows
      .filter(
        (row) => row.sequence > start + alpha && row.sequence < end + omega,
      )
      .forEach((row) => {
        row.sequence = row.sequence + reverse;
      });

    current.sequence = target.sequence + increment;
  }
}
