import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutData {
  title: string;
  content: string;
  date: string;
}

export function AboutContent() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchAboutData = async () => {
      try {
        // Simulating API fetch
        const response = await fetch("/api/about");
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching about data:", error);
        // Fallback to static data if API fails
        setAboutData({
          title: "About",
          content:
            "Hello there! I'm Josh Matz and I'm currently living in Austin, Texas with my wife, Rachael Matz, and dog Kindle. (There's also a cat, Tonks, but I let Rachael take ownership of him.)\n\nI'm a self taught web developer and received a BFA in Graphic Design at Baylor University. I'm currently working at InVision where I help make the world's leading prototyping, collaboration & workflow platform. Previous employers include SourceClear (a security startup) and Springbox (a digital agency).\n\nIf you like my work, feel free to get in touch or catch me on Twitter @joshmatz.",
          date: "2015-06-20",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 w-full animate-pulse bg-muted rounded-md"></div>
        </CardContent>
      </Card>
    );
  }

  if (!aboutData) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Failed to load about content.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-medium">{aboutData.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          {aboutData.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
