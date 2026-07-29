interface AlhLogoProps {
  className?: string;
  /** "full" renders the complete circular badge; "mark" renders just the symbol */
  variant?: "full" | "mark";
}

export function AlhLogo({ className = "h-10 w-10", variant = "full" }: AlhLogoProps) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 80 80"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ALH Cash & Carry"
      >
        <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="3" />
        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <text
          x="54"
          y="22"
          fontSize="7"
          fontWeight="800"
          fill="currentColor"
          textAnchor="middle"
          fontFamily="'Satoshi', 'Manrope', sans-serif"
          letterSpacing="0.5"
        >
          ALH
        </text>
        {/* Arabic الحرم */}
        <text
          x="37"
          y="47"
          fontSize="17"
          fontWeight="900"
          fill="#8B0000"
          textAnchor="middle"
          fontFamily="'Noto Naskh Arabic', 'Amiri', serif"
        >
          الحرم
        </text>
        {/* Shopping cart */}
        <g transform="translate(55,30)" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M0 1.5h2.5l2 7h9l1.5-5H4" />
          <circle cx="6.5" cy="10.5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12" cy="10.5" r="1.2" fill="currentColor" stroke="none" />
        </g>
        <text
          x="40"
          y="64"
          fontSize="6"
          fontWeight="800"
          fill="currentColor"
          textAnchor="middle"
          fontFamily="'Satoshi', 'Manrope', sans-serif"
          letterSpacing="1.2"
        >
          CASH &amp; CARRY
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 140 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ALH Cash & Carry"
    >
      {/* Badge circle */}
      <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="23" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      <text
        x="40"
        y="16"
        fontSize="6"
        fontWeight="800"
        fill="currentColor"
        textAnchor="middle"
        fontFamily="'Satoshi','Manrope',sans-serif"
        letterSpacing="0.4"
      >
        ALH
      </text>
      <text
        x="27"
        y="33"
        fontSize="14"
        fontWeight="900"
        fill="#8B0000"
        textAnchor="middle"
        fontFamily="serif"
      >
        الحرم
      </text>
      <g transform="translate(40,20)" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M0 1.2h2l1.6 5.6h7.2l1.2-4H3.2" />
        <circle cx="5.2" cy="8.4" r="1" fill="currentColor" stroke="none" />
        <circle cx="9.6" cy="8.4" r="1" fill="currentColor" stroke="none" />
      </g>
      <text
        x="30"
        y="50"
        fontSize="5"
        fontWeight="800"
        fill="currentColor"
        textAnchor="middle"
        fontFamily="'Satoshi','Manrope',sans-serif"
        letterSpacing="1"
      >
        CASH &amp; CARRY
      </text>

      {/* Wordmark */}
      <text
        x="72"
        y="26"
        fontSize="18"
        fontWeight="900"
        fill="currentColor"
        textAnchor="middle"
        fontFamily="'Satoshi','Manrope',sans-serif"
        letterSpacing="-0.5"
      >
        AL-HARAM
      </text>
      <text
        x="72"
        y="40"
        fontSize="7"
        fontWeight="600"
        fill="currentColor"
        textAnchor="middle"
        fontFamily="'Satoshi','Manrope',sans-serif"
        letterSpacing="2.5"
        opacity="0.65"
      >
        WHOLESALE
      </text>
    </svg>
  );
}
