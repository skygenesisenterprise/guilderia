# This example requires the 'members' privileged intent to function.

import guilderia


class MyClient(guilderia.Client):
    # Suppress error on the User attribute being None since it fills up later
    user: guilderia.ClientUser

    async def on_ready(self):
        print(f'Logged in as {self.user} (ID: {self.user.id})')
        print('------')

    async def on_member_join(self, member):
        guild = member.guild
        if guild.system_channel is not None:
            to_send = f'Welcome {member.mention} to {guild.name}!'
            await guild.system_channel.send(to_send)


intents = guilderia.Intents.default()
intents.members = True

client = MyClient(intents=intents)
client.run('token')
