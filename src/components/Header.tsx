"use client";
import { createClient, Entry, EntrySkeletonType } from "contentful";
import Navbar from "./Navbar";
import { MouseEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";

interface BlogPostFields {
	title: string;
	excerpt: string;
	coverImage: string;
	slug: string;
	author: string;
	date: string;
	tag: string;
}

interface BlogPostEntry extends EntrySkeletonType<BlogPostFields> {}

const client = createClient({
	space: "xchok2w84707",
	accessToken: "oQGzlNpyneuJd2BZ7e19_aDzCqPh1Tkz0324bJXbh-I",
});

export default function Header() {
	const [blogPosts, setBlogPosts] = useState<BlogPostEntry[]>([]);
	const [dataFromChild, setDataFromChild] = useState<string>("overview");

	const handleDataFromChild = (data: string) => {
		setDataFromChild(data);
	};

	useEffect(() => {
		const fetchBlogPosts = async () => {
			try {
				const response = await client.getEntries<BlogPostFields>({
					content_type: "blogPost",
				});
				setBlogPosts(response.items);
			} catch (error) {
				console.error("Error fetching blog posts:", error);
			}
		};

		fetchBlogPosts();
	}, []);

	return (
		<div>
			<Head>
				<title>Blog Post</title>
				<meta name="Contains an example of a blog post using a headless CMS (Contentful) to pull blog posts. Uses NextJS 14 and TailwindCSS for styling, with typeScript." />
			</Head>
			<div className="relative z-10">
				<div className="flex flex-col min-h-screen justify-between">
					<div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
						<div className="max-w-screen-md py-16">
							<h1 className="font-display text-3xl font-extrabold text-gray-700 sm:text-4xl">
								Blog
							</h1>
							<p className="mt-4 text-xl text-gray-500">
								Latest news and updates from ProfessorAI.co
							</p>
							<Navbar sendDataToParent={handleDataFromChild} />
						</div>
					</div>
					<div className="min-h-[100vh] w-full border-t border-gray-200 bg-gradient-to-b from-white/50 to-transparent backdrop-blur-lg">
						<div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 grid grid-cols-1 gap-4 py-10 md:grid-cols-3 sm:grid-cols-2">
							{blogPosts
								.filter(
									(post) =>
										post.fields.tag === dataFromChild ||
										dataFromChild === "overview"
								)
								.map((post) => (
									<Link
										href={`${post.fields.slug}`}
										key={post.sys.id}
										className="flex flex-col rounded-lg border border-gray-300 transition-all hover:shadow-lg cursor-pointer hover:cursor-pointer"
									>
										<img
											className="object-cover w-full h-1/2 rounded-lg"
											src={
												post.fields.coverImage.fields
													.file.url
											}
										/>
										<div className="flex flex-1 flex-col justify-between rounded-b-lg bg-white p-6">
											<div>
												<p className="line-clamp-2 font-display text-xl font-bold text-gray-700">
													{post.fields.title}
												</p>
												<p className="mt-2 line-clamp-2 text-sm text-gray-500">
													{post.fields.excerpt}
												</p>
											</div>
											<div className="mt-4 flex items-center space-x-2">
												<div className="flex items-center -space-x-2">
													<img
														className="blur-0 rounded-full transition-all group-hover:brightness-90"
														src={
															post.fields.author
																.fields.file.url
														}
														alt=""
														width="36"
														height="36"
													/>
												</div>
												<p>{post.fields.date}</p>
											</div>
										</div>
									</Link>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
