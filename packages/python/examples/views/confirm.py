# This example requires the 'message_content' privileged intent to function.

from guilderia.ext import commands

import guilderia


class Bot(commands.Bot):
    user: guilderia.ClientUser

    def __init__(self):
        intents = guilderia.Intents.default()
        intents.message_content = True

        super().__init__(command_prefix=commands.when_mentioned_or('$'), intents=intents)

    async def on_ready(self):
        print(f'Logged in as {self.user} (ID: {self.user.id})')
        print('------')


# Define a simple View that gives us a confirmation menu
class Confirm(guilderia.ui.View):
    def __init__(self):
        super().__init__()
        self.value = None

    # When the confirm button is pressed, set the inner value to `True` and
    # stop the View from listening to more input.
    # We also send the user an ephemeral message that we're confirming their choice.
    @guilderia.ui.button(label='Confirm', style=guilderia.ButtonStyle.green)
    async def confirm(self, interaction: guilderia.Interaction, button: guilderia.ui.Button):
        await interaction.response.send_message('Confirming', ephemeral=True)
        self.value = True
        self.stop()

    # This one is similar to the confirmation button except sets the inner value to `False`
    @guilderia.ui.button(label='Cancel', style=guilderia.ButtonStyle.grey)
    async def cancel(self, interaction: guilderia.Interaction, button: guilderia.ui.Button):
        await interaction.response.send_message('Cancelling', ephemeral=True)
        self.value = False
        self.stop()


bot = Bot()


@bot.command()
async def ask(ctx: commands.Context):
    """Asks the user a question to confirm something."""
    # We create the view and assign it to a variable so we can wait for it later.
    view = Confirm()
    await ctx.send('Do you want to continue?', view=view)
    # Wait for the View to stop listening for input...
    await view.wait()
    if view.value is None:
        print('Timed out...')
    elif view.value:
        print('Confirmed...')
    else:
        print('Cancelled...')


bot.run('token')
