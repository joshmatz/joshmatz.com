import React from "react";

interface MEATimelineData {
  title: string;
  description: string;
  // Add other fields from mea_timeline.json if needed
}

interface MEATimelineInfoProps {
  result: MEATimelineData;
}

export const MEATimelineInfo: React.FC<MEATimelineInfoProps> = ({ result }) => {
  if (
    !result ||
    typeof result.title !== "string" ||
    typeof result.description !== "string"
  ) {
    return (
      <div className="text-red-500">Error displaying MEA Timeline info.</div>
    );
  }

  return (
    <div className="p-4 my-2 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600">
      <h3 className="mb-2 text-lg font-semibold">
        {result.title || "MEA Timeline Project"}
      </h3>
      <p>{result.description}</p>
      {/* Render other fields here */}
    </div>
  );
};
