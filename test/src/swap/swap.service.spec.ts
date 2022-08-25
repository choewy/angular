import { SwapService } from './swap.service';
import { Row } from './types';

describe('SwapService', () => {
  let swapService: SwapService;
  let rows: Row[];

  beforeAll(() => {
    swapService = new SwapService();
  });

  beforeEach(() => {
    rows = [...Array(10)].map((_, i) => ({
      id: i + 1,
      sequence: i + 1,
    }));
  });

  describe('SwapService 정확도 테스트', () => {
    it('테스트 케이스 #1"', () => {
      const [from, to] = [2, 5];
      const current = rows[from - 1];
      const target = rows[to - 1];
      swapService.swapSequence(rows, from, to, current, target);
      expect(rows.sort((x, y) => x.sequence - y.sequence)).toEqual([
        { id: 1, sequence: 1 },
        { id: 3, sequence: 2 },
        { id: 4, sequence: 3 },
        { id: 5, sequence: 4 },
        { id: 2, sequence: 5 },
        { id: 6, sequence: 6 },
        { id: 7, sequence: 7 },
        { id: 8, sequence: 8 },
        { id: 9, sequence: 9 },
        { id: 10, sequence: 10 },
      ]);
    });

    it('테스트 케이스 #2"', () => {
      const [from, to] = [5, 2];
      const current = rows[from - 1];
      const target = rows[to - 1];
      swapService.swapSequence(rows, from, to, current, target);
      expect(rows.sort((x, y) => x.sequence - y.sequence)).toEqual([
        { id: 1, sequence: 1 },
        { id: 5, sequence: 2 },
        { id: 2, sequence: 3 },
        { id: 3, sequence: 4 },
        { id: 4, sequence: 5 },
        { id: 6, sequence: 6 },
        { id: 7, sequence: 7 },
        { id: 8, sequence: 8 },
        { id: 9, sequence: 9 },
        { id: 10, sequence: 10 },
      ]);
    });
  });
});
