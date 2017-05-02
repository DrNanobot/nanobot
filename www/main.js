function main(){
	request = requestAnimationFrame(main)
	ctx.clearRect(0, 0, cvs.width, cvs.height)
	view.update()
	player.update()
	frame ++	
}

function pause(){
	paused = true
	cancelAnimationFrame(request)
	request = undefined
	updateMenu()
}

function unpause(){
	paused = false
	player.touching = false
	div1.innerHTML = ""
	updateMenu()
	main()
}

function generateID(){
	var date = new Date()
	var components = [
		date.getYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds()
	]
	return components.join("")+""+Math.random()
}

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function randomInt(min, max) {
    return Math.floor(random() * (max - min + 1)) + min;
}

function unseededRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resize(){
	cvs = document.getElementById("cvs")
	cvs.height = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth
	cvs.width = cvs.height
	ctx = cvs.getContext("2d")
	tile = cvs.height / VIEW_GRID
	cvs.style.left = ((window.innerWidth - cvs.width) / 2) + "px"
	div2.style.left = (((window.innerWidth - cvs.width) / 2) + cvs.width) +"px"
	div1.style.fontSize = tile * DIV1_FONT_SIZE + "px"
	div2.style.fontSize = tile * DIV2_FONT_SIZE + "px"
	div1.style.width = ((window.innerWidth - cvs.width) / 2) + "px"
	div2.style.width = ((window.innerWidth - cvs.width) / 2) + "px"
	if(paused){
		main()
		pause()
	}
}

function keydown(event){
	var code = event.keyCode ? event.keyCode : event.charCode
	if(code === 65 || code === 37){
		leftKey = true
		leftKeyFunc()
	}else if(code === 87 || code === 38){
		upKey = true
		upKeyFunc()
	}else if(code === 68 || code === 39){
		rightKey = true
		rightKeyFunc()
	}else if(code === 83 || code === 40){
		downKey = true
		downKeyFunc()
	}else if(code === 32 || code === 13){
		if(interactKey){
			return
		}
		interactKey = true
		choose()
		return
	}
	if(!paused){
		player.touching = false
		div1.innerHTML = ""
	}
}

function leftKeyFunc(){
	
}
function upKeyFunc(){
	chosen --
	if(chosen < 0){
		chosen = 0
	}
	highlight()
}

function rightKeyFunc(){
	
}

function downKeyFunc(){
	chosen ++
	if(chosen > ps.length-1){
		chosen = ps.length-1
	}
	highlight()
}

function highlight(){
	if(!ps[chosen]){
		return
	}
	for(var i = 0; i < ps.length; i++){
		ps[i].style.backgroundColor = "black"
	}
	ps[chosen].style.backgroundColor = "#0f0"
}

function choose(){
	if(player.touching && !ps[chosen]){
		pause()
		player.touching.interact()
	}else if(player.touching){
		var string = ps[chosen].innerHTML
		player.touching.choose(string)
	}else{
		tempMenu()
	}
	chosen = 0
	highlight()
}

function tempMenu(){
	if(raid){
		return
	}
	if(ps[chosen]){
		var string = ps[chosen].innerHTML
		if(string === UNPAUSE){
			unpause()
			div1.innerHTML = ""
			return
		}else if(string === TAKE_PILL_STR){
			pillCount--
			weariness++
			updateMenu()
		}
	}
	var string = ""
	string += "paused<br>"
	if(pillCount > 0){
		string += p(TAKE_PILL_STR)
	}
	string += p(UNPAUSE)
	div1.innerHTML = string
	updateMenu()
	pause()
}
	
function keyup(event){
	var code = event.keyCode ? event.keyCode : event.charCode
	if(code === 65 || code === 37){
		leftKey = false
	}else if(code === 87 || code === 38){
		upKey = false
	}else if(code === 68 || code === 39){
		rightKey = false
	}else if(code === 83 || code === 40){
		downKey = false
	}else if(code === 32 || code === 13){
		interactKey = false
	}
	
}

function mousedown(event){
	//event.preventDefault()
}

function updateMenu(){
	var string = ""
	string += "skill: "+hackSkill+"<br>"
	string += "weariness: "+weariness+"<br>"
	string += "$ "+money+"<br>"
	if(offenses > 0){
		string += "offenses: "+offenses+"<br>"
	}
	if(diagnosis >= 0){
		string += "diagnosis: "+DIAGNOSES[diagnosis]+"<br>"
		string += "prescription: "+DRUGS[diagnosis]+"<br>"
		string += "pills: "+pillCount+"<br>"
	}
	div2.innerHTML = string
}

function cueAudio(){
	strike = new Audio()
	strike.src = "strike.wav"
	zip = new Audio()
	zip.src = "zip.wav"
	teleportSound = new Audio()
	teleportSound.src = "teleportSound.wav"
}

function setGlobals(){
	setConstants()
	setVariables()
}

function p(string){
	return "<p>"+string+"</p>"
}

function init(){
	chosen = 0
	seed = 2
	div1 = document.getElementById("div1")
	div2 = document.getElementById("div2")
	ps = document.getElementsByTagName("p")
	leftKey = upKey = rightKey = downKey = interactKey = paused = false
	setGlobals()
	frame = 0
	sheet = new Image()
	sheet.src = "sheet.png"
	makeSprites()
	addEventListener("resize", resize)
	addEventListener("keydown", keydown)
	addEventListener("keyup", keyup)
	addEventListener("mousedown", mousedown)
	resize()
	new Player()
	new NanoZone()
	new View()
	sheet.onload = function(){main()}
	//cueAudio()
	updateMenu()
}