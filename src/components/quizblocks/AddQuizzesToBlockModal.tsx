import React, { useEffect, useState } from "react";
import PopUpContainer from "../popups/PopUp";
import thumbnailmain from '../../assets/thumbnail-main.jpg';
import { BiSearch } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";
import { useApi } from "../../hooks/useApi";
import { LoadingAnimation } from "../../pages/QuizBlocksScreen";
import toast from 'react-hot-toast';

interface Quiz {
	id: number;
	title: string;
	course_names: string;
	school_names: string;
	question_type: string;
	question_count: number;
	thumbnail_url: string | null;
	is_draft: number;
	premium: number;
	created_at: string;
}

interface AddQuizzesToBlockModalProps {
	quizBlockId: string | number;
	name: string;
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: () => void;
}

const AddQuizzesToBlockModal: React.FC<AddQuizzesToBlockModalProps> = ({
	quizBlockId,
	name,
	isOpen,
	onClose,
	onSuccess,
}) => {
	const [search, setSearch] = useState("");
	const [sortDesc, setSortDesc] = useState(false);
	const [selected, setSelected] = useState<Quiz[]>([]);
	const [quizzes, setQuizzes] = useState<Quiz[]>([]);
	const { apiFetch } = useApi();
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	// Fetch quizzes from API
	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				setLoading(true);
				const res = await apiFetch("/api/admin/quiz/all");
				const response = await res.json();

				if (response.success && response.data) {
					setQuizzes(response.data);
				}
			} catch (error) {
				console.error("Error fetching quizzes:", error);
				toast.error("Failed to load quizzes");
			} finally {
				setLoading(false);
			}
		};

		if (isOpen) {
			fetchQuizzes();
			setSelected([]);
			setSearch("");
		}
	}, [isOpen]);

	if (!isOpen) return null;

	const filtered = quizzes.filter(q =>
		q.title.toLowerCase().includes(search.toLowerCase()) ||
		q.course_names.toLowerCase().includes(search.toLowerCase()) ||
		q.school_names.toLowerCase().includes(search.toLowerCase())
	);

	const sorted = [...filtered].sort((a, b) =>
		sortDesc ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
	);

	const handleToggle = (quiz: Quiz) => {
		if (selected.some(s => s.id === quiz.id)) {
			setSelected(selected.filter(s => s.id !== quiz.id));
		} else {
			setSelected([...selected, quiz]);
		}
	};

	const handleSubmit = async () => {
		if (selected.length === 0) {
			toast.error("Please select at least one quiz");
			return;
		}

		try {
			setSubmitting(true);
			const quizIds = selected.map(q => q.id);

			const res = await apiFetch("/api/admin/quiz-block/add-quiz", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					quizBlockId: Number(quizBlockId),
					quizIds,
				}),
			});

			const result = await res.json();

			if (res.ok) {
				toast.success(`${selected.length} quiz(zes) added successfully!`);
				onSuccess?.();
				onClose();
			} else {
				toast.error(result.message || "Failed to add quizzes");
			}
		} catch (error) {
			console.error("Error adding quizzes:", error);
			toast.error("An error occurred while adding quizzes");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<PopUpContainer
			title={`Add Quizzes to "${name}"`}
			onClose={onClose}
			customWidth="w-[750px]"
			footer={
				<div className="flex justify-end gap-3">
					<button
						onClick={onClose}
						disabled={submitting}
						className="px-6 py-2 rounded-[4px] border border-[#C3C6CF] text-[#1A1C1E] hover:bg-[#F2F3FA] transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						disabled={selected.length === 0 || submitting}
						className={`px-6 py-2 rounded-[4px] text-white transition flex items-center gap-2 ${
							selected.length > 0 && !submitting
								? "bg-[#0360AB] hover:bg-[#035fabea]"
								: "bg-[#9fb4d6] cursor-not-allowed"
						}`}
					>
						{submitting ? (
							<>
								<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
								</svg>
								Adding...
							</>
						) : (
							`Add ${selected.length} Quiz${selected.length !== 1 ? "zes" : ""}`
						)}
					</button>
				</div>
			}
		>
			{/* Main Content - Fixed height with internal scrolling */}
			<div className="flex gap-6 h-[70vh] py-4 w-full">
				{loading ? (
					<div className="w-full h-full flex items-center justify-center">
						<LoadingAnimation />
					</div>
				) : (
					<>
						{/* Left: Quiz list */}
						<div className="flex-1 min-w-[55%] border-r-[1px] border-[#C3C6CF] flex flex-col">
							<div className="flex-col px-4 items-center gap-2 mb-4 flex-shrink-0">
								<div className="flex items-center border-[1px] bg-[#F2F3FA] border-[#C3C6CF] rounded px-2 h-[32px]">
									<BiSearch size={14} className="text-gray-500 mr-2" />
									<input
										type="text"
										placeholder="Search quizzes"
										value={search}
										onChange={e => setSearch(e.target.value)}
										className="flex-1 text-xs outline-none h-full bg-transparent"
										disabled={submitting}
									/>
								</div>

								<div className="flex items-center">
									<button
										className="text-xs px-3 py-2 bg-[#F2F3FA] rounded border border-[#C3C6CF] flex items-center gap-2 mt-2"
										disabled={submitting}
									>
										<IoFilter />
										Filter
									</button>
									<button
										className="ml-2 text-[#0360AB] text-lg"
										title="Reverse sort order"
										onClick={() => setSortDesc(d => !d)}
										disabled={submitting}
									>
										↓
									</button>
								</div>
							</div>
							<div className="overflow-y-auto flex-1 px-4">
								{sorted.length === 0 ? (
									<div className="text-center text-gray-400 py-8">
										No quizzes found.
									</div>
								) : (
									sorted.map(q => (
										<div
											key={q.id}
											className={`flex items-start gap-2 py-3 ${
												submitting ? "opacity-50 cursor-not-allowed" : ""
											}`}
										>
											<input
												type="checkbox"
												checked={selected.some(s => s.id === q.id)}
												onChange={() => handleToggle(q)}
												className="mt-1"
												disabled={submitting}
											/>
											{/* thumbnail */}
											<img
												src={q.thumbnail_url || thumbnailmain}
												alt={q.title}
												className="w-16 h-12 object-cover rounded-md flex-shrink-0"
											/>
											<div className="flex-1 min-w-0">
												<div className="font-medium text-sm truncate">
													{q.title}
												</div>
												<div className="text-xs text-[#73777F] truncate">
													{q.school_names}
												</div>
												<div className="flex flex-wrap gap-1 mt-1">
													<span className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs">
														{q.course_names}
													</span>
													<span className="bg-[#F2F3FA] text-[#73777F] rounded px-2 py-0.5 text-xs">
														{q.question_count} questions
													</span>
													{q.premium === 1 && (
														<span className="bg-yellow-100 text-yellow-800 rounded px-2 py-0.5 text-xs">
															Premium
														</span>
													)}
													{q.is_draft === 1 && (
														<span className="bg-gray-100 text-gray-800 rounded px-2 py-0.5 text-xs">
															Draft
														</span>
													)}
												</div>
											</div>
										</div>
									))
								)}
							</div>
						</div>

						{/* Right: Selected quizzes */}
						<div className="flex-1 min-w-0 flex flex-col px-4">
							<div className="font-medium text-sm mb-4 flex-shrink-0">
								<span className="text-[#0360AB]">
									{selected.length} Quiz{selected.length !== 1 ? "zes" : ""} selected
								</span>
							</div>
							<div className="overflow-y-auto flex-1">
								{selected.length === 0 ? (
									<div className="text-[#73777F] text-sm text-center mt-12">
										No quizzes selected yet.
									</div>
								) : (
									selected.map(q => (
										<div
											key={q.id}
											className="flex items-start gap-2 py-3"
										>
											<input
												type="checkbox"
												checked={true}
												onChange={() => handleToggle(q)}
												className="mt-1"
												disabled={submitting}
											/>
											<img
												src={q.thumbnail_url || thumbnailmain}
												alt={q.title}
												className="w-16 h-12 object-cover rounded-md flex-shrink-0"
											/>
											<div className="flex-1 min-w-0">
												<div className="font-medium text-sm truncate">
													{q.title}
												</div>
												<div className="text-xs text-[#73777F] truncate">
													{q.school_names}
												</div>
												<div className="flex flex-wrap gap-1 mt-1">
													<span className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs">
														{q.course_names}
													</span>
													<span className="bg-[#F2F3FA] text-[#73777F] rounded px-2 py-0.5 text-xs">
														{q.question_count} questions
													</span>
												</div>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</>
				)}
			</div>
		</PopUpContainer>
	);
};

export default AddQuizzesToBlockModal;
