import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import classes from './ProjectPage.scss'
const ProjectPage = ({ params, project, measurements}) => {

    console.log("Measurements", measurements);
    console.log("Project", project);
    console.log("Params", params);

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.h6} component="h2">
                {project.name || 'Project'}
                </Typography>
                <Typography className={classes.subtitle}>{params.projectId}</Typography>
                <div>
                <pre>{JSON.stringify(project, null, 2)}</pre>
                </div>
                <h2>Measurements</h2>
                <div>
                <pre>{JSON.stringify(measurements.FXRlimFYkx4OqLhgfoAp.humidity, null, 2)}</pre>
                
                </div>
                
            </CardContent>
            </Card>
        </div>
    )
}


ProjectPage.propTypes = {
  project: PropTypes.object,
  params: PropTypes.object.isRequired
}

export default ProjectPage