"use client";

import React, { useEffect, useState, Suspense } from "react";
import TicketForm from "@/components/TicketForm";
import TicketsTableSkeleton from "@/components/TicketsTableSkeleton";

const TicketsTable = React.lazy(() => import("@/components/TicketsTable"));

interface Ticket {
  id: string;
  createdAt: string;
  deletedAt: string | null;
}

export default function HomePage() {
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const ticketCount = tickets?.length || 0;

  const fetchTickets = async () => {
    try {
      const response = await fetch("/api/tickets");
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">
        Ticketing System{" "}
        {tickets !== null && ticketCount > 0 && `(${ticketCount})`}
      </h1>

      <TicketForm
        onSuccess={() => {
          fetchTickets();
        }}
      />

      <Suspense fallback={<TicketsTableSkeleton />}>
        {ticketCount === 0 ? (
          <p>No tickets available</p>
        ) : (
          <TicketsTable tickets={tickets || []} />
        )}
      </Suspense>
    </main>
  );
}
