"use client"
import { useState, useEffect } from "react";
import Data from './../../DATA.json';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import TableComponent from "@/features/Table/ui/Table";

export default function Home( ) {
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const pageNumber = new URLSearchParams(window.location.search).get("page");
    const parsedPage = pageNumber ? parseInt(pageNumber) : 1;
    setCurrent(parsedPage);
  }, []);

  const recordsPerPage = 5;
  const lastIndex = current * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const numbers = Array.from({ length: npage }).map((_, i) => i + 1);

  const nextPage = () => {
    if (current !== npage) {
      const newPage = current + 1;
      setCurrent(newPage);
      window.history.pushState({}, '', `/?page=${newPage}`);
    }
  };

  const prePage = () => {
    if (current !== 1) {
      const newPage = current - 1;
      setCurrent(newPage);
      window.history.pushState({}, '', `/?page=${newPage}`);
    }
  };

  const changeCurrentPage = (page: number) => {
    setCurrent(page);
    window.history.pushState({}, '', `/?page=${page}`);
  };

  return (
    <main className="container">
      <TableComponent records={records} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer" onClick={prePage} />
          </PaginationItem>
          {numbers.map((n, i) => (
            <PaginationItem key={i}>
              <PaginationLink className="cursor-pointer" onClick={() => changeCurrentPage(n)} isActive={current === n}>
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext className="cursor-pointer" onClick={nextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}


