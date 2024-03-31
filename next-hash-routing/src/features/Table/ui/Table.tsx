import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { memo } from "react";

type TableData = {
  id: string;
  name: string;
  title: string;
}

interface TableProps {
  records: TableData[]
}

const TableComponent = ({ records }: TableProps) => {

  return (
    <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((data, id) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}

export default memo(TableComponent)