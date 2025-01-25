'use strict'

import { Flex, Link } from 'smbls'
import grid from './grid';
import { generateGrid, GridCell } from './generateGrid';

const GRID_ROWS = 8;
const GRID_COLS = 16;

export const Header = {
  extend: Flex,
  props: {
    minWidth: '100%',
    padding: 'Z B',
    align: 'center space-between'
  },

  Flex: {
    props: { gap: 'C' },
    childExtend: {
      extend: Link,
      props: ({ props }) => ({
        textDecoration: window.location.pathname === props.href ? 'underline' : 'none'
      })
    },
    Text_logo: { href: '/', text: 'Hello!' },
    Text_about: { href: '/about', text: 'About' },
    Text_grid: { href: '/grid', text: 'Grid' },
  },

  ThemeSwitcher: {}
}

export const ThemeSwitcher = {
  extend: Flex,
  props: { gap: 'A2' },
  childExtend: {
    props: (element, state) => ({
      active: state.globalTheme === element.key,
      cursor: 'pointer',
      '.active': {
        fontWeight: '900'
      }
    }),
    on: {
      click: (event, element, state) => {
        state.update({ globalTheme: element.key })
      }
    }
  },
  dark: { text: 'Dark' },
  light: { text: 'Light' },
  midnight: { text: 'Midnight' }
}

export const Footer = {
  props: {
    padding: 'Z B',
    order: 9
  }
}


// Grid related
export const Grid = generateGrid(GRID_ROWS, GRID_COLS);

export const SubTotalTitle = {
  props:{
    color:'#495057',
    padding: '0 0.5rem 0 0',
  }
}

export const GridCard = {
  extend: Flex,
  childExtend: {
    props:{
      fontFamily: 'Europa',
    }
  },

  props:{
    width: '500px',
    borderRadius: '0.5rem',
    border: '1px solid',
    overflow: 'hidden',
    flow: 'column',
    align: 'center space-between',
  }, 

  title: { 
    text: 'Grid Selection',
    props: {
      fontWeight: 600,
      fontSize: '14px',
      textAlign: 'left',
      width: '100%',
      padding: 'A',
    },
  },
  body: { 
    grid: {
      extend: Grid,
    },  
  },
  
  footer: { 
    extend: Flex,
    props: {
      width: '100%',
      padding: 'A',
      align: 'center space-between',
    },
    childExtend: {
      extend: Flex,
      props: {
        fontWeight: 400,
        fontSize: '12px',
      },
    },
    coor: { 
      description: { 
        extend: SubTotalTitle,
        text: 'Selection Coordinates: ',
      },
      text_coor: { text: (element, state)=>`${state.root.selectedColumn || 0}, ${state.root.selectedRow || 0}` },
    },
    total: { 
      description:{
        extend: SubTotalTitle,
        text: 'Total cell selected: ',
      },
      text_total:{ text: (element, state)=>`${(state.root.selectedColumn || 0) * (state.root.selectedRow || 0)}` }
    },
  },

}

// for generateGrid function
const GRID_CELL_SIZE = '15px'

export const GridCell = {
  props:{
    width: GRID_CELL_SIZE,
    height: GRID_CELL_SIZE,
    background: 'rgba(220, 220, 220, 0.5)',
  },
  on: {
    click: (event, element, state) => {
        state.root.update({ selectedRow: state.row, selectedColumn: state.column });
    }
  },
}

