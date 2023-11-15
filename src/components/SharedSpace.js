import { useState } from "react";

export default function SharedSpace({ sharedContent, onNewShare }) {
	const [newShare, setNewShare] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		onNewShare(newShare);
		setNewShare(""); // 清空输入框
	};

	return (
		<div>
			<h2>Shared Space</h2>

			{/* 分享内容的表单 */}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={newShare}
					onChange={e => setNewShare(e.target.value)}
					placeholder="Share something..."
				/>
				<button type="submit">Share</button>
			</form>

			{/* 显示共享内容 */}
			{sharedContent.map((post, index) => (
				<div key={index}>
					<p>{post.content}</p>
				</div>
			))}
		</div>
	);
}
