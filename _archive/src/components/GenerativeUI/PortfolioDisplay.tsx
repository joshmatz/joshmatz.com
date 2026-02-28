import React from "react";

interface PortfolioProject {
  title: string;
  description: string;
  imageUrl?: string; // Assuming there might be an image URL
  projectUrl?: string; // Assuming there might be a project link
  // Add other fields from portfolio.json if needed
}

interface PortfolioData {
  projects: PortfolioProject[];
}

interface PortfolioDisplayProps {
  result: PortfolioData;
}

export const PortfolioDisplay: React.FC<PortfolioDisplayProps> = ({
  result,
}) => {
  if (!result || !Array.isArray(result.projects)) {
    return (
      <div className="text-red-500">Error displaying Portfolio projects.</div>
    );
  }

  return (
    <div className="p-4 my-2 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600">
      <h3 className="mb-3 text-lg font-semibold">Portfolio Projects</h3>
      <div className="space-y-4">
        {result.projects.map((project, index) => (
          <div
            key={index}
            className="p-3 border border-gray-200 rounded dark:border-gray-700"
          >
            <h4 className="font-semibold text-md">{project.title}</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
            {/* Optional: Display image and link */}
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="mt-2 rounded max-h-40"
              />
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
