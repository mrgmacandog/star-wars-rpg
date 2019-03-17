"use strict";

// 1. Choose a character
// 2. Move the chosen character to your character
// 3. Move the other characters to the enemies available to attack
// 4. Choose a defender from the list of enemies

(function() {
    // Run JavaScript once the document is ready
    $(document).ready(function() {

        // Character constructor
        //     Takes in a name, hp, attack, and counter
        function Character(id, name, hp, attack, counter) {
            this.id = id;
            this.name = name;
            this.hp = hp;
            this.attack = attack;
            this.counter = counter;
        }

        // Initialize characters array
        let characters = [];

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

        // Make a character choice
        //     Takes in the character clicked
        function chooseCharacter(chosenCharacter) {
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

        // Make an enemy choice
        //     Takes in the enemy clicked
        function chooseEnemy(chosenEnemy) {
            // Assign all enemies to a variable
            let chooseEnemy = $(".choose-enemy");

            // Move clicked enemy to the defender section and change the colors
            for (let i = 0; i < chooseEnemy.length; i++) {

                // Assign current enemy to variable
                let oneEnemy = $(chooseEnemy[i]);

                // Remove choose-enemy class
                oneEnemy.removeClass("choose-enemy");
                // Remove the click event handlers for all characters
                oneEnemy.off("click");       

                // POSSIBLY MOVE THIS OUTSIDE OF FOR LOOP
                // If the current enemy is the enemy clicked
                if (chooseEnemy[i] === chosenEnemy) {
                    // Remove the enemy card from the DOM
                    oneEnemy.detach();
                    // Add to defender div
                    $("#defender").append(oneEnemy);
                    // Add class to defender
                    oneEnemy.addClass("defender");
                    // Change background color to black
                    oneEnemy.addClass("text-white bg-dark");
                }
            }
        }

        function attack () {
            alert();
        }

        // Set up initial on click event for the character cards
        function setInitialOnClick() {
            // When a character is first clicked
            $(".choose-character").on("click", function() {
                chooseCharacter(this);

                // When an enemy is clicked
                $(".choose-enemy").on("click", function() {
                    chooseEnemy(this);

                    // Enables the attack button
                    $("#attack").attr("disabled", false);

                    // When the attack button is clicked
                    $("#attack").on("click", function() {
                        attack();
                        $("#restart").removeClass("hidden");  // PLACE SOMEWHERE ELSE IN THE FUTURE
                    });
                });
            });
        }  

        // Reset each character to their original state (hp and attack) and create new cards,
        //     and clear all the cards in the divs
        function restart() {
            // Decalring a new object for each character
            //     Create new characters here
            let obiwanKenobi = new Character("obi-won-kenobi", "Obi-Wan Kenobi", 120, 8, 20);
            let lukeSkywalker = new Character("luke-skywalker", "Luke Skywalker", 120, 8, 20);
            let darthSiduous = new Character("darth-siduous", "Darth Siduous", 120, 8, 20);
            let darthMaul = new Character("darth-maul", "Darth Maul", 120, 8, 20);

            // Array of characters
            //     Add new characters here
            characters = [obiwanKenobi, lukeSkywalker, darthSiduous, darthMaul];

            // Create cards for each of the characters
            createCards()

            // Empty all divs with cards
            $("#your-character").empty();
            $("#enemies").empty();
            $("#defender").empty();

            // Disables the attack button
            $("#attack").attr("disabled", true);

            // Hides restart button
            $("#restart").addClass("hidden");

            setInitialOnClick();
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