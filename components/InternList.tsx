import { FC, useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Add colors based on the performance and qualification
const performanceColors = {
    "Exceeds Expectations": "bg-green-200 text-green-800",
    "Meets Expectations": "bg-yellow-200 text-yellow-800",
    "Needs Improvement": "bg-red-200 text-red-800",
    "Pending": "bg-orange-200 text-orange-800",
};

const qualificationColors = {
    true: "bg-green-500 text-white",
    false: "bg-red-500 text-white",
    null: "bg-yellow-200 text-yellow-800"
};

const messageStyles = "text-gray-500 italic text-xs";

const InternList: FC<{ interns: any[] }> = ({ interns }) => {
    const [sortedInterns, setSortedInterns] = useState(interns);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
        key: 'name',
        direction: 'asc',
    });

    const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
    const [selectedIntern, setSelectedIntern] = useState<any | null>(null);

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });
    };

useEffect(() => {
  const sortedData = [...interns].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    // Prioritize qualified interns (true) at the top
    if (sortConfig.key === 'qualified') {
      if (a.qualified === true && b.qualified !== true) return -1; // a comes first
      if (b.qualified === true && a.qualified !== true) return 1;  // b comes first
      if (a.qualified === null && b.qualified === null) return 0; // Both are null, keep order
      if (a.qualified === null) return sortConfig.direction === 'asc' ? 1 : -1; // null goes last
      if (b.qualified === null) return sortConfig.direction === 'asc' ? -1 : 1; // null goes last
    }

    // Handle string comparison
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    // Handle number comparison
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // Handle boolean comparison (true comes before false)
    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      return sortConfig.direction === 'asc'
        ? (aValue ? 1 : 0) - (bValue ? 1 : 0)
        : (bValue ? 1 : 0) - (aValue ? 1 : 0);
    }

    // Handle null values (place null values last for non-qualification fields)
    if (aValue === null && bValue === null) {
      return 0; // Both are null, keep order
    } else if (aValue === null) {
      return sortConfig.direction === 'asc' ? 1 : -1; // null should come last
    } else if (bValue === null) {
      return sortConfig.direction === 'asc' ? -1 : 1; // null should come last
    }

    // Fallback to return 0 if types don't match
    return 0;
  });

  setSortedInterns(sortedData);
}, [interns, sortConfig]);



    const renderLink = (link: string | null, message: string) => {
        if (link) {
            return (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    title="Click to view"
                >
                    {message}
                </a>
            );
        } else {
            return <span className={messageStyles}>Not available</span>;
        }
    };

    // Function to handle popover visibility
    const handlePopoverToggle = (intern: any) => {
        if (selectedIntern?.name === intern.name) {
            setPopoverVisible(!popoverVisible); // Toggle visibility
        } else {
            setSelectedIntern(intern);
            setPopoverVisible(true); // Show popover for a new intern
        }
    };

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <Table className="min-w-full">
                <TableHeader className="bg-gray-100 text-gray-700 text-sm font-semibold">
                    <TableRow>
                        {['name', 'teamLead', 'role', 'email', 'performance', 'attendance', 'ProjectLink', 'qualified', 'deploymentLink', 'pdfLink'].map((column) => (
                            <TableHead
                                key={column}
                                className="cursor-pointer py-2 px-4"
                                onClick={() => handleSort(column)}
                            >
                                <div className="flex items-center">
                                    <span>{column.charAt(0).toUpperCase() + column.slice(1)}</span>
                                    {sortConfig.key === column && (
                                        <span className="ml-2">
                                            {sortConfig.direction === 'asc' ? (
                                                <ChevronUp size={14} />
                                            ) : (
                                                <ChevronDown size={14} />
                                            )}
                                        </span>
                                    )}
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedInterns.map((intern, index) => (
                        <TableRow key={index} className="hover:bg-gray-50 transition-all duration-300">
                            <TableCell
                                className="py-3 px-4 text-sm text-gray-700 cursor-pointer"
                                onClick={() => handlePopoverToggle(intern)} // Toggle popover on name click
                            >
                                {intern.name}
                            </TableCell>
                            <TableCell className="py-3 px-4 text-sm text-gray-500">{intern.teamLead}</TableCell>
                            <TableCell className="py-3 px-4 text-sm text-gray-500">{intern.role}</TableCell>
                            <TableCell className="py-3 px-4 text-sm text-gray-500">{intern.email}</TableCell>
                            <TableCell className={`py-3 px-4 text-sm ${performanceColors[intern.performance]}`}>
                                {intern.performance}
                            </TableCell>
                            <TableCell className="py-3 px-4 text-sm text-gray-500">{intern.attendance}</TableCell>
                            <TableCell className="py-3 px-4 text-sm overflow-hidden text-ellipsis">
                                {renderLink(intern.gitHubProjectLink, 'GitHub Project')}
                            </TableCell>
                            <TableCell className={`py-3 px-4 text-sm ${qualificationColors[intern.qualified === null ? 'null' : intern.qualified]}`}>
                                {intern.qualified === null ? "Pending" : intern.qualified ? "Qualified" : "Not Qualified"}
                            </TableCell>
                            <TableCell className="py-3 px-4 text-sm">
                                {renderLink(intern.deploymentLink, 'View Deployment')}
                            </TableCell>
                            <TableCell className="py-3 px-4 text-sm">
                                {renderLink(intern.pdfLink, 'Download Report')}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Custom Popover for Remarks */}
            {popoverVisible && selectedIntern && (
                <div className="absolute z-10 p-4 bg-white shadow-lg border rounded-md max-w-xs">
                    <h3 className="font-bold text-gray-800">Remarks for {selectedIntern.name}</h3>
                    <ul className="mt-2 text-sm text-gray-600">
                        <li><strong>Website:</strong> {selectedIntern.remarks.website}</li>
                        <li><strong>Code FE:</strong> {selectedIntern.remarks.codeFE}</li>
                        <li><strong>Code BE:</strong> {selectedIntern.remarks.codeBE}</li>
                        <li><strong>Improvements:</strong>
                            <ul className="mt-1 list-disc ml-4">
                                {selectedIntern.remarks.improvements.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default InternList;
