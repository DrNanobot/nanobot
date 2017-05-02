function Tile(){
	this.solid = function(){
		return true
	}
	this.getX = function(){
		return this.x * tile - view.x() * tile
	}
	this.getT = function(){
		return this.getY()
	}
	this.getL = function(){
		return this.getX()
	}
	this.getY = function(){
		return this.y * tile - view.y() * tile
	}
	this.height = this.width = 1
	this.getH = function(){
		return this.height * tile
	}
	this.getW = function(){
		return this.width * tile
	}
	this.getR = function(){
		return this.getX() + this.getW()
	}
	this.getB = function(){
		return this.getY() + this.getH()
	}
	this.update = function(){
		this.draw()
	}
	this.draw = function(){
		this.sprite().draw(this.getX(), this.getY(), this.getW(), this.getH())
	}
	this.penetrates = function(object){
		var left = object.getR() > this.getL()
		var right = this.getR() > object.getL()
		var up = object.getB() > this.getT()
		var down = this.getB() > object.getT()
		return left && right && up && down
	}
	this.touches = function(object){
		var left = object.getR() >= this.getL()
		var right = this.getR() >= object.getL()
		var up = object.getB() >= this.getT()
		var down = this.getB() >= object.getT()
		return left && right && up && down
	}
	this.handlePenetration = function(object){
		var left = object.getR() - this.getL()
		var right = this.getR() - object.getL()
		var up = object.getB() - this.getT()
		var down = this.getB() - object.getT()
		var min = Math.min(left, right, up, down)
		if(min === left){
			this.x += left / tile
		}else if(min === right){
			this.x -= right / tile
		}else if(min === up){
			this.y += up / tile
		}else if(min === down){
			this.y -= down / tile
		}
	}
	this.offNanoZone = function(){
		return this.x < 0 || this.x > nanozone.width-1 || this.y < 0 || this.y > nanozone.height-1 
	}
	this.handleOffNanoZone = function(){
		if(this.x < 0){
			this.x = nanozone.width-1
		}
		if(this.x > nanozone.width-1){
			this.x = 0
		}
		if(this.y < 0){
			this.y = nanozone.height-1
		}
		if(this.y > nanozone.height-1){
			this.y = 0
		}
		
	}
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
			if(this.penetrates(object) && object.solid()){
				this.handlePenetration(object)
			}
		}
	}
	this.move = function(){
		this.x += this.vx * this.spd
		this.y += this.vy * this.spd
	}
	this.update = function(){
		this.draw()
	}
	this.div1Text = function(){
		return this.name
	}
}

function Floor(){
	this.solid = function(){
		return false
	}
	this.sprite = function(){
		return sprites.blank
	}
	
}

Floor.prototype = new Tile

function Wall(){
	this.sprite = function(){
		return sprites.wall
	}
}

Wall.prototype = new Tile


function TouchTile(){
	this.onTouch = function(){
		if(!this.solid() || raid){
			return
		}
		div1.innerHTML = INTERACT_STR + this.name
		player.touching = this
	}
	this.leave = function(){
		unpause()
		player.touching = false
		div1.innerHTML = ""
	}
	this.interact = function(){
		var string = ""
		string += this.name + ": "
		string += this.options()
		div1.innerHTML = string
	}
}

TouchTile.prototype = new Tile

function FalseDoor(){
	this.name = "door"
	this.sprite = function(){
		return sprites.door
	}
	this.getT = function(){
		return this.getY() + this.getH() / 2
	}
	this.height = 2
}

FalseDoor.prototype = new Tile

function FalseDoor2(){
	this.name = "door"
	this.sprite = function(){
		return sprites.door2
	}
}

FalseDoor2.prototype = new FalseDoor

function HornSign(){
	this.name = "horn sign"
	this.draw = function(){
		sprites.wall2.draw(this.getX(), this.getY(), this.getW(), this.getH())
		sprites.horns.draw(this.getX(), this.getY(), this.getW(), this.getH())
		sprites.beer.draw(this.getX()+tile/5, this.getY()+tile/4, this.getW()*.6, this.getH())
	}
}

HornSign.prototype = new Tile

