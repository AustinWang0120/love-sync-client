export default function SharedSpace({ sharedContent }) {
	return (
		<div>
			<h2>Shared Space</h2>
			{/* 显示共享内容 */}
			{sharedContent.map((post, index) => (
				<div key={index}>
					<p>{post.content}</p>
				</div>
			))}
		</div>
	);
}
