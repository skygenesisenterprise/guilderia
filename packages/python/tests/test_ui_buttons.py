"""
The MIT License (MIT)

Copyright (c) 2015-present Rapptz

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
"""

from __future__ import annotations

import guilderia
import pytest


def test_button_init():
    button = guilderia.ui.Button(
        label="Click me!",
    )
    assert button.label == "Click me!"
    assert button.style == guilderia.ButtonStyle.secondary
    assert button.disabled == False
    assert button.url == None
    assert button.emoji == None
    assert button.sku_id == None


def test_button_with_sku_id():
    button = guilderia.ui.Button(
        label="Click me!",
        sku_id=1234567890,
    )
    assert button.label == "Click me!"
    assert button.style == guilderia.ButtonStyle.premium
    assert button.sku_id == 1234567890


def test_button_with_url():
    button = guilderia.ui.Button(
        label="Click me!",
        url="https://example.com",
    )
    assert button.label == "Click me!"
    assert button.style == guilderia.ButtonStyle.link
    assert button.url == "https://example.com"


def test_mix_both_custom_id_and_url():
    with pytest.raises(TypeError):
        guilderia.ui.Button(
            label="Click me!",
            url="https://example.com",
            custom_id="test",
        )


def test_mix_both_custom_id_and_sku_id():
    with pytest.raises(TypeError):
        guilderia.ui.Button(
            label="Click me!",
            sku_id=1234567890,
            custom_id="test",
        )


def test_mix_both_url_and_sku_id():
    with pytest.raises(TypeError):
        guilderia.ui.Button(
            label="Click me!",
            url="https://example.com",
            sku_id=1234567890,
        )


def test_invalid_url():
    button = guilderia.ui.Button(
        label="Click me!",
    )
    with pytest.raises(TypeError):
        button.url = 1234567890  # type: ignore


def test_invalid_custom_id():
    with pytest.raises(TypeError):
        guilderia.ui.Button(
            label="Click me!",
            custom_id=1234567890,  # type: ignore
        )

    button = guilderia.ui.Button(
        label="Click me!",
    )
    with pytest.raises(TypeError):
        button.custom_id = 1234567890  # type: ignore


def test_button_with_partial_emoji():
    button = guilderia.ui.Button(
        label="Click me!",
        emoji="👍",
    )
    assert button.label == "Click me!"
    assert button.emoji is not None and button.emoji.name == "👍"


def test_button_with_str_emoji():
    emoji = guilderia.PartialEmoji(name="👍")
    button = guilderia.ui.Button(
        label="Click me!",
        emoji=emoji,
    )
    assert button.label == "Click me!"
    assert button.emoji == emoji


def test_button_with_invalid_emoji():
    with pytest.raises(TypeError):
        guilderia.ui.Button(
            label="Click me!",
            emoji=-0.53,  # type: ignore
        )

    button = guilderia.ui.Button(
        label="Click me!",
    )
    with pytest.raises(TypeError):
        button.emoji = -0.53  # type: ignore


def test_button_setter():
    button = guilderia.ui.Button()

    button.label = "Click me!"
    assert button.label == "Click me!"

    button.style = guilderia.ButtonStyle.primary
    assert button.style == guilderia.ButtonStyle.primary

    button.disabled = True
    assert button.disabled == True

    button.url = "https://example.com"
    assert button.url == "https://example.com"

    button.emoji = "👍"
    assert button.emoji is not None and button.emoji.name == "👍"  # type: ignore

    button.custom_id = "test"
    assert button.custom_id == "test"

    button.sku_id = 1234567890
    assert button.sku_id == 1234567890
