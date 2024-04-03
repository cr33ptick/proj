import Navbar from "@/components/Navbar";

interface Props {
  children: React.ReactNode;
  params: { userId: string };
}

export default async function Layout({ children, params }: Props) {
  return (
    <>
      <Navbar userId={params.userId} />
      {children}
    </>
  );
}
