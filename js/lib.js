GameLib = {
  random: function(max){
    return Math.floor(Math.random() * max);
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
      var tile = emptyMap[this.random(mapSize * mapSize - currDataMap.length - i)];
      tile.value = this.random2or4();
      tiles.push(tile)
    }
    return tiles
  }
}