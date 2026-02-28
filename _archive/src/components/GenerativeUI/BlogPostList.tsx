import React from "react";

interface BlogPostRef {
  title: string;
  slug: string; // Identifier for the post (e.g., filename or unique string)
}

interface BlogPostListData {
  posts: BlogPostRef[];
}

interface BlogPostListProps {
  result: BlogPostListData;
  // Function to potentially trigger loading a specific post
  onSelectPost?: (slug: string) => void;
}

export const BlogPostList: React.FC<BlogPostListProps> = ({
  result,
  onSelectPost,
}) => {
  if (!result || !Array.isArray(result.posts)) {
    return <div className="text-red-500">Error displaying blog posts.</div>;
  }

  if (result.posts.length === 0) {
    return <div className="p-4 italic">No blog posts found.</div>;
  }

  return (
    <div className="p-4 my-2 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600">
      <h3 className="mb-2 text-lg font-semibold">Blog Posts</h3>
      <ul className="space-y-1 list-disc list-inside">
        {result.posts.map((post, index) => (
          <li key={index}>
            {onSelectPost ? (
              <button
                onClick={() => onSelectPost(post.slug)}
                className="text-blue-600 hover:underline dark:text-blue-400 text-left"
              >
                {post.title}
              </button>
            ) : (
              <span>{post.title}</span>
            )}
          </li>
        ))}
      </ul>
      {onSelectPost && (
        <p className="mt-2 text-xs italic">
          Click a title to ask me to show the post.
        </p>
      )}
    </div>
  );
};
