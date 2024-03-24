import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/common/components/ui/breadcrumb";
import { H3 } from "@/common/components/ui/h3";

import { cn } from "@/common/lib/utils";

import { SlashIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

type DashboardTitleProps = {
  className?: string;
  url: URL;
  title: string;
};

export default function DashboardTitle({
  className,
  title,
  url,
}: DashboardTitleProps) {
  const links = url.pathname.split("/").filter((link) => link !== "");

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <H3 className="font-extrabold">{title}</H3>
      <Breadcrumb>
        <BreadcrumbList className="font-medium">
          {links.length < 4 ? (
            links.map((link, index) => (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={
                      index === 0
                        ? "/" + links[0]
                        : links.slice(0, index - 1).join("/")
                    }
                    className={cn(
                      "capitalize",
                      index === links.length - 1 && "font-bold text-foreground",
                    )}
                  >
                    {link}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index !== links.length - 1 && (
                  <BreadcrumbSeparator>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                )}
              </Fragment>
            ))
          ) : (
            <Fragment>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={"/" + links[0]}
                  className={cn("capitalize")}
                >
                  {links[0]}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                <a href={links.slice(0, links.length - 3).join("/")}>
                  <BreadcrumbEllipsis />
                </a>
              </BreadcrumbItem>

              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>

              <BreadcrumbLink
                href={links.slice(0, links.length - 2).join("/")}
                className={cn("capitalize")}
              >
                {links[links.length - 2]}
              </BreadcrumbLink>

              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>

              <BreadcrumbLink
                href={links.slice(0, links.length - 1).join("/")}
                className={cn("capitalize")}
              >
                {links[links.length - 1]}
              </BreadcrumbLink>
            </Fragment>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
