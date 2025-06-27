import { useState, useEffect } from "react";
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
	collection,
	addDoc,
	getDocs,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";

function Admin() {
	const [user, setUser] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [link, setLink] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [projects, setProjects] = useState([]);
	const [editing, setEditing] = useState(false);
	const [editId, setEditId] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
				fetchProjects();
			} else {
				setUser(null);
			}
		});

		// cleanup on unmount
		return () => unsubscribe();
	}, []);
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await signInWithEmailAndPassword(auth, email, password);
			setUser(res.user);
			fetchProjects();
		} catch (err) {
			alert("Login failed");
		}
	};

	const logout = () => {
		signOut(auth);
		setUser(null);
	};

	const addProject = async (e) => {
		e.preventDefault();

		try {
			if (editing) {
				// Update existing project
				const projectRef = doc(db, "projects", editId);
				await updateDoc(projectRef, {
					title,
					description,
					link,
					imageUrl,
				});
				setEditing(false);
				setEditId(null);
			} else {
				// Add new project
				await addDoc(collection(db, "projects"), {
					title,
					description,
					link,
					imageUrl,
				});
			}

			// Reset form
			setTitle("");
			setDescription("");
			setLink("");
			setImageUrl("");

			fetchProjects();
		} catch (err) {
			console.error("Failed to save project:", err);
		}
	};

	const fetchProjects = async () => {
		const snapshot = await getDocs(collection(db, "projects"));
		const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		setProjects(data);
	};

	const deleteProject = async (id) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this project?"
		);
		if (!confirmDelete) return;

		try {
			await deleteDoc(doc(db, "projects", id));
			fetchProjects(); // refresh the list
		} catch (err) {
			console.error("Error deleting project:", err);
		}
	};

	return (
		<div className="max-w-xl mx-auto mt-10">
			{!user ? (
				<form
					onSubmit={handleLogin}
					className="bg-white dark:bg-gray-800 p-6 rounded shadow text-gray-900 dark:text-white"
				>
					<h2 className="text-xl font-bold mb-4">Admin Login</h2>
					<input
						type="email"
						placeholder="Email"
						className="w-full mb-3 p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full mb-3 p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded w-full"
					>
						Login
					</button>
				</form>
			) : (
				<div className="bg-white p-6 rounded shadow">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold  dark:text-black">Admin Panel</h2>
						<button onClick={logout} className="text-red-500 hover:underline">
							Logout
						</button>
					</div>

					<form
						onSubmit={addProject}
						className="bg-white dark:bg-gray-800 p-6 rounded shadow text-gray-900 dark:text-white"
					>
						<input
							type="text"
							placeholder="Project Title"
							className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
						<textarea
							placeholder="Description"
							className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
						<input
							type="text"
							placeholder="GitHub or Live Link"
							className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							value={link}
							onChange={(e) => setLink(e.target.value)}
							required
						/>
						<input
							type="text"
							placeholder="Image URL (from imgbb.com)"
							className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							required
						/>
						<button
							className={`px-4 py-2 rounded text-white ${
								editing
									? "bg-yellow-500 hover:bg-yellow-600"
									: "bg-green-500 hover:bg-green-600"
							}`}
						>
							{editing ? "Save Changes" : "Add Project"}
						</button>
					</form>

					<h3 className="text-lg font-semibold mb-2  dark:text-black">
						Your Projects
					</h3>
					<ul className="space-y-4">
						{projects.map((p) => (
							<li
								key={p.id}
								className="p-4 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
							>
								<img
									src={p.imageUrl}
									alt={p.title}
									className="w-full h-40 object-cover mb-2 rounded"
								/>
								<h4 className="font-bold">{p.title}</h4>
								<p>{p.description}</p>
								<a
									href={p.link}
									className="text-blue-600 underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									View Project
								</a>
								<button
									onClick={() => deleteProject(p.id)}
									className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
								>
									Delete
								</button>
								<button
									onClick={() => {
										setEditing(true);
										setEditId(p.id);
										setTitle(p.title);
										setDescription(p.description);
										setLink(p.link);
										setImageUrl(p.imageUrl);
										window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
									}}
									className="mt-2 ml-2 px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
								>
									Edit
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default Admin;
