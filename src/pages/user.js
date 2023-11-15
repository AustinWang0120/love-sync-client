import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout, setUser } from "@/store/userSlice";
import { useRouter } from "next/router";

export default function User() {
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		username: "",
		password: "",
	});

	useEffect(() => {
		// 从localStorage获取user信息
		const parsedUser = JSON.parse(localStorage.getItem("user"));
		if (parsedUser) {
			dispatch(setUser(parsedUser));
			// 更新formData
			setFormData({
				email: parsedUser.email,
				username: parsedUser.username,
				password: "",
			});
		} else {
			router.push("/login");
		}
	}, [dispatch, router]);

	// 登出函数
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		// 从redux store中删除用户信息
		dispatch(logout());
		router.push("/login");
	};

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();

		// 检查email，username，password是否为空
		if (!formData.email || !formData.username || !formData.password) {
			alert("Please fill in all fields");
			return;
		}

		try {
			// 从localStorage获取token
			const token = localStorage.getItem("token");
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
				const { password, ...updatedUser } = await response.json();
				// 更新localStorage中的user信息
				localStorage.setItem("user", JSON.stringify(updatedUser));
				// 更新redux store中的user信息
				dispatch(setUser(updatedUser));
				// 处理成功情况
				alert("Profile updated successfully");
				setEditMode(false);
				setFormData({
					email: "",
					username: "",
					password: "",
				});
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
								placeholder={user.email}
								onChange={handleChange}
								value={formData.email}
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							/>
						</div>

						<div className="mt-4">
							<label className="block" htmlFor="username">
								Username
							</label>
							<input
								type="username"
								name="username"
								id="username"
								placeholder={user.username}
								onChange={handleChange}
								value={formData.username}
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
						<p className="mt-4">Email: {user.email}</p>
						<button
							onClick={() => setEditMode(true)}
							className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-900"
						>
							Edit Profile
						</button>
						<button
							onClick={handleLogout}
							className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-900"
						>
							Logout
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
