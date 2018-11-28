import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import classes from './ProjectPage.scss'
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

var canvas = document.createElement('canvas');

const ProjectPage = ({ params, project, measurements}) => {

    const converted_measurements = measurements &&  Object.keys(measurements).map(key => (
        measurements[key]
    ))

    // var temp = Object.keys(measurements).map(function(e) {
    //     return e.temperature;
    //  });
    var hum = Object.keys(measurements).map(function(e) {
        return e.humidity;
     });
    //  var time = Object.keys(measurements).map(function(e) {
    //     return e.time;
    //  });


    console.log("Converted measurements", converted_measurements);
    
    

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
            {
                project &&
                <CardContent>
                    <Typography className={classes.h6} component="h2">
                        {project.name || 'Project'}
                    </Typography>
                    <Typography className={classes.subtitle}>{project.description}</Typography>
                    <div>
                    <pre>{JSON.stringify(project, null, 2)}</pre>
                    </div>
                    <h2>Measurements</h2>
                    {/* <b>{hum}</b> */}
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