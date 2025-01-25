'use strict'

import { Flex } from 'smbls';

const GRID_CELL_SIZE = '1.5rem'

export const GridCell = {
  props:{
    width: GRID_CELL_SIZE,
    height: GRID_CELL_SIZE,
    background: 'rgba(75, 75, 75, 0.3)',
    borderRaduis: '0.1rem',
  }
}
/**
 * generate grid for selection
 * @param {int} rows row number for the grid
 * @param {int} cols column number for the grid
 * @returns 
 */
export const generateGrid = (rows, cols) => {
  const gridChildren = []
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      gridChildren.push({
        state: {
          row: i,
          column: j,
        },
      })
    }
  }
  const grid = {
    props: {  
      display: 'grid',
      gap: '0.3rem',
    },
    style: `grid-template-columns: repeat(${cols}, ${GRID_CELL_SIZE}); grid-template-rows: repeat(${rows}, ${GRID_CELL_SIZE});`,

    childExtend: (gridElement, gridState) => {
        return {
            extend: GridCell,
            // state here means cell state
            props: ({props, state}) => {
                const { selectedRow, selectedColumn } = state.root;
                return {
                    background: (selectedColumn >= state.column && selectedRow >= state.row) ? '#007bff' : '#222222'
                }
            },
            on: {
                click: (event, element, state) => {
                    state.root.update({ selectedRow: state.row, selectedColumn: state.column });
                }
            },
        }
    },
    ...gridChildren,
    state: {
        selectedRow: 0,
        selectedColumn: 0,
    },
  }
  return grid
}

