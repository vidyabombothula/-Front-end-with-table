"use client"
import { useFilterContext } from '@/context/FilterContext';
import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";

interface FilterSearchProps {
    setIsShow: (value: boolean) => void;
}

const FilterSearch: React.FC<FilterSearchProps> = ({ setIsShow }) => {
    const filterContext = useFilterContext()

    // Define sample data and filter options
    const [items, setItems] = useState<any>([]);
    const [metrics, setMetrics] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isActive, setIsActive] = useState<number>(1);
    const [tab, setTab] = useState<string>("Tags")

    const filterOnInputChange = (value: string) => {
        setSearchTerm(value);
        const newItem = items.filter((item: { id: number; name: string; type: string }) => item.name.toLowerCase().includes(value.toLowerCase()))
        if (tab === "Tags") {
            setItems(newItem)
        }
        else if (tab === "Metrics") {
            setMetrics(newItem)
        }
    }

    const addItems = (value: string) => {
        filterContext.setFilters((prev: Array<{ id: number, name: string, tag: string }>) => [
            ...prev,
            {
                id: Math.floor(Math.random() * 1000) + 1,
                name: value,
                tag: tab,
            }
        ])
    }

    useEffect(() => {
        if (!searchTerm) {
            setItems([{ id: 1, name: 'Character ' },
            { id: 5, name: 'Background' },
            { id: 2, name: 'Elements' },
            { id: 3, name: 'CTA Position' },
            { id: 4, name: 'CTA Text' }])

            setMetrics([{ id: 1, name: 'Spends ' },
            { id: 5, name: 'Spends' },
            { id: 2, name: 'Spends More' },])

        }
    }, [searchTerm])


    return (
        <>
            <div className='d-flex align-items-center justify-content-between gap-2 filterSearchWrapper'>
                <IoIosSearch size={19} color='#999999' className='searchIcon' />
                <input
                    type="text"
                    className='filterSearchInput'
                    placeholder='Search'
                    value={searchTerm}
                    onChange={(e) => filterOnInputChange(e.target.value)}
                />
            </div>

            <div className="searchOptionTabs">
                <p className={`tabLink ${tab === "Dimensions" && "active"}`} onClick={() => setTab("Dimensions")}>Dimensions</p>
                <p className={`tabLink ${tab === "Tags" && "active"}`} onClick={() => setTab("Tags")}>Tags</p>
                <p className={`tabLink ${tab === "Metrics" && "active"}`} onClick={() => setTab("Metrics")}>Metrics</p>
            </div>
            {/* tabs content */}
            {
                tab === "Tags" && (
                    <ul className="searchOptionContainer">
                        {items.map((option: { id: number; name: string; type: string }, index: number) => (
                            <li
                                key={option.id}
                                className={`searchOptionItem ${isActive === index + 1 && 'active'}`}
                                onClick={() => {
                                    setIsActive(index + 1)
                                    addItems(option.name)
                                    setIsShow(false)
                                }}
                            >
                                {option.name}
                            </li>
                        ))}
                    </ul>
                )
            }
            {tab === "Metrics" && (
                <ul className="searchOptionContainer">
                    {metrics.map((option: { id: number; name: string; type: string }, index: number) => (
                        <li
                            key={option.id}
                            className={`searchOptionItem ${isActive === index + 1 && 'active'}`}
                            onClick={() => {
                                setIsActive(index + 1)
                                addItems(option.name)
                                setIsShow(false)
                            }}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default FilterSearch