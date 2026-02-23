import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/* Pages that should NOT show the Footer (full-screen UIs) */
const NO_FOOTER_ROUTES = ["/Upload"];

function Layout() {
  const { pathname } = useLocation();
  const showFooter = !NO_FOOTER_ROUTES.includes(pathname);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        /* base bg so pages without their own bg don't flash white */
        background: "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 45%, #24243e 100%)",
      }}
    >
      <Navbar />

      {/* main content grows to fill viewport */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {showFooter && <Footer />}
    </div>
  );
}

export default Layout;
