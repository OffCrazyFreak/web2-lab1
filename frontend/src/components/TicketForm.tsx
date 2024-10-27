"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TicketFormValues {
  vatin: string;
  firstName: string;
  lastName: string;
}

interface TicketFormProps {
  onSuccess: () => void;
}

export default function TicketForm({ onSuccess }: TicketFormProps) {
  const form = useForm<TicketFormValues>({
    defaultValues: {
      vatin: "",
      firstName: "",
      lastName: "",
    },
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: TicketFormValues) => {
    setError(null); // Resetuje grešku pre svakog novog slanja

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Učitaj tekstualnu poruku greške umesto JSON-a
        const errorMessage = (await response.text()).replace(/, /g, "\n");
        setError(errorMessage);
        return;
      }

      form.reset(); // Resetira polja forme
      onSuccess(); // Poziva se za ponovno učitavanje tablice
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to create ticket. Please try again later.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-4"
      >
        <FormField
          control={form.control}
          name="vatin"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>VATIN</FormLabel>
              <FormControl>
                <Input placeholder="12345678901" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-auto bg-blue-500 hover:bg-blue-600 text-white"
        >
          Submit
        </Button>
      </form>

      {/* Prikaz greške ako postoji */}
      {error && <pre className="text-red-500 mt-4">{error}</pre>}
    </Form>
  );
}
