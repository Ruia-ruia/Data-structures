/*
data structures including priority queue and its element structure, alongwith a graph class for instantiating weighted edges
*/
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

class Graph {
   constructor(){
       this.nodes = {}
   }
   
   initNode(node){
       this.nodes[node] = [];
   }

   initEdge(node1, node2, work){
       this.nodes[node1].push({[node2]:work})
       this.nodes[node2].push({[node1]:work})
   }
}

/*
main computations - discernment of shortest possible paths between entryNode (e.g. 'A') and all other nodes
*/
function dijkstra(){
   dists = {};
   pQ.set(entryNode, 0);
   backingStore = {};

   dists[entryNode] = 0;
   var keys = Object.keys(g.nodes)
   keys.forEach(adj => {
       if(!(adj == entryNode)){
          dists[adj] = 10000;
       }
   });
  
   while(!(pQ.size() == 0)){
      var currentVertex = pQ.unset(entryNode);
      var currdist = currentVertex.p;

      g.nodes[currentVertex.elem].forEach(adj => {
         let adjKey = Object.keys(adj)[0];
         let adjWork = Object.values(adj)[0]
         let cmpWork = dists[currentVertex.elem] + adjWork;


         if(cmpWork < dists[adjKey]){
             dists[adjKey] = cmpWork;
             backingStore[adjKey] = cmpWork;
             pQ.set(adjKey, cmpWork);
         }
      });
   }
  return backingStore;
}


/*
Function invocations and logging results
*/
var pQ = new PQueue();
var g = new Graph();
g.initNode('A');
g.initNode('B');
g.initNode('C');
g.initEdge('A', 'B', 3);
g.initEdge('B', 'C', 5);

var entryNode = 'A';
console.log(dijkstra());
