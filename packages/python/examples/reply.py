# This example requires the 'message_content' privileged intent to function.

import guilderia


class MyClient(guilderia.Client):
    # Suppress error on the User attribute being None since it fills up later
    user: guilderia.ClientUser

    async def on_ready(self):
        print(f'Logged in as {self.user} (ID: {self.user.id})')
        print('------')

    async def on_message(self, message):
        # we do not want the bot to reply to itself
        if message.author.id == self.user.id:
            return

        if message.content.startswith('!hello'):
            await message.reply('Hello!', mention_author=True)


intents = guilderia.Intents.default()
intents.message_content = True

client = MyClient(intents=intents)
client.run('token')
