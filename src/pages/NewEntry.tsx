import { Alert, Button, Box, Slider, Snackbar, TextField, Typography,  } from "@mui/material";
import { useState } from "react";


function NewEntry() {

    
    const [mood, setMood] = useState(5);
    const [performance, setPerformance] = useState(5);
    const [rating, setRating] = useState(5);
    const [notes, setNotes] = useState("");

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSave = () => {
        // Tallenna merkintä tietokantaan tai muuhun tallennuspaikkaan  
        const newEntry = {
            id: crypto.randomUUID(),
            date: new Date().toISOString().split("T")[0],
            mood,
            performance,
            rating,
            notes,
        }
        // Local Storageen tallentaminen
            const previous = JSON.parse(localStorage.getItem("entries") || "[]");
            const updated = [...previous, newEntry];
            localStorage.setItem("entries", JSON.stringify(updated))

            setOpenSnackbar(true);

        // Resetoi kentät
        setMood(5);
        setPerformance(5);
        setRating(5);
        setNotes("");
        }
    


    return (
    <>
    <Box margin={"auto"} sx={{width:'75%'}}>

    <Typography variant="h5" marginBottom={2} >
        Uusi harjoitusmerkintä
    </Typography>

    {/* Fiilis */}
    <Typography variant="body1" marginBottom={2}>
       Fiilis
    </Typography>
    <Slider value={mood} onChange={(_, v) => setMood(v as number)}
        min={1} max={10} step={1} valueLabelDisplay="auto"
        marks={[
            { value: 1, label: "1" },
            { value: 5, label: "5" },
            { value: 10, label: "10" },
        ]}
        sx={{width:'small', mb:5}}></Slider>

    {/* Suorituskyky */}
    <Typography variant="body1" marginBottom={2}>
       Suorituskyky
    </Typography>
    <Slider value={performance} onChange={(_, v) => setPerformance(v as number)}
        min={1} max={10} step={1} valueLabelDisplay="auto"
        marks={[
            { value: 1, label: "1" },
            { value: 5, label: "5" },
            { value: 10, label: "10" },
        ]}
        sx={{width:'small', mb:5}}></Slider>    

    {/* Arvosana */}
    <Typography variant="body1" marginBottom={2}>
       Kokonaisarvosana
    </Typography>
    <Slider value={rating} onChange={(_, v) => setRating(v as number)}
        min={1} max={10} step={1} valueLabelDisplay="auto"
        marks={[
            { value: 1, label: "1" },
            { value: 5, label: "5" },
            { value: 10, label: "10" },
        ]}
        sx={{width:'small', mb:5}}></Slider>


    {/* Muistiinpanot */}
    <Typography variant="body1" marginBottom={2}>
       Muistiinpanot
    </Typography>
    <TextField multiline rows={4} fullWidth value={notes} onChange={(e) => setNotes(e.target.value)}
        placeholder="Kirjoita harjoituksen kulku, teemat, onnistumiset ja munaukset."
        sx={{mb:2}}/>
        
    {/* Tallenna-painike */}
    <Button variant="contained" color="primary" onClick={handleSave} sx={{marginTop:2}}>
        Tallenna merkintä
    </Button>
    
    <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
    Merkintä tallennettu!
  </Alert>
</Snackbar>

    </Box>
    </>


    )

}
export default NewEntry
