import { Button } from "@ui/button";
import { Calendar } from "@ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";

import { Badge } from "@/common/components/ui/badge";

import { cn } from "@/common/lib/utils";

import { compareDesc, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { type DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";

export function DateTableDatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultFrom = new Date(searchParams.get("from") ?? Date.now());
  const defaultTo = new Date(searchParams.get("to") ?? Date.now());

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
        ? searchParams.set("from", format(date.from, "MM-dd-yyyy"))
        : searchParams.delete("from");
      date.to
        ? searchParams.set("to", format(date.to, "MM-dd-yyyy"))
        : searchParams.delete("to");
    } else {
      searchParams.delete("from");
      searchParams.delete("to");
    }
    setSearchParams(searchParams);
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "relative w-fit justify-start bg-card text-left font-normal",
              !date && "text-muted-foreground",
            )}
            size={"sm"}
          >
            <div
              className={cn("ml-1 flex size-9 items-center justify-between")}
            >
              <CalendarIcon className="h-4 w-4 stroke-[3] text-foreground" />
            </div>

            {date?.from ? (
              <Badge>
                {date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )}
              </Badge>
            ) : (
              <span className="pr-2 text-muted-foreground">Pick a date</span>
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
