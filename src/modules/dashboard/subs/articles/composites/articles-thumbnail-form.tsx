import FileUploadForm from "@/modules/dashboard/components/file-upload-form";

import { Drawer, DrawerContent, DrawerTrigger } from "@ui/drawer";

import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";

import { Button } from "@/common/components/ui/button";
import { AsteriskIcon } from "lucide-react";
import type React from "react";

type ArticlesThumbnailFormProps = {
  trigger?: React.ReactNode;
};

export default function ArticlesThumbnailForm({
  trigger,
}: ArticlesThumbnailFormProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="h-5/6 w-full bg-card px-32 pb-12">
        <section className="mt-12 flex h-full w-full flex-col items-center justify-center gap-12 sm:flex-row">
          <div className="flex h-full w-full flex-col gap-4">
            <FileUploadForm className="h-full [&>div]:max-h-none [&>div]:bg-background [&>div]:p-12" />

            <Alert className="items-center border-none bg-transparent pr-8">
              <AsteriskIcon className="mt-0.5 size-3" />
              <AlertTitle className="font-mono text-sm font-medium italic">
                You can upload one file only per thumbnail with 5MB size
                limited.{" "}
              </AlertTitle>
              <AlertDescription>
                <Button
                  variant={"link"}
                  className="text-xs italic p-0 size-fit px-1 font-bold"
                >
                  Learn more
                </Button>
              </AlertDescription>
            </Alert>
          </div>

          <div className="h-full w-full"></div>
        </section>
      </DrawerContent>
    </Drawer>
  );
}
