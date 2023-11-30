import { Outlet } from "react-router-dom";
import Header from "./Header";
import { GitHub } from "react-feather";

const Layout = () => {
  return (
    <>
      <header className="bg-dark-400/80 border-b border-dark-300 backdrop-blur-sm sm:fixed shadow-sm z-30 w-full min-w-[280px] px-1.5 2xl:px-0 ">
        <Header />
      </header>
      <main className="mx-auto flex w-full min-w-[280px] sm:mt-12 max-w-screen-2xl grow flex-col px-1.5 pt-2 pb-12 2xl:px-0">
        <Outlet />
      </main>
      <footer className="border-dark-400 relative mx-auto w-full min-w-[280px] max-w-screen-2xl border-t py-8 px-1.5 text-center text-sm text-slate-100/70 2xl:px-0">
        <button
          type="button"
          aria-label="Scroll to top of page"
          className="border-dark-300 bg-dark-500 mb-2.5 rounded-full border py-1.5 px-5 transition-colors sm:hover:border-dark-100"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Scroll to top
        </button>
        <p className="flex justify-center items-center">
          <a
            href="https://github.com/AlexanderOrmseth/CodeShareApp"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-accent-400 flex items-center px-1"
          >
            <GitHub aria-hidden="true" size={16} className="mr-1" />
            Alexander Ormseth
          </a>
          &copy; 2022
        </p>
      </footer>
    </>
  );
};

export default Layout;
