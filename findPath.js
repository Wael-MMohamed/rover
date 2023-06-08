const { isObstacle } = require('./obstacles')

function adjList(node) {
  const x = node[0]
  const y = node[1]
  return [[ x + 1, y],[x, y + 1],[x - 1, y],[x, y - 1]]
}

function findPath(arr, end) {
  const path = []
  let index = arr.findIndex(ele => ele.node[0] == end[0] && ele.node[1] == end[1])
  while(index > 0){
    path.push(arr[index].node)
    index = arr[index].parent
  }
  return path.reverse()
}

function bfs(start, end) {
  let parent = []
  let que = []
  let visited = []
  que.push(start)
  parent.push({node: start, parent: 0})
  while(que.length > 0 ) {
    const current = que.shift()
    if(current[0] == end[0] && current[1] == end[1]){
      break;
    }
    visited.push(current)
    
      const adj = adjList(current)
      
      adj.forEach(node => {
        if(visited.find(ele => ele[0] == node[0] && ele[1] == node[1]) == undefined && 
          !isObstacle(node[0], node[1]) && 
          que.find(ele => ele[0] == node[0] && ele[1] == node[1]) == undefined ) {
          que.push(node)
          const index = parent.findIndex(ele => ele.node[0] === current[0] && ele.node[1] == current[1])
          if(parent.find(ele => ele.node[0] == node[0] && ele.node[1] == node[1]) == undefined ) parent.push({node, parent: index})
        }
      })
  }
  
  return findPath(parent, end)
}

module.exports = {bfs}