export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const eventTicker = searchParams.get("eventTicker");

  
    try {
      const response = await fetch(`https://api.elections.kalshi.com/trade-api/v2/events/${eventTicker}`);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch event data: ${response.statusText}`);
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      console.error('Error fetching event data:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  