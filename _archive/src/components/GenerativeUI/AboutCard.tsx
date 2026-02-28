import React from "react";

interface AboutData {
  bio: string;
  // Add other fields from about.json if needed
}

interface AboutCardProps {
  result: AboutData;
}

export const AboutCard: React.FC<AboutCardProps> = ({ result }) => {
  if (!result || typeof result.bio !== "string") {
    return <div className="text-red-500">Error displaying About info.</div>;
  }

  return (
    <div className="p-4 my-2 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600">
      <h3 className="mb-2 text-lg font-semibold">About Josh Matz</h3>
      <p>{result.bio}</p>
      {/* Render other fields here */}
    </div>
  );
};
