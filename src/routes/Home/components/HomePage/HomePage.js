import React from 'react'
import { Link } from 'react-router'
import { paths } from 'constants'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'


// import classes from './HomePage.scss'
import logo from './logo.svg'
const authWrapperUrl = 'https://github.com/mjrussell/redux-auth-wrapper'
const reactRouterUrl = 'https://github.com/ReactTraining/react-router'
var bgColors = { "Default": "#81b71a",
                    "Blue": "#2C2B6F",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "white": "#fff",
};

export const Home = () => (
  <div>
    <div style={{
      
    }}>
      <div style={{
        position: 'absolute',
        top: '10vh',
        left: 0,
        width: '100%'
      }}>
        <h3 style={{
          color: '#fff',
          fontSize: '20px',
          zIndex: 3,
          paddingLeft: '2vh'
        }}>The self-growing plant box!</h3>
        <h3 style={{width:'50%', padding: '2vh', color: '#2C2B6F'}}>Introducing the hoog grow box kit and app, for optimising your grow. The first Internet of things grow box for your home!</h3>
        <img  style={{
          float: 'right',
          width: '80%',
          right: 0, 
          top: 0,
          zIndex: 2,
          marginTop: '-20vh',
          marginRight: '-10vh'
        }} src={logo} />

      <div style={{ padding: '2vh', paddingBottom: '10vh', width: '60%',  color: '#2C2B6F'}}>
      <h4 >The hoog app routinely monitors your grow and gives you realtime data on the status of the grow. Features include: </h4>
      <h5 style={{ padding: '1vh',  color: '#2C2B6F'}}> - Remote control of grow environment.</h5>
      <h5 style={{ padding: '1vh',  color: '#2C2B6F'}}> - Grow cycle adjustment and recipe creation.</h5>
      <h5 style={{ padding: '1vh',  color: '#2C2B6F'}}> - Image processing.</h5>
      <h5 style={{ padding: '1vh',  color: '#2C2B6F'}}> - Realtime remote measurements. </h5>
      <h5 style={{ padding: '1vh',  color: '#2C2B6F'}}> - Historical measurement data. </h5>
      <h5 style={{ padding: '1vh',  color: '#2C2B6F'}}> - Software runs on existing systems and controllers. </h5>
      </div>
      
      </div>

      
      
    </div >
        
    

  </div>
  
)

export default Home
