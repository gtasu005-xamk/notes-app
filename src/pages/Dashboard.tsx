import { Box, Card, CardContent, Typography } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from "react";

interface Teema {
  id: string;
  teema: string;
  aloitus: string;
  loppu: string;
}

interface Task {
  id: string;
  text: string;
  done: boolean;
}

interface Entry {
  id: string;
  date: string;
  mood: number;
  performance: number;
  rating: number;
}

function Dashboard() {
  const [aktiivinenTeema, setAktiivinenTeema] = useState<Teema | null>(null);
  const [aktiivisetTehtävät, setAktiivisetTehtävät] = useState<Task[]>([]);
  const [entryData, setEntryData] = useState<Entry[]>([]);

  useEffect(() => {
    const nyt = new Date();

    const tallennetutTeemat: Teema[] = JSON.parse(localStorage.getItem("themes") || "[]");
    const aktiiviset = tallennetutTeemat.filter((t) => {
      const alku = new Date(t.aloitus);
      const loppu = new Date(t.loppu);
      return alku <= nyt && nyt <= loppu;
    });
    setAktiivinenTeema(aktiiviset[0] || null);

    const tallennetutTehtävät: Task[] = JSON.parse(localStorage.getItem("tehtävät") || "[]");
    const aktiivisetTehtävät = tallennetutTehtävät.filter((t) => !t.done);
    setAktiivisetTehtävät(aktiivisetTehtävät);

    const tallennetutMerkinnät: Entry[] = JSON.parse(localStorage.getItem("entries") || "[]");
    setEntryData(tallennetutMerkinnät);
  }, []);

  const xLabels = entryData.map(entry => entry.date);
  const moodData = entryData.map(entry => entry.mood);
  const performanceData = entryData.map(entry => entry.performance);
  const ratingData = entryData.map(entry => entry.rating);

  return (
    <Box display="flex" flexDirection="column" gap={3}>

      <Box display="flex" gap={2}>
        <Card sx={{ flex: 1, maxHeight: 200, overflow: 'auto', border: '1px solid', borderColor: 'pink' }}>
        <CardContent>
          <Typography variant="h6">Nykyinen harjoitusteema</Typography>
          {aktiivinenTeema ? (
              <>
                <Typography variant="subtitle1">{aktiivinenTeema.teema}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {aktiivinenTeema.aloitus} – {aktiivinenTeema.loppu}
                </Typography>
              </>
            ) : (
              <Typography variant="body2">Ei aktiivista teemaa.</Typography>
            )}
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, maxHeight: 200, overflow: 'auto', border: '1px solid', borderColor: 'lightgreen' }}>
          <CardContent>
            <Typography variant="h6">Aktiiviset tehtävät</Typography>
            {aktiivisetTehtävät.length === 0 ? (
              <Typography variant="body2">Ei aktiivisia tehtäviä.</Typography>
            ) : (
              <ul style={{ paddingLeft: 16 }}>
                {aktiivisetTehtävät.map((task) => (
                  <li key={task.id}>
                    <Typography variant="body2">{task.text}</Typography>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </Box>
      
      {/* Graphit */}
      <Box display="flex" gap={2}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Fiilis</Typography>
            <Box height={250}>
              <LineChart
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                series={[{ data: moodData, label: 'Fiilis', color: 'cyan' }]}
                height={250}
              />
            </Box>
            </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Suorituskyky</Typography>
            <Box height={250}>
              <LineChart
                xAxis={[{ scaleType: 'point', data: xLabels }]}
          
                series={[{ data: performanceData, label: 'Suorituskyky', color: 'lightgreen' }]}
                height={250}
              />
            </Box>
            </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Kokonaisarvosana</Typography>
            <Box height={250}>
              <LineChart
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                series={[{ data: ratingData, label: 'Arvosana', color: 'pink' }]}
                height={250}
              />
            </Box>
            </CardContent>
        </Card>
      </Box>

    </Box>
  );
}

export default Dashboard;
