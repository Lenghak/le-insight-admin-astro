import { Button, buttonVariants } from "@ui/button";
import { Calendar } from "@ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";

import { cn } from "@/common/lib/utils";

import { $urlStore, setURLStore } from "@/common/stores/url-store";
import { useStore } from "@nanostores/react";
import { compareDesc, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { type DateRange } from "react-day-picker";

export function DateTableDatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const url = useStore($urlStore);
  const defaultFrom = new Date(url.searchParams.get("from") ?? Date.now());
  const defaultTo = new Date(url.searchParams.get("to") ?? Date.now());

  const validRange = compareDesc(defaultFrom, defaultTo);

  const [date, setDate] = React.useState<DateRange | undefined>(
    validRange === 1
      ? {
          from: defaultFrom,
          to: defaultTo,
        }
      : {
          from: undefined,
          to: undefined,
        },
  );

  React.useEffect(() => {
    if (date) {
      date.from
        ? url.searchParams.set("from", format(date.from, "MM-dd-yyyy"))
        : url.searchParams.delete("from");
      date.to
        ? url.searchParams.set("to", format(date.to, "MM-dd-yyyy"))
        : url.searchParams.delete("to");

      setURLStore(url);
    }
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-72 justify-start bg-card text-left font-normal",
              !date && "text-muted-foreground",
            )}
            size={"sm"}
          >
            <div
              className={cn(
                buttonVariants({ size: "icon", variant: "default" }),
                "left-0 -ml-4 mr-4 size-9",
              )}
            >
              <CalendarIcon className="h-4 w-4" />
            </div>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className="text-muted-foreground">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
