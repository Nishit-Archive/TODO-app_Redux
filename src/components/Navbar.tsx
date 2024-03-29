import { ModeToggle } from "./mode-toggle";
export const Navbar = () => {
  return (
    <nav className="p-4 text-white bg-gray-800 dark:bg-gray-900">
      <div className="container flex items-center justify-between mx-auto">
        <div>
          <a
            href="https://github.com/Nishitbaria"
            className="text-lg font-bold text-white dark:text-gray-200"
          >
            TODO App
          </a>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
