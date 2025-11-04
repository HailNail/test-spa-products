import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <header className="border-b w-full">
      <div className="mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl  font-header">Product SPA project</h1>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
