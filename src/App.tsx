import { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router'

import { Spinner } from '@components/ui'
import { AppRoutes, routeConfig } from '@config/routes.tsx'

import './App.css'

export const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <Routes>
          {Object.values(AppRoutes).map((route) => (
            <Route
              key={route}
              path={routeConfig[route].path}
              element={routeConfig[route].element}
            />
          ))}
        </Routes>
      </Router>
    </Suspense>
  )
}
