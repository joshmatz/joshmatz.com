import React from "react";

interface SocialLink {
  name: string;
  url: string;
}

interface SocialLinksData {
  links: SocialLink[];
}

interface SocialLinksListProps {
  result: SocialLinksData;
}

export const SocialLinksList: React.FC<SocialLinksListProps> = ({ result }) => {
  if (!result || !Array.isArray(result.links)) {
    return <div className="text-red-500">Error displaying Social Links.</div>;
  }

  return (
    <div className="p-4 my-2 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600">
      <h3 className="mb-2 text-lg font-semibold">Connect with Josh</h3>
      <ul className="space-y-1 list-disc list-inside">
        {result.links.map((link, index) => (
          <li key={index}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
