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
        38: 0, 39: 1, 40: 2, 37: 3,
        87: 0, 68: 1, 83: 2, 65: 3
      };
      directionMap = [
        { x: 0,  y: -1 },
        { x: 1,  y: 0  },
        { x: 0,  y: 1  },
        { x: -1, y: 0  }
      ]
      if (keyMap[e.which] !== undefined)
       callback(directionMap[keyMap[e.which]])
    })
  },
  moveTiles: function(map, direction){

  }
}
