import { useDispatch } from "react-redux";
import { setUser, logout } from "@/store/userSlice";

export default function useAuth() {
	const dispatch = useDispatch();
}
