import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="overflow-x-hidden">
      {children}
    </section>
  );
};

export default AuthLayout;
