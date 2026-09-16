import Image from "next/image";
import { profile } from "@/lib/data";

/**
 * Mascot character.
 *
 * Set `profile.cartoonImage` in src/lib/data.ts to a file in /public (e.g. "/dishant.png")
 * and that render is used instead of the vector below. If the new file's aspect ratio
 * differs, update the slot ratios in Hero/About and BASE_W/BASE_H in CartoonFlight too.
 */
export default function Cartoon({ className = "" }: { className?: string }) {
  if (profile.cartoonImage) {
    return (
      <div className={`relative ${className}`}>
        {/* Soft stage light. The character's charcoal trousers are nearly the same
            value as the page background, so without this the legs disappear. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[-30%] top-[6%] bottom-[-2%] blur-[10px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(120,214,175,0.26), rgba(95,217,166,0.10) 52%, transparent 76%)",
          }}
        />
        <Image
          src={profile.cartoonImage}
          alt=""
          fill
          sizes="(max-width: 640px) 30vw, 16vw"
          className="object-contain object-bottom drop-shadow-[0_18px_36px_rgba(0,0,0,0.55)]"
          priority
        />
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 400 640"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="cSkin" cx="34%" cy="26%" r="80%">
          <stop offset="0" stopColor="#ffdcc1" />
          <stop offset="0.58" stopColor="#f3c5a1" />
          <stop offset="1" stopColor="#dc9e78" />
        </radialGradient>
        <linearGradient id="cShirt" x1="0.15" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#8bebc4" />
          <stop offset="0.55" stopColor="#5fd9a6" />
          <stop offset="1" stopColor="#2b9c71" />
        </linearGradient>
        <linearGradient id="cHair" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#4e3629" />
          <stop offset="1" stopColor="#221710" />
        </linearGradient>
        <linearGradient id="cPants" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24513f" />
          <stop offset="1" stopColor="#0d221c" />
        </linearGradient>
        <filter id="cBlur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* contact shadow — stays on the ground while the body floats */}
      <ellipse
        cx="200"
        cy="602"
        rx="104"
        ry="17"
        fill="#04100d"
        opacity="0.42"
        filter="url(#cBlur)"
      />

      <g className="c-float">
        {/* ---- legs & shoes ---- */}
        <path
          d="M174 470 L170 566"
          stroke="url(#cPants)"
          strokeWidth="44"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M226 470 L230 566"
          stroke="url(#cPants)"
          strokeWidth="44"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="140" y="564" width="58" height="34" rx="16" fill="#f0eadf" />
        <rect x="202" y="564" width="58" height="34" rx="16" fill="#f0eadf" />
        <rect x="140" y="586" width="58" height="12" rx="6" fill="#cfc7b8" />
        <rect x="202" y="586" width="58" height="12" rx="6" fill="#cfc7b8" />

        {/* ---- left arm (at side) ---- */}
        <path
          d="M140 346 C126 364, 120 382, 118 398"
          stroke="url(#cShirt)"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M118 398 C116 418, 115 432, 117 442"
          stroke="url(#cSkin)"
          strokeWidth="31"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="117" cy="452" r="19" fill="url(#cSkin)" />

        {/* ---- neck ---- */}
        <rect x="176" y="278" width="48" height="52" rx="22" fill="#e2a67f" />

        {/* ---- torso ---- */}
        <path
          d="M200 306 C154 306 132 334 130 376 L126 446 C124 468 146 478 200 478 C254 478 276 468 274 446 L270 376 C268 334 246 306 200 306 Z"
          fill="url(#cShirt)"
        />
        <path d="M167 309 Q200 338 233 309" fill="#2b9c71" opacity="0.55" />

        {/* shirt graphic */}
        <g
          stroke="#0c1f1a"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.72"
        >
          <path d="M186 392 L172 406 L186 420" />
          <path d="M196 388 L204 424" />
          <path d="M214 392 L228 406 L214 420" />
        </g>

        {/* ---- right arm (waving) ---- */}
        <g className="c-arm">
          <path
            d="M262 344 C282 334, 294 322, 300 308"
            stroke="url(#cShirt)"
            strokeWidth="40"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M300 308 C312 286, 320 264, 322 248"
            stroke="url(#cSkin)"
            strokeWidth="31"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="324" cy="232" r="21" fill="url(#cSkin)" />
          <ellipse cx="303" cy="240" rx="8" ry="11" fill="#e6ad86" transform="rotate(-24 303 240)" />
        </g>

        {/* ---- head ---- */}
        <ellipse cx="104" cy="212" rx="17" ry="24" fill="#e8b189" />
        <ellipse cx="296" cy="212" rx="17" ry="24" fill="#e8b189" />
        <ellipse cx="200" cy="200" rx="100" ry="105" fill="url(#cSkin)" />

        {/* rim light */}
        <path
          d="M291 158 C302 190, 300 227, 287 254"
          stroke="#5fd9a6"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />

        {/* hair */}
        <path
          d="M200 76 C264 76 306 124 302 206 C298 176 288 152 270 146 C244 138 228 164 198 160 C170 156 154 138 134 148 C114 158 100 180 98 206 C94 124 136 76 200 76 Z"
          fill="url(#cHair)"
        />
        <path
          d="M206 78 C214 50 240 42 257 52 C236 58 220 68 214 85 Z"
          fill="url(#cHair)"
        />
        <path
          d="M150 104 C170 90 200 86 224 94"
          stroke="#6b4c39"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* brows */}
        <path
          d="M144 176 Q167 165 188 174"
          stroke="#2b1d16"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M212 174 Q233 165 256 176"
          stroke="#2b1d16"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />

        {/* eyes */}
        <g className="c-eyes">
          <ellipse cx="166" cy="212" rx="23" ry="26" fill="#ffffff" />
          <ellipse cx="234" cy="212" rx="23" ry="26" fill="#ffffff" />
          <circle cx="170" cy="216" r="14" fill="#2b1d16" />
          <circle cx="238" cy="216" r="14" fill="#2b1d16" />
          <circle cx="176" cy="209" r="5.5" fill="#ffffff" />
          <circle cx="244" cy="209" r="5.5" fill="#ffffff" />
          <circle cx="164" cy="223" r="2.6" fill="#ffffff" opacity="0.75" />
          <circle cx="232" cy="223" r="2.6" fill="#ffffff" opacity="0.75" />
        </g>

        {/* blush */}
        <ellipse cx="142" cy="248" rx="19" ry="11" fill="#ef8a72" opacity="0.32" />
        <ellipse cx="258" cy="248" rx="19" ry="11" fill="#ef8a72" opacity="0.32" />

        {/* nose */}
        <ellipse cx="200" cy="240" rx="10" ry="7.5" fill="#e0a983" />

        {/* mouth */}
        <path
          d="M172 258 C186 252 214 252 228 258 C228 286 172 286 172 258 Z"
          fill="#8f3f43"
        />
        <path
          d="M174 258 C188 253 212 253 226 258 L226 264 C212 259 188 259 174 264 Z"
          fill="#ffffff"
        />
        <ellipse cx="200" cy="278" rx="14" ry="8" fill="#d9737a" />
      </g>
    </svg>
  );
}
