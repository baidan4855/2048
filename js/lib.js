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
      down: { x: 0,  y: 1  },
      left: { x: -1, y: 0  },
      right:{ x: 1,  y: 0  }
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

    var draftMap = [];
    for(var x=0; x<size; x++){
      draftMap.push([])
      for(var y=0; y<size; y++){
        draftMap[x].push({
          origPosition: {
            x: x,
            y: y
          },
          value: map[letProcessSimple.x[x]][letProcessSimple.y[y]]
        })
      }
    }
    var moveTile = function(x,y){
      if(!draftMap[x][y].value)
        return;
      for(var index=x,frontIndex=x-1; index>0; index--,frontIndex--){
        if(!draftMap[frontIndex][y].value){
          draftMap[x][y].toPosition = draftMap[frontIndex][y].origPosition
        }

        if(frontIndex==0){
          draftMap[x][y].cantMove = true;
        }


        if(draftMap[frontIndex][y].value && draftMap[frontIndex][y].value===draftMap[x][y].value){
          draftMap[x][y].toPosition = draftMap[frontIndex][y].origPosition;
          draftMap[x][y].newValue *= 2;
          draftMap[x][y].cantMove = true;
          draftMap[x][y].cantPlus = true;
        }
      }
    }
    if(dirVector.x !== 0){
      for(var col = 0; col < size; col++){
        for(var row = 1; row < size; row++){
          draftMap[col][row] = 'TODO'
        }
      }
    }
    return draftMap
  },

}
