import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation";

export function ArbitrageItem(props) {
  const router = useRouter();
  return (
    <div className="flex justify-center w-full">
      <Card className="w-[450px] py-4 px-6"
      onClick={() => router.push(`/markets/${props.series_ticker}/${props.ticker}`)}
      >
        <CardTitle>
          {props.title}
        </CardTitle>
        <CardDescription style={{ color: 'white' }}>
          Category: {props.Category}
        </CardDescription>

        <div className="flex items-center bg-[#55626c] justify-center pt-2 space-x-4 text-white">
          <CardContent className="bg-[#4d6bff] font-bold text-[#ffffff] p-2 rounded">
            Yes Ask: {props.yes_ask}
          </CardContent>
          <CardContent className="bg-[#4d6bff] font-bold text-[#ffffff] p-2 rounded">
            No Bid: {props.no_bid}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}