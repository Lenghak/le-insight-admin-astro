import { buttonVariants } from "@/common/components/ui/button";

import { cn } from "@/common/lib/utils";

import ArticlesList from "@articles/presenters/articles-list";

import DashboardTitle from "@dashboard/composites/dashboard-title";

import { PenLineIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ArticlesRoute() {
  return (
    <section className="flex h-full flex-col p-6 pb-4 pr-4">
      <div className="flex items-end justify-between">
        <DashboardTitle
          title="Articles"
          spa
        />

        <div className="flex items-center justify-center gap-4">
          <Link
            to={"/spa/editor"}
            className={cn(
              "items-center gap-1 pl-6 pr-4",
              buttonVariants({ variant: "default" }),
            )}
          >
            <PenLineIcon
              size={16}
              strokeWidth={3}
            />
            <span className="px-2 font-bold">Write</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <ArticlesList />
      </div>
    </section>
  );
}
