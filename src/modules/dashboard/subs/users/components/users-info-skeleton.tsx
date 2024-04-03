import { ProfileSkeleton } from "@/common/components/custom/profile";
import { Muted } from "@/common/components/ui/muted";

export default function UsersInfoSkeleton() {
  return (
    <section className="mt-6 flex flex-col gap-6">
      <div className="grid grid-cols-2 grid-rows-[auto]">
        <div className="flex flex-col">
          <span className="font-bold">Profile</span>
          <Muted>User's profile information</Muted>
        </div>

        <div className="flex flex-col gap-4">
          <ProfileSkeleton />
        </div>
      </div>
    </section>
  );
}
