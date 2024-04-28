"use client"
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignOutButton,OrganizationSwitcher } from "@clerk/nextjs";
import Theme from "./Theme";
import { useTheme } from "@/context/ThemeProvider";
import { dark } from "@clerk/themes"
import { useSearchParams } from "next/navigation";
import Color from "./Color";
const Topbar = () => {
  const { mode } = useTheme();
  const searchParams = useSearchParams();
  const colors = searchParams.get("c") || 'primary';
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image
          src="/assets/logo.svg"
          alt="logo"
          width={28}
          height={28}
          className={`text-heading3-bold  max-xs:hidden gradient-${colors} bg-clip-text text-transparent`}
        />
        <p className={`text-heading3-bold max-xs:hidden gradient-${colors} bg-clip-text text-transparent`}>
          Thoughts
        </p>
      </Link>

      <div className="flex items-center gap-5">
        <div className="max-sm:hidden">
          <Color />
        </div>
        <Theme />
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src={mode === "dark" ? "/assets/logout.svg" : "/assets/logout-dark.svg"}
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            baseTheme: mode === "dark" ? dark : undefined,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Topbar;
