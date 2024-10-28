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
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";

interface TableProps {
  tickets: Ticket[];
  onDelete: (id: string) => void;
}

interface Ticket {
  id: string;
  createdAt: string;
  deletedAt: string | null;
}

export default function TicketsTable({ tickets, onDelete }: TableProps) {
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
            <TableCell className="space-x-2 text-center px-0">
              <Link
                href={`/tickets/${ticket.id}`}
                className="inline-flex items-center justify-center flex p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
              >
                <EyeIcon className="h-5 w-5 text-white" />
              </Link>

              <button
                onClick={() => onDelete(ticket.id)}
                className="inline-flex items-center justify-center p-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
              >
                <TrashIcon className="h-5 w-5 text-white" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
