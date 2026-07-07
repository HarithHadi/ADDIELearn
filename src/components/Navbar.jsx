import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
    { label: "Home", to: "/"},
    { label: "Learn", to: "/Lesson"},
    { label: "Quiz", to: "/Quiz"},
    { label: "Progress", to: "/Progress"},
];

/* ----------------------------------------------------------------------------------
Steps to Add links to Navbar

1. Import Component to App.jsx
2. Add Component in Routes "<Route path="/LinkName" element={<Component />} />"
3. Add Link in links variable 

---------------------------------------------------------------------------------- */


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl bg-cream border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono">
            <div className="px-4 flex items-center justify-between h-10">

                {/* Desktop */}
                <ul className="hidden md:flex items-center gap-4">
                    {links.map(({label, to}) =>(
                        <li key={to}>
                            <Link
                                to={to}
                                className={`text-sm px-1 hover:bg-black hover:text-cream transition-colors ${
                                    location.pathname === to ? "font-bold" : "text-black"
                                }`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Hamburger (mobile) */}
                <button
                    className="md:hidden p-1 text-black hover:bg-black hover:text-cream transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        }
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden border-t-2 border-black px-4 py-3 flex flex-col gap-1 bg-cream rounded-b-lg">
                {links.map(({ label, to }) => (
                    <Link
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 text-sm text-black hover:bg-black hover:text-cream transition-colors"
                    >
                    {label}
                    </Link>
                ))}
                </div>
            )}

        </nav>
    )
}