
function View(){
	this.grid = VIEW_GRID
	this.x = function(){
		return player.x - parseInt(this.grid/2)
	}
	this.y = function(){
		return player.y - parseInt(this.grid/2)
	}
	this.update = function(){
		var contents = nanozone.contents
		contents.sort(function(a, b) {
			return parseFloat(a.y) - parseFloat(b.y) 
		});
		contents.sort(function(a, b) {
			return parseFloat(a.z) - parseFloat(b.z) 
		});
		for(var i = 0; i < contents.length; i++){
			var ob = contents[i]
			if(ob.update && ob.x+ob.width > this.x() && ob.x < this.x() + this.grid && ob.y+ob.height > this.y() && ob.y < this.y() + this.grid){
				ob.update()
			}
		}
		this.drawOffNanoZone()
	}
	this.drawOffNanoZone = function(){
		ctx.fillStyle = "#444"
		if(this.x() < 0){
			ctx.fillRect(0, 0, -this.x()*tile, cvs.height)
		}
		if(this.y() < 0){
			ctx.fillRect(0, 0, cvs.width, -this.y() * tile)
		}
		if(this.x() > nanozone.width - this.x() - player.x * tile){
			
			ctx.fillRect((nanozone.width - this.x())*tile, 0, this.grid*tile, this.grid*tile)
			
		}if(this.y() > nanozone.height - this.y() - player.y*tile){
			
			ctx.fillRect(0, (nanozone.height - this.y())*tile, this.grid*tile, this.grid*tile)
			
		}
	}
	view = this
}

maps = []
maps[0] = []
maps[0] =
	[
		[1, 1, 1, 1, 1, 2, 1, 1, 1, 8, 1,],
		[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,],
		[1, 6, 0, 0, 0, 16, 0, 5, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 24, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	]
maps[1] =
	[
		[1, 1, 1, 1, 1, 10, 1, 1, 1, 1, 1, 1, 1, 10, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
		[11, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[11, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
	]
maps[2] =
	[
		[13, 13, 13, 13, 13, 20, 13, 15, 13, 13, 13, 13, 13, 14, 13, 13, 13, 13, 13],
		[13, 13, 13, 13, 13, 0, 13, 13, 13, 13, 13, 13, 13, 0, 13, 13, 13, 13, 13],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
		[0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 12],
		[13, 13, 13, 13, 13, 0, 13, 13, 13, 13, 13, 13, 13, 0, 13, 13, 13, 13, 13, 13, 13],
	]
maps[3] =
	[
		[13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,],
		[13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,],
		[13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
		[13, 0, 17, 0, 0, 0, 0, 0, 0, 0, 13],
		[13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
		[13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
		[13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
		[13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
		[13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
		[13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
		[13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
	]
maps[4] = 
	[
		[18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
		[18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
		[18, 19, 0, 0, 0, 0, 0, 0, 0, 0, 18],
		[18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18],
		[18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18],
		[18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18],
		[18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18],
		[18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18],
		[18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18],
		[18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
		
	]
	
maps[5] =
	[
		[13, 13, 13, 13, 13, 13, 13, 13, 15, 13, 13, 13, 13, 13, 13, 13, 13],
		[13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
		[13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 13],
		[13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
		[13, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 13],
		[13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
		[13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
		[13, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 13],
		[13, 13, 13, 13, 13, 13, 13, 13, 0, 13, 13, 13, 13, 13, 13, 13, 13, 13],
	]
function NanoZone(){
	this.contents = []
	this.map = maps[player.mapIndex]
	this.height = this.map.length
	this.width = this.map[0].length
	for(var i = 0; i < this.map.length; i++){
		for(var j = 0; j < this.map[i].length; j++){
			var object = entities[this.map[i][j]]
			object = new object()
			object.x = j
			object.y = i
			object.id = generateID()
			this.contents.push(object)
		}
	}
	this.spliceID = function(id){
		var contents = nanozone.contents
		for(var i = 0; i < contents.length; i++){
			var ob = contents[i]
			if(ob.id === id){
				contents.splice(i, 1)
				return
			}
		}
	}

	nanozone = this
}