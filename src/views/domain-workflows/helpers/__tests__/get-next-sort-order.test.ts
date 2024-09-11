// TODO @adhitya.mamallan
// This was a unit test for getNextSortOrder, but toggleSortOrder in utils/sort-by does the same thing
// I've removed this helper, but I'll refactor utils/sort-by and reuse this test in a follow-up PR

// import getNextSortOrder from '../get-next-sort-order';

// describe(getNextSortOrder.name, () => {
//   it('inverts sort order of current column (ASC -> DESC)', () => {
//     expect(
//       getNextSortOrder({
//         currentColumn: 'columnA',
//         nextColumn: 'columnA',
//         currentSortOrder: 'ASC',
//       })
//     ).toEqual('DESC');
//   });

//   it('inverts sort order of current column (DESC -> ASC)', () => {
//     expect(
//       getNextSortOrder({
//         currentColumn: 'columnA',
//         nextColumn: 'columnA',
//         currentSortOrder: 'DESC',
//       })
//     ).toEqual('ASC');
//   });

//   it('gets ASC sort order for new column', () => {
//     expect(
//       getNextSortOrder({
//         currentColumn: 'columnA',
//         nextColumn: 'columnB',
//         currentSortOrder: 'DESC',
//       })
//     ).toEqual('DESC');
//   });
// });
