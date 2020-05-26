
export default function LinkedList(){
    let head = undefined;
    let tail = undefined;
    this.size = 0;
    

    this.add = function(item){
        if(!head){
            head = new Node(item);
            tail = head;
        }else {
            const n = new Node(item);
            tail.next = n;
            tail = n;
        }
        this.size++;
    }

    this.remove = function(){
        if(!head) return;
        const first = head.item;
        head = head.next;
        this.size--;
        return first;
    }
}

function Node(item){
    this.item = item;
    this.next = undefined;
}