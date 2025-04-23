import { Box, TextField, Typography } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


 function Topbar() {
    return (
      <> 
        <Box width={'100%'}  sx={{ padding: 1,  }}>
        {/*SIVU + HAKU + PVM */}
        <Box  padding={2} marginBottom={2} display={"flex"} flexDirection="row" alignItems="center" > 
        {/* <Box border={1} borderRadius={2} borderColor="#1F2937" margin={2} width={135}><Title /></Box> */}
        
        <Box  display="flex" marginLeft={'auto'}>
          <TextField
            label="Hae tietoja"
            variant="outlined"
            size="small"
            sx={{}}
          />

          <Box display="flex" alignItems="center" border={1} borderRadius={1} borderColor="#1F2937" padding={0.9} width={140} ml={2}>

          <CalendarMonthIcon fontSize="medium" />

          <Typography variant="body1" sx={{ marginLeft: 2, alignItems: 'center' }}>
            {new Date().toLocaleDateString("fi-FI")}
          </Typography>
          </Box>
        </Box>

        </Box>
        </Box>
      
      </>
    )}


    export default Topbar