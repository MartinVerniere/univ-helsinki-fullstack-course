import axios from "axios";
import type { DiaryEntry } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
	const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);

	return data;
};

export default {
	getAll
};