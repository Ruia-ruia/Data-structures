class QElem {
  constructor(elem, p){
    this.elem = elem;
    this.p = p;
  }
}

class PQueue{
  constructor(){
    this.items = [];
  }

  set(elem, p){
    if (typeof elem != 'string') { return -1; }
    else if (typeof p != 'number') { return -1; }

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
     }
     else console.log("Empty");
   }
  
  get(index){
    return this.items[index];
  }
  
  size(){
   return this.items.length;
  }
}


var pQ = new PQueue();
pQ.set("C", 2);
pQ.set("B", 4);
pQ.set("A", 3);
//var x = pQ.unset();
//console.log(pQ.items);
//console.log(x);
var y = pQ.get(pQ.size() - 1);
console.log(y);
