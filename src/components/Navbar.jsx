import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // You can use heroicons or remove if not using icons

function Navbar() {
	const { pathname } = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);

	const linkClass = (path) =>
		`block px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition ${
			pathname === path
				? "bg-blue-500 text-white"
				: "text-gray-700 dark:text-gray-200"
		}`;

	return (
		<nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
			<div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
				{/* Logo */}
				<Link
					to="/"
					className="text-xl font-bold text-blue-800 dark:text-gray-100"
				>
					PORTFOLIO
				</Link>

				{/* Desktop menu */}
				<div className="hidden md:flex space-x-4">
					<Link to="/" className={linkClass("/")}>
						Home
					</Link>
					<Link to="/projects" className={linkClass("/projects")}>
						Projects
					</Link>
					<Link to="/contact" className={linkClass("/contact")}>
						Contact
					</Link>
					<Link to="/admin" className={linkClass("/admin")}>
						Admin
					</Link>
				</div>

				{/* Mobile toggle button */}
				<button
					className="md:hidden text-gray-700 dark:text-white"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					{menuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile dropdown */}
			{menuOpen && (
				<div className="md:hidden px-4 pb-4 space-y-2">
					<Link
						to="/"
						className={linkClass("/")}
						onClick={() => setMenuOpen(false)}
					>
						Home
					</Link>
					<Link
						to="/projects"
						className={linkClass("/projects")}
						onClick={() => setMenuOpen(false)}
					>
						Projects
					</Link>
					<Link
						to="/contact"
						className={linkClass("/contact")}
						onClick={() => setMenuOpen(false)}
					>
						Contact
					</Link>

					<Link
						to="/admin"
						className={linkClass("/admin")}
						onClick={() => setMenuOpen(false)}
					>
						Admin
					</Link>
				</div>
			)}
		</nav>
	);
}

export default Navbar;
