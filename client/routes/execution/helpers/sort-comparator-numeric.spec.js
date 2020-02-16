import sortComparatorNumeric from './sort-comparator-numeric';

const LIST_ASCENDING_ORDER = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const LIST_DESCENDING_ORDER = [
  {
    id: 3,
  },
  {
    id: 2,
  },
  {
    id: 1,
  },
];

describe('sortComparatorNumeric', () => {
  const initList = () => {
    return [
      {
        id: 3,
      },
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];
  };

  describe('when key = id', () => {
    describe('and ascending = true', () => {
      it('should sort the list into ascending order.', () => {
        const list = initList();

        list.sort(sortComparatorNumeric('id', true));
        expect(list).toEqual(LIST_ASCENDING_ORDER);
      });
    });
    describe('and ascending = false', () => {
      it('should sort the list into descending order.', () => {
        const list = initList();

        list.sort(sortComparatorNumeric('id', false));
        expect(list).toEqual(LIST_DESCENDING_ORDER);
      });
    });
  });
});
