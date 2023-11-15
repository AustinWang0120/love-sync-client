export const registerUser = async userData => {
	const response = await fetch("http://localhost:3001/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	const data = await response.json();
	return data;
};

export const loginUser = async userData => {
	const response = await fetch("http://localhost:3001/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	const data = await response.json();
	return data;
};

export const updateUser = async userData => {
	const token = localStorage.getItem("token");
	const response = await fetch(`http://localhost:3001/users/${userData.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(userData),
	});
	const data = await response.json();
	return data;
};
