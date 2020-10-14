module.exports = [
  {
    selector: "node",
    style: {
      height: "label",
      width: "label",
      padding: "10px",
      "font-weight": "200",
      "font-family": "Avenir, Helvetica, Arial, sans-serif",
      "background-color": "white",
      "border-radius": 5,
      "min-zoomed-font-size": 8,
      shape: "round-rectangle",
      "border-color": "#d1d1d1",
      "border-width": 1.2,
      label: "data(name)",
      "text-valign": "center",
      "text-halign": "center",
    },
  },
  {
    selector: "node[status = 'completed']",
    style: {
      "border-color": "#26bd77",
      "border-width": 1,
      "background-color": "#dcffe6",
    },
  },
  {
    selector: "node[status = 'failed']",
    style: {
      "border-color": "#ff6c6c",
      "border-width": 1,
      "background-color": "#ffcccc",
    },
  },
  {
    selector: "node:selected",
    style: { "border-color": "#11939A", "border-width": 2 },
  },
  {
    selector: "node[status = 'failed']:selected",
    style: { "border-color": "#ff6c6c", "border-width": 2.5 },
  },
  {
    selector: "node[status = 'completed']:selected",
    style: { "border-color": "#26bd77", "border-width": 2.5 },
  },
  {
    selector: "edge",
    style: {
      "border-color": "#26bd77",
      "border-width": 2.5,
      "target-arrow-shape": "triangle",
      "target-arrow-color": "#2c3e50",
      "line-color": "#2c3e50",
      width: 1.5,
      "curve-style": "bezier", //'hay-stack' <- set to improve perfomance
    },
  },
  {
    selector: "edge[type = 'inferred']",
    style: {
      "target-arrow-color": "#ECAB20",
      "line-color": "#ECAB20",
    },
  },
  {
    selector: "edge[type = 'chronological']",
    style: {
      "target-arrow-color": "#5879DA",
      "line-color": "#5879DA",
    },
  },
]