function Door(){
	this.name = "door"
	this.sprite = function(){
		return sprites.door
	}
	this.height = 2
	this.options = function(){
		var string = ""
		string += this.unlockedStrings()
		string += p(BACK_STR)
		return string
	}
	this.unlockedStrings = function(){
		var string = ""
		var length = quests < DESTINATIONS.length ? quests : DESTINATIONS.length
		for(var i = 0; i < length; i++){
			string += p(DESTINATIONS[i])
		}
		if(length === 0){
			string += "You have nowhere to go right now."
		}
		return string
	}
	this.choose = function(string){
		var text = ""
		if(string === BACK_STR){
			this.leave()
			return
		}
		for(var i = 0; i < DESTINATIONS.length; i++){
			var destination = DESTINATIONS[i]
			if(string === destination){
				text += this.go(i+1)
				return
			}
		}
		text += p(BACK_STR)
		div1.innerHTML = text
		updateMenu()
		
	}
	this.go = function(index){
		player.touching = false
		div1.innerHTML = ""
		player.mapIndex = index
		new NanoZone()
		player.y = nanozone.height -3
		unpause()
	}
}

Door.prototype = new TouchTile

function Door2(){
	this.getT = function(){
		return this.getY() + this.getH() / 2
	}
	this.onTouch = function(){
		player.mapIndex = 0
		new NanoZone()
		player.x = nanozone.width/2
		player.y = 2
		if(agent.speechIndex === agent.lines.length){
			agentOutside = false
		}
	}
	this.height = 2
	
}

Door2.prototype = new Door

function ToStreet(){
	this.sprite = function(){
		return sprites.blank
	}
	this.onPenetrate = function(){
		player.mapIndex = 2
		new NanoZone()
		player.x = nanozone.width - 2
	}
}

ToStreet.prototype = new Tile

function ToHall(){
	this.sprite = function(){
		return sprites.blank
	}
	this.onPenetrate = function(){
		player.mapIndex = 1
		new NanoZone()
		player.x = 1
	}
}

ToHall.prototype = new Tile

function Wall2(){
	this.sprite = function(){
		return sprites.wall2
	}
}

Wall2.prototype = new Tile

function Bed(){
	this.name = "bed"
	this.sprite = function(){return sprites.bed}
	this.height = this.width = 2
	this.getT = function(){
		return this.getY() + tile / 4
	}
	this.interact = function(){
		var string = ""
		string += this.name + ": "
		string += this.relevantInfo()
		string += this.options()
		div1.innerHTML = string
	}
	this.relevantInfo = function(){
		var string = ""
		if(weariness === 0){
			string += CLEAR_STR
		}else if(weariness >= MAX_WEARINESS){
			string += WEARY_STR
		}else{
			string += SLEEP_OPTIONAL
		}
		return string
	}
	this.options = function(){
		var string = ""
		if(weariness > 0){
			string += p(SLEEP)
		}
		string += p(LEAVE_STR)
		return string
	}
	this.choose = function(string){
		if(string === LEAVE_STR){
			this.leave()
		}else if(string === SLEEP){
			this.sleep()
		}
	}
	this.sleep = function(){
		nurseOb.pillDue = 1
		weariness = 0
		updateMenu()
		var string = ""
		string += SLEEP_RESULT
		string += this.options()
		div1.innerHTML = string
	}
}

Bed.prototype = new TouchTile

function Kitchen(){
	this.name = "kitchen"
	this.height = 1.5
	this.width = 3
	this.touch = function(){
		player.touching = this
	}
	this.sprite = function(){
		return sprites.kitchen
	}
	this.draw = function(){
		this.sprite().draw(this.getX(), this.getY() - tile *.75, this.getW(), this.getH())
	}
	this.getB = function(){
		return this.getY() + this.getH() / 2
	}
}

Kitchen.prototype = new Tile

function Couch(){
	this.name = "couch"
	this.height = 3
	this.width = 1
	this.sprite = function(){
		return sprites.couch
	}
}

Couch.prototype = new Tile

function Flag(){
	this.sprite = function(){
		if(hackSkill < FLAG_VISIBLE){
			return sprites.wall
		}else{
			return sprites.flag	
		}
	}
}

Flag.prototype = new Tile

function Wall3(){
	this.sprite = function(){
		return sprites.wall3
	}
}

Wall3.prototype = new Tile

function BarDoor(){
	this.onTouch = function(){
		player.mapIndex = 5
		new NanoZone()
		player.x = parseInt(nanozone.width/2)
		player.y = nanozone.height - 2
	}
}

BarDoor.prototype = new Door2

function DoorToStreet(){
	this.onTouch = function(){
		player.mapIndex = 2
		new NanoZone()
		player.x = 5
		player.y = 3
	}
	
}

DoorToStreet.prototype = new Door2

function PoolTable(){
	this.sprite = function(){
		return sprites.poolTable
	}
	this.height = 2
	this.width = 1.5
	
}

PoolTable.prototype = new Tile