import SharedSpace from "@/components/SharedSpace";
import Chat from "@/components/Chat";

export default function Home() {
	// 假设当前登录的用户ID是1，他们的coupleId是1
	const currentUserId = 1;
	const coupleId = 1;

	// 用于存储共享内容和消息的状态
	const [sharedContent, setSharedContent] = useState([]);
	const [messages, setMessages] = useState([]);
}
