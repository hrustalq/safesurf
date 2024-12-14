import { cn } from "@/utils/cn";
import { Link } from "@tanstack/react-router";


export default function HeaderNav({ className }: { className?: string }) {
  return (
    <header className={cn("sticky top-0 inset-x-0 h-14 z-50 bg-white border-b border-gray-200", className)}>
      <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto h-full">
        <h1 className="text-base font-bold">Admin</h1>
        <nav className="flex items-center gap-2">
          <ul className="flex items-center gap-5 w-full">
            <li>
              <Link className="link w-full" to="/">Главная</Link>
            </li>
            <li>
              <Link className="link w-full" to="/">Дашборд</Link>
            </li>
            <li>
              <Link className="link w-full" to="/">Пользователи</Link>
            </li>
            <li>
              <Link className="link w-full" to="/">Мониторинг</Link>
            </li>
            <li>
              <Link className="link w-full" to="/configs">Конфигурации</Link>
            </li>
            <li>
              <Link className="link w-full" to="/hosting">Кабинет хостинга</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}