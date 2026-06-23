import { ShoppingCart, User, Menu, Search } from "lucide-react";

function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-800 text-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex shrink-0 items-center gap-3">
          <Menu className="h-6 w-6" />
        </div>

        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full bg-white rounded-md border border-slate-300 py-2 pl-10 pr-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <ShoppingCart className="hidden h-5 w-5 sm:block" />
          <User className="hidden h-5 w-5 sm:block" />
        </div>
      </div>
    </header>
  );
}

export default Header;