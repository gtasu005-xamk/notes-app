import { styled } from '@mui/material/styles';
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import { Link } from 'react-router-dom';
import SidebarMenuItems from './SidebarMenuItems';

// import CardAlert from './CardAlert';
// import OptionsMenu from './OptionsMenu';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

function Sidebar() {
  return (
    <Drawer variant="permanent" sx={{[`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
        {/* //LOGOBOX */}
    <Box >
      
    <Link to="/" style={{ display: 'flex', justifyContent: 'center', }}>
    <img src="/logonav.png" alt="Logo"
    style={{ maxWidth: '50%', height: 'auto', margin: 'auto' }}/>
    </Link>

    </Box>

      <Divider />

        {/* //MAIN */}
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SidebarMenuItems />
      </Box>

        {/* //PROFILE */}      
      <Stack
        direction="row"
        sx={{p: 2, gap: 1, alignItems: 'center', borderTop: 1, borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt="Matti Meikäläinen"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />

        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            Matti Meikäläinen
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Matti@Meikäläinen.fi
          </Typography>
        </Box>

      </Stack>
    </Drawer>
  );
}

export default Sidebar;