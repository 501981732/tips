// 一个用于标识顶点，另一个是表明这 个顶点是否被访问过的布尔值



function Vertex(label) { this.label = label;
}


function Graph(v) { this.vertices = v; this.edges = 0; this.adj = [];
for (var i = 0; I < this.vertices; ++i) { this.adj[i] = []; this.adj[i].push("");
}
this.addEdge = addEdge; this.toString = toString;
}


function addEdge(v, w) { this.ajd[v].push(w); this.adj[w].push(v); this.edges++;
}


function showGraph() {
for (var i = 0; i < this.vertices; ++i) {
putstr(i + "->");
for (var j = 0; j < this.vertices; ++j) {
if (this.adj[i][j] != undefined) putstr(this.adj[i][j] + ' ');
}
print(); }
}