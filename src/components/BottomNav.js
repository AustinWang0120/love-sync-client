import Link from "next/link";

export default function BottomNav() {
	return (
		<nav>
			<div>
				<Link href={"/"}>
					<span>home</span>
					<span>Shared</span>
				</Link>

				<Link href={"/chat"}>
					<span>chat</span>
					<span>Chat</span>
				</Link>

				<Link href={"/user"}>
					<span>person</span>
					<span>Settings</span>
				</Link>
			</div>
		</nav>
	);
}
