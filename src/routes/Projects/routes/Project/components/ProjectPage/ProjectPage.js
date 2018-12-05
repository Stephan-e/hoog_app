import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import CardContent from '@material-ui/core/CardContent'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import classes from './ProjectPage.scss'
import axios from 'axios';


import Moment from 'react-moment';
import moment from 'moment'
  
class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            source: null,
            loading: false,
            humidity: '',
            light: '',
            schedule: {
                COB_hour_off: '',
                COB_hour_on: '',
                vent_hour_off: '',
                vent_hour_on: '',
                water_hour_off: '',
                water_hour_on: ''
            },
            temperature: '',
            vent: '',
            water: '',
            new_values: {
                COB_hour_off: '',
                COB_hour_on: '',
                vent_hour_off: '',
                vent_hour_on: '',
                water_hour_off: '',
                water_hour_on: ''
            },
          };
        
    }

   getStatus = () => {
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
    this.setState({ loading: true })
    fetch(route, config)
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return response
        }
        
    })
    .then(data => {
        this.setState({...data, loading: false})
        
    })
    .catch(err => err)
   }

    componentDidMount () {
       this.getStatus()

       let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        const route2 = 'https://' + this.props.project.box +'.balena-devices.com/snapshot2'

        const config2 = {
            // credentials: 'include',
            method: 'GET',
            mode: 'cors',
            responseType: 'arraybuffer',
            headers
        }
        
        axios
        .get(
          route2,
          config2,
        )
        .then(response => {
          const base64 = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
          );
          this.setState({ source: "data:;base64," + base64 });
        });
    
    }

    postNewValues = () => {
        console.log("NEW VALUES", this.state.new_values)

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        const route = 'https://' + this.props.project.box +'.balena-devices.com/schedule'
        const config = {
            // credentials: 'include',
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify(this.state.new_values)
        }
        this.setState({ loading: true })
        fetch(route, config)
		.then(response => {
            console.log("REPONSE FROM POST CALL", response);
            
			if (response.ok) {
				return response.json()
			} else {
				return response
			}
			
        })
        .then(data => {
            console.log("API POST RESPONSE DATA", data);
            this.setState({ set_schedule: false })
            this.getStatus()
            
        })
        .catch(err => err)
        
    }

    

    render() {
        const { params, project, measurements } = this.props
        const { humidity, temperature, schedule, loading, vent, light, water, source } = this.state;

        const converted_measurements = measurements && Object.keys(measurements)
        .map(key => (
            measurements[key]))
        .sort((a, b) => a.timestamp - b.timestamp)
        .filter(i => i.humidity > 0 && i.temperature > 0)
    
        function formatXAxis(tickItem) {
            // If using moment.js
            return moment(tickItem).format('D MMM hh:mm')
            }
        
        return (
            <div>
                <div className={classes.container}>
                    {
                        loading ?
                        <p>Loading...</p> :
                        <Card className={classes.card}>
                        {
                            project &&
                            <CardContent>
                                    <h2 style ={{textAlign: 'center'}} >{project.name || 'Project'}</h2>
                                    <img  src={this.state.source} />

                                    <Grid container spacing={24}>
                                        <Grid item xs={6}>
                                        <p ><b>Box Description:</b> </p>
                                            <p style={{
                                                fontWeight: 300
                                                }}>{project.description}</p>
                                            
                                        </Grid>
                                        <Grid item xs={6}>
                                        <p ><b>ID: </b></p>
                                            <p style={{
                                                fontWeight: 300,
                                                fontSize: 8,
                                                fontStyle: 'italic'
                                                }}>{project.box}</p>
                                        </Grid>
                                    </Grid>
                                    
                                    
                                </CardContent>
                        }
                        </Card>
                    }
                </div>
                <div className={classes.container}>
                    {
                        loading ?
                        null :
                        <Card className={classes.card}>
                        {
                            project &&
                            <CardContent>
                                <Grid container spacing={24}>
                                    <Grid item xs={6}>
                                        <p><b>Temperature:</b> {temperature}º</p>
                                        <p><b>Humidity:</b> {humidity}%</p>
                                        <p><b>Soil Moisture:</b> {humidity}%</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <   p><b>Vent: </b>  
                                            {vent ? (
                                                <a>On</a>
                                            ) : <a>Off</a>}
                                        </p>
                                        <p><b>Light: </b> 
                                            {light ? (
                                                <a>On</a>
                                            ) : <a>Off</a>}
                                        </p>
                                        <p><b>Water: </b> 
                                            {water ? (
                                                <a>On</a>
                                            ) : <a>Off</a>}
                                        </p>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        }
                        </Card>
                    }
                </div>
                
                <Dialog
                    
                    open={this.state.set_schedule}
                    onClose={() => this.setState({ set_schedule: false })}
                >
                    <div className={classes.container}>
                        <h2>Update schedule</h2>
                        <TextField
                            placeholder="0"
                            label="COB on"
                            type='number'
                            value={this.state.new_values.COB_hour_on}
                            onChange={e => {
                                this.state.new_values.COB_hour_on = e.target.value
                                this.setState(this.state)
                            }}
                        />

                        <TextField
                            placeholder="0"
                            label="COB off"
                            type='number'
                            value={this.state.new_values.COB_hour_off}
                            onChange={e => {
                                this.state.new_values.COB_hour_off = e.target.value
                                this.setState(this.state)
                            }}
                        />

                        <TextField
                            placeholder="0"
                            label="Vent on"
                            type='number'
                            value={this.state.new_values.vent_hour_on}
                            onChange={e => {
                                this.state.new_values.vent_hour_on = e.target.value
                                this.setState(this.state)
                            }}
                        />

                        <TextField
                            placeholder="0"
                            label="Vent off"
                            type='number'
                            value={this.state.new_values.vent_hour_off}
                            onChange={e => {
                                this.state.new_values.vent_hour_off = e.target.value
                                this.setState(this.state)
                            }}
                        />

                        <TextField
                            placeholder="0"
                            label="Water on"
                            type='number'
                            value={this.state.new_values.water_hour_on}
                            onChange={e => {
                                this.state.new_values.water_hour_on = e.target.value
                                this.setState(this.state)
                            }}
                        />

                        <TextField
                            placeholder="0"
                            label="Water off"
                            type='number'
                            value={this.state.new_values.water_hour_off}
                            onChange={e => {
                                this.state.new_values.water_hour_off = e.target.value
                                this.setState(this.state)
                            }}
                        />

                        <br/><br/>
                        <Button color='primary' variant='contained' onClick={() => this.setState({ set_schedule: false })}>Cancel</Button>
                        <Button color='primary' variant='contained' onClick={this.postNewValues}>Update</Button>
                    </div>
                </Dialog>
                <div className={classes.container}>
                    {
                        loading ?
                        null :
                        <Card className={classes.card}>
                        {
                            project &&
                            <CardContent>
                            <Button color='primary' variant='contained' onClick={() => this.setState({ set_schedule: true })}>Update</Button>
                            <p><b>Schedule:</b> <br/> </p>

                            <Grid container spacing={24}>

                                <Grid item xs={6}>
                                    <b>COB hour on: </b>{schedule.COB_hour_on}:00<br/>
                                    <b>Vent hour on: </b>{schedule.vent_hour_on}:00<br/>
                                    <b>Water hour on: </b>{schedule.water_hour_on}:00<br/>
                                </Grid>
                                <Grid item xs={6}>
                                    <b>COB hour off: </b>{schedule.COB_hour_off}:00<br/>
                                    <b>Vent hour off: </b>{schedule.vent_hour_off}:00<br/>
                                    <b>Water hour off: </b>{schedule.water_hour_off}:01<br/>
                                </Grid>
                            </Grid>
                                    
                            </CardContent>
                        }
                        </Card>
                    }
                </div>
                <div className={classes.container}>
                        <Card className={classes.card}>
                        {
                            project &&
                            <CardContent>
                                <h2 style ={{textAlign: 'center'}}>Measurements</h2>
                                <div>
                                    <LineChart width={300} height={300} data={converted_measurements} margin={{right: 15, left: 15}}>
                                        <XAxis  dataKey="timestamp" tickFormatter={formatXAxis} />
                                        <YAxis  width={20}  />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="temperature" stroke="#449B05" dot={false}/>
                                        <Line type="monotone" dataKey="humidity" stroke="#2C2B6F" dot={false}/>
                                    </LineChart>

                                </div>
                                
                            </CardContent> 
                        }
                        </Card>
                        
                </div>
            </div>
        )
    }
}



ProjectPage.propTypes = {
  project: PropTypes.object,
  params: PropTypes.object.isRequired
}

export default ProjectPage