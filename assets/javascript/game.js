var jaime, hound, drogo, jon, charList, enemies, isGameOver;

// initializes all the variables, creates the intial character divs, and displays them in the 'character-selection' div
function gameSet() {
    jaime = {
        id: "jaime",
        name: "Jaime Lannister",
        HP: 120,
        attack: 8,
        attackPower: 8,
        counterAttack: 10,
        url: "./assets/images/Jaime-Lannister.jpg",
        isSelected: false,
        isEnemy: false,
        isChallenger: false
    };
    hound = {
        id: "hound",
        name: "The Hound",
        HP: 180,
        attack: 2,
        attackPower: 2,
        counterAttack: 25,
        url: "./assets/images/thehound.jpg",
        isSelected: false,
        isEnemy: false,
        isChallenger: false
    };
    drogo = {
        id: "drogo",
        name: "Khal Drogo",
        HP: 150,
        attack: 4,
        attackPower: 4,
        counterAttack: 20,
        url: "./assets/images/khal-drogo.jpg",
        isSelected: false,
        isEnemy: false,
        isChallenger: false
    };
    jon = {
        id: "jon",
        name: "Jon Snow",
        HP: 100,
        attack: 12,
        attackPower: 12,
        counterAttack: 5,
        url: "./assets/images/jon-snow.jpg",
        isSelected: false,
        isEnemy: false,
        isChallenger: false
    };
    charList = [jaime, hound, drogo, jon];
    enemies = [];
    isGameOver = false;

    for (var i = 0; i < charList.length; i++) {
        createCharDiv(charList[i]);
    }
}

// creates a new chracter div based on the object passed into it and appends it to the appropriate div
function createCharDiv(character) {
    var newDiv = $("<div>").attr("id", character.id);
    $("<p>").addClass("name").text(character.name).appendTo(newDiv);
    $("<img>").attr({src: character.url, alt: character.name}).appendTo(newDiv);
    $("<p>").addClass("hp").text(character.HP).appendTo(newDiv);

    if (character.isSelected) {
        newDiv.addClass("character selected").appendTo(".selected-div");
    } else if (character.isEnemy) {
        newDiv.addClass("character enemy").appendTo(".enemies-div");
    } else if (character.isChallenger) {
        newDiv.addClass("character challenger").appendTo(".challenger-div"); 
    } else {
        newDiv.addClass("character friendly").appendTo(".character-selection");
    }
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
    return deaths === 3;
}

// creates a new prargraph with text of whatever is passed into it and appends it to the 'text-div'
function addParaToTextDiv(input) {
    $("<p>").text(input).appendTo(".text-div");
}

$(document).ready(function() {
    
    gameSet();

    // apends the clicked upon character to the 'selected-div' and moves the rest to the 'enemies-div'
    $(document).on("click", ".friendly", function() {
        var id = $(this).attr("id");
        var selectedChar = whichCharacter(id);
        $(".character-selection").empty();
        selectedChar.isSelected = true;
        for (var i = 0; i < charList.length; i++) {
            var selectedChar = charList[i];
            if (!selectedChar.isSelected) {
                selectedChar.isEnemy = true;
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
            challenger.isEnemy = false;
            challenger.isChallenger = true;
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
        gameSet();
    });

});
