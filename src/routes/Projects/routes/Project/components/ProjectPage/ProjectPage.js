import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { LineChart, Line } from 'recharts';
import classes from './ProjectPage.scss'

var canvas = document.createElement('canvas');

const ProjectPage = ({ params, project, measurements}) => {

    const converted_measurements = measurements && Object.keys(measurements).map(key => (
        measurements[key]
    ))


    console.log("CONVERTED MEASUERMENTS", converted_measurements);
    




    console.log("Converted measurements", converted_measurements);
    
    const measurements_for_graph = converted_measurements && converted_measurements.map(m => {

    })

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
            {
                project &&
                <CardContent>
                    <h1>{project.name || 'Project'}</h1>
                    <div>
                        <p>{project.description}</p>
                    </div>
                    <div>
                        <LineChart width={400} height={400} data={converted_measurements}>
                            <Line type="monotone" dataKey="humidity" stroke="#8884d8" />
                            <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
                        </LineChart>

                    </div>
                    <h2>Measurements</h2>
                    <div>
                        {
                            converted_measurements && converted_measurements.length > 0 ?
                            converted_measurements.map((m, index) => (
                                <div key={index}>
                                    <b>Humidity: </b> {m.humidity}
                                    <br/>
                                    <b>Temperature: </b> {m.temperature}
                                    <br/>
                                    <b>Time: </b> {m.timestamp}
                                    <br/>
                                    <b>---</b>
                                </div>
                                
                            )) :
                            <p>No measurements yet</p>
                            
                        }

                    </div>
                    
                </CardContent> 
            }
            </Card>
        </div>
    )
}



ProjectPage.propTypes = {
  project: PropTypes.object,
  params: PropTypes.object.isRequired
}

export default ProjectPage