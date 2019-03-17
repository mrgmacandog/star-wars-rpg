"use strict";

// 1. Choose a character
// 2. Move the chosen character to your character
// 3. Move the other characters to the enemies available to attack
// 4. Choose a defender from the list of enemies

(function() {
    // Run JavaScript once the document is ready
    $(document).ready(function() {

        // When a character is first clicked
        $(".choose-character").on("click", function() {

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
                if (chooseCharacter[i] === this) {
                    // Add to your-character div
                    $("#your-character").append(oneCharacter);
                // Current character is not the character clicked
                } else {  // (chooseCharacter[i] !== this)
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

            // When an enemy is clicked
            $(".choose-enemy").on("click", function() {

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

                    // If the current enemy is the enemy clicked
                    if (chooseEnemy[i] === this) {
                        // Remove the enemy card from the DOM
                        oneEnemy.detach();
                        // Add to defender div
                        $("#defender").append(oneEnemy);
                        // Add class to defender
                        oneEnemy.addClass("defender");
                        // Change background color to black
                        oneEnemy.addClass("text-white bg-dark");
                    // Current enemy is not the enemy clicked
                    } else {  // (chooseEnemy[i] !== this)
                        
                    }
                }
            });


        });
    })
})();