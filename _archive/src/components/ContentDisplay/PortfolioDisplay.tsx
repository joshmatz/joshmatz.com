import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: string;
  images: string[];
}

export function PortfolioDisplay() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchPortfolioItems = async () => {
      try {
        // Simulating API fetch
        const response = await fetch("/api/portfolio");
        const data = await response.json();
        setPortfolioItems(data);
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
        // Fallback to static data if API fails
        setPortfolioItems([
          {
            id: "1",
            title: "Intelemedia",
            description:
              "Intelemedia, a company that unites multiple call centers into one platform, approached me in 2012 for assistance on redesigning their existing website. Not only was their website technologically dated but much of the content was stale and unorganized. We tackled the project head on and went through the full process of developing a great web presence.",
            type: "Website, Brochure, Presentation",
            images: [
              "/images/portfolio/brochure-cover.jpg",
              "/images/portfolio/brochure-closeup.jpg",
            ],
          },
          {
            id: "2",
            title: "Various Design Work",
            description:
              "Collection of design work including branding, stationary, marketing materials, and web design.",
            type: "Design",
            images: [
              "/images/portfolio/brown-stationary.jpg",
              "/images/portfolio/yellow-stationary.jpg",
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-medium">
            Loading portfolio...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 w-1/3 animate-pulse bg-muted rounded-md"></div>
                <div className="h-40 w-full animate-pulse bg-muted rounded-md"></div>
                <div className="h-16 w-full animate-pulse bg-muted rounded-md"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (portfolioItems.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No portfolio items found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-12">
          {portfolioItems.map((item) => (
            <div key={item.id} className="space-y-4">
              <div>
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.type}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {item.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-md"
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                      Image Placeholder
                    </div>
                    {/* In a real app, we would use next/image here */}
                    <img
                      src={image}
                      alt={`${item.title} - image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
