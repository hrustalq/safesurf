import HeaderNav from '@/components/navigation/header-nav'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <HeaderNav className='flex-shrink-0' />
      <main className="max-w-screen-xl w-full flex flex-col basis-auto mx-auto flex-1">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
})