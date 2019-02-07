module.exports = class Node {
  constructor (value, children = []) {
    this.value = value || Buffer.from([])
    this.children = children
  }

  isLeaf () {
    return this.children.length === 0
  }

  getSibling () {
    if (this.parent === null) {
      throw new Error('Node has no parent')
    }

    if (this.parent.children[0].value.equals(this.value)) {
      return this.parent.children[1]
    } else {
      return this.parent.children[0]
    }
  }

  getPosition () {
    if (this.parent === null) {
      throw new Error('Node has no parent')
    }

    if (this.parent.children[0].value.equals(this.value)) {
      return 'left'
    } else {
      return 'right'
    }
  }
}
