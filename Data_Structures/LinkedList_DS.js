//=========================================
//
//     LINKEDIN LIST DATA STRUCTURE
//=========================================

// NOTES
// - collection of items where each item oints to the next one on the list
// - they are slow
// - must start at the HEAD and loop through each item's NEXT proprty until arrived a item
// - O(n) time

function createNode(value) {
  return {
    value,
    next: null,
    //
    previous: null
  }
}

function createLinkedList() {
  return {
    //head
    head: null,
    //tail
    tail: null, //cyclical lists, the tail points to the head
    //length
    length: 0,
    //push: adds an item at the end of the array
    push(value) {
      const node = createNode(value);

      if (this.head === null) {
        this.head = node
        this.tail = node
        this.length++
        return node
      }

      this.tail.next = node;
      this.tail = node;
      this.length++
      return node;
    },


    //pop: takes away an item at the end of the array
    pop() {
      //scenarios: how do we pop items when our list is empty. result is returning null
      if (this.isEmpty()) {
        return null
      }
      //scenarios: what if list has a length of 1
      const node = this.tail
      // result: list of 1 means HEAD and TAIL are the same therefore we need to set it to null as well as our length
      if (this.head === this.tail) {
        this.head = null
        this.tail = null
        //then decrement it
        this.length--
        return node
      }
      //scenario: when our list has many items
      //inorder to find an item you have to start from the head and continue to cal next till we find that item
      let current = this.head
      let penultimate
      while (current) {
        if (current.next === this.tail) {
          penultimate = current
          //penultimate: means to last but one in a seires of things; second last
          break
        }

        current = current.next;
      }

      penultimate.next = null;
      this.tail = penultimate;
      this.length--

      return node
    },


    //get
    get(index) {
      if (index < 0 || index > this.length - 1) {
        return null
      }

      if (index === 0) {
        return this.head
      }
    //loop through, each item, calling next on each one 
      let current = this.head
      let i = 0;

      while (i < index) {
        i++;
        current = current.next
        return current
      }
    },

    
    //delete
    delete(index) {
      if (index < 0 || index > this.length - 1) {
        return null
      }

      if (index === 0) {
        const deleted = this.head

        this.head = this.head.next
        this.length--

        return deleted
      }

      let current = this.head
      let previous;
      let i = 0

      while (i < index) {
        i++;
        previous = current
        current = current.next
      }

      const deleted = current;
      previous.next = current.next

      if (previous.next === null) {
        this.tail = previous;
      }

      this.length--

      return deleted;
    },
    //isEmpty: returns whether or not the length is zero
    isEmpty() {
      return this.length === 0
    },

    print() {
      const values = []
      let current = this.head

      while (current) {
        values.push(current.value)
        current = current.next

        return values.join(' => ')
      }
    }
  }
}

const list = createLinkedList()
const values = ['a', 'b', 'c', 'd', 'e']
const nodes = values.map(val => list.push(val))

console.log(list.isEmpty)
console.log(list.tail)
console.log(list.get(1))
