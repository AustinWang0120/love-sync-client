import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3001/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
			});

			// 处理登录成功以及登录失败
			if (response.ok) {
				const data = await response.json();
				// 保存用户信息和token到localStorage
				localStorage.setItem("token", data.accessToken);
				localStorage.setItem("user", JSON.stringify(data.user));
				// 重定向到用户管理页面
				router.push("/user");
			} else {
				alert("Invalid email or password");
			}
		} catch (error) {
			alert("Invalid email or password");
		}
	};

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
				<h3 className="text-2xl font-bold text-center">
					Login to your account
				</h3>

				<form onSubmit={handleSubmit}>
					<div className="mt-4">
						<div>
							<label htmlFor="email" className="block">
								Email
							</label>
							<input
								type="text"
								name="email"
								placeholder="Email"
								value={formData.email}
								onChange={handleChange}
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							/>
						</div>

						<div className="mt-4">
							<label className="block">Password</label>
							<input
								type="password"
								name="password"
								placeholder="Password"
								value={formData.password}
								onChange={handleChange}
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							/>
						</div>

						<div className="flex items-baseline justify-between">
							<button
								type="submit"
								className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
							>
								Login
							</button>
							<Link
								href={"/register"}
								className="text-sm text-blue-600 hover:underline"
							>
								Create an account
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
