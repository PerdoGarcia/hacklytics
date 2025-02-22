"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export function CardWithForm({ events }) {
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState("");

  // Build suggestions with separate keys.
  const suggestions = events.map((event) => ({
    ticker: event.event_ticker,
    title: event.title,
  }));

  // Filter suggestions based on both the title and the ticker.
  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.title.toLowerCase().includes(inputValue.toLowerCase()) ||
      suggestion.ticker.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Search a market</CardTitle>
        <CardDescription>Enter a ticker or a description of event</CardDescription>
      </CardHeader>
      <CardContent>
        <Command>
          <CommandInput
            placeholder="Search markets..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandGroup heading="Markets">
              {filteredSuggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion.ticker}
                  onSelect={() => {
                    // Optionally update the input to the full title (or leave as-is)
                    setInputValue(suggestion.title);
                    // Navigate using either the ticker or title as the query,
                    // adjust this depending on your needs.
                    router.push(`/results?query=${encodeURIComponent(suggestion.ticker)}`);
                  }}
                >
                  {suggestion.title} <span className="text-muted">({suggestion.ticker})</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  );
}

export default CardWithForm;
