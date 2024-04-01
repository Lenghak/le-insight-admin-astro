import { Button, buttonVariants } from "@/common/components/ui/button";
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
import { ArrowRightIcon, UserSearchIcon } from "lucide-react";
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
                      buttonVariants({
                        size: "icon",
                        variant: "default",
                      }),
                      "absolute left-0 border",
                    )}
                  >
                    <UserSearchIcon className="h-4 w-4" />
                  </div>

                  <Input
                    type="text"
                    placeholder="Search users..."
                    className="peer w-full rounded-full bg-card px-12 placeholder:ml-12"
                    {...field}
                  />

                  <Button
                    type="submit"
                    variant={"ghost"}
                    size={"icon"}
                    className="invisible absolute right-0 size-9 hover:visible focus:visible focus-visible:visible group-focus:visible peer-focus:visible peer-focus-visible:visible"
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
