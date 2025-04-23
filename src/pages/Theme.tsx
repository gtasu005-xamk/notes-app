import { Box, Button, Divider, TextField, Typography, IconButton, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fi } from "date-fns/locale/fi";
import { addDays } from "date-fns";
import { useState, useEffect } from "react";

function Theme() {
  const [harjoitusteema, setHarjoitusteema] = useState("");
  const [aloituspäivä, setAloituspäivä] = useState<Date | null>(new Date());
  const [loppupäivä, setLoppupäivä] = useState<Date | null>(addDays(new Date(), 14));
  const [teemat, setTeemat] = useState<any[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [vahvistusAuki, setVahvistusAuki] = useState(false);
  const [poistettavaId, setPoistettavaId] = useState<string | null>(null);

  const nyt = new Date();

  const aktiiviset = teemat.filter((t) => {
    const alku = new Date(t.aloitus);
    const loppu = new Date(t.loppu);
    return alku <= nyt && loppu >= nyt;
  });

  const tulevat = teemat.filter((t) => new Date(t.aloitus) > nyt);
  const menneet = teemat.filter((t) => new Date(t.loppu) < nyt);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("themes") || "[]");
    setTeemat(stored);
  }, []);

  const handleSave = () => {
    if (!harjoitusteema || !aloituspäivä || !loppupäivä) {
      alert("Täytä kaikki kentät!");
      return;
    }

    const uusiTeema = {
      id: crypto.randomUUID(),
      teema: harjoitusteema,
      aloitus: aloituspäivä?.toISOString().split("T")[0],
      loppu: loppupäivä?.toISOString().split("T")[0],
    };

    const aiemmat = JSON.parse(localStorage.getItem("themes") || "[]");
    const päivitetty = [...aiemmat, uusiTeema];
    localStorage.setItem("themes", JSON.stringify(päivitetty));

    setTeemat(päivitetty);
    setHarjoitusteema("");
    setAloituspäivä(new Date());
    setLoppupäivä(addDays(new Date(), 14));
  };

  const poistaTeema = () => {
    if (!poistettavaId) return;

    const päivitetty = teemat.filter((t) => t.id !== poistettavaId);
    setTeemat(päivitetty);
    localStorage.setItem("themes", JSON.stringify(päivitetty));

    setPoistettavaId(null);
    setVahvistusAuki(false);
    setSnackbarOpen(true);
  };

  const renderTeema = (teema: any) => (
    <Box
      key={teema.id}
      sx={{ mb: 2, p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="subtitle1" fontWeight={500}>
          {teema.teema}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {teema.aloitus} – {teema.loppu}
        </Typography>
      </Box>
      <IconButton
        color="error"
        onClick={() => {
          setPoistettavaId(teema.id);
          setVahvistusAuki(true);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );

  return (
    <>
      <Box margin="auto" sx={{ width: "75%" }}>
        <Typography variant="h5" marginBottom={2}>
          Uusi harjoitusteema
        </Typography>

        <TextField multiline rows={4} fullWidth value={harjoitusteema}
          onChange={(e) => setHarjoitusteema(e.target.value)}
          placeholder="Kirjoita ja kuvaile uusi harjoitusteema"
          sx={{ mb: 2 }}
        />

        <Box>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
            <DatePicker
              label="Aloituspäivä"
              value={aloituspäivä}
              onChange={(newValue) => {
                setAloituspäivä(newValue);
                if (newValue) setLoppupäivä(addDays(newValue, 14));
              }}
              sx={{ mb: 2 }}
            />
            <DatePicker
              label="Loppupäivä"
              value={loppupäivä}
              onChange={(newValue) => setLoppupäivä(newValue)}
              sx={{ mb: 2, ml: 2 }}
            />
          </LocalizationProvider>
        </Box>

        <Button variant="contained" color="primary" onClick={handleSave}>
          Tallenna merkintä
        </Button>
      </Box>

      <Divider sx={{ mt: 4 }} />

      <Box margin="auto" sx={{ width: "75%", mt: 4 }}>
        <Typography variant="h5" marginBottom={2}>
          Tämänhetkinen harjoitusteema
        </Typography>
        {aktiiviset.length === 0 ? (
          <Typography variant="body1">Ei aktiivista teemaa.</Typography>
        ) : (
          aktiiviset.map(renderTeema)
        )}

        <Typography variant="h5" marginTop={4} marginBottom={2}>
          Tulevat teemat
        </Typography>
        {tulevat.length === 0 ? (
          <Typography variant="body1">Ei tulevia teemoja.</Typography>
        ) : (
          tulevat.map(renderTeema)
        )}

        <Typography variant="h5" marginTop={4} marginBottom={2}>
          Toteutuneet teemat
        </Typography>
        {menneet.length === 0 ? (
          <Typography variant="body1">Ei vielä toteutuneita teemoja.</Typography>
        ) : (
          menneet.map(renderTeema)
        )}
      </Box>

      <Dialog open={vahvistusAuki} onClose={() => setVahvistusAuki(false)}>
        <DialogTitle>Poista teema?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vahvista harjoitusteeman poisto
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVahvistusAuki(false)} color="inherit">
            Peruuta
          </Button>
          <Button onClick={poistaTeema} color="error">
            Poista
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success"
          sx={{ width: "100%" }}>
          Teema poistettu
        </Alert>
      </Snackbar>
    </>
  );
}

export default Theme;
