import React, { useState, useEffect } from "react";
import axios from "axios";

interface LinkStatistics {
  id: string;
  url: string;
  visits: number;
  lastVisit: string;
}

const Statistics: React.FC = () => {
  const [statistics, setStatistics] = useState<LinkStatistics[]>([]);

  //   useEffect(() => {
  //     const fetchStatistics = async () => {
  //       try {
  //         const response = await axios.get("/api/statistics");
  //         setStatistics(response.data);
  //       } catch (error) {
  //         console.error("Error fetching statistics:", error);
  //       }
  //     };

  //     fetchStatistics();
  //   }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Link Statistics</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left">
            <th className="border-b border-gray-300 pb-2">Link ID</th>
            <th className="border-b border-gray-300 pb-2">URL</th>
            <th className="border-b border-gray-300 pb-2">Visits</th>
            <th className="border-b border-gray-300 pb-2">Last Visit</th>
          </tr>
        </thead>
        <tbody>
          {statistics.map((stat) => (
            <tr key={stat.id} className="odd:bg-gray-100">
              <td className="border-b border-gray-300 py-2">{stat.id}</td>
              <td className="border-b border-gray-300 py-2">{stat.url}</td>
              <td className="border-b border-gray-300 py-2">{stat.visits}</td>
              <td className="border-b border-gray-300 py-2">
                {stat.lastVisit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
