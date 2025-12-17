import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChefHatIcon, XIcon, MenuIcon } from "../icons";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Recipes", path: "/recipes" },
  { name: "Add Recipe", path: "/add-recipe" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // const handleSignOut = async () => {
  //   await signOut();
  //   setIsOpen(false);
  // };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <ChefHatIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              Savory
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`nav-link ${router.pathname === link.path ? "text-primary active" : ""
                  }`}
              >

                {link.name}
              </Link>
            ))}

            {/* Auth Button */}
            {/* {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {user.email?.split('@')[0]}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm" className="btn-primary">
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In
                </Button>
              </Link>
            )} */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XIcon className="w-6 h-6 text-foreground" />
            ) : (
              <MenuIcon className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={
            `md:hidden overflow-hidden transition-all duration-300
            ${isOpen ? "max-h-80 pb-4" : "max-h-0"}`
          }
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`
                  "px-4 py-3 rounded-xl font-medium transition-colors",
                  ${router.pathname === link.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-muted"}
                `}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Button */}
            {/* {user ? (
              <>
                <div className="px-4 py-2 text-sm text-muted-foreground flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {user.email}
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-3 rounded-xl font-medium text-foreground/80 hover:bg-muted transition-colors text-left flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-xl font-medium bg-primary text-primary-foreground flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
