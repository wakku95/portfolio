import { useState, useEffect } from "react";
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function Admin() {
	const [user, setUser] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [link, setLink] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [projects, setProjects] = useState([]);

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
			await addDoc(collection(db, "projects"), {
				title,
				description,
				link,
				imageUrl,
			});

			setTitle("");
			setDescription("");
			setLink("");
			setImageUrl("");
			fetchProjects();
		} catch (err) {
			console.error("Failed to add project:", err);
		}
	};

	const fetchProjects = async () => {
		const snapshot = await getDocs(collection(db, "projects"));
		const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		setProjects(data);
	};

	return (
		<div className="max-w-xl mx-auto mt-10">
			{!user ? (
				<form onSubmit={handleLogin} className="bg-white p-6 rounded shadow">
					<h2 className="text-xl font-bold mb-4">Admin Login</h2>
					<input
						type="email"
						placeholder="Email"
						className="w-full mb-3 p-2 border rounded"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full mb-3 p-2 border rounded"
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
						<h2 className="text-xl font-bold">Admin Panel</h2>
						<button onClick={logout} className="text-red-500 hover:underline">
							Logout
						</button>
					</div>

					<form onSubmit={addProject} className="space-y-3 mb-6">
						<input
							type="text"
							placeholder="Project Title"
							className="w-full p-2 border rounded"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
						<textarea
							placeholder="Description"
							className="w-full p-2 border rounded"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
						<input
							type="text"
							placeholder="GitHub or Live Link"
							className="w-full p-2 border rounded"
							value={link}
							onChange={(e) => setLink(e.target.value)}
							required
						/>
						<input
							type="text"
							placeholder="Image URL (from imgbb.com)"
							className="w-full p-2 border rounded"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							required
						/>
						<button className="bg-green-500 text-white px-4 py-2 rounded">
							Add Project
						</button>
					</form>

					<h3 className="text-lg font-semibold mb-2">Your Projects</h3>
					<ul className="space-y-4">
						{projects.map((p) => (
							<li key={p.id} className="p-4 border rounded bg-gray-50">
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
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default Admin;
