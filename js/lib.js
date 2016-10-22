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
    var cantMove = true
    var directionMap = {
      up:   { x: 0,  y: -1 },
      down: { x: 0,  y: 1  },
      left: { x: -1, y: 0  },
      right:{ x: 1,  y: 0  }
    }
    var dirVector = directionMap[direction]
    var size = map.length;
    var newMap = this.createEmptyMap(size);
    var letProcessSimple = {x: [], y: []};
    for(var i=0; i<size; i++){
      letProcessSimple.x.push(i);
      letProcessSimple.y.push(i);
    }
    dirVector.x===1 && letProcessSimple.x.reverse();
    dirVector.y===1 && letProcessSimple.y.reverse();

    for(var x=0;x<size;x++){
      for(var y=0;y<size;y++){
        var realx=letProcessSimple.x[x], realy=letProcessSimple.y[y];
        var currValue = map[realx][realy];
        newMap[realx][realy]=currValue;

        for(var frontx=realx+dirVector.x, fronty=realy+dirVector.y;
          frontx>=0 && frontx<size && fronty>=0 && fronty<size;
          frontx+=dirVector.x, fronty+=dirVector.y
        ){
          var frontValue = newMap[frontx][fronty];
          console.log('currLo:',realx,realy,'frontLoc:',frontx,fronty)
          console.log('currValue:',currValue,'front:',frontValue)
          if(!currValue || frontValue < 0 || (currValue && frontValue && currValue !== frontValue))
            continue;
          else{
            cantMove && (cantMove = false);
            newMap[frontx][fronty] = currValue * ((currValue === frontValue)?2:1);
            newMap[frontx-dirVector.x][fronty-dirVector.y] = null;
          }
        }
      }
    }

    if(!cantMove)
      return newMap





    //
    //
    // var letProcessSimple = {x: [], y: []};
    // for(var i=0; i<size; i++){
    //   letProcessSimple.x.push(i);
    //   letProcessSimple.y.push(i);
    // }
    // dirVector.x===1 && letProcessSimple.x.reverse();
    // dirVector.y===1 && letProcessSimple.y.reverse();
    //
    // var draftMap = [], newMap=[];
    // for(var x=0;x<size;x++){
    //   draftMap.push([])
    //   newMap.push([])
    //   for(var y=0;y<size;y++){
    //     newMap[x].push(null)
    //     draftMap[x].push({
    //       origPosition: {
    //         x: x,
    //         y: y
    //       },
    //       value: map[letProcessSimple.x[x]][letProcessSimple.y[y]]
    //     })
    //   }
    // }
    //
    // for(var x = 0; x < size; x++){
    //   for(var y = 0; y < size; y++){
    //     if(!draftMap[x][y].value)
    //       continue;
    //     if(y == 0){
    //       if(draftMap[x][y].value){
    //         draftMap[x][y].toPosition = draftMap[x][y].origPosition
    //       }
    //       continue;
    //     }
    //     for(var index=y,frontIndex=y-1; index >0; index--,frontIndex--){
    //       if(draftMap[x][y].value && !draftMap[x][frontIndex].value){
    //         draftMap[x][y].toPosition = draftMap[x][frontIndex].origPosition
    //         draftMap[x][frontIndex].value = null;
    //         var tmp = draftMap[x][y];
    //         draftMap[x][y] = draftMap[x][frontIndex];
    //         draftMap[x][frontIndex] = tmp;
    //         console.log('move', draftMap[x][frontIndex].origPosition, 'to', draftMap[x][frontIndex].toPosition)
    //       }
    //
    //       if(draftMap[x][frontIndex].value && draftMap[x][frontIndex].value===draftMap[x][y].value && !draftMap[x][frontIndex].plusTimes){
    //         draftMap[x][y].toPosition = draftMap[x][frontIndex].origPosition;
    //         draftMap[x][y].newValue *= 2;
    //         draftMap[x][y].plusTimes = 1;
    //         draftMap[x][frontIndex].value = null;
    //         var tmp = draftMap[x][y];
    //         draftMap[x][y] = draftMap[x][frontIndex];
    //         draftMap[x][frontIndex] = draftMap[x][y];
    //         console.log('move&plus', draftMap[x][frontIndex].origPosition, 'to', draftMap[x][frontIndex].toPosition)
    //         break;
    //       }
    //     }
    //
    //   }
    // }
    // return draftMap
  }

}
