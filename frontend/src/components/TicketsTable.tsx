import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon } from "@heroicons/react/24/solid";

interface TableProps {
  tickets: Ticket[] | null;
}

interface Ticket {
  id: string;
  createdAt: string;
  deletedAt: string | null;
}

export default function TicketsTable({ tickets }: TableProps) {
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
        {tickets?.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>{ticket.id}</TableCell>
            <TableCell>
              {moment(ticket.createdAt).format("DD.MM.YYYY. HH:mm:ss")}
            </TableCell>
            <TableCell className="text-center px-0">
              <Link
                href={`/tickets/${ticket.id}`}
                className="inline-flex items-center justify-center p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
              >
                <EyeIcon className="h-5 w-5 text-white" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
