import { LayoutPanelTopIcon } from "lucide-react";
import Link from "next/link";
import { links } from "./links";
import { FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export const Footer = () => {
  return (
    <footer className="py-[4rem]">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/"
          aria-label="Home"
          className="mx-auto size-fit flex items-center space-x-2 border p-2 rounded-xl bg-muted"
        >
          <LayoutPanelTopIcon className="size-4" />
          <span className="font-bold text-sm">MultiForm</span>
        </Link>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="my-8 flex flex-wrap items-center justify-center gap-6 text-sm">
          <Link
            href="https://x.com/Remy_349"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X/Twitter"
            className="text-muted-foreground hover:text-primary block"
          >
            <BsTwitterX className="size-5" />
          </Link>
          <Link
            href="https://github.com/Remy349/shadcn-ui-multi-form"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="text-muted-foreground hover:text-primary block"
          >
            <FaGithub className="size-6" />
          </Link>
        </div>
        <span className="text-muted-foreground block text-center text-sm">
          © {new Date().getFullYear()} MultiForm, All rights reserved.
          <br />
          Developed by{" "}
          <a
            href="https://github.com/Remy349"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Remy349
          </a>
        </span>
      </div>
    </footer>
  );
};
