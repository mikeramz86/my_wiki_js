//=========================================
//     
//     QUEUE DATA STRUCTURE
//=========================================


// Notes:
// * First-in, first-out data structure (FIFO)
// * Can only remove items one at time
// * Must remove items in the same sequence

function createQueue() {
    const queue = []

    return {
        // add or enqueue
        enqueue(x) {
            queue.unshift(x)
        },
        // remove or dequeue
        dequeue() {
            if(queue.lenght === 0) {
                return undefined
            }
            return queue.pop()
        },
        // peek
        peek() {
            if (queue.length === 0) {
                return undefined
            }
            return queue[queue.length-1]
        },
        // length
        get length() {
            return queue.length
        },
        // isEmpty
        isEmpty() {
            return queue.length === 0
        }
    }

}

//EXAMPLE:

function createQueue() {
    const queue = []
  
    return {
      enqueue(x) {
        queue.unshift(x)
      },
      dequeue() {
        if(queue.length === 0) {
          return undefined
        }
        return queue.pop()
      },
      peek() {
        if(queue.length === 0) {
          return undefined
        }
        return queue[queue.length -1]
      },
      get length() {
        return queue.length
      },
      isEmpty() {
        return queue.length === 0
      }
    }
  }
  
  const q = createQueue()
  // console.log(q.isEmpty())
  
  q.enqueue('make an egghead lesson')
  
  q.enqueue('help others learn')
  
  q.enqueue('be happy')
  
  q.dequeue()
  q.dequeue()
  q.dequeue()
  // console.log(q.peek())
  
  console.log(q.isEmpty())
