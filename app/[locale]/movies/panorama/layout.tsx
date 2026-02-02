import PanoramaTransitionWrapper from "@/components/PanoramaTransitionWrapper";

export default function PanoramaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PanoramaTransitionWrapper>{children}</PanoramaTransitionWrapper>;
}
