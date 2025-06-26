import { Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
import Projects from "./pages/Projects";
// import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import { useEffect, useState } from "react";

export const DarkModeToggle = () => {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		const root = window.document.documentElement;
		if (dark) {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [dark]);

	return (
		<button
			onClick={() => setDark(!dark)}
			className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-700 text-sm px-4 py-2 rounded shadow"
		>
			{dark ? "☀️ Light" : "🌙 Dark"}
		</button>
	);
};

export default function App() {
	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
			<DarkModeToggle />
			<div className="p-4">
				<nav className="flex gap-4 mb-4">
					<Link to="/">Home</Link>
					<Link to="/projects">Projects</Link>
					<Link to="/contact">Contact</Link>
					<Link to="/admin">Admin</Link>
				</nav>

				<Routes>
					{/* <Route path="/" element={<Home />} /> */}
					<Route path="/projects" element={<Projects />} />
					{/* <Route path="/contact" element={<Contact />} /> */}
					<Route path="/admin" element={<Admin />} />
				</Routes>
			</div>
		</div>
	);
}
