class QElem {
  constructor(elem, p){
    this.elem = elem;
    this.p = p;
  }
}

class PQueue {
  constructor(){
    this.items = [];
  }

  set(elem, p){

    var qitem = new QElem(elem, p);
    var flag = false;

    for(var i = 0; i < this.items.length; i++){
      if(this.items[i].p > qitem.p){
        this.items.splice(i, 0, qitem);
        flag = true;
        break;
      }
    }

    if(!flag){
      this.items.push(qitem);
    }
  }

  unset(){
     if(this.items.length !== 0){
       return this.items.shift();
     } else console.log("Empty.");
   }

  get(index){
    return this.items[index];
  }

  size(){
   return this.items.length;
  }
}

var pQ = new PQueue(); //available methods: set(elem, priority), unset(), get(index), size()

class Edge {
  constructor(start, end, weight){
    this.start = start;
    this.end = end;
    this.weight = weight;
  }

  getWeight(){
    return this.weight;
  }

  getTermo(){
    return this.end;
  }
}

class Vertex {
  constructor(nodeDict){
    this.nodekeys = Object.keys(nodeDict);
    this.nodevals = Object.values(nodeDict);
    this.edges = [];
  }
  setup() {
    for (var i = 1; i < this.nodevals.length; i++){
      const newEdge = new Edge(this.nodekeys[0], this.nodekeys[i], this.nodevals[i])
    this.edges.push(newEdge)
    }
  }

  getEdges(){
    return this.edges;
  }
}

class Graph {
  constructor(nodes){
    this.nodes = nodes;
    this.vertices = [];
  }

  setup(){
    for (var i = 0; i < this.nodes.length; i++){
      const vertexObject = new Vertex(this.nodes[i]);
      this.vertices.push(vertexObject)
      vertexObject.setup();
      }
    }
}

var nodes = [
  {A:0, B:2, C:3},
  {B:0, A:2, C:4, D:7},
  {C:0, A:3, B:4},
  {D:0, B:7}
]
var graph1 = new Graph(nodes);
graph1.setup();

/*
key := the name of the vertex
0. get the offset in nodes where the key has value 0
1. return the object at the same offset in the graph object
*/
function getOffsetFromKey(key){
  for(i in nodes){
    if(nodes[i][key] === 0){
      return graph1.vertices[i];
    }
  }
}

startNode = 'A';
var distances = {};

for(i = 0; i < nodes.length; i++){
  node = nodes[i];
  if(Object.keys(node)[0] === startNode) { distances[Object.keys(node)[0]] = 0; }
  else { distances[Object.keys(node)[0]] = 1000;
 }
}
pQ.set(graph1.vertices[0], 0);

(function Djik(){
  while(!(pQ.size() === 0)){
    let cVertex = pQ.unset();
    let weight = cVertex.p;
    let edgeList = cVertex.elem.nodekeys;
    let edgeObjectList = [];      

    edgeList.forEach(name => {
edgeObjectList.push(getOffsetFromKey(name))
    });
    
    edgeObjectList.forEach(adj => {
       let sum = distances[edgeList[0]] + adj.nodevals[1];

       if(sum < distances[adj.nodekeys[0]]){
         distances[adj.nodekeys[0]] = sum;
         pQ.set(getOffsetFromKey(adj.nodekeys[0]), sum);
       }
    });
  }
})();


console.log(distances);
