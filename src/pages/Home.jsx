import { Link } from "react-router-dom";
import dp from "../assets/dp.jpg";

function Home() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
			{/* Profile Image */}
			<img
				src={dp}
				alt="Your Name"
				className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 border-4 border-blue-500"
			/>

			{/* Name + Intro */}
			<h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
				Hi, I'm Waqar
			</h1>
			<p className="text-base sm:text-lg text-center text-gray-700 dark:text-gray-300 max-w-md">
				I'm a frontend web developer passionate about React, Firebase, and
				building real-world web apps.
			</p>

			{/* Skills Section */}
			<div className="mt-6 w-full">
				<h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center">
					Skills
				</h2>
				<ul className="flex flex-wrap justify-center gap-2 text-sm">
					{[
						"ReactJS",
						"Firebase",
						"Tailwind CSS",
						"JavaScript",
						"Nodejs",
						"Mongodb",
						"Mysql",
					].map((skill) => (
						<li
							key={skill}
							className="bg-blue-100 dark:bg-blue-800 text-gray-800 dark:text-white px-3 py-1 rounded"
						>
							{skill}
						</li>
					))}
				</ul>
			</div>

			{/* View Projects Button */}
			<Link to="/projects">
				<button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-sm sm:text-base">
					View My Projects →
				</button>
			</Link>
		</div>
	);
}

export default Home;
