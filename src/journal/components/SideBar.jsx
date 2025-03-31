import { useState } from "react";
import { Close, TurnedInNot } from "@mui/icons-material";
import { Box, Divider, Drawer, Grid, List, IconButton, Toolbar, Typography } from "@mui/material";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { useSelector, useDispatch } from "react-redux"
import { SideBarItem } from "./SideBarItem";
import { closeSidebar } from "../../store/sidebar";
import DatePicker from 'react-date-picker';
import '../../theme/DatePicker.css';
import '../../theme/Calendar.css';


export const SideBar = ({ drawerWidth = 240, mobileOpen }) => {

    const dispatch = useDispatch();
    const { displayName } = useSelector( state => state.auth );
    const { notes } = useSelector( state => state.journal );
    const [value, setValue] = useState(null);

    const isSameDay = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    };

    const sortedNotes = [...notes].sort((a, b) => new Date(b.date) - new Date(a.date));

    const filteredNotes = value 
    ? sortedNotes.filter(note => isSameDay(note.date, value))
    : sortedNotes;

  return (
    <Box
        component='nav'
        sx={{ 
            width: { xs: '100wv' }, 
            flexShrink: { sm: 0 },
            opacity: 0.8
        }}
    >
        <Drawer
            variant='temporary'
            open={ mobileOpen }
            onClose={() => dispatch( closeSidebar() )}
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100vw' },
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5em' }}>                
                <Box display={'inline-flex'} alignItems={'center'}>
                    <EmojiObjectsIcon color={'primary'} sx={{ fontSize: '1.7em' }}/>
                    <Typography variant='h6' noWrap component='div' ml={2}>
                        { displayName.length > 20
                        ? displayName.substring( 0, 20 ) + '...'
                        : displayName }
                    </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'space-around'} height={'5em'}>
                    <IconButton onClick={ () => dispatch( closeSidebar() ) } color="inherit" sx={{ alignSelf: 'flex-end'}}>
                        <Close />
                    </IconButton>
                    <DatePicker 
                        onChange={setValue} 
                        value={value} 
                        calendarProps={{
                            tileClassName: ({ date, view }) => {
                              if (view === 'month') {
                                const hasNote = notes.some(note =>
                                  new Date(note.date).toDateString() === date.toDateString()
                                );
                                return hasNote ? 'highlight-day' : null;
                              }
                            }
                        }}
                    />
                </Box>
            </Toolbar>
    
            <Divider />
    
            <Box 
                sx={{ 
                    display: value === null ? 'none' : 'flex', 
                    justifyContent: 'flex-start', 
                    alignItems: 'center', 
                    margin: '0.5em 0em 0em 0.5em',
                    paddingLeft: '1em',
                }}
            >
                <Typography variant='subtitle2'>
                    {value?.toLocaleDateString('es-ES', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </Typography>
                <IconButton onClick={ () => setValue(null) } sx={{ display: value === null ? 'none' : 'block'}}>
                    <Close color="#c4557d"/>
                </IconButton>
            </Box>
            <List>
                {
                    filteredNotes.map( note => (
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
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5em', padding: '0.5em !important' }}>
                <EmojiObjectsIcon color={'primary'} sx={{ fontSize: '1.7em' }}/>
                <Typography variant='h6' noWrap component='div' ml={1}>
                    { displayName.length > 20
                    ? displayName.substring( 0, 20 ) + '...'
                    : displayName }
                </Typography>
                <DatePicker 
                    onChange={setValue} 
                    value={value} 
                    calendarProps={{
                        tileClassName: ({ date, view }) => {
                          if (view === 'month') {
                            const hasNote = notes.some(note =>
                              new Date(note.date).toDateString() === date.toDateString()
                            );
                            return hasNote ? 'highlight-day' : null;
                          }
                        }
                    }}
                />
            </Toolbar>
            <Divider />
            <Box 
                sx={{ 
                    display: value === null ? 'none' : 'flex', 
                    justifyContent: 'flex-start', 
                    alignItems: 'center', 
                    margin: '0.5em 0em 0em 0.5em',
                    paddingLeft: '1em',
                }}
            >
                <Typography variant='subtitle2'>
                    {value?.toLocaleDateString('es-ES', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </Typography>
                <IconButton onClick={ () => setValue(null) } sx={{ display: value === null ? 'none' : 'block'}}>
                    <Close color="#c4557d"/>
                </IconButton>
            </Box>           
            <List sx={{ paddingRight: '5px'}}>
                {
                    filteredNotes.map( note => (
                        <SideBarItem key={ note.id } { ...note } />
                    ))
                }
            </List>
        </Drawer>
    </Box>
  )
}
