# Game of Thrones Duel

This is a fighting game with a *Game of Thrones* theme

#### Here's how the app works:

   * When the game starts, you choose a character by clicking on the fighter's picture. You will fight as that character for the rest of the game.

   * You must then defeat all of the remaining fighters.

   * You choose an opponent by clicking on an enemy's picture.

   * Once you selects an opponent, that enemy is moved to a the `challenger area`.

   * You will now be able to click the `attack` button.
     * Whenever you click `attack`, your character damages the chalenger. The opponent will lose `HP` (health points).
     * The opponent character will instantly counter the attack. When that happens, your character will lose some of their `HP`.

   * You must keep hitting the attack button in an effort to defeat your opponent.

   * When the challenger's `HP` is reduced to zero or below, remove the enemy from the `defender area`. TYou can now choose a new opponent.

   * You win the game by defeating all enemy characters. You lose the game the game if your character's `HP` falls to zero or below.

#### Game design notes

* Each character in the game has 3 attributes: `HP`, `Attack Power` and `Counter Attack Power`.

* Each time your character attacks, their Attack Power increases by its base Attack Power. 
  * For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
* The enemy character only has `Counter Attack Power`. 

  * Unlike your character's `Attack Points`, `Counter Attack Power` never changes.

* The `HP`, `Attack Power` and `Counter Attack Power` of each character differs.

* No characters in the game can heal or recover `HP`. 

  * A winning player must pick their characters wisely by first fighting an enemy with low `Counter Attack Power`. This will allow you to grind `Attack Power` and to take on enemies before you lose all of your `HP`.

* You can to win or lose the game no matter what character you choose. The challenge comes from picking the right enemies, not choosing the strongest player.