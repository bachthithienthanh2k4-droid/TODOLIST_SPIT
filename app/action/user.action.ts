"use server";
import { IUser } from "../types/user";

export const getUsers = async (): Promise<IUser[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/users`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store", // Luôn lấy dữ liệu mới
        });

        const result = await response.json();

        // Kiểm tra object trả về có trường data là array không
        if (result && Array.isArray(result.data)) {
            return result.data as IUser[];
        } else if (result && typeof result.data === "object") {
            // Chuyển object thành array gồm 1 phần tử
            return [result.data] as IUser[];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        return [];
    }
}
