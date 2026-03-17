"use client";

import { useEffect } from "react";

export default function BookingPage() {
  useEffect(() => {
    const bookingScript = document.createElement("script");
    bookingScript.src = "/js/booking.js";
    bookingScript.defer = true;
    document.body.appendChild(bookingScript);

    const mapsScript = document.createElement("script");
    mapsScript.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBj-30c7SBJUcHHdw_hBT17jtH__NRz0L8&libraries=places&loading=async&callback=initBookingAutocomplete";
    mapsScript.async = true;
    mapsScript.defer = true;
    document.body.appendChild(mapsScript);

    const sanitizeScript = document.createElement("script");
    sanitizeScript.src = "/js/sanitize.js";
    sanitizeScript.defer = true;
    document.body.appendChild(sanitizeScript);

    return () => {
      bookingScript.remove();
      mapsScript.remove();
      sanitizeScript.remove();
    };
  }, []);

  return (
    <main
      dangerouslySetInnerHTML={{
        __html: `
${""}
        `,
      }}
    />
  );
}
