import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import classes from './ProjectTile.scss'

export const ProjectTile = ({ name, description, box, onSelect, onDelete, showDelete }) => (
  <Paper className={classes.container}>
    <div className={classes.top}>
      <div className={classes.name} onClick={onSelect}>
        {name || 'No Name'}
      </div>
      {showDelete && onDelete ? (
        <Tooltip title="delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </div>
    <div>
        <p>{description || 'No description'}</p>
      </div>
      <div>
        <p>{box || 'No description'}</p>
      </div>
  </Paper>
)

ProjectTile.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool
}

ProjectTile.defaultProps = {
  showDelete: true
}

export default ProjectTile
