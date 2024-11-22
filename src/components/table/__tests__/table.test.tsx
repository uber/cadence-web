import React from 'react';

import { render, screen, fireEvent, act } from '@/test-utils/rtl';

import Table from '../table';
import { type TableConfig } from '../table.types';

type TestDataT = {
  value: string;
};

const SAMPLE_DATA_NUM_ROWS = 10;
const SAMPLE_DATA_NUM_COLUMNS = 5;

const SAMPLE_ROWS: Array<TestDataT> = Array.from(
  { length: SAMPLE_DATA_NUM_ROWS },
  (_, rowIndex) => ({ value: `test_${rowIndex}` })
);

function getMockRenderCell(index: number) {
  return ({ value }: TestDataT) => {
    return `data_${value}_${index}`;
  };
}

const SAMPLE_COLUMNS = [
  {
    name: 'Column name 0',
    id: 'column_id_0',
    sortable: true,
    renderCell: getMockRenderCell(0),
    width: '20%',
  },
  {
    name: 'Column name 1',
    id: 'column_id_1',
    sortable: true,
    renderCell: getMockRenderCell(1),
    width: '20%',
  },
  {
    name: 'Column name 2',
    id: 'column_id_2',
    sortable: true,
    renderCell: getMockRenderCell(2),
    width: '20%',
  },
  {
    name: 'Column name 3',
    id: 'column_id_3',
    sortable: true,
    renderCell: getMockRenderCell(3),
    width: '20%',
  },
  {
    name: 'Column name 4',
    id: 'column_id_4',
    sortable: true,
    renderCell: getMockRenderCell(4),
    width: '20%',
  },
] as const satisfies TableConfig<TestDataT>;

describe('Table', () => {
  it('should render without error', async () => {
    setup({ shouldShowResults: true });

    expect(await screen.findByText('Sample end message')).toBeDefined();
    expect(screen.queryAllByText(/Column Name \d+/)).toHaveLength(
      SAMPLE_DATA_NUM_COLUMNS
    );
    expect(screen.queryAllByText(/data_test_\d+_\d+/)).toHaveLength(
      SAMPLE_DATA_NUM_ROWS * SAMPLE_DATA_NUM_COLUMNS
    );
  });

  it('should render empty if shouldShowResults is false, even if data is present', async () => {
    setup({ shouldShowResults: false });

    expect(await screen.findByText('Sample end message')).toBeDefined();
    expect(screen.queryAllByText(/Column Name \d+/)).toHaveLength(
      SAMPLE_DATA_NUM_COLUMNS
    );
    expect(screen.queryAllByText(/data_test_\d+_\d+/)).toHaveLength(0);
  });

  it('should call onSort when the table column is clicked', async () => {
    const { mockOnSort } = setup({ shouldShowResults: true });

    const columnElements = await screen.findAllByText(/Column Name \d+/);

    act(() => {
      fireEvent.click(columnElements[0]);
    });

    expect(mockOnSort).toHaveBeenCalledWith('column_id_0');
  });
});

function setup({ shouldShowResults }: { shouldShowResults: boolean }) {
  const mockOnSort = jest.fn();
  render(
    <Table
      data={SAMPLE_ROWS}
      columns={SAMPLE_COLUMNS}
      shouldShowResults={shouldShowResults}
      endMessage={<div>Sample end message</div>}
      onSort={mockOnSort}
      sortColumn={SAMPLE_COLUMNS[SAMPLE_DATA_NUM_COLUMNS - 1].id}
      sortOrder="DESC"
    />
  );
  return { mockOnSort };
}
