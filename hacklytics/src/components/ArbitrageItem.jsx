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
    <Card className="w-[250px]">
      <CardContent>
        {props.title}
      </CardContent>
      <CardContent>
        Yes Ask: {props.yes_ask}
      </CardContent>
      <CardContent>
        No Bid: {props.no_bid}
      </CardContent>
      <CardFooter>
        Category: {props.Category}
      </CardFooter>
    </Card>
  );
}