"use client"
import { createContext, useContext, useState, ReactNode } from "react"

const FilterContext = createContext<any>({})

export const useFilterContext = () => useContext(FilterContext)

interface Filter {
    id: number;
    name: string;
    tag: string;
    selected: boolean;
}

export const FilterContextProvider = ({ children }: { children: ReactNode }) => {
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [filters, setFilters] = useState<Filter[]>([])

    const handleSearch = () => {
        setIsSearch(!isSearch)
    }

    const deleteFilter = (id: number) => {
        const updatedFilters = filters.filter(filter => filter.id!== id)
        setFilters(updatedFilters)
    }

    return (
        <FilterContext.Provider value={{ isSearch, setIsSearch, filters, setFilters, handleSearch, deleteFilter } as any}>
            {children}
        </FilterContext.Provider>
    )
}