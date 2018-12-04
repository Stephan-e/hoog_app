import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountMenu from './AccountMenu'
import LoginMenu from './LoginMenu'
import { LIST_PATH } from 'constants'

import logo from './logo.png'

export const Navbar = ({
  avatarUrl,
  displayName,
  authExists,
  goToAccount,
  goToBoxes,
  handleLogout,
  closeAccountMenu,
  anchorEl,
  handleMenu,
  classes
}) => (
  <AppBar position="static">
    <Toolbar>  
    <img style = {{width: '30px'}} src={logo}/>
      <Typography
        variant="h6"
        color="#2C2B6F"
        className={classes.flex}
        component={Link}
        to={authExists ? LIST_PATH : '/'}>
        hoog
      </Typography>

      {authExists ? (
        <AccountMenu
          avatarUrl={avatarUrl}
          displayName={displayName}
          onLogoutClick={handleLogout}
          goToAccount={goToAccount}
          goToBoxes={goToBoxes}
          closeAccountMenu={closeAccountMenu}
          handleMenu={handleMenu}
          anchorEl={anchorEl}
        />
      ) : (
        <LoginMenu />
      )}
    </Toolbar>
  </AppBar>
)

Navbar.propTypes = {
  displayName: PropTypes.string, // from enhancer (flattenProps - profile)
  avatarUrl: PropTypes.string, // from enhancer (flattenProps - profile)
  authExists: PropTypes.bool, // from enhancer (withProps - auth)
  goToAccount: PropTypes.func.isRequired, // from enhancer (withHandlers - router)
  handleLogout: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  closeAccountMenu: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  handleMenu: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  anchorEl: PropTypes.object, // from enhancer (withStateHandlers - handleMenu)
  classes: PropTypes.object // from enhancer (withStyles)
}

export default Navbar
