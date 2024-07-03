import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Count {
  [key: string]: number;
}

interface GenderCountProps {
  counts: Count;
}

export function GenderCount({ counts }: GenderCountProps) {
  return (
    <Card className="gender-card">
      <CardHeader>
        <CardTitle>
          Total count of each gender
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl>
          {Object.entries(counts).map(([gender, count]) => (
            <div key={gender} className="flex justify-between py-2"> 
              <dt className="font-bold">{gender}:</dt> 
              <dd>{count}</dd> 
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}