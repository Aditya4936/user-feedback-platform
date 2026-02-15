import { useAuth } from "../../auth/AuthContext";
import { useFeedback } from "../../hooks";
import { RATING_OPTIONS } from "../../constants";
import { FeedbackList } from "./FeedbackList";

export function FeedbackForm() {
    const { logout } = useAuth();
    const {
        feedbacks,
        fetchLoading,
        submitLoading,
        error,
        editing,
        formData,
        setFormField,
        handleEdit,
        cancelEdit,
        handleSubmit,
        handleDelete,
    } = useFeedback();

    return (
        <div className="min-h-screen w-full flex flex-col gap-4 items-center justify-center p-4 bg-orange-200 bg-cover bg-center">
            <button onClick={logout}>Logout</button>

            <h1 className="font-extrabold text-2xl">Feedback Form</h1>
            <p className="text-lg font-medium">Share your feedback with us</p>

            {error && (
                <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>
            )}

            <form className="flex flex-col gap-4 w-full max-w-lg" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormField("subject", e.target.value)}
                    required
                />
                <textarea
                    rows={5}
                    className="border border-gray-300 w-full p-4 rounded-2xl h-fit"
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormField("message", e.target.value)}
                    required
                />
                <select
                    className="border border-gray-300 w-full p-4 rounded-2xl"
                    value={formData.rating}
                    onChange={(e) => setFormField("rating", Number(e.target.value))}
                >
                    {RATING_OPTIONS.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>

                <div className="flex gap-2">
                    <button type="submit" disabled={submitLoading}>
                        {submitLoading
                            ? editing
                                ? "Updating..."
                                : "Submitting..."
                            : editing
                                ? "Update Feedback"
                                : "Submit Feedback"}
                    </button>
                    {editing && (
                        <button type="button" onClick={cancelEdit}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Feedback List */}
            <h2 className="font-bold text-xl mt-6">Your Feedbacks</h2>

            {fetchLoading ? (
                <p>Loading feedbacks...</p>
            ) : feedbacks.length === 0 ? (
                <p className="text-gray-600">No feedbacks yet. Submit one above!</p>
            ) : (
                <FeedbackList
                    data={feedbacks}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
