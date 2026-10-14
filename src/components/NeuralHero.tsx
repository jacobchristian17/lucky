// The home page network. Output nodes are links to the site's pages.
// Edges draw in once on load (CSS in globals.css), then faint signal dots drift through the
// network. Hovering an output makes it glow, lights its incoming edges, and sends brighter dots along them.

type Pt = { x: number; y: number };

const outputs = [
  { id: "about", label: "About", href: "/about" },
  { id: "portfolio", label: "Portfolio", href: "/portfolio" },
  { id: "reflections", label: "Reflections", href: "/reflections" },
  { id: "contact", label: "Contact", href: "/contact" },
];

type Layout = {
  className: string;
  viewBox: string;
  inputs: Pt[];
  hidden: Pt[];
  outs: Pt[];
  curve: (a: Pt, b: Pt) => string;
};

const across = (a: Pt, b: Pt) => {
  const mx = (a.x + b.x) / 2;
  return `M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
};

const down = (a: Pt, b: Pt) => {
  const my = (a.y + b.y) / 2;
  return `M${a.x} ${a.y} C${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
};

const layouts: Layout[] = [
  {
    className: "net net-h",
    viewBox: "0 0 640 420",
    inputs: [{ x: 40, y: 110 }, { x: 40, y: 210 }, { x: 40, y: 310 }],
    hidden: [{ x: 250, y: 150 }, { x: 250, y: 270 }],
    outs: [{ x: 450, y: 60 }, { x: 450, y: 165 }, { x: 450, y: 270 }, { x: 450, y: 375 }],
    curve: across,
  },
  {
    className: "net net-v",
    viewBox: "0 0 320 430",
    inputs: [{ x: 110, y: 24 }, { x: 190, y: 24 }, { x: 270, y: 24 }],
    hidden: [{ x: 150, y: 120 }, { x: 240, y: 120 }],
    outs: [{ x: 40, y: 220 }, { x: 40, y: 285 }, { x: 40, y: 350 }, { x: 40, y: 415 }],
    curve: down,
  },
];

// Timing for the single load sequence, in seconds.
const LAYER1 = 0;
const LAYER2 = 0.6;
const OUT = 1.2;

// Idle drift: start after the load sequence. A dot spends ~2.1s on an edge (30% of the 7s cycle),
// so each hidden→output delay is an incoming dot's delay + 2.1, making signals appear to pass through.
const DRIFT_START = 1.8;
const DRIFT_IN = [0, 2.6, 5.1, 1.3, 3.9, 6.2]; // input i → hidden j, indexed i * 2 + j
const DRIFT_OUT = [
  [2.1, 7.2, 6.0, 4.5], // hidden 0 → outputs
  [4.7, 3.4, 8.3, 0.9], // hidden 1 → outputs
];

function Network({ className, viewBox, inputs, hidden, outs, curve }: Layout) {
  const glowId = `glow-${className.split(" ").pop()}`;

  return (
    <svg className={className} viewBox={viewBox} role="group" aria-label="Site navigation network">
      <defs>
        <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      {inputs.flatMap((a, i) =>
        hidden.map((b, j) => (
          <path
            key={`ih-${i}-${j}`}
            className="edge"
            d={curve(a, b)}
            pathLength={1}
            style={{ animationDelay: `${LAYER1 + i * 0.08}s` }}
          />
        )),
      )}
      {hidden.flatMap((a, j) =>
        outs.map((b, k) => (
          <path
            key={`ho-${j}-${k}`}
            className="edge"
            data-to={outputs[k].id}
            d={curve(a, b)}
            pathLength={1}
            style={{ animationDelay: `${LAYER2 + k * 0.08}s` }}
          />
        )),
      )}
      <g className="drifts">
        {inputs.flatMap((a, i) =>
          hidden.map((b, j) => (
            <path
              key={`drift-ih-${i}-${j}`}
              className="drift"
              d={curve(a, b)}
              pathLength={1}
              style={{ animationDelay: `${DRIFT_START + DRIFT_IN[i * 2 + j]}s` }}
            />
          )),
        )}
        {hidden.flatMap((a, j) =>
          outs.map((b, k) => (
            <path
              key={`drift-ho-${j}-${k}`}
              className="drift"
              d={curve(a, b)}
              pathLength={1}
              style={{ animationDelay: `${DRIFT_START + DRIFT_OUT[j][k]}s` }}
            />
          )),
        )}
      </g>
      {/* Signal dots that travel into an output node while it's hovered */}
      {hidden.flatMap((a, j) =>
        outs.map((b, k) => (
          <path
            key={`pulse-${j}-${k}`}
            className="pulse"
            data-pulse={outputs[k].id}
            d={curve(a, b)}
            pathLength={1}
            style={{ animationDelay: `${j * 0.35}s` }}
          />
        )),
      )}
      {inputs.map((p, i) => (
        <circle key={`i-${i}`} className="node-in" cx={p.x} cy={p.y} r={7} />
      ))}
      {hidden.map((p, j) => (
        <circle
          key={`h-${j}`}
          className="node-hidden"
          cx={p.x}
          cy={p.y}
          r={11}
          style={{ animationDelay: `${LAYER2}s` }}
        />
      ))}
      {outs.map((p, k) => (
        <a key={outputs[k].id} href={outputs[k].href} className="node-out" data-out={outputs[k].id}>
          <rect className="hit" x={p.x - 20} y={p.y - 24} width={190} height={48} rx={24} />
          <circle className="halo" cx={p.x} cy={p.y} r={20} filter={`url(#${glowId})`} />
          <circle className="ring" cx={p.x} cy={p.y} r={17} />
          <circle className="dot" cx={p.x} cy={p.y} r={10} style={{ animationDelay: `${OUT + k * 0.1}s` }} />
          <text x={p.x + 24} y={p.y} dominantBaseline="central">
            {outputs[k].label}
          </text>
        </a>
      ))}
    </svg>
  );
}

export default function NeuralHero() {
  return (
    <figure className="network">
      {layouts.map((l) => (
        <Network key={l.className} {...l} />
      ))}
      <figcaption>Select a node to open that page.</figcaption>
    </figure>
  );
}
