import { styled } from "..";

export const CartItemContainer = styled('section', {
  height: '100vh',
  width: 480,
  position: 'fixed',
  zIndex: '2',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transform: 'translateX(100%)',
  right: 0,
  opacity: 0,
  transition: 'all 0.7s',
  padding: '1rem 2rem 2rem 2rem',
  background: '$gray800',
  '&[data-open=true]':{
    opacity: 1,
    transform: 'translateX(0%)',
  },
  'button:first-child': {
    lineHeight: 0,
    background: 'transparent',
    border: 0,
    color: '$gray500',
    alignSelf: 'flex-end',
    cursor: 'pointer'
  },
  h4: {
    marginTop: '1.5rem',
    marginBottom: '1rem',
  }
});

export const CartItemsDiv = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  marginBottom: '1rem',
  borderRadius: 8,
  '&::-webkit-scrollbar': {
    width: 10
  },
  '&::-webkit-scrollbar-thumb':{
    width: 10,
    background: '$gray500',
    borderRadius: 8
  }
})

export const ItemContainer = styled('div', {
  display: 'flex',
  gap: '1.25rem',
  marginBottom: '1rem',

  'div:first-child': {
    width: 100,
    height: 93,
    background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
    borderRadius: 8,
  },

  'div:last-child': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '.5rem',

    span: {
      color: '$gray300',
      fontSize: '$md',
    },
    strong: {
      color: '$gray100',
      fontSize: '$md',
      fontWeight: 'bold',
    },
    button: {
      color: '$green500',
      background: 'transparent',
      fontSize: '1rem',
      border: 0,
      padding: 0,
      cursor: 'pointer',
      transition: 'color 0.2s',
    
      '&:hover': {
        color: '$green300'
      }
    },
  }
});

export const PaymentContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',

  'button:last-child': {
    background: '$green500',
    border: 0,
    borderRadius: 8,
    color: '$white',
    fontSize: '$md',
    fontWeight: 'bold',
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'
    },

    '&:not(:disabled):hover': {
      background: '$green300'
    }
  }
});

export const PriceContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
  div: {
    display: 'flex',
    justifyContent: 'space-between',

    span: {
      color: '$gray300',
      fontSize: '1rem',
    },

    strong: {
      color: '$gray100',
      fontSize: '$md'
    }
  }
});