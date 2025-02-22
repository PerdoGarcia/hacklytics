import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ArbitrageItem(props) {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[400px] py-4 px-6">
        <CardTitle>
          {props.title}
        </CardTitle>
        <CardDescription>
          Category: {props.Category}
        </CardDescription> 

        <div className="flex items-center justify-center pt-2 space-x-4">
          <CardContent className="bg-green-100 text-green-800 p-2 rounded">
            Yes Ask: {props.yes_ask}
          </CardContent>
          <CardContent className="bg-red-100 text-red-800 p-2 rounded">
            No Bid: {props.no_bid}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}