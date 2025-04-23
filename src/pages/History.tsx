import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function History() {

    type Entry = {
        id: string;
        date: string;
        mood: number;
        performance: number;
        rating: number;
        notes: string;
      };

    const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("entries") || "[]");
    setEntries(stored.reverse()); // uusimmat ensin
  }, []);


  return (
    <>
 <Box sx={{width:'75%'}} mx="auto">
      <Typography variant="h5" mb={3}>Harjoitusmerkintäsi</Typography>

      {entries.length === 0 && (
        <Typography variant="body1">Ei vielä merkintöjä.</Typography>
      )}

      {entries.map((entry) => (
        <Card key={entry.id} sx={{ mb: 2, backgroundColor: 'background.paper' }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              {entry.date}
            </Typography>

            <Typography variant="body1" mt={1}> Fiilis: {entry.mood} / 10</Typography>

            <Typography variant="body1">Suorituskyky: {entry.performance} / 10</Typography>
            <Typography variant="body1">Arvosana: {entry.rating} / 10</Typography>

            <Divider sx={{ my: 1 }} />

            <Typography variant="body2">{entry.notes}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
    </>
  );
}

export default History;