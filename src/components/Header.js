import React from 'react'

import {makeStyles} from '@material-ui/core'
import {AppBar,Toolbar, IconButton, List, ListItem } from '@material-ui/core'
import {SwipeableDrawer} from '@material-ui/core'
import {Menu as MenuIcon} from "@material-ui/icons"
import {useTheme} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    menuIconContainer: {
        '&:hover': {
            backgroundColor:'transparent'
        }
    },
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '3em',
        [theme.breakpoints.down('md')]:{
            marginBottom:"2em"
        },
        [theme.breakpoints.down('xs')]:{
            marginBottom:'1.25em'
        }
    }
}))

const menuItems = [
    {id:1, name: "Contact", link: '/contact'},
    {id:2, name: "Paramètres", link: '/settings'}
]

export default function Header() {

    const theme = useTheme();
    const classes = useStyles(theme);
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const [openDrawer, setOpenDrawer] = React.useState(false)
    
    // components
    const menuList = (
        <List>
            {menuItems.map(({id,name,link}) => (
                <ListItem
                    key={id}
                >
                    {name}
                </ListItem>
            ))}
        </List>
    )
    
    const drawer = (
        <SwipeableDrawer 
            disableBackdropTransition={!iOS} 
            disableDiscovery={iOS}
            open={openDrawer}
            onOpen={()=>setOpenDrawer(true)}
            onClose={()=>setOpenDrawer(false)}
        >
            {menuList}
        </SwipeableDrawer>
    )

    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                    <IconButton 
                        edge="start" 
                        color="inherit" 
                        aria-label="menu"
                        onClick={()=>setOpenDrawer(!openDrawer)}
                        disableRipple
                        className={classes.menuIconContainer}
                    >
                        <MenuIcon />
                    </IconButton>
                    {drawer}
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin}/>
        </React.Fragment>   
    )
}
