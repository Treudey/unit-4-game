/****Algorithm
 * 
 * Make 'character' objects with properties for health, attack, img, etc.
 * Make 'character' divs respond to click events
 * One you click on goes into "Your Character" section while other 3 go into "Enemies Available to attack"
 * Have click event so that enemy you click moves into "challenger" area
 * Make attack button have click event that makes Attacker and challenger battle
 * "Your character" will subtract his attack fromchallenger's HP and then vice versa
 * Set Lose condition for your chrarcter's HP dropping to 0 or less
 * Have win condition for defeating achallenger if HP goes to 0 or less
 * Have global win condition for all three "enemies" being defeated
 * 
 * 
 */

var jaime, hound, drogo, jon, charList;

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
        attack: 4,
        attackPower: 4,
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
        attack: 5,
        attackPower: 5,
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
        attack: 10,
        attackPower: 10,
        counterAttack: 5,
        url: "./assets/images/jon-snow.jpg",
        isSelected: false,
        isEnemy: false,
        isChallenger: false
    };
    charList = [jaime, hound, drogo, jon];

    for (let i = 0; i < charList.length; i++) {
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

// takes an character div id and determines the object associated with it
function whichCharacter(divID) {
    for (var i = 0; i < charList.length; i++) {
        if (divID === charList[i].id) {
            return charList[i];
        }
    }
}



$(document).ready(function() {
    
    gameSet();

    // apends the clicked upon character to the 'selected-div' and moves the rest to the 'enemies-div'
    $(".friendly").on("click", function() {
        var id = $(this).attr("id");
        var character = whichCharacter(id);
        $(".character-selection").empty();
        character.isSelected = true;
        for (var i = 0; i < charList.length; i++) {
            if (!charList[i].isSelected) {
                charList[i].isEnemy = true;
            }
            createCharDiv(charList[i]);
        }
    });

    // appends the 'enemy' div clicked on to the 'challenger-div' and remove it from 'enemies-div'
    $(document).on('click', '.enemy', function() {
        // checks if theres is already a challenger first
        if (!$(".challenger").length) {
            $(".text-div").empty();
            var id = $(this).attr("id");
            var character = whichCharacter(id);
            character.isEnemy = false;
            character.isChallenger = true;
            $(this).remove();
            createCharDiv(character);
        }
    });

    $(".attack").on("click", function() {
        $(".text-div").empty();
        // checks if theres is already a challenger first
        if ($(".challenger").length) {
            var attackerID = $(".selected").attr("id");
            var challengerID = $(".challenger").attr("id");
            var attacker = whichCharacter(attackerID);
            var challenger = whichCharacter(challengerID);
            challenger.HP -= attacker.attack;
            attacker.HP -= challenger.counterAttack;
            $(".challenger p.hp").text(challenger.HP);
            $(".selected p.hp").text(attacker.HP);
            $("<p>").text("You attacked " + challenger.name + " for " + attacker.attack + " damage!").appendTo(".text-div");
            $("<p>").text(challenger.name + " attacked you back for " + challenger.counterAttack + " damage!").appendTo(".text-div");
            attacker.attack += attacker.attackPower;
        } else {
            $("<p>").text("There's no challenger here.").appendTo(".text-div");
        }
    });

});
