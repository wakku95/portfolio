import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { DarkModeToggle } from "../App.jsx";

function Projects() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		const fetchProjects = async () => {
			const snapshot = await getDocs(collection(db, "projects"));
			const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			setProjects(data);
		};

		fetchProjects();
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-10 max-w-7xl mx-auto">
			<h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
				My Projects
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{projects.map((project) => (
					<div
						key={project.id}
						className="bg-white dark:bg-gray-800 transition-transform duration-300 transform hover:scale-105 shadow-md rounded-lg overflow-hidden"
					>
						<img
							src={project.imageUrl}
							alt={project.title}
							className="h-48 w-full object-cover"
						/>
						<div className="p-4">
							<h2 className="text-xl font-semibold">{project.title}</h2>
							<p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
								{project.description}
							</p>
							<a
								href={project.link}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:underline"
							>
								View Project →
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Projects;
