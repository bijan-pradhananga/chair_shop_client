'use client'
import { useAppDispatch } from "@/lib/hooks";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { fetchCategory, searchCategory } from "@/lib/features/category";

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const dispatch = useAppDispatch();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (value.length > 0) {
      setTypingTimeout(setTimeout(() => {
        dispatch(searchCategory(value));
      }, 500));
    }else{
      dispatch(fetchCategory());
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."   value={searchTerm}
        onChange={handleInputChange}
        className="md:w-[100px] lg:w-[300px] bg-white"
      />
    </div>
  )
}