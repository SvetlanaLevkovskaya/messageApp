import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import { AppRoutes, routeConfig } from './config/routes.tsx'

export const App = () => {
  return (
    <Router>
      <Routes>
        {Object.values(AppRoutes).map((route) => (
          <Route key={route} path={routeConfig[route].path} element={routeConfig[route].element} />
        ))}
      </Routes>
    </Router>
  )
}
