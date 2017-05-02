function setConstants(){
	setNumericConstants()
	setConstantStrings()
	setConstantArrays()
	setConstantObjects()
}

function setNumericConstants(){
	DIV1_FONT_SIZE = .7
	DIV2_FONT_SIZE = .7
	PLAYER_START_ROOM = 0
	PLAYER_START_X = 5
	PLAYER_START_Y = 5
	VIEW_GRID = 17
	MAX_PICKS = 5
	MAX_WEARINESS = 5
	MAX_MISTAKES = 2
	FLAG_VISIBLE = 5
	BRIBE_AMT = 1000000
	PILL_VALUE = 50
	PILL_COST = 25
}

function setConstantStrings(){
	TAKE_PILL_STR = "take pill"
	UNPAUSE = "unpause"
	CORP_NAME = "OMega Corp"
	HOME_STR = "home"
	ENTER_INSTITUTION_STR = "enter institution"
	INTERACT_STR = "space or enter to interact with "
	LEAVE_STR = "leave"
	BACK_STR = "back"
	WEARY_STR = "You feel tired and clumsy."
	CLEAR_STR = "You feel fresh and alert."
	SLEEP_OPTIONAL = "You could sleep, if necessary."
	CHALLENGING = "You find this task challenging. Your skill increases as a result."
	EASY = "This task is too easy to increase your skills."
	SLEEP = "sleep until rested"
	SLEEP_RESULT = "You awake refreshed."
	CONTINUE_STR = "listen"
	BRIBE_STR = "Bribe agent for $"+BRIBE_AMT
	BRIBE_WIN_STR = "That's a lot of money. How could I refuse?"
	BRIBE_FAIL_STR = "I would never betray my profession!"
	COURT_CREDITS_STR = "This automated court proceeding brought to you by "+CORP_NAME+"."
	NURSE_GREET_STR = "Greeetings, patient. When you are ready the automated nurse will administer psychotherapy."
	NURSE_TEST_INTRO_STR = "As a requirement of your treatment you must answer a series of yes or no questions."
	YES_STR = "Yes"
	NO_STR = "No"
	PRESCRIBE_STR = "As a condition of your release you are to take the drug "
	INSANITY_HISTORY_STR = "The offender's mental health is in question. However, as a repeat offender this court can no longer ignore his heinous crimes. "+
		"The offender is to be placed under the perpetual care of a court appointed auto nurse."
	PILL_DUE_STR = "Here is another pill."
	NO_PILL_DUE_STR = "You are not yet due to take a pill."
	HACK_THE_MAN_STR = "Hack "+CORP_NAME
}

function setConstantArrays(){
	ACHIEVEMENTS = [
		"practice",
		"hack low hanging fruit",
		"hack the wealthy",
		"hack the powerful",
		"hack another hacker"
	]
	DESTINATIONS = [
		"outside",
		"courthouse",
	]
	CRITERIA = [
		"Have you ever undergone a major traumatic event?",
		"Have you ever abused drugs?",
		"Have you ever been diagnosed with a mental illness?",
		"Have you ever had the desire to hurt yourself or others?",
	]
	DIAGNOSES = [
		"You are completely normal",
		"You are slightly crazy.",
		"You are considerably crazy.",
		"You are very crazy.",
		"You are totally insane."
	]
	DRUGS = [
		"tripazapazone",
		"expasoplam",
		"nootropydol",
		"zipazapadan",
		"niazodyplodol"
	]
}

function setConstantObjects(){
	
}

