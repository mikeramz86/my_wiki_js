//=========================================
//     
//     STACK DATA STRUCTURE
//=========================================

//Notes:
//* A collection of tiems that obay the princple: Last in First Out
//* In order to place an item you first ahave to remove it in order to get to the other ties
//* Used on Nested Function calls

//Properties and Methods in stack
//*Push
//*Pop
//*Peek
//*length
//*isEmpty

function createStack() {
    const array = []

    return {
        //push: to place new items at the end of array
        push(item) {
            array.push(item)
        },
        //pop: remove the final item in teh array
        pop() {
            return array.pop()
        },
        //peek: returning the last item in array
        peek() {
            return array[array.length - 1]
        },
        //length: use getter functon
        get length() {
            return array.length == 0
        }
    }
}

//Example:

const lowerBodayStack = createStack()

lowerBodyStack.push('underwear')
lowerBodyStack.push('socks')
lowerBodyStack.push('pants')
lowerBodyStack.push('shoes')

lowerBodayStack.pop()
lowerBodayStack.pop()
console.log(lowerBodayStack.peek())