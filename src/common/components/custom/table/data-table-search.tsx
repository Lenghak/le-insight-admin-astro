import { Button } from "@/common/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";

import { cn } from "@/common/lib/utils";

import { $urlStore, setURLStore } from "@/common/stores/url-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@nanostores/react";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const DataTableSearchSchema = z.object({
  q: z.string(),
});

type DataTableSearchProps = {
  handleSubmit?: (..._: unknown[]) => unknown;
};

export default function DataTableSearch({
  handleSubmit,
}: DataTableSearchProps) {
  const url = useStore($urlStore);
  const q = url.searchParams.get("q") ?? "";

  const form = useForm<z.infer<typeof DataTableSearchSchema>>({
    resolver: zodResolver(DataTableSearchSchema),
    defaultValues: {
      q,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          if (handleSubmit) handleSubmit(data);
          else {
            url.searchParams.set("q", data.q);
            setURLStore(url);
          }
        })}
        className="relative space-y-8"
      >
        <FormField
          control={form.control}
          name="q"
          render={({ field }) => (
            <FormItem>
              <FormControl className="relative">
                <div className="group flex w-full max-w-sm items-center justify-center transition-all">
                  <div
                    className={cn(
                      "absolute left-2 flex size-9 items-center justify-center",
                    )}
                  >
                    <SearchIcon className="h-4 w-4 stroke-[3]" />
                  </div>

                  <Input
                    type="search"
                    placeholder="Search"
                    className="peer h-9 w-full rounded-full bg-card px-12 placeholder:ml-12"
                    {...field}
                  />

                  <Button
                    type="submit"
                    variant={"default"}
                    size={"icon"}
                    className="invisible absolute right-2 size-6 hover:visible focus:visible focus-visible:visible group-focus:visible peer-focus:visible peer-focus-visible:visible"
                  >
                    <ArrowRightIcon className="size-4" />
                    <span className="sr-only">Enter Search</span>
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
