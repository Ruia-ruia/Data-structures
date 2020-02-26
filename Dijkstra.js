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
    //if (typeof elem != 'string') return -1;
    //else if (typeof p != 'number') return -1;

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

var pQ = new PQueue(); //set(el, p), unset(), get(index), size()

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
  {B:0, A:2, D:7, F:5, H:8},
  {C:0, A:3}
]

var graph1 = new Graph(nodes);
graph1.setup();

function qNodes(){
  var init = pQ.set(graph1.vertices[0], 0);

  for(i = 1; i < nodes.length; i++){
    pQ.set(graph1.vertices[i], 100);
  }
}

qNodes();

console.log(pQ.items);
 



