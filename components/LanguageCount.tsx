import React from "react";
import Typography from "@mui/material/Typography";

interface Count {
  [key: string]: number;
}

interface LanguageCountProps {
  counts: Count;
}

export function LanguageCount({ counts }: LanguageCountProps) {
  const sortedLanguages = Object.entries(counts).sort(
    (a, b) => b[1] - a[1]
  );

  const column1 = sortedLanguages.slice(0, 7);
  const column2 = sortedLanguages.slice(7, 15);
  const column3 = sortedLanguages.slice(15, 22);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        <span className="leste text-2xl">Language Summary</span>
      </Typography>

      <div className="flex">
        <dl className="mr-4">
          {column1.map(([language, count]) => (
            <div key={language} className="flex justify-between py-2">
              <dt className="pr-4">{language}:</dt>
              <dd>{count}</dd>
            </div>
          ))}
        </dl>

        <dl className="mr-4">
          {column2.map(([language, count]) => (
            <div key={language} className="flex justify-between py-2">
              <dt className="pr-4">{language}:</dt>
              <dd>{count}</dd>
            </div>
          ))}
        </dl>

        <dl>
          {column3.map(([language, count]) => (
            <div key={language} className="flex justify-between py-2">
              <dt className="pr-4">{language}:</dt>
              <dd>{count}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}