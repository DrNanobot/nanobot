

function Agent(){
	this.name = "agent"
	this.solid = function(){
		if(this.condition()){
			return true
		}else{
			return false
		}
	}
	this.condition = function(){
		return !agentBribed && mistakes > 0
	}
	this.sprite = function(){
		if(this.condition()){
			return sprites.girlDown2
		}else{
			return sprites.blank
		}
	}
	this.update = function(){
		this.draw()
	}
	this.onTouch = function(){
		if(this.condition()){
			Agent.prototype.onTouch.call(this)
		}
	}
	this.interact = function(){
		var string = ""
		if(this.speechIndex === this.lines.length){
			string += p(BRIBE_STR)
			string += p(LEAVE_STR)
			div1.innerHTML = string
			return
		}
		string += this.name + ": "
		if(this.speechIndex < this.lines.length){
			string += this.speech()
		}
		string += p(CONTINUE_STR)
		string += p(BRIBE_STR)
		div1.innerHTML = string
		if(this.speechIndex < this.lines.length){	
			this.speechIndex++
		}
	}
	this.choose = function(string){
		if(string === CONTINUE_STR){
			this.interact()
		}else if (string === BRIBE_STR){
			this.bribe()
		}else if(string === LEAVE_STR){
			this.leave()
		}
	}
	this.speechIndex = 0
	this.lines = [
		"Hello. My name is Agent Slater. We know what you're up to. We just can't prove it yet.",
		"You'll get nervous and screw up before long. Your kind always do. Young, too smart for your own good, over confident... ",
		"You're going to do some serious time. You could do life."
	]
	this.speech = function(){
		var string = ""
		string += this.lines[this.speechIndex]
		return string
	}
	this.bribe = function(){
		var string = ""
		if(money >= BRIBE_AMT){
			string += BRIBE_WIN_STR
			agentBribed = 1
			money -= BRIBE_AMT
			updateMenu()
		}else{
			string += BRIBE_FAIL_STR
		}
		string += p(LEAVE_STR)
		div1.innerHTML = string
	}
	agent = this
}

Agent.prototype = new TouchTile

function Robot(){
	this.spd = .02
	this.height = 2
	this.name = "robot"
	this.condition = function(){
		return raid
	}
	this.animRate = 10
	this.spriteIndex = 0
	this.updateSpriteIndex = function(){
		if(this.condition() && frame % this.animRate === 0){
			if(this.spriteIndex < this.sprites[this.way].length-1){
				this.spriteIndex++
			}else{
				this.spriteIndex = 0
			}
		}
	}
	this.sprites = {
		up:[sprites.robotUp1, sprites.robotUp2, sprites.robotUp3],
		down:[sprites.robotDown1, sprites.robotDown2, sprites.robotDown3]
	}
	this.way = "down"
	this.sprite = function(){
		if(!this.condition()){
			return sprites.blank
		}else{
			return this.sprites[this.way][this.spriteIndex]
		}
	}
	this.point = function(){
		if(player.x < this.x){
			this.vx = -1
		}else{
			this.vx = 1
		}
		if(player.y < this.y){
			this.vy = -1
			this.way = "up"
		}else{
			this.vy = 1
			this.way = "down"
		}
	}
	this.update = function(){
		if(!this.condition()){
			return
		}
		this.point()
		this.move()
		this.updateSpriteIndex()
		this.draw()
	}
	this.onTouch = function(){
		if(this.condition()){
			player.mapIndex = 3
			new NanoZone()
			player.x = parseInt(nanozone.width/2)
			player.y = parseInt(nanozone.height/2)
			raid = 0
		}
	}
}

Robot.prototype = new Agent

function Court(){
	this.speechIndex = 0
	this.interact = function(){
		var string = ""
		if(this.speechIndex < this.lines.length){
			string += this.lines[this.speechIndex]()
		}else{
			string += COURT_CREDITS_STR
		}
		div1.innerHTML = string
		this.speechIndex++
	}
	this.lines = [
			function(){
				var string = ""
				string += "The offender has been accused of a breach of cyber crime statute 987656787654567876567876765567."
				string += p(CONTINUE_STR)
				return string
			},
			function(){
				var string = ""
				string += "How does the offender plea?"
				string += p("guilty")
				string += p("not guilty")
				string += p("insanity")
				return string
			},
			function(){
				var string = ""
				string += "A plea of "+court.plea+" has been entered into record."
				string += p(CONTINUE_STR)
				return string
			},
			function(){
				var string = ""
				if(offenses === 1){
					string += "Since this is the offender's first offense, "
				}else{
					string += "Since the offender is a repeat offender, "
				}
				if(this.plea === "insanity"){
					string += "and the offender's mental health is in question, "
				}
				string += "the offender is to be fined $"+money
				if(offenses > 1 || this.plea === "insanity"){
					string += " and committed for mental health evaluation."
					nurse = true
				}else{
					string += " and released on his own recognizance."
				}
				string += p(CONTINUE_STR)
				return string
			},
			function(){
				money = 0
				updateMenu()
				var string = ""
				string += COURT_CREDITS_STR
				if(offenses > 1 || this.plea === "insanity"){
					string += p(ENTER_INSTITUTION_STR)
				}else{
					string += p(HOME_STR)
				}
				return string
			}
	]
	this.sendHome = function(){
		player.mapIndex = 0
		new NanoZone()
		player.x = 5
		player.y = 5
		unpause()
	}
	this.institutionalize = function(){
		player.mapIndex = 4
		new NanoZone()
		player.x = 5
		player.y = 5
		unpause()
	}
	this.plea = false
	this.choose = function(string){
		if(string === CONTINUE_STR){
			this.interact()
		}else if(string === HOME_STR){
			this.sendHome()
		}else if(string === "guilty" || string === "not guilty" || string === "insanity"){
			this.plea = string
			this.interact()
		}else if(string === ENTER_INSTITUTION_STR){
			this.institutionalize()
		}
	}
	this.update = function(){
		if(!paused){
			pause()
			player.touching = this
			offenses++
			updateMenu()
			this.interact()
		}
	}
	court = this
}

