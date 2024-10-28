"use client";

import React from "react";
import TicketsTable from "@/components/TicketsTable";

export default function TicketsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>
      <TicketsTable />
    </main>
  );
}
