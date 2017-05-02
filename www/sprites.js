function Sprite(srcX, srcY, srcW, srcH){
	this.srcX = srcX
	this.srcY = srcY
	this.srcW = srcW
	this.srcH = srcH
	this.draw = function(x, y, w, h){
		ctx.drawImage(sheet, this.srcX, this.srcY, this.srcW, this.srcH, x, y, w, h)
	}
}


function makeSprites(){
	sprites = {}
	sprites.playerDown1 = new Sprite(2, 0, 21, 22)
	sprites.playerDown2 = new Sprite(24, 0, 21, 22)
	sprites.playerDown3 = new Sprite(47, 0, 21, 22)
	sprites.playerUp1 = new Sprite(4, 70, 19, 21)
	sprites.playerUp2 = new Sprite(26, 70, 19, 21)
	sprites.playerUp3 = new Sprite(49, 70, 19, 21)
	sprites.playerLeft1 = new Sprite(2, 24, 21, 21)
	sprites.playerLeft2 = new Sprite(24, 24, 21, 21)
	sprites.playerLeft3 = new Sprite(47, 24, 21, 21)
	sprites.playerRight1 = new Sprite(2, 47, 20, 22)
	sprites.playerRight2 = new Sprite(24, 47, 20, 22)
	sprites.playerRight3 = new Sprite(47, 47, 20, 22)
	sprites.wall = new Sprite(310, 0, 16, 16)
	sprites.door = new Sprite(280, 0, 28, 32)
	sprites.floor = new Sprite(280, 150, 16, 16)
	sprites.blank = new Sprite(-1, -1, 1, 1)
	sprites.kitchen = new Sprite(360, 0, 80, 32)
	sprites.bed = new Sprite(360, 35, 48, 32)
	sprites.computer = new Sprite(280, 40, 24, 24)
	sprites.desk = new Sprite(280, 70, 32, 32)
	sprites.couch = new Sprite(320, 60, 22, 46)
	sprites.tv = new Sprite(350, 100, 22, 28)
	sprites.rug = new Sprite(390, 135, 16, 16)
	
	girlXOffset = 70
	
	sprites.girlDown1 = new Sprite(2+girlXOffset, 0, 21, 22)
	sprites.girlDown2 = new Sprite(24+girlXOffset, 0, 21, 22)
	sprites.girlDown3 = new Sprite(47+girlXOffset, 0, 21, 22)
	sprites.girlUp1 = new Sprite(4+girlXOffset, 70, 19, 21)
	sprites.girlUp2 = new Sprite(26+girlXOffset, 70, 19, 21)
	sprites.girlUp3 = new Sprite(49+girlXOffset, 70, 19, 21)
	sprites.girlLeft1 = new Sprite(2+girlXOffset, 24, 21, 21)
	sprites.girlLeft2 = new Sprite(24+girlXOffset, 24, 21, 21)
	sprites.girlLeft3 = new Sprite(47+girlXOffset, 24, 21, 21)
	sprites.girlRight1 = new Sprite(2+girlXOffset, 47, 20, 22)
	sprites.girlRight2 = new Sprite(24+girlXOffset, 47, 20, 22)
	sprites.girlRight3 = new Sprite(47+girlXOffset, 47, 20, 22)
	
	greenXOffset = girlXOffset * 2 - 1
	
	sprites.greenDown1 = new Sprite(2+greenXOffset, 0, 21, 22)
	sprites.greenDown2 = new Sprite(24+greenXOffset, 0, 21, 22)
	sprites.greenDown3 = new Sprite(47+greenXOffset, 0, 21, 22)
	sprites.greenUp1 = new Sprite(4+greenXOffset, 70, 19, 21)
	sprites.greenUp2 = new Sprite(26+greenXOffset, 70, 19, 21)
	sprites.greenUp3 = new Sprite(49+greenXOffset, 70, 19, 21)
	sprites.greenLeft1 = new Sprite(2+greenXOffset, 24, 21, 21)
	sprites.greenLeft2 = new Sprite(24+greenXOffset, 24, 21, 21)
	sprites.greenLeft3 = new Sprite(47+greenXOffset, 24, 21, 21)
	sprites.greenRight1 = new Sprite(2+greenXOffset, 47, 20, 22)
	sprites.greenRight2 = new Sprite(24+greenXOffset, 47, 20, 22)
	sprites.greenRight3 = new Sprite(47+greenXOffset, 47, 20, 22)
	
	var robotHeight = 32
	var robotWidth = 32
	sprites.robotDown1 = new Sprite(0, 200, robotWidth, robotHeight)
	sprites.robotDown2 = new Sprite(robotWidth, 200, robotWidth, robotHeight)
	sprites.robotDown3 = new Sprite(robotWidth * 2, 200, robotWidth, robotHeight)
	sprites.robotLeft1 = new Sprite(0, 200 + robotHeight, robotWidth, robotHeight)
	sprites.robotLeft2 = new Sprite(robotWidth, 200 + robotHeight, robotWidth, robotHeight)
	sprites.robotLeft3 = new Sprite(robotWidth * 2, 200 + robotHeight, robotWidth, robotHeight)
	sprites.robotRight1 = new Sprite(0, 200 + robotHeight * 2, robotWidth, robotHeight)
	sprites.robotRight2 = new Sprite(robotWidth, 200 + robotHeight * 2, robotWidth, robotHeight)
	sprites.robotRight3 = new Sprite(robotWidth * 2, 200 + robotHeight * 2, robotWidth, robotHeight)
	sprites.robotUp1 = new Sprite(0, 200 + robotHeight * 3, robotWidth, robotHeight)
	sprites.robotUp2 = new Sprite(robotWidth, 200 + robotHeight * 3, robotWidth, robotHeight)
	sprites.robotUp3 = new Sprite(robotWidth * 2, 200 + robotHeight * 3, robotWidth, robotHeight)
	
	
	robotHeight = 32
	robotWidth = 30
	sprites.robot2Down1 = new Sprite(0, 340, robotWidth, robotHeight)
	sprites.robot2Down2 = new Sprite(robotWidth, 340, robotWidth, robotHeight)
	sprites.robot2Down3 = new Sprite(robotWidth * 2, 340, robotWidth, robotHeight)
	sprites.robot2Left1 = new Sprite(0, 340 + robotHeight, robotWidth, robotHeight)
	sprites.robot2Left2 = new Sprite(robotWidth, 340 + robotHeight, robotWidth, robotHeight)
	sprites.robot2Left3 = new Sprite(robotWidth * 2, 340 + robotHeight, robotWidth, robotHeight)
	sprites.robot2Right1 = new Sprite(0, 340 + robotHeight * 2, robotWidth, robotHeight)
	sprites.robot2Right2 = new Sprite(robotWidth, 340 + robotHeight * 2, robotWidth, robotHeight)
	sprites.robot2Right3 = new Sprite(robotWidth * 2, 340 + robotHeight * 2, robotWidth, robotHeight)
	sprites.robot2Up1 = new Sprite(0, 340 + robotHeight * 3, robotWidth, robotHeight)
	sprites.robot2Up2 = new Sprite(robotWidth, 340 + robotHeight * 3, robotWidth, robotHeight)
	sprites.robot2Up3 = new Sprite(robotWidth * 2, 340 + robotHeight * 3, robotWidth, robotHeight)
	
	sprites.light = new Sprite(100, 200, 95, 55)
	sprites.wall2 = new Sprite(200, 200, 30, 25)
	sprites.wall3 = new Sprite(240, 200, 46, 44)
	sprites.door2 = new Sprite(300, 180, 64, 48)
	sprites.bear = new Sprite(491, 35, 10, 14)
	sprites.flag = new Sprite(570, 0, 32, 32)
	sprites.horns = new Sprite(370, 170, 32, 32)
	sprites.beer = new Sprite(410, 170, 16, 32)
	sprites.poolTable = new Sprite(110, 270, 64, 100)
}