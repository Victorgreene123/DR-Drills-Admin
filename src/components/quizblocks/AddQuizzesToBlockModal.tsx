import React, { useState } from "react";

import PopUpContainer from "../popups/PopUp";

const quizzes = [
	{
		id: 1,
		title: "introduction to physiology",
		subtitle: "Unilag 2014 incourse incourse N...",
		tags: ["Anatomy", "Physiology", "Physiology", "+3"],
		icon: "📝",
	},
	{
		id: 2,
		title: "Head and neck osteology",
		subtitle: "",
		tags: ["Anatomy", "Anatomy", "Physiology"],
		icon: "🧑‍⚕️",
	},
	{
		id: 3,
		title: "Head and neck osteology",
		subtitle: "",
		tags: ["Anatomy"],
		icon: "📚",
	},
	{
		id: 4,
		title: "Head and neck osteology",
		subtitle: "",
		tags: ["Anatomy", "Physiology", "Physiology"],
		icon: "🟩",
	},
	{
		id: 5,
		title: "Head and neck osteology",
		subtitle: "",
		tags: ["Anatomy", "Physiology", "Physiology"],
		icon: "🟩",
	},
	{
		id: 6,
		title: "Head and neck osteology",
		subtitle: "",
		tags: ["Anatomy", "Physiology", "Physiology"],
		icon: "🟩",
	},
];

const AddQuizzesToBlockModal: React.FC<{
	onClose: () => void;
	selected: any[];
	setSelected: (s: any[]) => void;
}> = ({ onClose, selected, setSelected }) => {
	const [search, setSearch] = useState("");
	const [sortDesc, setSortDesc] = useState(false);

	const filtered = quizzes.filter(q =>
		q.title.toLowerCase().includes(search.toLowerCase())
	);

	const sorted = [...filtered].sort((a, b) =>
		sortDesc ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
	);

	const handleToggle = (quiz: any) => {
		if (selected.some(s => s.id === quiz.id)) {
			setSelected(selected.filter(s => s.id !== quiz.id));
		} else {
			setSelected([...selected, quiz]);
		}
	};

	return (
		<PopUpContainer title="Add Quizzes to “New Quiz Block Name”" onClose={() => onClose()}>
				{/* Main Content */}
				<div className="flex gap-6 flex-1 min-h-0 px-6 py-4">
					{/* Left: Quiz list */}
					<div className="flex-1 min-w-0 border-r pr-6 flex flex-col">
						<div className="flex items-center gap-2 mb-4">
							<input
								className="flex-1 border rounded px-3 py-2 text-sm"
								placeholder="Search for Quizzes"
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
							<button className="text-xs px-3 py-2 bg-[#F2F3FA] rounded border border-[#C3C6CF]">
								Filter
							</button>
							<button
								className="ml-2 text-[#0360AB] text-lg"
								title="Reverse sort order"
								onClick={() => setSortDesc(d => !d)}
							>
								↓
							</button>
						</div>
						<div className="overflow-y-auto flex-1 min-h-0">
							{sorted.map(q => (
								<div
									key={q.id}
									className="flex items-start gap-2 py-3 border-b last:border-b-0"
								>
									<input
										type="checkbox"
										checked={selected.some(s => s.id === q.id)}
										onChange={() => handleToggle(q)}
										className="mt-1"
									/>
									<div className="flex-shrink-0 text-2xl">{q.icon}</div>
									<div className="flex-1 min-w-0">
										<div className="font-medium text-sm truncate">
											{q.title}
										</div>
										{q.subtitle && (
											<div className="text-xs text-[#73777F] truncate">
												{q.subtitle}
											</div>
										)}
										<div className="flex flex-wrap gap-1 mt-1">
											{q.tags.map((tag, i) => (
												<span
													key={i}
													className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* Right: Selected quizzes */}
					<div className="flex-1 min-w-0 pl-6 flex flex-col">
						<div className="font-medium text-sm mb-4">
							<span className="text-[#0360AB]">
								{selected.length} Quizzes selected
							</span>
						</div>
						<div className="overflow-y-auto flex-1 min-h-0">
							{selected.length === 0 && (
								<div className="text-[#73777F] text-sm text-center mt-12">
									No quizzes selected yet.
								</div>
							)}
							{selected.map(q => (
								<div
									key={q.id}
									className="flex items-start gap-2 py-3 border-b last:border-b-0"
								>
									<input
										type="checkbox"
										checked={true}
										onChange={() => handleToggle(q)}
										className="mt-1"
									/>
									<div className="flex-shrink-0 text-2xl">{q.icon}</div>
									<div className="flex-1 min-w-0">
										<div className="font-medium text-sm truncate">
											{q.title}
										</div>
										{q.subtitle && (
											<div className="text-xs text-[#73777F] truncate">
												{q.subtitle}
											</div>
										)}
										<div className="flex flex-wrap gap-1 mt-1">
											{q.tags.map((tag: any, i: any) => (
												<span
													key={i}
													className="bg-[#E8F0FE] text-[#0360AB] rounded px-2 py-0.5 text-xs"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

		</PopUpContainer>
				
	
	);
};

export default AddQuizzesToBlockModal;
