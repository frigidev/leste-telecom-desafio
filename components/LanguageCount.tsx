import React from "react";
import Typography from '@mui/material/Typography';

interface Count {
  [key: string]: number;
}

interface LanguageCountProps {
  counts: Count;
}

export function LanguageCount({ counts }: LanguageCountProps) {
  const sortedLanguages = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return (
    <> 
      <Typography variant="h6" gutterBottom>
        <span className="leste text-2xl">Language Summary</span>
      </Typography>
      <dl>
        {sortedLanguages.map(([language, count]) => (
          <div key={language} className="flex justify-between py-2">
            <dt className="pr-4">{language}:</dt>
            <dd>{count}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}