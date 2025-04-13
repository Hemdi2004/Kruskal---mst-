const edges = [
    [0, 1, 4],
    [0, 2, 1],
    [1, 2, 2],
    [1, 3, 5],
    [2, 3, 8],
    [3, 4, 3],
    [2, 4, 7],
  ];
  const nodes = 5;

  const graphDiv = document.getElementById("graph");
  edges.forEach(([u, v, w]) => {
    const div = document.createElement("div");
    div.className = "edge";
    div.innerText = `Edge: ${u} - ${v} | Weight: ${w}`;
    graphDiv.appendChild(div);
  });

  class DisjointSet {
    constructor(size) {
      this.parent = Array(size).fill(0).map((_, i) => i);
      this.rank = Array(size).fill(0);
    }

    find(x) {
      if (this.parent[x] !== x) {
        this.parent[x] = this.find(this.parent[x]);
      }
      return this.parent[x];
    }

    union(x, y) {
      const rootX = this.find(x);
      const rootY = this.find(y);
      if (rootX === rootY) return false;

      if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
      return true;
    }
  }

  function runKruskal() {
    const ds = new DisjointSet(nodes);
    const sortedEdges = [...edges].sort((a, b) => a[2] - b[2]);
    const mst = [];
    let totalWeight = 0;

    for (let [u, v, weight] of sortedEdges) {
      if (ds.union(u, v)) {
        mst.push([u, v, weight]);
        totalWeight += weight;
      }
    }

    const outputDiv = document.getElementById("output");
    outputDiv.innerText = "Minimum Spanning Tree (MST):\n";
    mst.forEach(([u, v, w]) => {
      outputDiv.innerText += `Edge ${u} - ${v} (weight: ${w})\n`;
    });
    outputDiv.innerText += `\nTotal Weight: ${totalWeight}`;
  }