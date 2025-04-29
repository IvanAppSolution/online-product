"use client";
import { parseAsInteger, useQueryState, parseAsString, ParserBuilder  } from "nuqs";
import React, { useState, useEffect } from 'react';
import { Input } from "./input";
import {
  Select,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./button";
import loading from "/images/loading.gif";
import Image from "next/image";

interface ProductsFilterProps {
  refetchProducts: () => Promise<void>;
}

export default function ProductsFilter({
  refetchProducts,
}: ProductsFilterProps) {
  const [inputSearch, setInputSearch] = useState('');
  const [timeoutId, setTimeoutId] = useState('');
  const [isLoading, startTransition] = React.useTransition()

  const [query, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault("").withOptions({ startTransition, shallow: false, clearOnDefault: true })
  );

  const [perPage, setPerPage] = useQueryState(
    "perPage",
    parseAsInteger.withDefault(10)
  );

  const [offset, setOffset] = useQueryState(
    "offset",
    parseAsInteger.withDefault(1),
  );

  const handleSearch = (value: string) => {
    setInputSearch(value);    
    clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      // console.log('value: ', value);
      setSearch(value);
      if (value === "") {
        setPerPage(10);
        setOffset(1);
      }
      setTimeout(() => {
        refetchProducts();
      }, 300);
    }, 600);

    setTimeoutId(String(newTimeoutId));

  };

  const handlePerPageChange = (value: string) => {
    setPerPage(Number(value));
    setTimeout(() => {
      refetchProducts();
    }, 300);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  // if (isLoading) return <div></div>

  return (
    <div className="flex justify-between gap-3">
      <div className="flex gap-2">
        <Input
          placeholder="Search"
          className=""
          value={inputSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
         {isLoading ? <Image alt="loading" src="/images/loading.gif" width="40" height="40" /> : <Button variant={"secondary"} onClick={() => handleSearch("")}>Clear</Button>}
      </div>

      <div>
        <Select
          value={perPage.toString()}
          onValueChange={(value) => handlePerPageChange(value)}
        >
          <SelectTrigger className="w-20">
            <SelectValue placeholder="Per Page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Per Page</SelectLabel>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="2">2</SelectItem>
            </SelectGroup>  
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}