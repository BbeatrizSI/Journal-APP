import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";
import { alpha } from '@mui/system';

export const NavBar = ({ drawerWidth, onOpenSidebar }) => {

    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch( startLogout() );      
    }

  return (
    <AppBar 
        position='fixed' 
        sx={{
            width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px`}
        }}
    >
        <Toolbar>
            <IconButton
                color='secondary'
                edge='start'
                sx={{ mr: 2, display: { xs: 'flex', sm: 'none' } }}
                onClick={onOpenSidebar}
            >
                <MenuOutlined sx={{ fontSize: '1.3em' }}/>
            </IconButton>
            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div' color='white.main' >Journal App</Typography>
                <IconButton 
                    color='secondary'
                    onClick={ onLogout }
                    sx={(theme) => ({
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.white.main, 0.5), 
                            transform: 'scale(1.1)'
                        }
                    })}
                >
                    <LogoutOutlined sx={{ fontSize: '1.3em' }}/>
                </IconButton>
            </Grid>

        </Toolbar>
        
    </AppBar>
  )
}
