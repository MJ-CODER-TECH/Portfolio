export default function Logo({ size = 120, color = "#ffffff" }) {
  return (
    <div className="flex items-center justify-center bg-black p-6">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Shape */}
        <path
          d="M20 15 L45 35 L35 45 L20 30 Z"
          fill={color}
        />
        <path
          d="M80 15 L55 35 L65 45 L80 30 Z"
          fill={color}
        />
        <path
          d="M30 55 L50 75 L40 85 L20 65 Z"
          fill={color}
        />
        <path
          d="M70 55 L50 75 L60 85 L80 65 Z"
          fill={color}
        />

        {/* Center Connector */}
        <path
          d="M35 45 L65 45 L50 60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}