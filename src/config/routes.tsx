import { RouteProps } from 'react-router-dom'

import { LoginPage } from '@pages/LoginPage'
import { NotFoundPage } from '@pages/not-found-page'

import { ChatPage } from '../pages/ChatPage'

export enum AppRoutes {
  LOGIN = 'login',
  CHAT = 'chat',
  NOT_FOUND = 'not-found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: '/',
  [AppRoutes.CHAT]: '/chat',
  [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
  },
  [AppRoutes.CHAT]: {
    path: RoutePath.chat,
    element: <ChatPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath['not-found'],
    element: <NotFoundPage />,
  },
}
