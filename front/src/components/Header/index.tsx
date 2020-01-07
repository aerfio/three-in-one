import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from "@reach/router";

import { actions } from '../../context';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MenuIcon from '@material-ui/icons/Menu';

import {
  RoutingData,
  LOGOUT_LABEL,
  AUTHORIZED_ROUTING_DATA,
  UNAUTHORIZED_ROUTING_DATA,
} from "./routingData";

type Props = ConnectedProps<typeof connector>

interface State {
  anchorEl: EventTarget | null,
  mainMenuOpen: boolean;
}
const initialState: State = {
  anchorEl: null,
  mainMenuOpen: false,
}

const Header: React.FunctionComponent<Props> = ({
  logout,
  isAuthenticated,
}) => {
  const [{ anchorEl, mainMenuOpen }, setState] = useState<State>(initialState);

  const handleMainMenu = (event: React.MouseEvent<Element, MouseEvent>) => {
    setState({ anchorEl: event.currentTarget, mainMenuOpen: true });
  };

  const handleClose = () => {
    setState({ anchorEl: null, mainMenuOpen: false });
  };

  const renderMenuItems = (data: RoutingData[]) => {
    const menu = data.map(u => (
      <MenuItem onClick={handleClose} key={u.path}>
        <Link to={u.path}>{u.label}</Link>
      </MenuItem>
    ));

    if (isAuthenticated) {
      menu.push((
        <MenuItem 
          onClick={() => {
            logout();
            handleClose();
          }}
          key="/dupaXDXD"
        >
          <Link to="/login">{LOGOUT_LABEL}</Link>
        </MenuItem>
      ));
    }

    return menu;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton 
            color="inherit"
            onClick={handleMainMenu}
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl as Element}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={mainMenuOpen}
            onClose={handleClose}
          >
            {renderMenuItems(isAuthenticated ? AUTHORIZED_ROUTING_DATA : UNAUTHORIZED_ROUTING_DATA)}
          </Menu>
          <Typography variant="h6" color="inherit">
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapState = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatch = ({
  logout: actions.auth.logout,
})

const connector = connect(
  mapState,
  mapDispatch
)
export default connector(Header);