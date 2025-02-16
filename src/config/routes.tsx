import { RouteProps } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage.tsx'
import { ChatPage } from '../pages/ChatPage.tsx'

export enum AppRoutes {
  LOGIN = 'login',
  CHAT = 'chat',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: '/',
  [AppRoutes.CHAT]: '/chat',
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
}
