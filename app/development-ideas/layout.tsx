export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="prose flex max-w-full flex-col items-center justify-center py-4 text-foreground ">
      <div className="w-3/4">{children}</div>
    </article>
  );
}
