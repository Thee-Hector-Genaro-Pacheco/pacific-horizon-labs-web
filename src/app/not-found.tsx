import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70vh] flex-col justify-center pt-32 pb-24">
      <p className="eyebrow">
        <span className="text-signal">404</span> / Not found
      </p>
      <h1 className="display mt-6 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] text-paper">
        This page is past the horizon.
      </h1>
      <p className="lede mt-6 max-w-xl">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-10">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </section>
  );
}
