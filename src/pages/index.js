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

	return (
		<div>
			<SharedSpace sharedContent={sharedContent} />
			<Chat messages={messages} currentUserId={currentUserId} />
		</div>
	);
}
