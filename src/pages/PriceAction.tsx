import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

// ── SVG Charts ────────────────────────────────────────────────────────────────

const SupportResistanceChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {/* Grid */}
    {[40, 80, 120].map(y => (
      <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />
    ))}
    {/* Resistance line */}
    <line x1="20" y1="40" x2="280" y2="40" stroke="hsl(var(--bear))" strokeWidth="1.5" strokeDasharray="6 3" />
    <text x="225" y="34" fill="hsl(var(--bear))" fontSize="9" fontFamily="monospace">RESISTANCE</text>
    {/* Support line */}
    <line x1="20" y1="120" x2="280" y2="120" stroke="hsl(var(--bull))" strokeWidth="1.5" strokeDasharray="6 3" />
    <text x="240" y="134" fill="hsl(var(--bull))" fontSize="9" fontFamily="monospace">SUPPORT</text>
    {/* Price path bouncing between S/R */}
    <polyline
      points="20,100 50,85 70,120 90,70 110,120 140,55 160,120 185,45 210,120 240,50 270,120"
      fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"
    />
    {/* Bounce dots on support */}
    {[70, 110, 160, 210, 270].map(x => (
      <circle key={x} cx={x} cy="120" r="3.5" fill="hsl(var(--bull))" />
    ))}
    {/* Rejection dots on resistance */}
    {[90, 140, 185, 240].map(x => (
      <circle key={x} cx={x} cy={x === 90 ? 70 : x === 140 ? 55 : x === 185 ? 45 : 50} r="3.5" fill="hsl(var(--bear))" />
    ))}
  </svg>
);

const TrendChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {/* Uptrend section */}
    <polyline
      points="10,140 35,120 55,130 80,100 100,110 125,75 145,85 170,50"
      fill="none" stroke="hsl(var(--bull))" strokeWidth="2.5" strokeLinejoin="round"
    />
    {/* Higher highs arrows */}
    {[[35,120],[80,100],[125,75]].map(([x,y],i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="3" fill="hsl(var(--bull))" opacity="0.7" />
        <text x={x-4} y={y-7} fill="hsl(var(--bull))" fontSize="7" fontFamily="monospace">HH</text>
      </g>
    ))}
    {/* Higher lows */}
    {[[55,130],[100,110],[145,85]].map(([x,y],i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="3" fill="hsl(var(--bull))" opacity="0.4" />
        <text x={x-4} y={y+13} fill="hsl(var(--bull))" fontSize="7" fontFamily="monospace">HL</text>
      </g>
    ))}
    {/* Downtrend section */}
    <polyline
      points="175,50 195,70 215,58 235,90 255,78 275,110"
      fill="none" stroke="hsl(var(--bear))" strokeWidth="2.5" strokeLinejoin="round"
    />
    {/* Lower highs */}
    {[[195,70],[235,90],[275,110]].map(([x,y],i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="3" fill="hsl(var(--bear))" opacity="0.7" />
        <text x={x-4} y={y-7} fill="hsl(var(--bear))" fontSize="7" fontFamily="monospace">LH</text>
      </g>
    ))}
    {/* Lower lows */}
    {[[215,58],[255,78]].map(([x,y],i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="3" fill="hsl(var(--bear))" opacity="0.4" />
        <text x={x-4} y={y+13} fill="hsl(var(--bear))" fontSize="7" fontFamily="monospace">LL</text>
      </g>
    ))}
    {/* Labels */}
    <text x="60" y="155" fill="hsl(var(--bull))" fontSize="9" fontFamily="monospace">UPTREND</text>
    <text x="210" y="155" fill="hsl(var(--bear))" fontSize="9" fontFamily="monospace">DOWNTREND</text>
    {/* Divider */}
    <line x1="172" y1="10" x2="172" y2="150" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 3" />
  </svg>
);

const BreakoutChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {/* Resistance zone */}
    <rect x="0" y="55" width="300" height="12" fill="hsl(var(--bear) / 0.08)" />
    <line x1="0" y1="55" x2="300" y2="55" stroke="hsl(var(--bear))" strokeWidth="1.5" strokeDasharray="5 3" />
    <text x="8" y="50" fill="hsl(var(--bear))" fontSize="9" fontFamily="monospace">RESISTANCE</text>
    {/* Price consolidating below */}
    <polyline
      points="10,130 30,110 50,125 70,105 90,120 110,100 130,115 150,98 165,67"
      fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"
    />
    {/* Breakout candle */}
    <rect x="168" y="30" width="12" height="37" rx="1" fill="hsl(var(--bull) / 0.3)" stroke="hsl(var(--bull))" strokeWidth="1.5" />
    <line x1="174" y1="22" x2="174" y2="30" stroke="hsl(var(--bull))" strokeWidth="1.5" />
    <line x1="174" y1="67" x2="174" y2="75" stroke="hsl(var(--bull))" strokeWidth="1.5" />
    {/* Post-breakout continuation */}
    <polyline
      points="180,35 200,25 220,30 245,15 270,20"
      fill="none" stroke="hsl(var(--bull))" strokeWidth="2.5" strokeLinejoin="round"
    />
    {/* Volume bars */}
    {[[30,18],[70,14],[110,16],[150,12],[168,38],[200,22],[240,18]].map(([x,h],i) => (
      <rect key={i} x={x-4} y={150-h} width="8" height={h} rx="1"
        fill={i >= 4 ? "hsl(var(--bull) / 0.5)" : "hsl(var(--primary) / 0.2)"} />
    ))}
    <text x="8" y="158" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">VOLUME</text>
    {/* Breakout label */}
    <text x="178" y="20" fill="hsl(var(--bull))" fontSize="8" fontFamily="monospace">BREAKOUT ↑</text>
  </svg>
);

const PullbackChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {/* Broken resistance now support */}
    <line x1="0" y1="80" x2="300" y2="80" stroke="hsl(var(--bull))" strokeWidth="1.5" strokeDasharray="5 3" />
    <text x="8" y="75" fill="hsl(var(--bull))" fontSize="9" fontFamily="monospace">BROKEN RESISTANCE = NEW SUPPORT</text>
    {/* Initial breakout */}
    <polyline
      points="10,130 40,120 70,110 100,85 120,60 140,40"
      fill="none" stroke="hsl(var(--bull))" strokeWidth="2.5" strokeLinejoin="round"
    />
    {/* Pullback to support */}
    <polyline
      points="140,40 160,55 175,75 185,82"
      fill="none" stroke="hsl(var(--bear))" strokeWidth="2" strokeLinejoin="round" strokeDasharray="4 2"
    />
    {/* Bounce and continuation */}
    <polyline
      points="185,82 205,65 225,50 250,35 275,20"
      fill="none" stroke="hsl(var(--bull))" strokeWidth="2.5" strokeLinejoin="round"
    />
    {/* Pullback touch dot */}
    <circle cx="185" cy="82" r="5" fill="none" stroke="hsl(var(--bull))" strokeWidth="2" />
    <circle cx="185" cy="82" r="2.5" fill="hsl(var(--bull))" />
    {/* Labels */}
    <text x="105" y="38" fill="hsl(var(--bull))" fontSize="8" fontFamily="monospace">BREAKOUT</text>
    <text x="148" y="100" fill="hsl(var(--bear))" fontSize="8" fontFamily="monospace">PULLBACK</text>
    <text x="230" y="30" fill="hsl(var(--bull))" fontSize="8" fontFamily="monospace">CONTINUE</text>
    {/* Arrow down for pullback */}
    <text x="168" y="58" fill="hsl(var(--bear))" fontSize="12">↓</text>
    {/* Arrow up for continuation */}
    <text x="210" y="55" fill="hsl(var(--bull))" fontSize="12">↑</text>
  </svg>
);

const LiquidityChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {/* Stop loss zones */}
    <rect x="0" y="18" width="300" height="14" fill="hsl(var(--bear) / 0.1)" />
    <rect x="0" y="128" width="300" height="14" fill="hsl(var(--bull) / 0.1)" />
    <text x="8" y="14" fill="hsl(var(--bear))" fontSize="8" fontFamily="monospace">STOP LOSSES ABOVE HIGHS (SELL LIQUIDITY)</text>
    <text x="8" y="155" fill="hsl(var(--bull))" fontSize="8" fontFamily="monospace">STOP LOSSES BELOW LOWS (BUY LIQUIDITY)</text>
    {/* Price range */}
    <polyline
      points="10,100 35,85 55,95 75,80 95,90 115,75 135,85 155,70"
      fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"
    />
    {/* Liquidity sweep up */}
    <polyline
      points="155,70 170,28 180,55"
      fill="none" stroke="hsl(var(--bear))" strokeWidth="2" strokeLinejoin="round"
    />
    {/* Reversal down */}
    <polyline
      points="180,55 200,75 215,130 225,100 245,115 265,95 280,105"
      fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"
    />
    {/* Sweep labels */}
    <text x="155" y="44" fill="hsl(var(--bear))" fontSize="8" fontFamily="monospace">SWEEP ↑</text>
    <circle cx="170" cy="28" r="4" fill="none" stroke="hsl(var(--bear))" strokeWidth="1.5" />
    <text x="200" y="125" fill="hsl(var(--bull))" fontSize="8" fontFamily="monospace">SWEEP ↓</text>
    <circle cx="215" cy="130" r="4" fill="none" stroke="hsl(var(--bull))" strokeWidth="1.5" />
    {/* Institution label */}
    <text x="100" y="50" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">← CONSOLIDATION →</text>
  </svg>
);

const FakeoutChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    <line x1="0" y1="55" x2="300" y2="55" stroke="hsl(var(--bear))" strokeWidth="1.5" strokeDasharray="5 3" />
    <text x="8" y="50" fill="hsl(var(--bear))" fontSize="9" fontFamily="monospace">RESISTANCE</text>
    <polyline points="10,130 40,110 70,120 100,100 130,110 155,60" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
    <polyline points="155,60 168,35 178,58" fill="none" stroke="hsl(var(--bear))" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="168" cy="35" r="4" fill="none" stroke="hsl(var(--bear))" strokeWidth="2" />
    <text x="174" y="32" fill="hsl(var(--bear))" fontSize="8" fontFamily="monospace">FAKEOUT</text>
    <polyline points="178,58 195,80 215,100 240,120 270,135" fill="none" stroke="hsl(var(--bear))" strokeWidth="2.5" strokeLinejoin="round" />
    <text x="220" y="115" fill="hsl(var(--bear))" fontSize="8" fontFamily="monospace">COLLAPSE ↓</text>
    <rect x="155" y="40" width="30" height="20" fill="hsl(var(--bear) / 0.1)" rx="2" />
    <text x="50" y="155" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">BULLS TRAPPED HERE</text>
  </svg>
);

const RangeChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    <rect x="0" y="45" width="300" height="75" fill="hsl(var(--primary) / 0.04)" />
    <line x1="0" y1="45" x2="300" y2="45" stroke="hsl(var(--bear))" strokeWidth="1.5" strokeDasharray="5 3" />
    <line x1="0" y1="120" x2="300" y2="120" stroke="hsl(var(--bull))" strokeWidth="1.5" strokeDasharray="5 3" />
    <text x="8" y="40" fill="hsl(var(--bear))" fontSize="9" fontFamily="monospace">RANGE HIGH</text>
    <text x="8" y="135" fill="hsl(var(--bull))" fontSize="9" fontFamily="monospace">RANGE LOW</text>
    <polyline points="10,82 35,120 60,50 85,118 110,48 135,122 160,46 185,120 210,50 235,118 260,47 285,120" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
    {[35,85,135,185,235].map(x => <circle key={x} cx={x} cy="120" r="3" fill="hsl(var(--bull))" />)}
    {[60,110,160,210,260].map(x => <circle key={x} cx={x} cy="48" r="3" fill="hsl(var(--bear))" />)}
    <text x="110" y="88" fill="hsl(var(--muted-foreground))" fontSize="9" fontFamily="monospace">SIDEWAYS RANGE</text>
  </svg>
);

const SupplyDemandChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    <rect x="0" y="30" width="300" height="20" fill="hsl(var(--bear) / 0.15)" rx="2" />
    <text x="8" y="25" fill="hsl(var(--bear))" fontSize="9" fontFamily="monospace">SUPPLY ZONE</text>
    <rect x="0" y="115" width="300" height="20" fill="hsl(var(--bull) / 0.15)" rx="2" />
    <text x="8" y="152" fill="hsl(var(--bull))" fontSize="9" fontFamily="monospace">DEMAND ZONE</text>
    <polyline points="20,32 40,50 55,42 70,80 85,70 100,115" fill="none" stroke="hsl(var(--bear))" strokeWidth="2" strokeLinejoin="round" />
    <polyline points="100,115 115,95 130,105 145,70 160,80 175,38" fill="none" stroke="hsl(var(--bull))" strokeWidth="2" strokeLinejoin="round" />
    <polyline points="175,38 190,55 205,45 220,90 240,80 260,118" fill="none" stroke="hsl(var(--bear))" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="100" cy="115" r="4" fill="hsl(var(--bull))" />
    <circle cx="175" cy="38" r="4" fill="hsl(var(--bear))" />
    <circle cx="260" cy="118" r="4" fill="hsl(var(--bull))" />
  </svg>
);

const OrderBlockChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {[[20,90,30],[38,85,25],[56,95,28],[74,88,22]].map(([x,y,h],i) => (
      <g key={i}>
        <line x1={x+6} y1={y-8} x2={x+6} y2={y} stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <rect x={x} y={y} width="12" height={h} rx="1" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="1" />
        <line x1={x+6} y1={y+h} x2={x+6} y2={y+h+8} stroke="hsl(var(--primary))" strokeWidth="1.5" />
      </g>
    ))}
    <rect x="92" y="75" width="14" height="35" rx="1" fill="hsl(var(--bear) / 0.4)" stroke="hsl(var(--bear))" strokeWidth="1.5" />
    <rect x="92" y="75" width="14" height="35" rx="1" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 2" />
    <text x="78" y="70" fill="hsl(var(--primary))" fontSize="7" fontFamily="monospace">ORDER BLOCK</text>
    <polyline points="106,80 125,55 145,40 165,25 185,18" fill="none" stroke="hsl(var(--bull))" strokeWidth="2.5" strokeLinejoin="round" />
    <polyline points="185,18 205,35 220,50 232,78" fill="none" stroke="hsl(var(--bear))" strokeWidth="1.5" strokeLinejoin="round" strokeDasharray="4 2" />
    <circle cx="232" cy="78" r="4" fill="none" stroke="hsl(var(--bull))" strokeWidth="2" />
    <circle cx="232" cy="78" r="2" fill="hsl(var(--bull))" />
    <text x="238" y="82" fill="hsl(var(--bull))" fontSize="8" fontFamily="monospace">RETEST ↑</text>
    <polyline points="232,78 250,60 270,45 285,30" fill="none" stroke="hsl(var(--bull))" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

const ChochChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    <polyline points="10,30 30,50 50,38 70,70 90,55 110,90 130,75 150,108" fill="none" stroke="hsl(var(--bear))" strokeWidth="2" strokeLinejoin="round" />
    {[[30,50],[70,70],[110,90]].map(([x,y],i) => (
      <g key={i}><circle cx={x} cy={y} r="3" fill="hsl(var(--bear))" opacity="0.7" /><text x={x-5} y={y-7} fill="hsl(var(--bear))" fontSize="7" fontFamily="monospace">LH</text></g>
    ))}
    {[[50,38],[90,55],[130,75]].map(([x,y],i) => (
      <g key={i}><circle cx={x} cy={y} r="3" fill="hsl(var(--bear))" opacity="0.4" /><text x={x-4} y={y+13} fill="hsl(var(--bear))" fontSize="7" fontFamily="monospace">LL</text></g>
    ))}
    <line x1="110" y1="90" x2="280" y2="90" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 3" />
    <polyline points="150,108 165,85 178,92 195,68 210,75 228,50 245,58 265,35" fill="none" stroke="hsl(var(--bull))" strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="155" y="78" width="38" height="14" rx="3" fill="hsl(var(--primary) / 0.2)" />
    <text x="158" y="88" fill="hsl(var(--primary))" fontSize="8" fontFamily="monospace" fontWeight="bold">CHoCH ↑</text>
    <text x="8" y="155" fill="hsl(var(--bear))" fontSize="8" fontFamily="monospace">DOWNTREND</text>
    <text x="195" y="155" fill="hsl(var(--bull))" fontSize="8" fontFamily="monospace">STRUCTURE SHIFT</text>
  </svg>
);

const BosChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    <polyline points="10,130 30,100 50,115 70,80 90,95 110,60 130,75 150,40" fill="none" stroke="hsl(var(--bull))" strokeWidth="2" strokeLinejoin="round" />
    {[[30,100],[70,80],[110,60]].map(([x,y],i) => (
      <g key={i}><circle cx={x} cy={y} r="3" fill="hsl(var(--bull))" opacity="0.7" /><text x={x-6} y={y+13} fill="hsl(var(--bull))" fontSize="7" fontFamily="monospace">HL</text></g>
    ))}
    {[[50,115],[90,95],[130,75]].map(([x,y],i) => (
      <g key={i}><circle cx={x} cy={y} r="3" fill="hsl(var(--bull))" opacity="0.4" /><text x={x-6} y={y-7} fill="hsl(var(--bull))" fontSize="7" fontFamily="monospace">HH</text></g>
    ))}
    <line x1="110" y1="60" x2="280" y2="60" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 3" />
    <text x="220" y="55" fill="hsl(var(--primary))" fontSize="8" fontFamily="monospace">PREV HH</text>
    <polyline points="150,40 165,55 175,48 190,30" fill="none" stroke="hsl(var(--bull))" strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="175" y="22" width="30" height="14" rx="3" fill="hsl(var(--bull) / 0.2)" />
    <text x="178" y="32" fill="hsl(var(--bull))" fontSize="8" fontFamily="monospace" fontWeight="bold">BOS ↑</text>
    <polyline points="190,30 210,20 235,15 260,10" fill="none" stroke="hsl(var(--bull))" strokeWidth="2.5" strokeLinejoin="round" />
    <text x="8" y="155" fill="hsl(var(--bull))" fontSize="8" fontFamily="monospace">UPTREND CONTINUES</text>
  </svg>
);

const FairValueGapChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {/* Candle 1 */}
    <line x1="60" y1="100" x2="60" y2="130" stroke="hsl(var(--bull))" strokeWidth="1.5" />
    <rect x="53" y="105" width="14" height="20" rx="1" fill="hsl(var(--bull) / 0.3)" stroke="hsl(var(--bull))" strokeWidth="1.5" />
    {/* Candle 2 - big impulse */}
    <line x1="100" y1="40" x2="100" y2="100" stroke="hsl(var(--bull))" strokeWidth="1.5" />
    <rect x="93" y="45" width="14" height="50" rx="1" fill="hsl(var(--bull) / 0.4)" stroke="hsl(var(--bull))" strokeWidth="1.5" />
    {/* Candle 3 */}
    <line x1="140" y1="30" x2="140" y2="70" stroke="hsl(var(--bull))" strokeWidth="1.5" />
    <rect x="133" y="35" width="14" height="25" rx="1" fill="hsl(var(--bull) / 0.3)" stroke="hsl(var(--bull))" strokeWidth="1.5" />
    {/* FVG zone */}
    <rect x="65" y="70" width="70" height="35" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 2" rx="2" />
    <text x="72" y="92" fill="hsl(var(--primary))" fontSize="9" fontFamily="monospace" fontWeight="bold">FVG</text>
    {/* Lines showing gap */}
    <line x1="67" y1="70" x2="130" y2="70" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2 2" />
    <text x="132" y="68" fill="hsl(var(--muted-foreground))" fontSize="7" fontFamily="monospace">C3 LOW</text>
    <line x1="67" y1="105" x2="130" y2="105" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2 2" />
    <text x="132" y="108" fill="hsl(var(--muted-foreground))" fontSize="7" fontFamily="monospace">C1 HIGH</text>
    {/* Price returns to fill */}
    <polyline points="150,35 170,28 190,40 210,65 220,80" fill="none" stroke="hsl(var(--bear))" strokeWidth="1.5" strokeLinejoin="round" strokeDasharray="4 2" />
    <circle cx="220" cy="80" r="4" fill="none" stroke="hsl(var(--bull))" strokeWidth="2" />
    <text x="226" y="84" fill="hsl(var(--bull))" fontSize="8" fontFamily="monospace">FILL & GO ↑</text>
    <polyline points="220,80 240,65 260,50 280,35" fill="none" stroke="hsl(var(--bull))" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

const EqualHighsLowsChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {/* Equal highs */}
    <line x1="20" y1="35" x2="200" y2="35" stroke="hsl(var(--bear))" strokeWidth="1.5" strokeDasharray="5 3" />
    <text x="8" y="28" fill="hsl(var(--bear))" fontSize="8" fontFamily="monospace">EQUAL HIGHS (EQH) — LIQUIDITY</text>
    {/* Price touching equal highs */}
    <polyline points="15,100 40,60 55,80 80,38 100,75 125,40 145,85 170,36" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
    {[80,125,170].map(x => <circle key={x} cx={x} cy={37} r="3.5" fill="hsl(var(--bear))" />)}
    {/* Sweep and reversal */}
    <polyline points="170,36 185,22 195,55" fill="none" stroke="hsl(var(--bear))" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="185" cy="22" r="4" fill="none" stroke="hsl(var(--bear))" strokeWidth="1.5" />
    <text x="195" y="20" fill="hsl(var(--bear))" fontSize="8" fontFamily="monospace">SWEEP ↑</text>
    <polyline points="195,55 215,80 235,100 260,120 280,135" fill="none" stroke="hsl(var(--bear))" strokeWidth="2.5" strokeLinejoin="round" />
    <text x="220" y="145" fill="hsl(var(--bear))" fontSize="8" fontFamily="monospace">REVERSAL ↓</text>
    {/* Equal lows label */}
    <text x="8" y="155" fill="hsl(var(--muted-foreground))" fontSize="7" fontFamily="monospace">SAME CONCEPT APPLIES TO EQUAL LOWS (EQL)</text>
  </svg>
);

const InducementChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {/* Main trend down */}
    <polyline points="10,30 40,55 55,45 75,80 90,70 115,100" fill="none" stroke="hsl(var(--bear))" strokeWidth="2" strokeLinejoin="round" />
    {/* Minor swing low that induces */}
    <line x1="75" y1="80" x2="200" y2="80" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 3" />
    <text x="130" y="76" fill="hsl(var(--muted-foreground))" fontSize="7" fontFamily="monospace">MINOR LOW</text>
    {/* Inducement move - breaks minor low */}
    <polyline points="115,100 130,85 140,92 155,75 162,82" fill="none" stroke="hsl(var(--bull))" strokeWidth="1.5" strokeLinejoin="round" strokeDasharray="3 2" />
    <text x="125" y="68" fill="hsl(var(--primary))" fontSize="8" fontFamily="monospace">INDUCEMENT</text>
    {/* Traders enter long */}
    <rect x="148" y="62" width="24" height="12" rx="2" fill="hsl(var(--bull) / 0.15)" />
    <text x="151" y="71" fill="hsl(var(--bull))" fontSize="7" fontFamily="monospace">BUY</text>
    {/* Trap and collapse */}
    <polyline points="162,82 175,95 190,110 210,130 240,140 270,145" fill="none" stroke="hsl(var(--bear))" strokeWidth="2.5" strokeLinejoin="round" />
    <text x="200" y="155" fill="hsl(var(--bear))" fontSize="8" fontFamily="monospace">TRAPPED BUYERS ↓</text>
    {/* Stop loss cluster */}
    <rect x="90" y="98" width="30" height="10" rx="2" fill="hsl(var(--bear) / 0.1)" />
    <text x="93" y="106" fill="hsl(var(--bear))" fontSize="6" fontFamily="monospace">SL HUNT</text>
  </svg>
);

