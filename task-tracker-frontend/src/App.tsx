import { Route, BrowserRouter as Router, Routes } from 'react-router'
import { Dashboard } from './Layouts/Dashboard/Dashboard'
import AppLayout from './Layouts/AppLayout'
import ScrollToTop from './Utils/ScrollToTop'
import TaskLog from './Layouts/TaskLog/TaskLog'

export default function App() {

  return (
    <>
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasklog" element={<TaskLog />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}