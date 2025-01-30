import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Releases",
};

export default function Page() {
  return (
    <section className="pt-[4rem] pb-[2.5rem]">
      <div className="px-6 mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <h1>Releases Page</h1>
      </div>
    </section>
  );
}
