import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  category?: string;
  tags?: string[];
  excerpt?: string;
}

export function BlogPostList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchBlogPosts = async () => {
      try {
        // Simulating API fetch
        const response = await fetch("/api/blog-posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        // Fallback to static data if API fails
        setPosts([
          {
            id: "1",
            title: "Do something different",
            date: "2016-04-30",
            category: "Personal",
            tags: ["projects", "motivation"],
            excerpt:
              "When I was in high school, I had a teacher that would often remind us (to the point of my annoyance), that the definition of insanity was doing the same thing over and over again but expecting different results...",
          },
          {
            id: "2",
            title: "Your Stock Options Aren't Worth Anything",
            date: "2016-04-06",
            category: "Finance",
            tags: ["career", "startup"],
            excerpt:
              "So you took a job at a start up and are excited by the Options the company gave you. The company tells you they're worth $50,000 now, but in a just few short years you'll have a million dollars in Options...",
          },
          {
            id: "3",
            title: "Structure Large Angular or JavaScript App",
            date: "2015-07-01",
            category: "Development",
            tags: ["javascript", "angular"],
            excerpt:
              "In light of AngularJS getting its v1.0 branch finalized by end of 2021 (originally going to be end of June), I thought it'd be apt to review an older blog post from 2015...",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-medium">
            Loading blog posts...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 w-full animate-pulse bg-muted rounded-md"
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No blog posts found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Blog Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="border-b pb-4 last:border-b-0">
              <h3 className="text-lg font-medium">{post.title}</h3>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground my-2">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                {post.category && (
                  <>
                    <span>•</span>
                    <span>{post.category}</span>
                  </>
                )}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 my-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {post.excerpt && <p className="text-sm mt-2">{post.excerpt}</p>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
