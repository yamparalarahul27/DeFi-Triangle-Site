import { ImageResponse } from "next/og";

export const size = { width: 400, height: 400 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="400" rx="104" fill="url(#iconGradient)" />
        <path
          d="M336.509 314L200.255 78L64 314M336.509 314H64M336.509 314L280.429 280.663M64 314L120.08 280.663M280.429 280.663L200.254 141.797L120.08 280.663M280.429 280.663H120.08M201.214 145.18V82.8732M215.605 168.384V104.587M248.986 280.663L309.901 314M134.796 255.174L78.4257 289.014"
          stroke="white"
          strokeWidth="5.7561"
        />
        <defs>
          <linearGradient
            id="iconGradient"
            x1="20.5078"
            y1="16.6667"
            x2="373"
            y2="355"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#467FFF" />
            <stop offset="0.471154" stopColor="#5F7CF8" />
            <stop offset="1" stopColor="#1847BB" />
          </linearGradient>
        </defs>
      </svg>
    ),
    { ...size }
  );
}
