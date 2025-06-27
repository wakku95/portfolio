import { Link } from "react-router-dom";
import dp from "../assets/dp.jpg";

function Home() {
	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center px-4">
			{/* Profile Image (Optional) */}
			<img
				src={dp}
				alt="Your Name"
				className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500"
			/>

			{/* Name + Intro */}
			<h1 className="text-4xl font-bold mb-2">Hi, I'm Waqar</h1>
			<p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-md">
				I'm a frontend web developer passionate about React, Firebase, and
				building real-world web apps.
			</p>

			{/* Skills */}
			<div className="mt-6">
				<h2 className="text-2xl font-semibold mb-2 text-center">Skills</h2>
				<ul className="flex flex-wrap gap-4 justify-center text-sm">
					<li className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded">
						ReactJS
					</li>
					<li className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded">
						Firebase
					</li>
					<li className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded">
						Tailwind CSS
					</li>
					<li className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded">
						JavaScript
					</li>
					<li className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded">
						NodeJs
					</li>
					<li className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded">
						Mysql
					</li>
					<li className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded">
						MongoDB
					</li>
				</ul>
			</div>

			{/* View Projects Button */}
			<Link to="/projects">
				<button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
					View My Projects →
				</button>
			</Link>
		</div>
	);
}

export default Home;
