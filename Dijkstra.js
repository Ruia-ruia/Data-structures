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
    if (typeof elem != 'string') return -1; 
    else if (typeof p != 'number') return -1; 

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

class Vertex{
  constructor(nodeDict){
    this.nodekeys = Object.keys(nodeDict);
    this.nodevals = Object.values(nodeDict);
  }
}

class Graph{
  constructor(nodes){
    this.nodes = nodes;
    this.paths = [];
  }
  
  setup(){
    for (var i = 0; i < this.nodes.length; i++){
      this.paths.push(new Vertex(this.nodes[i]))
    }
    console.log(this.paths);
  }
}

nodes = [
  {A:0, B:2},
  {B:0, A:2}
]

var graph1 = new Graph(nodes);
graph1.setup();
