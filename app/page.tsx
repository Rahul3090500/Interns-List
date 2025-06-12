"use client";
import React, { FC, useEffect, useState } from 'react';
import InternList from '../components/InternList';
import Filters from '../components/Filters';
import internsData from '../components/data.json'; 

// Define the Intern type with specific values for performance
interface Intern {
  name: string;
  teamLead: string;
  role: string;
  email: string;
  performance: 'Exceeds Expectations' | 'Meets Expectations' | 'Needs Improvement' | 'Pending';
  attendance: string;
  gitHubProjectLink: string | null;
  deploymentLink: string | null;
  pdfLink: string | null;
  remarks: {
    website: string;
    codeFE: string;
    codeBE: string;
    improvements: Array<string | number | React.ReactNode>;
  };
}

const InternsPage: FC = () => {
  const [interns] = useState<Intern[]>(internsData);  // Using the imported JSON data with explicit type
  const [filteredInterns, setFilteredInterns] = useState<Intern[]>(internsData);

  // States for filter criteria
  const [performance, setPerformance] = useState<'Exceeds Expectations' | 'Meets Expectations' | 'Needs Improvement' | 'Pending' | null>(null);
  const [teamLead, setTeamLead] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle filter changes
  const handleFilter = () => {
    let filtered = interns;

    // Filter by performance
    if (performance) {
      filtered = filtered.filter((intern) => intern.performance === performance);
    }

    // Filter by team lead
    if (teamLead) {
      filtered = filtered.filter((intern) => intern.teamLead === teamLead);
    }

    // Filter by search query (name, email, role)
    if (searchQuery) {
      filtered = filtered.filter((intern) => 
        intern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        intern.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        intern.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Update filtered interns state
    setFilteredInterns(filtered);
  };

  // Trigger the filter function whenever any filter criteria change
  useEffect(() => {
    handleFilter(); // Re-filter whenever performance, teamLead, or searchQuery changes
  }, [performance, teamLead, searchQuery]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-4 text-gray-800">Interns List</h1>
      <Filters
        onFilter={(performance, teamLead) => {
          setPerformance(performance as 'Exceeds Expectations' | 'Meets Expectations' | 'Needs Improvement' | 'Pending');
          setTeamLead(teamLead);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <InternList interns={filteredInterns} />
    </div>
  );
};

export default InternsPage;
