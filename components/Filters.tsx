"use client"
import { FC, useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface FiltersProps {
    onFilter: (performance: string, teamLead: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const Filters: FC<FiltersProps> = ({ onFilter, searchQuery, setSearchQuery }) => {
    const [performance, setPerformance] = useState<string | null>(null);
    const [teamLead, setTeamLead] = useState<string | null>(null);

    const handlePerformanceChange = (value: string | null) => {
        setPerformance(value);
        onFilter(value || '', teamLead || ''); // Pass filters to the parent, handling null as empty
    };

    const handleTeamLeadChange = (value: string | null) => {
        setTeamLead(value);
        onFilter(performance || '', value || ''); // Pass filters to the parent, handling null as empty
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value); // Update search query
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-white shadow-lg rounded-lg mb-2">
            {/* Search Bar */}
            <div className="flex flex-col">
                <label htmlFor="search" className="text-sm font-semibold text-gray-700 mb-2">Search Interns</label>
                <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Search by name, email or role"
                />
            </div>

            {/* Performance Filter */}
            <div className="flex flex-col">
                <label htmlFor="performance" className="text-sm font-semibold text-gray-700 mb-2">Performance</label>
                <Select onValueChange={handlePerformanceChange} value={performance}>
                    <SelectTrigger className={`border border-gray-300 rounded-md p-2 hover:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${performance ? 'border-indigo-500' : ''}`}>
                        <SelectValue placeholder="Select Performance" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={null}>All</SelectItem> {/* All option */}
                        <SelectItem value="Exceeds Expectations">Exceeds Expectations</SelectItem>
                        <SelectItem value="Meets Expectations">Meets Expectations</SelectItem>
                        <SelectItem value="Needs Improvement">Needs Improvement</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Team Lead Filter */}
            <div className="flex flex-col">
                <label htmlFor="teamLead" className="text-sm font-semibold text-gray-700 mb-2">Team Lead</label>
                <Select onValueChange={handleTeamLeadChange} value={teamLead}>
                    <SelectTrigger className={`border border-gray-300 rounded-md p-2 hover:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${teamLead ? 'border-indigo-500' : ''}`}>
                        <SelectValue placeholder="Select Team Lead" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={null}>All</SelectItem> {/* All option */}
                        <SelectItem value="Mohammed Fayis K">Mohammed Fayis K</SelectItem>
                        <SelectItem value="Mohammed Safwan">Mohammed Safwan</SelectItem>
                        <SelectItem value="Muhammed Arfaq">Muhammed Arfaq</SelectItem>
                        <SelectItem value="Ribinsh">Ribinsh</SelectItem>
                        <SelectItem value="Ajmal">Ajmal</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default Filters;
