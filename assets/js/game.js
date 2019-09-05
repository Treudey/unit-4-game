var jaime, hound, drogo, jon, charList, enemies, isGameOver;

function initialize() {
    // Character constructor function
    var Character = function(id, name, HP, attack, counterAttack, img) {
        this.id = id;
        this.name = name;
        this.HP = HP;
        this.startingHP = HP;
        this.attack = attack;
        this.attackPower = attack;
        this.counterAttack = counterAttack;
        this.img = img;
        this.state = "friendly";
    };
    
    // each of the Character objects is created and stored inside a character array
    charList = [jaime = new Character("jaime", "Jaime Lannister", 120, 8, 10, 
                "./assets/images/Jaime-Lannister.jpg"),
                hound = new Character("hound", "The Hound", 180, 2, 25,
                "./assets/images/thehound.jpg"),
                drogo = new Character("drogo", "Khal Drogo", 150, 4, 20, 
                "./assets/images/khal-drogo.jpg"),
                jon = new Character("jon", "Jon Snow", 100, 12, 5, 
                "./assets/images/jon-snow.jpg")];

    setValues();

    createInitialCharDivs();
}

function setValues() {
    enemies = [];
    isGameOver = false;
}

// creates a new chracter div based on the object passed into it and appends it to the appropriate div
function createCharDiv(character) {
    
    var newDiv = $("<div>").attr("id", character.id);
    $("<p>").addClass("name").text(character.name).appendTo(newDiv);
    $("<img>").attr({src: character.img, alt: character.name}).appendTo(newDiv);
    $("<p>").addClass("hp").text(character.HP).appendTo(newDiv);

    switch (character.state) {
        case "selected":
            newDiv.addClass("character selected").appendTo(".selected-div");
            break;
        case "enemy":
            newDiv.addClass("character enemy").appendTo(".enemies-div");
            break;
        case "challenger":
            newDiv.addClass("character challenger").appendTo(".challenger-div");
            break;
        case "friendly":
            newDiv.addClass("character friendly").appendTo(".character-selection");
            break;
        default:
            break;
    }
}

function createInitialCharDivs() {
    for (var i = 0; i < charList.length; i++) { 
        createCharDiv(charList[i]);
    }
}

function resetCharacters() {
    for (var i = 0; i < charList.length; i++) { 
        var currChar = charList[i];
        currChar.HP = currChar.startingHP;
        currChar.attack = currChar.attackPower;
        currChar.state = "friendly";
    }
}

// initializes all the variables, creates the intial character divs, and displays them in the 'character-selection' div
function resetGame() {

    setValues();
    resetCharacters();
    createInitialCharDivs();
}

// takes an character div id and returns the object associated with it
function whichCharacter(divID) {
    for (var i = 0; i < charList.length; i++) {
        if (divID === charList[i].id) {
            return charList[i];
        }
    }
}

// checks if all enemies are dead and returns true or false
function allEnemiesDead() {
    var deaths = 0;
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].HP <= 0) {
            deaths++;
        }
    }
    return deaths === enemies.length;
}

// creates a new prargraph with text of whatever is passed into it and appends it to the 'text-div'
function addParaToTextDiv(input) {
    $("<p>").text(input).appendTo(".text-div");
}

$(document).ready(function() {
    
    initialize();

    // apends the clicked upon character to the 'selected-div' and moves the rest to the 'enemies-div'
    $(document).on("click", ".friendly", function() {
        var id = $(this).attr("id");
        var selectedChar = whichCharacter(id);
        $(".character-selection").empty();
        selectedChar.state = "selected";
        for (var i = 0; i < charList.length; i++) {
            var selectedChar = charList[i];
            if (selectedChar.state !== "selected") {
                selectedChar.state = "enemy";
                enemies.push(selectedChar);
            }
            createCharDiv(selectedChar);
        }
    });

    // appends the 'enemy' div clicked on to the 'challenger-div' and remove it from 'enemies-div'
    $(document).on("click", ".enemy", function() {
        // checks if theres is already a challenger first
        if (!$(".challenger").length) {
            $(".text-div").empty();
            var id = $(this).attr("id");
            var challenger = whichCharacter(id);
            challenger.state = "challenger";
            $(this).remove();
            createCharDiv(challenger);
        }
    });

    $(".attack").on("click", function() {
        // checks if the game is over first
        if (isGameOver) {
            return;
        // checks if theres is a challenger present to attack
        } else if ($(".challenger").length) {
            $(".text-div").empty();
            var selectedCharID = $(".selected").attr("id");
            var selectedChar = whichCharacter(selectedCharID);
            var challengerID = $(".challenger").attr("id");
            var challenger = whichCharacter(challengerID);
            challenger.HP -= selectedChar.attack;

            if (allEnemiesDead()) {
                $(".challenger-div").empty();
                $(".text-div").next().hide();
                addParaToTextDiv("You Won!!! GAME OVER!!!");
                $("<button>").addClass("restart").text("Restart").appendTo(".text-div");
                isGameOver = true;
                return;

            } else if (challenger.HP <= 0) {
                $(".challenger-div").empty();
                addParaToTextDiv("You have defeated " + challenger.name + " . You can choose another enemy to fight.");
                selectedChar.attack += selectedChar.attackPower;
                return;
            }

            selectedChar.HP -= challenger.counterAttack;

            // checks if the player character has died
            if (selectedChar.HP <= 0) {
                addParaToTextDiv("You have been defeated... GAME OVER!!!");
                $("<button>").addClass("restart").text("Restart").appendTo(".text-div");
                isGameOver = true;

            } else {
                addParaToTextDiv("You attacked " + challenger.name + " for " + selectedChar.attack + " damage!");
                addParaToTextDiv(challenger.name + " attacked you back for " + challenger.counterAttack + " damage!");
                selectedChar.attack += selectedChar.attackPower;
            }

            $(".challenger p.hp").text(challenger.HP);
            $(".selected p.hp").text(selectedChar.HP);
            
        } else {
            $(".text-div").empty();
            addParaToTextDiv("There's no challenger here.");
        }
    });

    $(document).on("click", ".restart", function() {
        $("div").empty();
        $(".text-div").next().show();
        resetGame();
    });
});