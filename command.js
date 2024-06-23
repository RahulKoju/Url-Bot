const { REST, Routes } =require('discord.js');
const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
];
const rest = new REST({ version: '10' }).setToken('MTI1MTE3MzI5MTE3NjA5OTg0MA.GcY-0y.MAkGgpm2FNhdgpJuP-OVBPLxYn69xBHlNTjh80');
(async()=>{
    try {
        console.log('Started refreshing application (/) commands.');
      
        await rest.put(Routes.applicationCommands("1251173291176099840"), { body: commands });
      
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
})();
