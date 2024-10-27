import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function TicketsTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>UUID</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-center px-0">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-5 w-full" /> {/* Skeleton za UUID */}
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-3/4" /> {/* Skeleton za Created At */}
            </TableCell>
            <TableCell className="text-center px-0">
              <Skeleton className="h-8 w-8 rounded-md" />
              {/* Skeleton za ikonu u Actions */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
