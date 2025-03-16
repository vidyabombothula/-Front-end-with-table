"use client";
import React, { useRef, useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import AddFilterButton from "./AddFilterButton";
import { useFilterContext } from "@/context/FilterContext";
import ContentTag from "../ContentTag";
import AndOrButton from "../AndOrButton";

 
const FilterButton: React.FC = () => {
    const filterContext = useFilterContext();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);


    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
        <>
            <div className="dropdown filterButtonDropDown" ref={dropdownRef}>
                <button className="mainBtn" onClick={() => setIsOpen(!isOpen)}>
                    <CiFilter size={18} color="#333" className="filterButtonIcon" />
                    Filter
                    {filterContext?.filters?.length > 0 && (
                        <span className="buttonFilterLenght">
                            {filterContext.filters.length}
                        </span>
                    )}
                    <IoMdArrowDropdown
                        size={18}
                        color="#333"
                        className="filterarrowIcon"
                    />
                </button>
                <div
                    className={`dropdown-menu filterdropdownMenu ${isOpen ? "show" : ""}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <AddFilterButton />

                    {filterContext?.filters?.map((option: { id: number; name: string, tag: string }, index: number) => (
                        <div className="ContentTagWrrper mt-2" key={option.id}>
                            <ContentTag name={option.name} tag={option.tag} id={option.id} />
                            {index === 0 && <AndOrButton />}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FilterButton;
