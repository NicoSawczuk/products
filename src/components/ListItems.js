import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import PeopleIcon from '@material-ui/icons/People';
import { useLocation } from "wouter";


export default function ListItems() {
  const [location, setLocation] = useLocation();

  return (
    <>
      <ListItem button onClick={() => setLocation("/")}  selected={location === '/' ? true : false}>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Productos" />
      </ListItem>
      <ListItem button onClick={() => setLocation("/users")} selected={location === '/users' ? true : false}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItem>
    </>
  )
};

