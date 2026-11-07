import guilderia
from guilderia import app_commands

import traceback

# The guild in which this slash command will be registered.
# It is recommended to have a test guild to separate from your "production" bot
TEST_GUILD = guilderia.Object(0)
# The ID of the channel where reports will be sent to
REPORTS_CHANNEL_ID = 0


class MyClient(guilderia.Client):
    # Suppress error on the User attribute being None since it fills up later
    user: guilderia.ClientUser

    def __init__(self) -> None:
        # Just default intents and a `discord.Client` instance
        # We don't need a `commands.Bot` instance because we are not
        # creating text-based commands.
        intents = guilderia.Intents.default()
        super().__init__(intents=intents)

        # We need an `discord.app_commands.CommandTree` instance
        # to register application commands (slash commands in this case)
        self.tree = app_commands.CommandTree(self)

    async def on_ready(self):
        print(f'Logged in as {self.user} (ID: {self.user.id})')
        print('------')

    async def setup_hook(self) -> None:
        await self.tree.sync(guild=TEST_GUILD)


# Define a modal dialog for reporting issues or feedback
class ReportModal(guilderia.ui.Modal, title='Your Report'):
    topic = guilderia.ui.Label(
        text='Topic',
        description='Select the topic of the report.',
        component=guilderia.ui.Select(
            placeholder='Choose a topic...',
            options=[
                guilderia.SelectOption(label='Bug', description='Report a bug in the bot'),
                guilderia.SelectOption(label='Feedback', description='Provide feedback or suggestions'),
                guilderia.SelectOption(label='Feature Request', description='Request a new feature'),
                guilderia.SelectOption(label='Performance', description='Report performance issues'),
                guilderia.SelectOption(label='UI/UX', description='Report user interface or experience issues'),
                guilderia.SelectOption(label='Security', description='Report security vulnerabilities'),
                guilderia.SelectOption(label='Other', description='Other types of reports'),
            ],
        ),
    )
    report_title = guilderia.ui.Label(
        text='Title',
        description='A short title for the report.',
        component=guilderia.ui.TextInput(
            style=guilderia.TextStyle.short,
            placeholder='The bot does not respond to commands',
            max_length=120,
        ),
    )
    description = guilderia.ui.Label(
        text='Description',
        description='A detailed description of the report.',
        component=guilderia.ui.TextInput(
            style=guilderia.TextStyle.paragraph,
            placeholder='When I use /ping, the bot does not respond at all. There are no error messages.',
            max_length=2000,
        ),
    )
    images = guilderia.ui.Label(
        text='Images',
        description='Upload any relevant images for your report (optional).',
        component=guilderia.ui.FileUpload(
            max_values=10,
            custom_id='report_images',
            required=False,
        ),
    )
    footer = guilderia.ui.TextDisplay(
        'Please ensure your report follows the server rules. Any kind of abuse will result in a ban.'
    )

    def to_view(self, interaction: guilderia.Interaction) -> guilderia.ui.LayoutView:
        # Tell the type checker what our components are...
        assert isinstance(self.topic.component, guilderia.ui.Select)
        assert isinstance(self.description.component, guilderia.ui.TextInput)
        assert isinstance(self.report_title.component, guilderia.ui.TextInput)
        assert isinstance(self.images.component, guilderia.ui.FileUpload)

        topic = self.topic.component.values[0]
        title = self.report_title.component.value
        description = self.description.component.value
        files = self.images.component.values

        view = guilderia.ui.LayoutView()
        container = guilderia.ui.Container()
        view.add_item(container)

        container.add_item(guilderia.ui.TextDisplay(f'-# User Report\n## {topic}'))

        timestamp = guilderia.utils.format_dt(interaction.created_at, 'F')
        footer = guilderia.ui.TextDisplay(f'-# Reported by {interaction.user} (ID: {interaction.user.id}) | {timestamp}')

        container.add_item(guilderia.ui.TextDisplay(f'### {title}'))
        container.add_item(guilderia.ui.TextDisplay(f'>>> {description}'))

        if files:
            gallery = guilderia.ui.MediaGallery()
            gallery.items = [guilderia.MediaGalleryItem(media=attachment.url) for attachment in files]
            container.add_item(gallery)

        container.add_item(footer)
        return view

    async def on_submit(self, interaction: guilderia.Interaction[MyClient]):
        view = self.to_view(interaction)

        # Send the report to the designated channel
        reports_channel = interaction.client.get_partial_messageable(REPORTS_CHANNEL_ID)
        await reports_channel.send(view=view)
        await interaction.response.send_message('Thank you for your report! We will look into it shortly.', ephemeral=True)

    async def on_error(self, interaction: guilderia.Interaction, error: Exception) -> None:
        await interaction.response.send_message('Oops! Something went wrong.', ephemeral=True)

        # Make sure we know what the error actually is
        traceback.print_exception(type(error), error, error.__traceback__)


client = MyClient()


@client.tree.command(guild=TEST_GUILD, description='Report an issue or provide feedback.')
async def report(interaction: guilderia.Interaction):
    # Send the modal with an instance of our `ReportModal` class
    # Since modals require an interaction, they cannot be done as a response to a text command.
    # They can only be done as a response to either an application command or a button press.
    await interaction.response.send_modal(ReportModal())


client.run('token')
