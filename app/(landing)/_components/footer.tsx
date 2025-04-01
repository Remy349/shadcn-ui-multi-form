import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="pt-[4rem] pb-[2.5rem]">
      <div className="px-6 mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <div>
          <p className="text-muted-foreground text-sm text-center">
            Developed by{" "}
            <Link
              href="https://github.com/Remy349"
              target="_blank"
              className="underline"
            >
              Remy349
            </Link>{" "}
            | 2025
          </p>
        </div>
      </div>
    </footer>
  );
};
