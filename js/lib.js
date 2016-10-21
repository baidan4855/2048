GameLib = {
  random: function(max){
    return Math.floor(Math.random() * max * 100) % max;
  },
  random2or4: function(){
    return Math.random() < 0.8 ? 2 : 4;
  },
  createDataMap: function(size){
    var map = this.createEmptyMap(size);
    var newTiles = this.createTile(size, map, size);
    newTiles.forEach(function(tile){
      map[tile.x][tile.y] = tile.value
    })
    return map;
  },
  createEmptyMap: function(size){
    var map = [];
    for(var x=0; x<size; x++){
      var mapx = [];
      for(var y=0; y<size; y++){
        mapx.push(null)
      }
      map.push(mapx)
    }
    return map
  },
  createTile: function(mapSize, currDataMap, number){
    var tiles = [];
    var emptyMap = [];
    currDataMap.forEach(function(row, x){
      row.forEach(function(cell, y){
        if(!cell)
          emptyMap.push({x: x, y: y});
      })
    })
    for(var i = 0; i < number; i++){
      var randomIndex = this.random(emptyMap.length - i)
      var tile = emptyMap[randomIndex];
      emptyMap.splice(randomIndex, 1);
      tile.value = this.random2or4();
      tiles.push(tile)
    }
    return tiles
  },
  listenKeyDown: function(callback){
    document.addEventListener('keydown', function(e){
      const keyMap = {
        38: 'up', 39: 'right', 40: 'down', 37: 'left',
        87: 'up', 68: 'right', 83: 'down', 65: 'left'
      };
      if (keyMap[e.which] !== undefined)
       callback(keyMap[e.which])
    })
  },
  moveTiles: function(map, direction){
    var directionMap = {
      up:   { x: 0,  y: -1 },
      right:{ x: 1,  y: 0  },
      down: { x: 0,  y: 1  },
      left: { x: -1, y: 0  }
    }
    var dirVector = directionMap[direction]
    var size = map.length;
    var letProcessSimple = {x: [], y: []};
    for(var i=0; i<size; i++){
      letProcessSimple.x.push(i);
      letProcessSimple.y.push(i);
    }
    dirVector.x===1 && letProcessSimple.x.reverse();
    dirVector.y===1 && letProcessSimple.y.reverse();

    var newMap = [];
    for(var x=0; x<size; x++){
      newMap.push([])
      for(var y=0; y<size; y++){
        newMap[x].push(map[letProcessSimple.x[x]][letProcessSimple.y[y]])
      }
    }
    
    return newMap
  }
}
