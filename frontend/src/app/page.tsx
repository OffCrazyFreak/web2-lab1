"use client";

import React, { useEffect, useState, Suspense } from "react";
import TicketForm from "@/components/TicketForm";
import TicketsTableSkeleton from "@/components/TicketsTableSkeleton";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const TicketsTable = React.lazy(() => import("@/components/TicketsTable"));

interface Ticket {
  id: string;
  createdAt: string;
  deletedAt: string | null;
}

export default function HomePage() {
  const { user, error, isLoading } = useUser();

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

  const deleteTicket = async (id: string) => {
    try {
      const response = await fetch(`/api/tickets/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchTickets();
      } else {
        console.error("Failed to delete ticket");
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (isLoading) return <p>Učitavanje...</p>;
  // if (error) return <p>Greška: {error.message}</p>;

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">
        Ticketing System{" "}
        {tickets !== null && ticketCount > 0 && `(${ticketCount})`}
      </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <p>Welcome, {user.name}</p>
          <a href="/api/auth/logout" className="text-blue-500">
            Logout
          </a>
        </>
      ) : (
        <a href="/api/auth/login" className="text-blue-500">
          Login
        </a>
      )}

      <TicketForm
        onSuccess={() => {
          fetchTickets();
        }}
      />

      <Suspense fallback={<TicketsTableSkeleton />}>
        {ticketCount === 0 ? (
          <p>No tickets available</p>
        ) : (
          <TicketsTable tickets={tickets || []} onDelete={deleteTicket} />
        )}
      </Suspense>
    </main>
  );
}
