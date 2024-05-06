export default function Navbar() {
	return (
		<nav className="mt-6 hidden w-fit items-center space-x-2 rounded-full border border-gray-200 bg-white p-2 sm:flex">
			<a className="relative z-10" href="/blog">
				<div className="rounded-full px-4 py-2 text-sm font-medium transition-all text-white">
					Overview
				</div>
				<div className="absolute left-0 top-0 h-full w-full rounded-full bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 z-[-1] opacity-1"></div>
			</a>
			<a className="relative z-10" href="/blog/category/company">
				<div className="rounded-full px-4 py-2 text-sm font-medium text-gray-800 transition-all hover:text-gray-500">
					Company News
				</div>
			</a>
			<a className="relative z-10" href="/blog/category/education">
				<div className="rounded-full px-4 py-2 text-sm font-medium text-gray-800 transition-all hover:text-gray-500">
					Education
				</div>
			</a>
			<a className="relative z-10" href="/blog/category/engineering">
				<div className="rounded-full px-4 py-2 text-sm font-medium text-gray-800 transition-all hover:text-gray-500">
					Engineering
				</div>
			</a>
			<a className="relative z-10" href="/blog/category/customers">
				<div className="rounded-full px-4 py-2 text-sm font-medium text-gray-800 transition-all hover:text-gray-500">
					Customer Stories
				</div>
			</a>
			<a className="relative z-10" href="/changelog">
				<div className="rounded-full px-4 py-2 text-sm font-medium text-gray-800 transition-all hover:text-gray-500">
					Changelog
				</div>
			</a>
		</nav>
	);
}
