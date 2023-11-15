export default function Chat({ messages, currentUserId }) {
	return (
		<div>
			<h2>Chat</h2>
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
