import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ArbitrageItem(props) {
  return (
    <div className="flex justify-center w-full bg-[#3b444b]" > {/* Add justify-center and w-full */}
      <Card className="w-[450px] bg-[#55626c] py-4 px-6 text-white">
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