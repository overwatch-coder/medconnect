"use client"; // Error components must be Client Components

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <Head>
          <title>Oops! Something went wrong!</title>
        </Head>

        <section className="flex min-h-screen relative w-full">
          <header className="w-full py-3 px-3 md:px-4 bg-white shadow-md z-50">
            <div className="flex items-center justify-between relative w-full">
              <Link href={"/"} className="flex items-center gap-2">
                <Image
                  src="/assets/icons/logo-black.svg"
                  alt="Logo"
                  width={30}
                  height={30}
                />
                <h1 className="text-2xl flex items-center font-bold text-secondary-gray">
                  <span className="text-primary-green">Med</span>Connect
                </h1>
              </Link>

              <ul className="items-center gap-6 md:flex">
                <Link
                  href={"/"}
                  className="hover:scale-105 transition p-4 rounded-full bg-primary-gray/10 flex flex-col items-center"
                >
                  Home
                </Link>

                <Link
                  href={"/dashboard"}
                  className="hover:scale-105 transition p-4 rounded-full bg-primary-gray/10 flex flex-col items-center"
                >
                  Dashboard
                </Link>
              </ul>
            </div>
          </header>

          <div className="flex flex-col items-center mx-auto mt-32 py-20 space-y-6 text-center">
            <h2 className="text-4xl font-bold text-primary-dark">
              Something went wrong!
            </h2>

            <div className="flex flex-col items-center space-y-3 md:flex-row md:space-y-0 md:space-x-5">
              <button
                onClick={
                  // Attempt to recover by trying to re-render the segment
                  () => reset()
                }
                className="px-5 py-3 text-white rounded bg-primary-green hover:bg-transparent border hover:border-green-500 hover:text-primary-green"
              >
                Try again
              </button>

              <Link
                href={"/"}
                className="px-5 py-3 text-white rounded bg-primary-green hover:bg-transparent border hover:border-green-500 hover:text-primary-green"
              >
                Go home
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="py-2 px-3">
            <p className="text-secondary-gray text-sm font-semibold">
              &copy; Copyright medconnect {new Date().getFullYear()} . All
              rights reserved
            </p>
          </div>
        </section>
      </body>
    </html>
  );
}
