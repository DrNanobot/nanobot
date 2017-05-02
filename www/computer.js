
function Computer(){
	this.name = "computer"
	this.height = 1
	this.width = 3
	this.sprites = [sprites.desk, sprites.computer]
	this.draw = function(){
		this.sprites[0].draw(this.getX(), this.getY()-tile/2, this.getW(), this.getH() + tile / 3)
		this.sprites[1].draw(this.getX()+tile/2, this.getY()-tile, this.getW()/2, this.getH())
	}
	this.getB = function(){
		return this.getY() + this.getH() / 2
	}
	
	this.interact = function(){
		var string = ""
		string += this.name + ": "
		string += this.relevantInfo()
		string += this.options()
		div1.innerHTML = string
	}
	this.options = function(){
		var string = ""
		string += this.unlockedStrings()
		string += p(LEAVE_STR)
		return string
	}
	this.unlockedStrings = function(){
		var string = ""
		var length = hackSkill < ACHIEVEMENTS.length ? hackSkill + 1 : ACHIEVEMENTS.length
		for(var i = 0; i < length; i++){
			string += p(ACHIEVEMENTS[i])
		}
		if(offenses > 0 && hackSkill > ACHIEVEMENTS.length-1){
			string += p(HACK_THE_MAN_STR)
		}
		return string
	}
	this.relevantInfo = function(){
		var string = ""
		if(weariness >= MAX_WEARINESS){
			string += WEARY_STR
		}else{
			string += CLEAR_STR
		}
		return string
	}
	this.choose = function(string){
		var text = ""
		if(string === LEAVE_STR){
			this.leave()
			return
		}else if(string === BACK_STR){
			this.interact()
			return
		}else if(string === HACK_THE_MAN_STR){
			manHacked = 1
			text += this.hackTheMan()
		}
		for(var i = 0; i < ACHIEVEMENTS.length; i++){
			var achievement = ACHIEVEMENTS[i]
			if(string === achievement){
				text += this.hack(i)
			}
		}
		text += p(BACK_STR)
		div1.innerHTML = text
		updateMenu()
	}
	this.hackTheMan = function(){
		var string = ""
		string += "You profusely vandalize the data of "+CORP_NAME
		string += ". That should set them straight with their automated court system."
		return string
	}
	this.pay = function(index){
		money += hackSkill * hackSkill * hackSkill * index * index * index * 100
		updateMenu()
	}
	this.hack = function(index){
		var string = ""
		if(hackSkill <= index && weariness < MAX_WEARINESS){
			string += CHALLENGING
			hackSkill++
			this.pay(index)
			weariness++
		}else if(weariness >= MAX_WEARINESS){
			string += WEARY_STR
			weariness++
			if(index !== 0 && !manHacked){
				mistakes++
			}
			if(mistakes >= MAX_MISTAKES && index !== 0 && !manHacked){
				raid = 1
				unpause()
				return
			}
		}else{
			string += EASY
			this.pay(index)
			weariness ++
		}
		return string
	}
}

Computer.prototype = new TouchTile