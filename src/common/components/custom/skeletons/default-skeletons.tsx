import Logo from "@/common/components/custom/logo";

export function DefaultSkeleton() {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <Logo className="size-24 animate-pulse" />
    </section>
  );
}
