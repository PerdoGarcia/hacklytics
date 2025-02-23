"use client";
import React, { useEffect, useState } from 'react';

const Eventdata = ({ eventTicker }) => {
    const [arbi, setArbi] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Don't fetch if eventTicker is not provided
        if (!eventTicker) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/getEventData?eventTicker=${encodeURIComponent(eventTicker)}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Validate the data structure
                if (!data.markets || !data.event) {
                    throw new Error("Invalid data structure received from API");
                }

                const arbiData = data.markets.map((market) => ({
                    event_ticker: market.event_ticker || 'N/A',
                    title: data.event.title || 'Untitled',
                    volume: market.volume || 0,
                    yes_ask: market.yes_ask || 0,
                    no_bid: market.no_bid || 0,
                    category: data.event.category || 'Uncategorized'
                }));

                const eventsData = data.markets.map((market) => ({
                    event_ticker: market.event_ticker || 'N/A',
                    title: data.event.title || 'Untitled'
                }));

                setArbi(arbiData);
                setEvents(eventsData);
                setError(null);
            } catch (err) {
                console.error('Error fetching event data:', err);
                setError(err.message);
                setArbi([]);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventTicker]);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-4">
                <p className="text-lg">Loading event data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 p-4">
                <p>Error loading event data: {error}</p>
            </div>
        );
    }

    if (!arbi.length && !events.length) {
        return (
            <div className="p-4">
                <p>No event data available</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Event Data</h1>

            {arbi.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Arbitrages</h2>
                    <div className="grid gap-4">
                        {arbi.map((arbitrage, index) => (
                            <div key={index} className="border p-4 rounded-lg shadow">
                                <p><strong>Event Ticker:</strong> {arbitrage.event_ticker}</p>
                                <p><strong>Title:</strong> {arbitrage.title}</p>
                                <p><strong>Volume:</strong> {arbitrage.volume}</p>
                                <p><strong>Yes Ask:</strong> {arbitrage.yes_ask}</p>
                                <p><strong>No Bid:</strong> {arbitrage.no_bid}</p>
                                <p><strong>Category:</strong> {arbitrage.category}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {events.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold mb-4">Events</h2>
                    <div className="grid gap-4">
                        {events.map((event, index) => (
                            <div key={index} className="border p-4 rounded-lg shadow">
                                <p><strong>Event Ticker:</strong> {event.event_ticker}</p>
                                <p><strong>Title:</strong> {event.title}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Eventdata;