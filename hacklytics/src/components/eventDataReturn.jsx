import React, {useEffect, useState } from 'react';

const Eventdata = ({ eventTicker}) => {
    const [arbi, setArbi] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  


useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await fetch(`/api/getEventData?eventTicker=${eventTicker}`);
        if (!response.ok) throw new Error("Failed to fetch event data");
      
        const data = await response.json();
        console.log("Fetched Data:", data);
        const arbiData = data.markets.map((market) => ({
            event_ticker: market.event_ticker,
            title: data.event.title,
            volume: market.volume,
            yes_ask: market.yes_ask,
            no_bid: market.no_bid,
            category: data.event.category
        }));
        const eventsData = data.markets.map((market) => ({
            event_ticker: market.event_ticker,
            title: data.event.title
        }));
      
        setArbi(arbiData);
        setEvents(eventsData);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };
      
    fetchData();
}, [eventTicker]);

if (loading) {
    return <p>Loading...</p>;
}

if (error) {
    return <p>Error: {error}</p>;
  }

return (

    <div>
        <h1>Event Data</h1>
        <h2>Arbitrages</h2>
      {arbi.map((arbitrage, index) => (
        <div key={index}>
          <p><strong>Event Ticker:</strong> {arbitrage.event_ticker}</p>
          <p><strong>Title:</strong> {arbitrage.title}</p>
          <p><strong>Volume:</strong> {arbitrage.volume}</p>
          <p><strong>Yes Ask:</strong> {arbitrage.yes_ask}</p>
          <p><strong>No Bid:</strong> {arbitrage.no_bid}</p>
          <p><strong>Category:</strong> {arbitrage.category}</p>
        </div>
      ))}

      <h2>Events</h2>
      {events.map((event, index) => (
        <div key={index}>
          <p><strong>Event Ticker:</strong> {event.event_ticker}</p>
          <p><strong>Title:</strong> {event.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Eventdata;

