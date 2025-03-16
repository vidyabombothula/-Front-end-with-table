'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import PreviewBox from './PreviewBox';
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';
import tabledata from './tableData.json'

interface TableData {
    channel_id: string;
    channel_name: string;
    type: string;
    country: string;
    url_variants: string;
    dt: string;
    sampled: string;
    hit_status: string;
    join: string;
    bf: string;
    spend: string;
    impressions: string;
    clicks: string;
    cpm: string;
    cpa_per_click: string;
    cpa_per_result: string;
    results: string;
}

const DataTable: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<keyof TableData>('channel_id');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [previewData, setPreviewData] = useState<TableData | null>(null);
    const [tableData, setTableData] = useState<TableData[]>([]);

    useEffect(() => {
        setMounted(true);
        setTableData(tabledata);
    }, []);

    const data: TableData[] = tabledata;

    const handleSort = (field: keyof TableData) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredAndSortedData = useMemo(() => {
        return data
            .filter(item => 
                Object.values(item).some(value => 
                    value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
            .sort((a, b) => {
                const aValue = a[sortField]?.toString() || '';
                const bValue = b[sortField]?.toString() || '';
                
                if (sortDirection === 'asc') {
                    return aValue > bValue ? 1 : -1;
                }
                return aValue < bValue ? 1 : -1;
            });
    }, [data, searchTerm, sortField, sortDirection]);

    if (!mounted) {
        return <div>Loading...</div>;
    }

    return (
        <div className="table-container mt-3" suppressHydrationWarning>
            <div className="search-box mb-3">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                />
            </div>

            <Table className="dataTable" responsive  hover bordered>
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <th 
                                key={key}
                                onClick={() => handleSort(key as keyof TableData)}
                                style={{ cursor: 'pointer' }}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                {sortField === key && (
                                    sortDirection === 'asc' ? 
                                        <BsArrowUpShort /> : 
                                        <BsArrowDownShort />
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedData.map((row, index) => (
                        <tr key={`${row.channel_id}-${index}`}>
                            <td onClick={() => setPreviewData(row)} style={{ cursor: 'pointer' }}>
                                {row.channel_id}
                            </td>
                            <td>{row.channel_name}</td>
                            <td>{row.type}</td>
                            <td>{row.country}</td>
                            <td>{row.url_variants}</td>
                            <td>{row.dt}</td>
                            <td>{row.sampled}</td>
                            <td>{row.hit_status}</td>
                            <td>{row.join}</td>
                            <td>{row.bf}</td>
                            <td>{row.spend}</td>
                            <td>{row.impressions}</td>
                            <td>{row.clicks}</td>
                            <td>{row.cpm}</td>
                            <td>{row.cpa_per_click}</td>
                            <td>{row.cpa_per_result}</td>
                            <td>{row.results}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {previewData && (
                <PreviewBox data={previewData} onClose={() => setPreviewData(null)} />
            )}
        </div>
    );
};

export default DataTable;