// app/tickets/[uuid]/page.tsx
"use client";

import React, { useEffect, useState } from "react";

interface Ticket {
  id: string;
  vatin: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  deletedAt: string | null;
}

interface TicketDetailsProps {
  params: {
    uuid: string;
  };
}

export default function TicketDetails({ params }: TicketDetailsProps) {
  const { uuid } = params;
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uuid) return;

    const fetchTicket = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/tickets/${uuid}`);
        if (!response.ok) throw new Error("Failed to fetch ticket details");

        const data = await response.json();
        setTicket(data);
      } catch (err) {
        setError("Error fetching ticket details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [uuid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ticket Details</h1>
      {ticket && (
        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-sm">ID</p>
            <p className="text-black">{ticket.id}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">VATIN</p>
            <p className="text-black">{ticket.vatin}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">First Name</p>
            <p className="text-black">{ticket.firstName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Last Name</p>
            <p className="text-black">{ticket.lastName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Created At</p>
            <p className="text-black">
              {new Date(ticket.createdAt).toLocaleString()}
            </p>
          </div>
          {ticket.deletedAt && (
            <div>
              <p className="text-gray-500 text-sm">Deleted At</p>
              <p className="text-black">
                {new Date(ticket.deletedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
