"use client";

import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ReserveTableModal from "./ReserveTableModal";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const open = () => setModalOpen(true);
    window.addEventListener("crew:open-reserve-modal", open);
    return () => window.removeEventListener("crew:open-reserve-modal", open);
  }, []);

  return (
    <>
      <Navigation onReserve={() => setModalOpen(true)} />
      <main id="main-content" className="flex flex-col flex-1">
        {children}
      </main>
      <Footer />
      <ReserveTableModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
