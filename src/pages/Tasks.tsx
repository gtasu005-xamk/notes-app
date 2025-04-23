import { Alert, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, ListItemText, Snackbar, TextField, Typography, IconButton, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


type Task = {
  id: string;
  text: string;
  done: boolean;
};


function Tasks() {

  const [tehtävä, setTehtävä] = useState("");
  const [tehtävät, setTehtävät] = useState<Task[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [vahvistusAuki, setVahvistusAuki] = useState(false);
  const [valittuId, setValittuId] = useState<string | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tehtävät") || "[]");
    setTehtävät(stored);
  }, []);


  const handleSave = () => {
    if (!tehtävä.trim()) return;
  
    const uusiTehtävä: Task = {
      id: crypto.randomUUID(),
      text: tehtävä,
      done: false,
    };

    const previous = JSON.parse(localStorage.getItem("tehtävät") || "[]");
    const updated = [...previous, uusiTehtävä];
    localStorage.setItem("tehtävät", JSON.stringify(updated));

    setTehtävät([...tehtävät, uusiTehtävä]);
    setTehtävä("");
    setSnackbarOpen(true);
  };

const merkitseTehdyksi = () => {
  if (valittuId) {
    const päivitetyt = tehtävät.filter(task => task.id !== valittuId);
    setTehtävät(päivitetyt);
    localStorage.setItem("tehtävät", JSON.stringify(päivitetyt));
  }
  setVahvistusAuki(false);
  setValittuId(null);
};

  return (
    <>
      <Box display="flex" flexDirection="column" margin="auto" sx={{ width: "75%" }}>
        <Typography variant="h5" fontWeight={500} mb={2}>
          Uusi tehtävä
        </Typography>

        <TextField
          type="text"
          label="Lisää uusi tehtävä"
          rows={4}
          multiline
          value={tehtävä}
          onChange={(e) => setTehtävä(e.target.value)}
          sx={{ width: "100%" }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2, mb: 4, width: "10%" }}
        >
          Lisää tehtävä
        </Button>

        <Divider sx={{ mb: 2, width: '100%' }} />

        <Typography variant="h6" fontWeight={500} mb={2}>
          Aktiiviset tehtävät
        </Typography>

        <List sx={{ width: "100%"}}>
          {tehtävät.map((task) => (
            <ListItem
              key={task.id}
              secondaryAction={
                !task.done && (
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setValittuId(task.id);
                      setVahvistusAuki(true);
                    }}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                )
              }
            >
              <ListItemText
                primary={task.text}
                secondary={task.done ? "Merkitty tehdyksi" : ""}
                sx={{ textDecoration: task.done ? "line-through" : "none" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Tehtävä lisätty!
        </Alert>
      </Snackbar>

      {/* Vahvistusdialogi */}
      <Dialog open={vahvistusAuki} onClose={() => setVahvistusAuki(false)}>
        <DialogTitle>Merkitse tehtävä tehdyksi?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Haluatko varmasti merkitä tämän tehtävän tehdyksi?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVahvistusAuki(false)} color="warning">Peruuta</Button>
          <Button onClick={merkitseTehdyksi} color="success">
            Merkitse tehdyksi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Tasks;