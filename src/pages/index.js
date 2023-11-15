import { useState, useEffect } from "react";
import SharedSpace from "@/components/SharedSpace";
import Chat from "@/components/Chat";

export default function Home() {
	// 假设当前登录的用户ID是1，他们的coupleId是1
	const currentUserId = 1;
	const coupleId = 1;

	// 用于存储共享内容和消息的状态
	const [sharedContent, setSharedContent] = useState([]);
	const [messages, setMessages] = useState([]);

	// 从模拟的API获取共享内容和消息
	useEffect(() => {
		// 从模拟的API获取共享内容
		const fetchSharedContent = async () => {
			const response = await fetch(
				"http://localhost:3001/shared?coupleId=" + coupleId
			);
			const data = await response.json();
			setSharedContent(data[0].posts);
		};

		// 从模拟的API获取消息
		const fetchMessages = async () => {
			const response = await fetch(
				"http://localhost:3001/messages?coupleId=" + coupleId
			);
			const data = await response.json();
			setMessages(data[0].chat);
		};

		fetchSharedContent();
		fetchMessages();
	}, [coupleId]);

	// 处理新的分享内容
	const handleNewShare = async content => {
		// 获取当前共享内容数组
		const response = await fetch(
			`http://localhost:3001/shared?coupleId=${coupleId}`
		);
		const sharedData = await response.json();
		const currentShared = sharedData[0].posts;

		// 添加新的分享内容到数组
		const updatedShared = [...currentShared, { content }];

		// 更新后端数据
		await fetch(`http://localhost:3001/shared/${sharedData[0].id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...sharedData[0], posts: updatedShared }),
		});

		// 更新前端状态
		setSharedContent(updatedShared);
	};

	// 处理新的消息
	const handleNewMessage = async text => {
		// 获取当前消息数组
		const response = await fetch(
			`http://localhost:3001/messages?coupleId=${coupleId}`
		);
		const messagesData = await response.json();
		const currentMessages = messagesData[0].chat;

		// 添加新的消息到数组
		const updatedMessages = [
			...currentMessages,
			{ text, userId: currentUserId },
		];

		// 更新后端数据
		await fetch(`http://localhost:3001/messages/${messagesData[0].id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...messagesData[0], chat: updatedMessages }),
		});

		// 更新前端状态
		setMessages(updatedMessages);
	};

	return (
		<div>
			<SharedSpace sharedContent={sharedContent} onNewShare={handleNewShare} />
			<Chat
				messages={messages}
				currentUserId={currentUserId}
				onNewMessage={handleNewMessage}
			/>
		</div>
	);
}
