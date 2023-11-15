import { useState } from "react";

export default function Chat({ messages, currentUserId, onNewMessage }) {
	const [newMessage, setNewMessage] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		onNewMessage(newMessage);
		setNewMessage(""); // 清空输入框
	};

	return (
		<div>
			<h2>Chat</h2>

			{/* 聊天消息的表单 */}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={newMessage}
					onChange={e => setNewMessage(e.target.value)}
					placeholder="Say something..."
				/>
				<button type="submit">Send</button>
			</form>

			{/* 显示聊天消息 */}
			{messages.map((message, index) => (
				<div
					key={index}
					style={{
						textAlign: message.userId === currentUserId ? "right" : "left",
					}}
				>
					<p>{message.text}</p>
				</div>
			))}
		</div>
	);
}
