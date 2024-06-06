import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="flex flex-col items-center justify-center text-white min-h-screen bg-primary-green">
      {children}
    </section>
  );
};

export default AuthLayout;
