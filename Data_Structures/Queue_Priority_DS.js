//=========================================
//     
//     PRIORITY QUEUE DATA STRUCTURE
//=========================================



function createPriortyQueue() {
    return {
        // enqueue
        //dequeue
        //peek
        //length
        //isEmpty
    }
}


//EXAMPLE:

function createPriortyQueue() {
    const lowPriorityQueue = createQueue()
    const highPriorityQueue= createQueue()
    return {
        // enqueue
        enqueue(item, isHighPriority = false) {
            isHighPriority ? highPriorityQueue.enqueue
            (item) : lowPriorityQueue.enqueue(item)
        },
        //dequeue
        dequeue() {
            if (!highPriorityQueue.isEmpty()) {
                return highPriorityQueue.denqueue()
            }
            return lowPriorityQueue.dequeue
        },
        //peek
        peek() {
            if (!highPriorityQueue.isEmpty()) {
                return highPriorityQueue.peek()
            }
            return lowPriorityQueue.peek
        },
        //length
        length() {
            return highPriorityQueue.length + lowPriorityQueue.length
        },
        //isEmpty
        isEmpty() {
            return (highPriorityQueue.isEmpty() && lowPriorityQueue.isEmpty())
        }
    }
}

const q = createPriortyQueue()

q.enqueue('a fix here')
q.enqueue('a bug there')
q.enqueue('a new feature')

console.log(a.denqueue())
console.log(a.denqueue())
q.enqueue("Emergency task1", true)
console.log(a.peek())