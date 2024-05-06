import { useRouter } from "next/router";
import { createClient } from "contentful";
import RichText from "@/components/RichText";
import "tailwindcss/tailwind.css";
import Link from "next/link";

const client = createClient({
	space: "xchok2w84707",
	accessToken: "oQGzlNpyneuJd2BZ7e19_aDzCqPh1Tkz0324bJXbh-I",
});
interface BlogPostFields {
	title: string;
	excerpt: string;
	coverImage: {
		fields: {
			file: {
				url: string;
			};
		};
	};
	content: any; // Adjust this type according to your content structure
	author: {
		fields: {
			file: {
				url: string;
			};
		};
	};
	authorName: string;
	date: string;
	tag: string;
}

const BlogPost = ({ post }: { post: BlogPostFields }) => {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<div className="overflow-auto">
			<div className="relative z-100">
				<div className="flex min-h-screen flex-col justify-between">
					<div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 py-10">
						<div className="flex max-w-screen-sm flex-col space-y-4 pt-16">
							<div
								className="flex flex-col space-x-1"
								style={{ marginTop: "10%" }}
							>
								<div className="flex flex-row space-x-2">
									<Link
										href=""
										className="rounded-full border border-gray-200 bg-white px-4 py-4 text-sm font-semibold text-gray-700 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50"
									>
										{post.tag}
									</Link>
									<p>{post.date}</p>
								</div>
								<h1 className="font-display text-4xl font-extrabold text-gray-700 sm:text-4xl sm:leading-snug mt-4">
									{post.title}
								</h1>
								<p
									className="text-xl text-gray-500 mt-4"
									style={{ maxWidth: "60%" }}
								>
									{post.excerpt}
								</p>
							</div>
						</div>
						<div
							className="flex flex-col rounded-lg border border-gray-300 min-h-auto mt-4"
							style={{ width: "80%" }}
						>
							<img src={post.coverImage.fields.file.url} alt="" />

							<div style={{ padding: "35px" }}>
								<RichText richText={post.content}></RichText>
							</div>
						</div>

						<div
							className="sticky top-20 col-span-1 mt-48 hidden flex-col divide-y divide-gray-200 self-start sm:flex"
							style={{ marginTop: "-135%", marginLeft: "85%" }}
						>
							<div className="flex flex-col space-y-4 py-5">
								<p className="text-sm text-gray-500">
									Written By
								</p>
								<div className="flex flex-row">
									<img
										className="blur-0 rounded-full transition-all group-hover:brightness-90 mt-4"
										src={post.author.fields.file.url}
										alt=""
										width="36"
										height="36"
									/>
									<p
										className="mt-2"
										style={{
											padding: "10px",
										}}
									>
										{post.authorName}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogPost;

export async function getStaticPaths() {
	const response = await client.getEntries({ content_type: "blogPost" });
	console.log("RESPONSE: " + response);

	const paths = response.items.map((item) => ({
		params: { slug: item.fields.slug },
	}));

	return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
	const { slug } = params;
	const response = await client.getEntries({
		content_type: "blogPost",
		"fields.slug": slug,
	});

	if (!response.items.length) {
		return {
			notFound: true,
		};
	}

	const post = response.items[0].fields;

	return {
		props: {
			post,
		},
		revalidate: 60,
	};
}
