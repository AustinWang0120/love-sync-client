import { useState, useEffect } from "react";

export default function User() {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		username: "",
		password: "",
	});

	useEffect(() => {
		// 从localStorage获取用户信息
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			const { accessToken, user } = JSON.parse(storedUser);
			console.log(user, accessToken);
			setUser(user);
			setToken(token);
			setFormData({ ...formData, email: user.email, username: user.username });
		}
	}, []);

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			// 发送更新请求到 JSON Server
			const response = await fetch(`http://localhost:3001/users/${user.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // 使用 JWT 认证
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const updatedUser = await response.json();
				// 更新 localStorage 中的用户信息
				localStorage.setItem("user", JSON.stringify(updatedUser));
				setUser(updatedUser);
				setEditMode(false);
				alert("Profile updated successfully");
			} else {
				// 处理错误情况
				alert("Failed to update profile");
			}
		} catch (error) {
			alert("Failed to update profile");
		}
	};

	if (!user) {
		return <div>loading...</div>;
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="px-8 py-6 text-left bg-white shadow-lg">
				<h3 className="text-2xl font-bold text-center">User Profile</h3>
				{editMode ? (
					<form onSubmit={handleSubmit}>
						<div>
							<label className="block" htmlFor="email">
								Email
							</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Email"
								onChange={handleChange}
								value={formData.email}
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							/>
						</div>

						<div className="mt-4">
							<label className="block" htmlFor="password">
								New Password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="New Password"
								onChange={handleChange}
								value={formData.password}
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							/>
						</div>

						<div className="flex items-center justify-center mt-4">
							<button
								type="submit"
								className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
							>
								Save Changes
							</button>
						</div>
					</form>
				) : (
					<div>
						<p>Email: {user.email}</p>
						<button
							onClick={() => setEditMode(true)}
							className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-900"
						>
							Edit Profile
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
