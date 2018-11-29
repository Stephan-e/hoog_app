import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import classes from './ProjectPage.scss'

import Moment from 'react-moment';
import moment from 'moment'

class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            hits: [],
          };
        
    }

   
    componentDidMount () {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        const route = 'https://' + this.props.project.box +'.balena-devices.com/status'
        const config = {
            // credentials: 'include',
            method: 'GET',
            mode: 'cors',
            headers
        }

        fetch(route, config)
		.then(response => {
            console.log("REPONSE FROM API CALL", response);
            
			if (response.ok) {
				return response.json()
			} else {
				return response
			}
			
        })
        .then(data => this.setState({ status: data.status }))
        .catch(err => err)
   
    }

    

    render() {
        const { params, project, measurements} = this.props
        const { status } = this.state;
        const converted_measurements = measurements && Object.keys(measurements)
        .map(key => (
            measurements[key]))
        .sort((a, b) => a.timestamp - b.timestamp)
        .filter(i => i.humidity > 0 && i.temperature > 0)
    
        function formatXAxis(tickItem) {
            // If using moment.js
            return moment(tickItem).format(' LT')
            }
    
         console.log("CONVERTED MEASUERMENTS", status);
        

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                {
                    project &&
                    <CardContent>
                        <h1>{project.name || 'Project'}</h1>
                        <div>
                            <p >Box Description: </p>
                            <p style={{
                                fontWeight: 300
                                }}>{project.description}</p>
                            <br/>
                            <p>Grow box ID: </p>
                            <p style={{
                                fontWeight: 300
                                }}>{project.box}</p>
                            <br/>

                            <ul>
                                {status}
                                
                            </ul>

                            <p>Temperature: </p>
                            <p>Humidity: </p>
                            <p>Schedule: </p>
                        </div>
                        <h2>Measurements</h2>
                        <div>
                            <LineChart width={400} height={400} data={converted_measurements}>
                                <XAxis dataKey="timestamp" tickFormatter={formatXAxis}/>
                                <YAxis />
                                <Tooltip/>
                                <Legend />
                                <Line type="monotone" dataKey="humidity" stroke="#8884d8" fill='#8884d8'/>
                                <Line type="monotone" dataKey="temperature" stroke="#82ca9d" fill='#82ca9d'/>
                            </LineChart>

                        </div>
                        
                        {/* <div>
                            {
                                converted_measurements && converted_measurements.length > 0 ?
                                converted_measurements.map((m, index) => (
                                    <div key={index}>
                                        <b>Humidity: </b> {m.humidity}
                                        <br/>
                                        <b>Temperature: </b> {m.temperature}
                                        <br/>
                                        <b>Time: </b> 
                                        <Timestamp time={m.timestamp/1000} actualSeconds/>
                                        <br/>
                                        <b>---</b>
                                    </div>
                                    
                                )) :
                                <p>No measurements yet</p>
                                
                            }

                        </div> */}
                        
                    </CardContent> 
                }
                </Card>
        </div>
        )
    }
}



ProjectPage.propTypes = {
  project: PropTypes.object,
  params: PropTypes.object.isRequired
}

export default ProjectPage