import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import Link from "next/link";

export default function Register() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		// 检查密码是否一致
		if (formData.password !== formData.confirmPassword) {
			alert("Passwords don't match");
			return;
		}

		// 发送请求到json server auth api
		try {
			const response = await fetch("http://localhost:3001/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: formData.username,
					email: formData.email,
					password: formData.password,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				// 保存用户信息和token到localStorage
				localStorage.setItem("token", data.accessToken);
				localStorage.setItem("user", JSON.stringify(data.user));
				// 保存用户信息到redux store
				dispatch(setUser(data.user));
				// 跳转
				router.push("/user");
			} else {
				alert("Error creating account");
			}
		} catch (error) {
			alert("Error creating account");
			console.log(error);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="px-8 py-6 text-left bg-white shadow-lg">
				<h3 className="text-2xl font-bold text-center">Create an account</h3>

				<form onSubmit={handleSubmit}>
					<div className="mt-4">
						<label className="block" htmlFor="username">
							User Name
						</label>
						<input
							type="text"
							name="username"
							placeholder="Username"
							onChange={handleChange}
							value={formData.username}
							className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
						/>
					</div>

					<div className="mt-4">
						<label className="block" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							name="email"
							placeholder="Email"
							onChange={handleChange}
							value={formData.email}
							className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
						/>
					</div>

					<div className="mt-4">
						<label className="block" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							name="password"
							placeholder="Password"
							onChange={handleChange}
							value={formData.password}
							className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
						/>
					</div>

					<div className="mt-4">
						<label className="block" htmlFor="confirmPassword">
							Confirm Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							onChange={handleChange}
							value={formData.confirmPassword}
							className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
						/>
					</div>

					<div className="flex items-center justify-between mt-4">
						<button
							type="submit"
							className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
						>
							Register
						</button>
						<Link
							href={"/login"}
							className="text-sm text-blue-600 hover:underline"
						>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
