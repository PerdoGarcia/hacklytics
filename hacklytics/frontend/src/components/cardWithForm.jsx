'use client';
import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export function CardWithForm({ events }) {
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState("");

  // Make sure events is an array and has the expected structure
  const suggestions = Array.isArray(events) ? events.map((event) => ({
    ticker: event.ticker,
    title: event.title,
    series_ticker: event.series_ticker
  })) : [];

  // Filter suggestions based on both the title and the ticker
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
                    setInputValue(suggestion.title);
                    router.push(`/markets/${suggestion.ticker}`);
                  }}
                >
                  {suggestion.title}
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