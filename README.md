# Pong-QLearning
Using QLearning (Reinforcement Learning Technique) to teach a bot to play perfectly

# Purpose

To create a QLearning Bot without any imported modules to play against a Perfect Bot and learn to replicate it.

# Types of Players:

Player

  The User can control the paddle with w, s keys if they are red and up arrow, and down arrow if they are blue.
  
Bot

  The Bot is an undefeatable bot that can calculate the position where the ball is headed and moves the paddle in that location.
  
QLearning Bot

  The QLearning Bot is bot that learns from playing the Perfect Bot.

# Files:

index.html

  This is the main file. The user can alter the source file (Shown the location in the file) to choose the mode.
  
PlayerVsPlayer.js

  When using this file The User can control the red player, and blue player. To control the red player the user must press w to go up and s to go down. To control the blue player the usesr must press up arrow to go up and down arrow to go down.
  
PlayerVsBot.js

  When using this file The User can control the red player, and the bot will control the blue player.  To control the red player the user must press w to go up and s to go down.
  
BotVsBot.js

  When using this file both players are controled by the bot.
  
SaveQTable.js

  When using this file the QLearning model will play against the perfect bot for a specified time and save it's memory in a json file. In this file the user can alter filename   to select the filename for the memory of the model to be saved in, and the variable trainingtime to alter the training time of the model.

LoadQTable.js

  When using this file the saved file from SaveQTable.js must be moved to the same directory as this file. After altering the variable filename to correct name then this file will   load the memory and play against the Bot.
  
# Observations

Shown in the excel file named QLearningObservations

# Conclusion

The Qlearning bot after 120 minutes of playing against the perfect bot can survive on average of 37 minutes.
