"use client";
import { useState } from "react";
interface Props {
	sendDataToParent: (data: string) => void;
}
const Navbar: React.FC<Props> = ({ sendDataToParent }) => {
	const [activeLink, setActiveLink] = useState("overview");

	const handleClick = (data: string) => {
		setActiveLink(data);
		sendDataToParent(data);
	};

	return (
		<nav className="mt-6 hidden w-fit items-center space-x-2 rounded-full border border-gray-200 bg-white p-2 sm:flex transition-all hover:shadow-lg cursor-pointer hover:cursor-pointer">
			<a
				className={`relative z-10 ${
					activeLink === "overview" ? "text-white" : ""
				}`}
				onClick={() => handleClick("overview")}
			>
				<div className="rounded-full px-4 py-2 text-sm font-mediumtransition-all hover:text-gray-500">
					Overview
				</div>
				{activeLink === "overview" && (
					<div className="absolute left-0 top-0 h-full w-full rounded-full bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 z-[-1] opacity-1"></div>
				)}
			</a>
			<a
				className={`relative z-10 ${
					activeLink === "Company News" ? "text-white" : ""
				}`}
				onClick={() => handleClick("Company News")}
			>
				{activeLink === "Company News" && (
					<div className="absolute left-0 top-0 h-full w-full rounded-full bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 z-[-1] opacity-1"></div>
				)}
				<div className="rounded-full px-4 py-2 text-sm font-mediumtransition-all hover:text-gray-500">
					Company News
				</div>
			</a>
			<a
				className={`relative z-10 ${
					activeLink === "Education" ? "text-white" : ""
				}`}
				onClick={() => handleClick("Education")}
			>
				{activeLink === "Education" && (
					<div className="absolute left-0 top-0 h-full w-full rounded-full bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 z-[-1] opacity-1"></div>
				)}
				<div className="rounded-full px-4 py-2 text-sm font-mediumtransition-all hover:text-gray-500">
					Education
				</div>
			</a>
			<a
				className={`relative z-10 ${
					activeLink === "Engineering" ? "text-white" : ""
				}`}
				onClick={() => handleClick("Engineering")}
			>
				{activeLink === "Engineering" && (
					<div className="absolute left-0 top-0 h-full w-full rounded-full bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 z-[-1] opacity-1"></div>
				)}
				<div className="rounded-full px-4 py-2 text-sm font-medium transition-all hover:text-gray-500">
					Engineering
				</div>
			</a>
			<a
				className={`relative z-10 ${
					activeLink === "Customer Stories" ? "text-white" : ""
				}`}
				onClick={() => handleClick("Customer Stories")}
			>
				{activeLink === "Customer Stories" && (
					<div className="absolute left-0 top-0 h-full w-full rounded-full bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 z-[-1] opacity-1"></div>
				)}
				<div className="rounded-full px-4 py-2 text-sm font-medium transition-all hover:text-gray-500">
					Customer Stories
				</div>
			</a>
		</nav>
	);
};

export default Navbar;
