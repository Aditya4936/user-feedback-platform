import type { Feedback } from "../../types";

interface FeedbackListProps {
    data: Feedback[];
    onEdit: (feedback: Feedback) => void;
    onDelete: (id: string) => void;
}

export function FeedbackList({ data, onEdit, onDelete }: FeedbackListProps) {
    return (
        <div className="w-full max-w-lg flex flex-col gap-3">
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Description</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((fb) => (
                        <tr key={fb._id}>
                            <td className="py-4">{fb.subject}</td>
                            <td className="py-4">{fb.message}</td>
                            <td className="py-4">{fb.rating}</td>
                            <td className="flex gap-1 py-4">
                                <div
                                    onClick={() => onDelete(fb._id)}
                                    className="bg-red-500 rounded-full px-3 cursor-pointer py-1"
                                >
                                    Delete
                                </div>
                                <div
                                    onClick={() => onEdit(fb)}
                                    className="bg-gray-400 rounded-full px-3 cursor-pointer py-1"
                                >
                                    Edit
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