Court.prototype = new TouchTile

function Robot2(){
	this.height = 2
	this.name = "nurse"
	this.sprites = {
		up:[sprites.robot2Up1, sprites.robot2Up2, sprites.robot2Up3],
		down:[sprites.robot2Down1, sprites.robot2Down2, sprites.robot2Down3]
	}
	this.sprite = function(){
		return sprites.robot2Down2
	}
	this.onTouch = function(){
		div1.innerHTML = INTERACT_STR + this.name
		player.touching = this
	}
	this.sendHome = function(){
		player.touching = false
		player.mapIndex = 0
		new NanoZone()
		player.x = parseInt(nanozone.width/2)
		player.y = parseInt(nanozone.height/2)
		unpause()
		div1.innerHTML = ""
	}
	this.speechIndex = 0
	this.yesCount = 0
	this.noCount = 0
	this.interact = function(){
		var string = ""
		string += this.name + ": "
		string += this.speak()
		if(this.speechIndex === 0 || this.speechIndex === 1 || this.speechIndex >=6){
			string += p(CONTINUE_STR)
		}else if(this.speechIndex < 6){
			string += this.options()
		}
		div1.innerHTML = string
		this.speechIndex++
	}
	this.speak = function(){
		if(this.speechIndex < this.lines.length){
			return this.lines[this.speechIndex]
		}else if(this.speechIndex < 6){
			var index = this.speechIndex - this.lines.length 
			return CRITERIA[index]
		}else if(this.speechIndex === 6){
			diagnosis = this.yesCount
			return DIAGNOSES[this.yesCount]
		}else if(this.speechIndex > 6){
			return this.prescribe()
		}
	}
	this.prescribe = function(){
		var string = ""
		var drugIndex = this.yesCount
		string += PRESCRIBE_STR+DRUGS[drugIndex]+"."
		return string
	}
	this.lines = [
		NURSE_GREET_STR,
		NURSE_TEST_INTRO_STR,
	]
	this.options = function(){
		var string = ""
		string += p(YES_STR)
		string += p(NO_STR)
		return string
	}
	this.choose = function(string){
		if(string === YES_STR){
			this.yesCount++
			this.interact()
		}else if(string === NO_STR){
			this.interact()
		}else if(string === CONTINUE_STR){
			if(this.speechIndex === 8){
				this.sendHome()
				return
			}
			this.interact()
		}
	}
	this.update = function(){
		this.draw()
	}
}

Robot2.prototype = new Tile

function Addict(){
	this.name = "addict"
	this.sprite = function(){
		return sprites.greenDown2
	}
	this.interact = function(){
		var string = ""
		string += this.name + ": "
		string += this.speak()+"<br>"
		string += this.options()
		div1.innerHTML = string
	}
	this.speak = function(){
		var string = ""
		string += "I've always hated everything except getting high. I'm always looking for a new thrill."
		return string 
	}
	this.sellString = function(){
		var string = ""
		string += "sell "+DRUGS[diagnosis]+" for "+this.offer()
		return string
	}
	this.options = function(){
		var string = ""
		if(pillCount > 0){
			string += p(this.sellString())
		}
		string += p(LEAVE_STR)
		return string
	}
	this.choose = function(string){
		if(string === LEAVE_STR){
			this.leave()
		}else if(string === this.sellString()){
			this.buy()
		}
	}
	this.offer = function(){
		return PILL_VALUE
	}
	this.buy = function(){
		pillCount--
		money += this.offer()
		updateMenu()
		this.interact()
	}
}

Addict.prototype = new TouchTile

function Nurse(){
	this.name = "auto nurse"
	this.sprite = function(){
		if(this.condition()){
			return sprites.robot2Right2
		}else{
			return sprites.blank
		}
	}
	this.condition = function(){
		return nurse
	}
	this.height = 2
	this.administer = function(){
		var string = ""
		if(money >= PILL_COST){
			string += PILL_DUE_STR
			pillCount++
			money -= PILL_COST
			updateMenu()
		}else{
			string += NO_PILL_DUE_STR
		}
		return string
	}
	this.interact = function(){
		var string = ""
		string += this.administer()
		string += p(LEAVE_STR)
		div1.innerHTML = string
	}
	nurseOb = this
}

Nurse.prototype = new Agent