const MarketStructureShiftChart = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {/* Bearish structure */}
    <polyline points="10,25 30,45 45,35 65,65 80,50 100,85 115,70 135,105" fill="none" stroke="hsl(var(--bear))" strokeWidth="2" strokeLinejoin="round" />
    {[[30,45],[65,65],[100,85]].map(([x,y],i) => (
      <g key={i}><circle cx={x} cy={y} r="2.5" fill="hsl(var(--bear))" /><text x={x-5} y={y+12} fill="hsl(var(--bear))" fontSize="6" fontFamily="monospace">LH</text></g>
    ))}
    {[[45,35],[80,50],[115,70]].map(([x,y],i) => (
      <g key={i}><circle cx={x} cy={y} r="2.5" fill="hsl(var(--bear))" opacity="0.5" /><text x={x-4} y={y-6} fill="hsl(var(--bear))" fontSize="6" fontFamily="monospace">LL</text></g>
    ))}
    {/* MSS candle */}
    <rect x="132" y="68" width="14" height="40" rx="1" fill="hsl(var(--bull) / 0.4)" stroke="hsl(var(--bull))" strokeWidth="1.5" />
    <line x1="139" y1="60" x2="139" y2="68" stroke="hsl(var(--bull))" strokeWidth="1.5" />
    {/* MSS label */}
    <rect x="148" y="72" width="28" height="12" rx="3" fill="hsl(var(--primary) / 0.25)" />
    <text x="151" y="81" fill="hsl(var(--primary))" fontSize="7" fontFamily="monospace" fontWeight="bold">MSS</text>
    {/* LH line break */}
    <line x1="100" y1="85" x2="180" y2="85" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 2" />
    <text x="150" y="95" fill="hsl(var(--primary))" fontSize="7" fontFamily="monospace">LH BROKEN</text>
    {/* New bullish structure */}
    <polyline points="145,68 165,55 175,62 195,42 210,50 230,30 250,38 270,18" fill="none" stroke="hsl(var(--bull))" strokeWidth="2.5" strokeLinejoin="round" />
    <text x="8" y="155" fill="hsl(var(--bear))" fontSize="8" fontFamily="monospace">BEARISH</text>
    <line x1="137" y1="140" x2="137" y2="155" stroke="hsl(var(--border))" strokeWidth="1" />
    <text x="195" y="155" fill="hsl(var(--bull))" fontSize="8" fontFamily="monospace">BULLISH (MSS CONFIRMED)</text>
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const concepts = [
  {
    title: "Support & Resistance",
    tag: "Foundation",
    tagColor: "primary",
    description: "Support is a price level where buying interest prevents further decline. Resistance is where selling prevents further rise.",
    points: [
      "Support = floor where price bounces up",
      "Resistance = ceiling where price gets rejected",
      "The more times a level is tested, the stronger it becomes",
      "When support breaks, it often becomes resistance (and vice versa)",
    ],
    hinglish: "Support woh level hai jahan se price aksar bounce karta hai. Resistance woh jahan se price neeche aata hai. Jab support tootey toh woh resistance ban jaata hai.",
    Chart: SupportResistanceChart,
  },
  {
    title: "Trend Identification",
    tag: "Core Skill",
    tagColor: "bull",
    description: "A trend is the general direction of price movement. Identifying it early is the foundation of price action trading.",
    points: [
      "Uptrend: Higher highs + Higher lows — buyers in control",
      "Downtrend: Lower highs + Lower lows — sellers in control",
      "Sideways: Price moves between support and resistance",
      "Always study in the direction of the trend",
    ],
    hinglish: "Uptrend mein price upar utha rehta hai — har low pichle se ooncha hota hai. Downtrend mein price gir raha hota hai. Sideways mein koi clear direction nahi hoti.",
    Chart: TrendChart,
  },
  {
    title: "Breakouts",
    tag: "Signal",
    tagColor: "bull",
    description: "A breakout occurs when price moves decisively above resistance or below support, often accompanied by high volume.",
    points: [
      "Price consolidates near a key level",
      "A strong candle closes beyond the level — this is the breakout",
      "Volume confirmation makes breakouts more reliable",
      "Failed breakouts (fakeouts) trap traders on the wrong side",
    ],
    hinglish: "Jab price kisi important level ko todke upar ya neeche jaata hai — usey breakout kehte hain. Agar jhootha breakout ho toh usey fakeout kehte hain.",
    Chart: BreakoutChart,
  },
  {
    title: "Pullbacks",
    tag: "Entry Point",
    tagColor: "primary",
    description: "After a breakout, price often comes back to 'test' the broken level before continuing. This retest is called a pullback.",
    points: [
      "Price breaks a level and moves away",
      "Then it comes back to test the broken level",
      "If the level holds, the move continues — healthy pullback",
      "Pullbacks offer lower-risk observation points",
    ],
    hinglish: "Breakout ke baad price wapas aake level test karta hai. Agar level hold kare toh move continue hota hai. Yeh natural hai — market 'breath' leta hai.",
    Chart: PullbackChart,
  },
  {
    title: "Liquidity Zones",
    tag: "Advanced",
    tagColor: "bear",
    description: "Liquidity zones are price areas where a large number of stop losses and pending orders are clustered. Big players push price to these zones to fill their orders.",
    points: [
      "Liquidity sits above recent highs and below recent lows",
      "Institutions need liquidity to fill large orders",
      "Price often 'sweeps' these zones before reversing",
      "Understanding this helps avoid getting stopped out",
    ],
    hinglish: "Bade players ko apne orders fill karne ke liye volume chahiye. Woh price ko wahan le jaate hain jahan bahut saare stop losses hote hain — phir market palat jaata hai.",
    Chart: LiquidityChart,
  },
  {
    title: "Fakeouts",
    tag: "Trap",
    tagColor: "bear",
    description: "A fakeout is a false breakout — price briefly moves beyond a key level, traps traders, then reverses sharply in the opposite direction.",
    points: [
      "Price breaks a level convincingly — traders enter",
      "The move quickly reverses, trapping those who entered",
      "Fakeouts are most common near round numbers and all-time highs",
      "Low volume breakouts are more likely to be fakeouts",
    ],
    hinglish: "Price level todta hai, log entry lete hain — phir market palat jaata hai. Yeh trap hai. Volume dekho breakout pe.",
    Chart: FakeoutChart,
  },
  {
    title: "Ranging Markets",
    tag: "Sideways",
    tagColor: "primary",
    description: "When price oscillates between a defined high and low without trending, it's in a range. Understanding ranges prevents trading in the wrong context.",
    points: [
      "Price bounces repeatedly between range high and range low",
      "Buy near range low, observe near range high",
      "Ranges compress energy — eventual breakout is often strong",
      "Volume typically decreases inside a range",
    ],
    hinglish: "Price ek box mein upar-neeche ghoomta rehta hai. Neeche se bounce, upar se reject. Jab tak range tootey nahi, trend nahi hai.",
    Chart: RangeChart,
  },
  {
    title: "Supply & Demand Zones",
    tag: "Institutional",
    tagColor: "primary",
    description: "Supply zones are areas where institutions sold heavily causing price to drop. Demand zones are where they bought heavily. Price tends to react at these zones again.",
    points: [
      "Demand zone = area of strong prior buying (price left quickly)",
      "Supply zone = area of strong prior selling (price left quickly)",
      "The faster price left a zone, the stronger the zone",
      "Zones weaken each time price revisits them",
    ],
    hinglish: "Jahan se price tezi se upar gaya — woh demand zone hai. Jahan se tezi se neeche gaya — woh supply zone. Institutions wahan orders rakhte hain.",
    Chart: SupplyDemandChart,
  },
  {
    title: "Order Blocks",
    tag: "Advanced",
    tagColor: "bear",
    description: "An order block is the last opposing candle before a strong impulsive move. It marks where institutions placed large orders and price often returns to it.",
    points: [
      "Bullish OB: last bearish candle before a strong up move",
      "Bearish OB: last bullish candle before a strong down move",
      "Price frequently returns to the OB zone for a retest",
      "OBs combined with liquidity sweeps are high-probability setups",
    ],
    hinglish: "Bade move se pehle ka last opposite candle — wahan institutions ne orders daale the. Price wapas aata hai wahan se bounce karne.",
    Chart: OrderBlockChart,
  },
  {
    title: "Change of Character (CHoCH)",
    tag: "Structure",
    tagColor: "primary",
    description: "CHoCH is the first sign that market structure is shifting. In a downtrend, it's when price breaks above the last lower high for the first time.",
    points: [
      "In downtrend: price breaks above a previous lower high — CHoCH",
      "In uptrend: price breaks below a previous higher low — CHoCH",
      "CHoCH signals potential trend reversal, not confirmation",
      "Wait for a Break of Structure (BOS) to confirm the new trend",
    ],
    hinglish: "Jab downtrend mein price pehli baar ek lower high ke upar jaata hai — yeh CHoCH hai. Matlab structure badal raha hai. Abhi sirf signal hai, confirmation nahi.",
    Chart: ChochChart,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

const PriceAction = () => {
  const [showHinglish, setShowHinglish] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setShowHinglish(p => ({ ...p, [i]: !p[i] }));

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container px-4">

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="text-xs font-mono text-primary uppercase tracking-widest mb-2 block">
              Module 3 · Intermediate
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Price Action Concepts</h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Understanding how price moves and why — the building blocks of reading any chart.
            </p>
          </motion.div>

          {/* Concept cards */}
          <div className="space-y-8">
            {concepts.map((concept, i) => (
              <motion.div
                key={concept.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="chart-surface overflow-hidden"
              >
                <div className="grid lg:grid-cols-2 gap-0">

                  {/* Chart panel */}
                  <div className="relative bg-background/60 border-b lg:border-b-0 lg:border-r border-border p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                        Visual
                      </span>
                      <span className={`px-2.5 py-1 text-xs font-mono rounded-full border ${
                        concept.tagColor === "bull"
                          ? "bg-bull/10 text-bull border-bull/20"
                          : concept.tagColor === "bear"
                          ? "bg-bear/10 text-bear border-bear/20"
                          : "bg-primary/10 text-primary border-primary/20"
                      }`}>
                        {concept.tag}
                      </span>
                    </div>
                    <div className="flex-1 min-h-[160px]">
                      <concept.Chart />
                    </div>
                  </div>

                  {/* Text panel */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-black mb-3">{concept.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                      {concept.description}
                    </p>

                    <div className="space-y-2.5 mb-5">
                      {concept.points.map((point, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + j * 0.08 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-[7px] shrink-0" />
                          <p className="text-sm leading-relaxed">{point}</p>
                        </motion.div>
                      ))}
                    </div>

                    {concept.hinglish && (
                      <>
                        <button
                          onClick={() => toggle(i)}
                          className="text-xs font-mono text-primary hover:text-primary/80 transition-colors press-effect"
                        >
                          {showHinglish[i] ? "Hide Hinglish ↑" : "Show Hinglish ↓"}
                        </button>
                        {showHinglish[i] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 p-4 rounded-xl bg-muted/50 border border-border"
                          >
                            <p className="text-sm leading-relaxed">{concept.hinglish}</p>
                          </motion.div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PriceAction;
