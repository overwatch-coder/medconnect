import HeaderLayout from "@/components/HeaderLayout";
import Footer from "@/components/Footer";
import React from "react";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="flex flex-col min-h-screen">
      <HeaderLayout />
      <main className="mb-auto">{children}</main>
      <Footer />
    </section>
  );
};

export default RootLayout;
