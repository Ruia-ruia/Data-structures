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

  enqueue(elem, p){
    if (typeof p != 'number') { return -1; }
    else if (typeof elem != 'string') { return -1; }

    var qitem = new QElem(elem, p);
    var contain = false;

    for(var i = 0; i < this.items.length; i++){
      if(this.items[i].p > qitem.p){
        this.items.splice(i, 0, qitem);
        contain = true;
        break;
      }
    }
    if(!contain){
      this.items.push(qitem);
    }
  }


}

var pQ = new PQueue();
pQ.enqueue("C", 2);
pQ.enqueue("B", 4);
pQ.enqueue("A", 3);
console.log(pQ.items)
