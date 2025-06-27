import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function Contact() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await addDoc(collection(db, "messages"), {
				name,
				email,
				message,
				timestamp: new Date(),
			});
			setName("");
			setEmail("");
			setMessage("");
			setSuccess(true);
		} catch (err) {
			alert("Error sending message.");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-10">
			<h1 className="text-3xl font-bold mb-6 text-center">Contact Me</h1>

			<form
				onSubmit={handleSubmit}
				className="max-w-lg mx-auto space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow"
			>
				<input
					type="text"
					placeholder="Your Name"
					className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<input
					type="email"
					placeholder="Your Email"
					className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<textarea
					placeholder="Your Message"
					className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
					rows={5}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
				/>
				<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
					Send Message
				</button>

				{success && (
					<p className="text-green-500">Message sent successfully!</p>
				)}
			</form>
		</div>
	);
}

export default Contact;
