class LinkedList {
  constructor() {
  this.head = null;
  this.tail = null;
  }

  // add a new node to the end of the list
  addLast(payload) {
  const newNode = {
    prev: this.tail,
    next: null,
    data: payload
  };

  if (!this.head) {
    this.head = newNode;
  } else {
    this.tail.next = newNode;
  }
  this.tail = newNode;
  }

  // add a new node to the beginning of the list
  addFirst(payload) {
  const newNode = {
    prev: null,
    next: this.head,
    data: payload
  };

  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.head.prev = newNode;
    this.head = newNode;
  }
  }

  // remove the last node from the list
  removeLast() {
  // if the list is empty
  if (!this.tail) {
    return;
  }

  // if there is only 1 node
  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
    return;
  }

  // 2nd last node
  const secondLastNode = this.tail.prev;

  // update tail to point to 2nd last node
  this.tail = secondLastNode;

  // set next pointer of new tail to null
  this.tail.next = null;
  }

  // remove the first node from the list
  removeFirst() {
  // if the lsit is empty
  if (!this.tail) {
    return;
  }

  // if there is only 1 node
  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
    return;
  }

  const secondNode = this.head.next;
  this.head = secondNode;
  this.head.prev = null;
  }

  // remove node
  removeNode(nodeToRemove) {
  // if list is empty
  if (!this.head || !nodeToRemove) {
    return;
  }

  // if there is only 1 node
  if (this.head === this.tail && this.head === nodeToRemove) {
    this.head = null;
    this.tail = null;
    return;
  }

  // if node to remove is head
  if (this.head === nodeToRemove) {
    this.head = nodeToRemove.next;
    if (this.head) {
    this.head.prev = null;
    } else {
    this.tail = null; // if the head is the only node
    }
    return;
  }

  // if node to remove is the tail
  if (this.tail === nodeToRemove) {
    this.tail = nodeToRemove.prev;
    this.tail.next = null;
    return;
  }

  // if the node to remove is in the middle
  const prevNode = nodeToRemove.prev;
  const nextNode = nodeToRemove.next;
  prevNode.next = nextNode;
  nextNode.prev = prevNode;
  }

  insertBeforeNode(existingNode, payload) {
  if (!existingNode) {
    console.log("Existing node not found.");
    return;
  }

  const newNode = {
    prev: null,
    next: null,
    data: payload
  };

  // if existing node is the head
  if (this.head === existingNode) {
    newNode.next = existingNode;
    existingNode.prev = newNode;
    this.head = newNode;
    return;
  }

  // if existing node is not the head
  newNode.prev = existingNode.prev;
  newNode.next = existingNode;
  existingNode.prev.next = newNode;
  existingNode.prev = newNode;
  }

  insertAfterNode(existingNode, payload) {
  if (!existingNode) {
    console.log("Existing node not found.");
    return;
  }

  const newNode = {
    prev: null,
    next: null,
    data: payload
  };

  // if existing node is the tail
  if (this.tail === existingNode) {
    newNode.prev = existingNode;
    existingNode.next = newNode;
    this.tail = newNode;
    return;
  }

  // if existing node is not the tail
  newNode.next = existingNode.next;
  newNode.prev = existingNode;
  existingNode.next = newNode;
  newNode.next.prev = newNode;
  }

  swapNodes(node1, node2) {
  // Check if nodes are valid and different
  if (!node1 || !node2 || node1 === node2) {
    console.log("Invalid nodes to swap.");
    return;
  }

  // Check if nodes are adjacent
  if (node1.next === node2) {
    const tempPrev = node1.prev;
    node1.prev = node2;
    node2.prev = tempPrev;
    node1.next = node2.next;
    if (node2.next) {
      node2.next.prev = node1;
    }
    node2.next = node1;
    if (tempPrev) {
      tempPrev.next = node2;
    } else {
      this.head = node2;
    }
  } else if (node2.next === node1) {
    // Swap nodes if they are adjacent in the opposite order
    this.swapNodes(node2, node1);
  } else {
    // Swap nodes if they are not adjacent
    const tempPrev1 = node1.prev;
    const tempNext1 = node1.next;
    const tempPrev2 = node2.prev;
    const tempNext2 = node2.next;

    // Update node1's pointers
    node1.prev = tempPrev2;
    if (tempPrev2) {
      tempPrev2.next = node1;
    } else {
      this.head = node1;
    }
    node1.next = tempNext2;
    if (tempNext2) {
      tempNext2.prev = node1;
    } else {
      this.tail = node1;
    }

    // Update node2's pointers
    node2.prev = tempPrev1;
    if (tempPrev1) {
      tempPrev1.next = node2;
      } else {
      this.head = node2;
      }
    node2.next = tempNext1;
    if (tempNext1) {
      tempNext1.prev = node2;
      } else {
      this.tail = node2;
      }
    }
  }

  // Find a node at a specific index
  nodeAt(index) {
    if (index < 0) {
      console.log("Invalid index.");
      return null;
    }

    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode !== null && currentIndex < index) {
      currentNode = currentNode.next;
      currentIndex++;
    }

    if (currentNode === null) {
      console.log("Node not found at index: ", index);
      return null;
    }

    return currentNode;
  }

  // print the list
  printList() {
  // if the list is empty
  if (!this.head) {
    console.log(`Empty List: \nhead: ${this.head} \ntail: ${this.tail} \n`);
    return;
  }

  let currentNode = this.head;
  while (currentNode !== null) {
    console.log(`node${currentNode.data}`);
    console.log(
    JSON.stringify(currentNode, (key, value) => {
      if (key !== "prev" && key !== "next") {
      return value;
      }
      if (value !== null && typeof value === "object") {
      return `${value.data}`;
      }
      return value;
    }, 2)
    );
    currentNode = currentNode.next;
    }
  }
  }

