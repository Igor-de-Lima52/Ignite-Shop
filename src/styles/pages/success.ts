import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 500,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
    marginBottom: '1.5rem'
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    color: '$green500',
    fontSize: '$lg',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300'
    }
  }
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 130,
  height: 133,
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',  
  borderRadius: '50%',
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '-10px -2px 10px rgba(0, 0, 0, 0.25)',

  img: {
    objectFit: 'cover',
  },

  '& + &':{
    marginLeft: '-3rem'
  }
})

export const ImagesContainer = styled('div', {
  display: 'flex',
  margin: '0 auto 4rem'
})