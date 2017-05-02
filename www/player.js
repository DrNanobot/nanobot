
function Player(){
	this.x = PLAYER_START_X
	this.y = PLAYER_START_Y
	this.spriteIndex = 0
	this.animRate = 10
	this.moving = function(){
		return leftKey || upKey || rightKey || downKey
	}
	this.getT = function(){
		return this.getY() + tile / 2
	}
	this.updateSpriteIndex = function(){
		if(frame % this.animRate !== 0 || !this.moving()){
			return
		}
		if(this.spriteIndex < this.sprites[this.way].length-1){
			this.spriteIndex ++
		}else{
			this.spriteIndex = 0
		}
	}
	this.sprites = {
		left:[sprites.playerLeft1, sprites.playerLeft2, sprites.playerLeft3],
		right:[sprites.playerRight1, sprites.playerRight2, sprites.playerRight3],
		up:[sprites.playerUp1, sprites.playerUp2, sprites.playerUp3],
		down:[sprites.playerDown1, sprites.playerDown2, sprites.playerDown3],
	}
	this.way = "down"
	this.sprite = function(){return this.sprites[this.way][this.spriteIndex]}
	this.vx = this.vy = 0
	this.draw = function(){
		this.sprite().draw(this.getX(), this.getY(), this.getW(), this.getH())
	}
	this.mapIndex = PLAYER_START_ROOM
	this.point = function(){
		this.vx = this.vy = 0
		if(leftKey){
			this.way = "left"
			this.vx = -1
		}else if(rightKey){
			this.way = "right"
			this.vx = 1
		}
		if(upKey){
			this.way = "up"
			this.vy = -1
		}else if(downKey){
			this.way = "down"
			this.vy = 1
		}
	}
	this.spd = .1
	this.collides = function(){
		if(this.offNanoZone()){
			this.handleOffNanoZone()
		}
		var contents = nanozone.contents
		for(var i = 0; i < contents.length; i++){
			var object = contents[i]
			if(object === this){
				continue
			}
			if(this.touches(object) && object.onTouch){
				object.onTouch()
			}
			if(this.penetrates(object) && object.onPenetrate){
				object.onPenetrate()
			}
		}
		for(var i = 0; i < contents.length; i++){
			var object = contents[i]
			if(object === this){
				continue
			}
			if(this.penetrates(object) && object.solid()){
				this.handlePenetration(object)
			}
		}
	}
	this.update = function(){
		this.point()
		this.move()
		this.collides()
		this.updateSpriteIndex()
		this.draw()
	}
	player = this
}

Player.prototype = new Tile