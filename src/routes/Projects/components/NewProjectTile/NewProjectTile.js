import React from 'react'
import PropTypes from 'prop-types'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import classes from './NewProjectTile.scss'

const iconSize = '6rem'
const iconStyle = { width: iconSize, height: iconSize }

export const NewProjectTile = ({ onClick }) => (
    <ContentAddCircle className={classes.container} onClick={onClick} style={iconStyle} />
)

NewProjectTile.propTypes = {
  onClick: PropTypes.func
}

export default NewProjectTile
