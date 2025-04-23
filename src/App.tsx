// Import the necessary modules and components
import Dashboard from "./pages/Dashboard";
import NewEntry from "./pages/NewEntry";
import History from "./pages/History";
import Tasks from "./pages/Tasks";
import Theme from "./pages/Theme";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
function App () {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="theme" element={<Theme />} />
        <Route path="history" element={<History />} />
        <Route path="new-entry" element={<NewEntry />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