/*
// Test removeLast
console.log("Test removeLast:");
const emptyListRemoveLast = new LinkedList();
emptyListRemoveLast.printList();
console.log("After removeLast:");
emptyListRemoveLast.removeLast();
emptyListRemoveLast.printList();
console.log();

const singleNodeEndOfListRemoveLast = new LinkedList();
console.log("Single Node End Of List:")
singleNodeEndOfListRemoveLast.addLast("A");
singleNodeEndOfListRemoveLast.printList();
console.log("After removeLast:");
singleNodeEndOfListRemoveLast.removeLast();
singleNodeEndOfListRemoveLast.printList();
console.log();

const twoNodeListRemoveLast = new LinkedList();
console.log("Two Node List:");
twoNodeListRemoveLast.addLast("B");
twoNodeListRemoveLast.addFirst("A");
twoNodeListRemoveLast.printList();
console.log("After removeLast:");
twoNodeListRemoveLast.removeLast();
twoNodeListRemoveLast.printList();
console.log();

// Test removeFirst
console.log("Test removeFirst:");
const emptyListRemoveFirst = new LinkedList();
emptyListRemoveFirst.printList();
console.log("After removeFirst:");
emptyListRemoveFirst.removeFirst();
emptyListRemoveFirst.printList();
console.log();

const singleNodeEndOfListRemoveFirst = new LinkedList();
console.log("Single Node End Of List:");
singleNodeEndOfListRemoveFirst.addLast("A");
singleNodeEndOfListRemoveFirst.printList();
console.log("After removeFirst:");
singleNodeEndOfListRemoveFirst.removeFirst();
singleNodeEndOfListRemoveFirst.printList();
console.log();

const twoNodeListRemoveFirst = new LinkedList();
console.log("Two Node List:");
twoNodeListRemoveFirst.addLast("B");
twoNodeListRemoveFirst.addFirst("A");
twoNodeListRemoveFirst.printList();
console.log("After removeFirst:");
twoNodeListRemoveFirst.removeFirst();
twoNodeListRemoveFirst.printList();
console.log();

// Test removeNode
const listForRemoveNode = new LinkedList();
listForRemoveNode.addFirst("A");
listForRemoveNode.addLast("B");
listForRemoveNode.addLast("C");
listForRemoveNode.addLast("D");
listForRemoveNode.addLast("E");

console.log("Test removeNode:");
console.log("Original list:");
listForRemoveNode.printList();

console.log("After removing the first node:");
listForRemoveNode.removeNode(listForRemoveNode.head);
listForRemoveNode.printList();

console.log("After removing the last node:");
listForRemoveNode.removeNode(listForRemoveNode.tail);
listForRemoveNode.printList();

console.log("After removing the middle node:");
listForRemoveNode.removeNode(listForRemoveNode.head.next);
listForRemoveNode.printList();
console.log();

// Test insertBeforeNode
const listForInsertBeforeNode = new LinkedList();
listForInsertBeforeNode.addFirst("B");
listForInsertBeforeNode.addLast("D");
listForInsertBeforeNode.addLast("F");

console.log("Test insertBeforeNode:");
console.log("Original list:");
listForInsertBeforeNode.printList();

console.log("After inserting before 'B':");
listForInsertBeforeNode.insertBeforeNode(listForInsertBeforeNode.head, "A");
listForInsertBeforeNode.printList();
console.log();

console.log("After inserting before 'D':");
listForInsertBeforeNode.insertBeforeNode(listForInsertBeforeNode.head.next.next, "C");
listForInsertBeforeNode.printList();
console.log();

console.log("After inserting before 'F':");
listForInsertBeforeNode.insertBeforeNode(listForInsertBeforeNode.head.next.next.next.next, "E");
listForInsertBeforeNode.printList();
console.log();

// Test insertAfterNode
const listForInsertAfterNode = new LinkedList();
listForInsertAfterNode.addFirst("A");
listForInsertAfterNode.addLast("C");
listForInsertAfterNode.addLast("E");

console.log("Test insertAfterNode:");
console.log("Original list:");
listForInsertAfterNode.printList();

console.log("After inserting after 'A':");
listForInsertAfterNode.insertAfterNode(listForInsertAfterNode.head, "B");
listForInsertAfterNode.printList();
console.log();

console.log("After inserting after 'C':");
listForInsertAfterNode.insertAfterNode(listForInsertAfterNode.head.next.next, "D");
listForInsertAfterNode.printList();
console.log();

console.log("After inserting after 'E':");
listForInsertAfterNode.insertAfterNode(listForInsertAfterNode.tail, "F");
listForInsertAfterNode.printList();
console.log();

// Test swapNodes
const listForSwapNodes = new LinkedList();
listForSwapNodes.addLast("A");
listForSwapNodes.addLast("B");
listForSwapNodes.addLast("C");

console.log("Test swapNodes:");
console.log("Original list:");
listForSwapNodes.printList();

console.log("After swapping A and C:");
listForSwapNodes.swapNodes(listForSwapNodes.head, listForSwapNodes.tail);
listForSwapNodes.printList(); // C, B, A
console.log();


console.log("After swapping C and B:");
listForSwapNodes.swapNodes(listForSwapNodes.head, listForSwapNodes.head.next);
listForSwapNodes.printList(); // B, C, A
console.log();

console.log("After swapping C and A:");
listForSwapNodes.swapNodes(listForSwapNodes.head.next, listForSwapNodes.tail);
listForSwapNodes.printList(); // B, A, C
console.log();
*/

// Test nodeAt specific index
const list = new LinkedList();

list.addFirst("A");
list.addLast("B");
list.addLast("C");
list.addLast("D");
list.addLast("E");

console.log("Testing nodeAt:");

// Test valid index
console.log("Node at index 0: ", list.nodeAt(0).data);
console.log("Node at index 2: ", list.nodeAt(2).data);
console.log("Node at index 4: ", list.nodeAt(4).data);

console.log();

// Test with invalid index
console.log("Node at index -1: ", list.nodeAt(-1));
console.log("Node at index 5: ", list.nodeAt(5));

console.log();

console.log("Print the list:");
list.printList();


