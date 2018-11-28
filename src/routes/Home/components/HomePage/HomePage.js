import React from 'react'
import { Link } from 'react-router'
import { paths } from 'constants'
// import classes from './HomePage.scss'
import logo from './logo.svg';
const authWrapperUrl = 'https://github.com/mjrussell/redux-auth-wrapper'
const reactRouterUrl = 'https://github.com/ReactTraining/react-router'

export const Home = () => (
  <div style={{
    height: '90vh',
  }}>
    <div style={{
      position: 'absolute',
      top: '10vh',
      left: 0,
      width: '100%'
    }}>
      <h2 style={{
        color: '#fff',
        fontSize: '30px',
        zIndex: 3,
        paddingTop: '30vh'
      }}>The self-growing plant box!</h2>
      <img  style={{
        position: 'absolute',
        width: '80%',
        right: 0, 
        top: 0,
        zIndex: 2
      }} src={logo} />
    </div>
  </div>
)

export default Home
