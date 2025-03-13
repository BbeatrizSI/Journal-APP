import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { NavBar, SideBar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar, closeSidebar } from "../../store/sidebar";

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {

  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector(state => state.sidebar);

  return (
    <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn animate__faster">
        <NavBar drawerWidth={drawerWidth} onOpenSidebar={() => dispatch(openSidebar())} />
        <SideBar drawerWidth={drawerWidth} mobileOpen={isSidebarOpen} onCloseSidebar={() => dispatch(closeSidebar())} />

        <Box 
            component='main'
            sx={{
              flexGrow: 1,
              p: 3,
              maxWidth: { sm: `calc(100% - ${drawerWidth}px)` },
              minWidth: 0,
              marginLeft: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar />

            { children }

        </Box>
    </Box>
  )
}
