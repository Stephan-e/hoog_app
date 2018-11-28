import React from 'react'
import { Link } from 'react-router'
import { paths } from 'constants'
import classes from './HomePage.scss'
import logo from 'logo.svg';
const authWrapperUrl = 'https://github.com/mjrussell/redux-auth-wrapper'
const reactRouterUrl = 'https://github.com/ReactTraining/react-router'

export const Home = () => (
  <div className={classes.container}>
    <div className="flex-row-center">
      <h2>The self-growing plant box!</h2>
    </div>
    <div className="flex-row-center">
    <img src={logo} />
    </div>
  </div>
)

export default Home
