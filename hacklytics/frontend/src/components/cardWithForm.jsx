"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

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
    <Card className="w-full bg-slate-800/60 border-slate-700/50 backdrop-blur-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Search Markets</CardTitle>
        <CardDescription className="text-slate-400">Search by ticker symbol or market description</CardDescription>
      </CardHeader>
      <CardContent>
        <Command className="bg-slate-900/50 rounded-lg border border-slate-700/50">
          <CommandInput
            placeholder="Enter ticker or description..."
            value={inputValue}
            onValueChange={setInputValue}
            className="text-slate-300 placeholder:text-slate-500"
          />
          <CommandList className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
            <CommandGroup heading="Available Markets" className="text-slate-400">
              <div className="animate-stagger">
                {filteredSuggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion.ticker}
                    onSelect={() => {
                      setInputValue(suggestion.title);
                      router.push(`/markets/${suggestion.ticker}`);
                    }}
                    className="text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors duration-2000 card-hover"
                  >
                    <div className="flex items-center">
                      <span className="font-medium">{suggestion.title}</span>
                      <span className="ml-2 text-sm text-slate-500">({suggestion.ticker})</span>
                    </div>
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  );
}

export default CardWithForm;
