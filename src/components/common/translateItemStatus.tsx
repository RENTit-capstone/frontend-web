import { StatusTag } from "./Tag";

export const translateItemStatus = (status: string): StatusTag => {
    switch (status) {
        case "AVAILABLE":
            return "대여가능";
        case "OUT":
            return "대여중";
        default:
            return "대여가능";
    }
};