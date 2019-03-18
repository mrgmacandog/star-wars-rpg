// Code is executed in strict mode
"use strict";

// Wrap all code in an anonymous function so functions cannot be called externally
(function() {
    // Run JavaScript once the document is ready
    $(document).ready(function() {

        // Initialize characters array
        let characters = [];

        // Character constructor
        //     Takes in a name, hp, attack, and counter
        function Character(id, name, hp, attack, counter) {
            this.id = id;
            this.name = name;
            this.hp = hp;
            this.attack = attack;
            this.startingAttack = attack;
            this.counter = counter;
        }

        // Reset each character to their original state (hp and attack) and create new cards,
        //     and clear all the cards in the divs
        function restart() {
            // Decalring a new object for each character
            //     Create new characters here
            let obiwanKenobi = new Character("obi-won-kenobi", "Obi-Wan Kenobi", 120, 16, 15);
            let lukeSkywalker = new Character("luke-skywalker", "Luke Skywalker", 100, 22, 10);
            let darthSiduous = new Character("darth-siduous", "Darth Siduous", 150, 10, 25);
            let darthMaul = new Character("darth-maul", "Darth Maul", 180, 4, 30);

            // Array of characters
            //     Add new characters here
            characters = [obiwanKenobi, lukeSkywalker, darthSiduous, darthMaul];

            // Create cards for each of the characters
            createCards()

            // Empty all divs with cards
            $("#your-character").empty();
            $("#enemies").empty();
            $("#defender").empty();

            // Disable the attack button
            $("#attack").attr("disabled", true);

            // Hide the restart button
            $("#restart").addClass("hidden");

            // Clear the attack log
            $("#your-character-attack").empty();
            $("#defender-attack").empty();

            // Unhide "Choose Your Character"
            $("#choose-character-text").removeClass("hidden");

            // Hide proper divs
            $("#choose-enemy-text").addClass("hidden");
            $("#your-character-text").addClass("hidden");
            $("#defender-text").addClass("hidden");
            $("#fight-section-text").addClass("hidden");
            $("#attack-btn").addClass("hidden");

            // Set ability to click a character and make it your character
            setCharacterOnClick();
        }

        function createCards() {
            // Create a card for each character
            for (let i = 0; i < characters.length; i++) {

                // Create a div for the column
                let column = $("<div>");
                // Add the card, col-md-3, and choose-character classes to the div
                column.addClass("card col-md-3 choose-character");

                // Create a div for the body
                let body = $("<div>");
                // Add the card-body class to the div
                body.addClass("card-body");
                // Append the body to the column
                column.append(body);

                // Create a h5 for the header
                let header = $("<h5>");
                // Add the card-body class to the header
                header.addClass("card-title");
                // Display character name
                header.text(characters[i].name);
                // Append the header to the body
                body.append(header);

                // Create an img for the image
                let image = $("<img>");
                // Add the card-img-top class to the img
                image.addClass("card-img-top");
                // Add source attribute
                // TEMPORARY SOURCE
                image.attr("src", "../../01/Basic-Portfolio/assets/images/temp1.jpg");
                // Add alt attribute
                image.attr("alt", characters[i].name);
                // Append the image to the body
                body.append(image);

                // Create a p for the paragraph
                let paragraph = $("<p>");
                // Add the card-text class to the paragraph
                paragraph.addClass("card-text");
                // Display "HP: " in the paragraph
                paragraph.text("HP: ");
                // Append the paragraph to the body
                body.append(paragraph);

                // Create a span for the paragraph
                let span = $("<span>");
                // Display the hp
                span.text(characters[i].hp);
                // Append the span to the paragraph
                paragraph.append(span);

                $("#characters").append(column);
            }
        }
        
        // Set up initial on click event for the choosing a character
        function setCharacterOnClick() {
            // When a character is first clicked
            $(".choose-character").on("click", function() {
                // Hide "Choose Your Character"
                $("#choose-character-text").addClass("hidden");

                // Make the clicked character your character
                chooseCharacter(this);

                // Set ability to click an enemy and make the defender
                setEnemyOnCLick();
            });
        }

        // Make a character choice
        //     Takes in the character clicked
        function chooseCharacter(chosenCharacter) {
            // Unhide proper divs
            $("#choose-enemy-text").removeClass("hidden");
            $("#your-character-text").removeClass("hidden");

            // Assign all characters to a variable
            let chooseCharacter = $(".choose-character");
            
            // Remove all other characters from the character choices and
            //     move it to the enemies section
            for (let i = 0; i < chooseCharacter.length; i++) {

                // Assign current character to a variable
                let oneCharacter = $(chooseCharacter[i]);

                // Remove choose-character class
                oneCharacter.removeClass("choose-character");
                // Remove the click event handlers for all characters
                oneCharacter.off("click");
                // Remove the character card from DOM
                oneCharacter.detach();

                // If the current character is the character clicked
                if (chooseCharacter[i] === chosenCharacter) {
                    // Add to your-character div
                    $("#your-character").append(oneCharacter);

                    // Change column size due to #your-character div being inside a col-md-6 div
                    oneCharacter.removeClass("col-md-3");
                    oneCharacter.addClass("col-md-6");
                // Current character is not the character clicked
                } else {  // (chooseCharacter[i] !== chosenCharacter)
                    // Add to enemies div
                    $("#enemies").append(oneCharacter);
                    // Add class to enemies
                    oneCharacter.addClass("choose-enemy");
                    // Change background color to red
                    oneCharacter.addClass("text-white bg-danger");
                }

                // Remove the click event handlers for all characters
                oneCharacter.off("click");
            } 
        }

        // Set up on click event for choosing an enemy
        function setEnemyOnCLick() {
            // When this is called after a defender is defeated, that defender still has
            //     the on click event from when this function was declared.
            // To remedy that, the defeated defender needs it's on click event removed.
            $("#defender > div").off("click");

            // When an enemy is clicked
            $(".choose-enemy").on("click", function() {
                // Remove defeated defender
                $("#defender").empty();
                // Empty attack log when a new enemy is chosen
                $("#your-character-attack").empty();

                // Make the clicked enemy the defender
                chooseEnemy(this);

                // Enables the attack button
                $("#attack").attr("disabled", false);

                // Remove previous on click event (if there is one)
                $("#attack").off("click");   

                // When the attack button is clicked
                $("#attack").on("click", function() {
                    // Make an attack
                    attack();
                });
            });
        }

        // Make an enemy choice
        //     Takes in the enemy clicked
        function chooseEnemy(chosenEnemy) {
            // Unhide proper divs
            $("#defender-text").removeClass("hidden");
            $("#fight-section-text").removeClass("hidden");
            $("#attack-btn").removeClass("hidden");

            // Set chosenEnemy do a jQuery element
            chosenEnemy = $(chosenEnemy);

            // Remove the enemy card from the DOM
            chosenEnemy.detach();
            
            // Add to defender div
            $("#defender").append(chosenEnemy);

            // Remove choose-enemy class
            chosenEnemy.removeClass("choose-enemy");

            // Change background color to black
            chosenEnemy.addClass("text-white bg-dark");

            // Change column size due to #defender div being inside a col-md-6 div
            chosenEnemy.removeClass("col-md-3");
            chosenEnemy.addClass("col-md-6");

            // Assign all enemies to a variable
            let chooseEnemy = $(".choose-enemy");

            // Move clicked enemy to the defender section and change the colors
            for (let i = 0; i < chooseEnemy.length; i++) {
                // Assign current enemy to variable
                let oneEnemy = $(chooseEnemy[i]);
                
                // Remove the click event handlers for all characters
                oneEnemy.off("click");       
            }
        }

        function attack () {
            // Get name of your character
            let yourCharacterName = $("#your-character h5")[0].textContent;
            // Get name of your defender
            let defenderName = $("#defender h5")[0].textContent;

            // Index of your character
            let yourCharacterIndex;
            // Index of defender
            let defenderIndex;

            // Iterate through all characters to find the index of your character and defender
            for (let i = 0; i < characters.length; i++) {
                // If the current character is your character
                if (characters[i].name === yourCharacterName) {
                    // Set your character's index
                    yourCharacterIndex = i;
                // If the current character is the defender
                } else if (characters[i].name === defenderName) {
                    // Set defender's index
                    defenderIndex = i;
                }
            }

            // Get object of your character
            let yourCharacterObj = characters[yourCharacterIndex];
            // Get object of defender
            let defenderObj = characters[defenderIndex];

            console.log("Before attack:")
            console.log(yourCharacterObj);
            console.log(defenderObj);
            console.log("");

            // Your character's attack
            defenderObj.hp -= yourCharacterObj.attack;
            // Your character's attack increases
            yourCharacterObj.attack += yourCharacterObj.startingAttack;

            // Check if defender is dead
            let isDefenderDead = defenderObj.hp <= 0;;

            // If the defender's is not dead after your character's attack
            if (!isDefenderDead) {
                // Defender's attack
                yourCharacterObj.hp -= defenderObj.counter;
            }

            // Check if your character is dead
            let isYourCharacterDead = yourCharacterObj.hp <= 0;

            // Update the display includding your character, defender, and attack log
            updateDisplay(yourCharacterObj, isYourCharacterDead, defenderObj, isDefenderDead);

            console.log("After attack:")
            console.log(yourCharacterObj);
            console.log(defenderObj);
        }

        // Update the display
        function updateDisplay(yourCharacterObj, isYourCharacterDead, defenderObj, isDefenderDead) {
            // Update your character HP
            $("#your-character span")[0].textContent = yourCharacterObj.hp;
            // Update defender HP
            $("#defender span")[0].textContent = defenderObj.hp;

            // If the defender is dead
            if (isDefenderDead) {
                
                // Empty defender's attack log
                $("#defender-attack").empty();

                // Disable the attack button
                $("#attack").attr("disabled", true);

                if ($("#enemies > .choose-enemy").length > 0) {
                    // Update the attack log
                    $("#your-character-attack").text("You have defeated " + defenderObj.name +
                                                     ", you can choose to fight another enemy.");

                    // Enable enemies to be selected as a defender
                    setEnemyOnCLick();
                } else {
                    // Update the attack log
                    $("#your-character-attack").text("Congratulations, " + yourCharacterObj.name +
                                                     "! Defeating " + defenderObj.name +
                                                     " was the last step to total victory. " +
                                                     "Click the \"Restart\" button to play again.");
                    
                    // Show the restart button
                    $("#restart").removeClass("hidden");

                    // Remove on click event for last defender
                    $("#defender > div").off("click");
                }
            // If your character is dead
            } else if (isYourCharacterDead) {
                // Update the attack log
                $("#your-character-attack").empty();
                $("#defender-attack").text("You have been defeated... GAME OVER!");

                // Disable the attack button
                $("#attack").attr("disabled", true);
                // Show the restart button
                $("#restart").removeClass("hidden");

            // If defender and your character is still alive
            } else {  // (!isDefenderDead && !isYourCharacterDead)
                // Update the attack log
                $("#your-character-attack").text("You attacked " + defenderObj.name + " for " + (yourCharacterObj.attack - yourCharacterObj.startingAttack) + " damage.");
                $("#defender-attack").text(defenderObj.name + " attacked you for " + defenderObj.counter + " damage.");
            }
        }

        // Set up new game
        restart();

        // When the restart button is clicked
        $("#restart").on("click", function() {
            // Restart a new game
            restart();
        })
    })
})();