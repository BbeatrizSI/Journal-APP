import { Close, TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, IconButton, Toolbar, Typography } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { SideBarItem } from "./SideBarItem";
import { closeSidebar } from "../../store/sidebar";


export const SideBar = ({ drawerWidth = 240, mobileOpen }) => {

    const dispatch = useDispatch();
    const { displayName } = useSelector( state => state.auth );
    const { notes } = useSelector( state => state.journal );

    const sortedNotes = [...notes].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='temporary'
            open={ mobileOpen }
            onClose={() => dispatch( closeSidebar() )}
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    { displayName }
                </Typography>
                <IconButton onClick={ () => dispatch( closeSidebar() ) } color="inherit">
                    <Close />
                </IconButton>
            </Toolbar>
            <Divider />

            <List>
                {
                    sortedNotes.map( note => (
                        <SideBarItem key={ note.id } { ...note } />
                    ))
                }
            </List>
        </Drawer>

        <Drawer
            variant="permanent"
            open
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    { displayName }
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    sortedNotes.map( note => (
                        <SideBarItem key={ note.id } { ...note } />
                    ))
                }
            </List>
        </Drawer>
    </Box>
  )
}
