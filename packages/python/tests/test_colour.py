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


@pytest.mark.parametrize(
    ('value', 'expected'),
    [
        ('0xFF1294', 0xFF1294),
        ('0xff1294', 0xFF1294),
        ('0xFFF', 0xFFFFFF),
        ('0xfff', 0xFFFFFF),
        ('#abcdef', 0xABCDEF),
        ('#ABCDEF', 0xABCDEF),
        ('#ABC', 0xAABBCC),
        ('#abc', 0xAABBCC),
        ('rgb(68,36,59)', 0x44243B),
        ('rgb(26.7%, 14.1%, 23.1%)', 0x44243B),
        ('rgb(20%, 24%, 56%)', 0x333D8F),
        ('rgb(20%, 23.9%, 56.1%)', 0x333D8F),
        ('rgb(51, 61, 143)', 0x333D8F),
        ('0x#333D8F', 0x333D8F),
    ],
)
def test_from_str(value, expected):
    assert guilderia.Colour.from_str(value) == guilderia.Colour(expected)


@pytest.mark.parametrize(
    ('value'),
    [
        None,
        'not valid',
        '0xYEAH',
        '#YEAH',
        '#yeah',
        'yellow',
        'rgb(-10, -20, -30)',
        'rgb(30, -1, 60)',
        'invalid(a, b, c)',
        'rgb(',
        '#1000000',
        '#FFFFFFF',
        "rgb(101%, 50%, 50%)",
        "rgb(50%, -10%, 50%)",
        "rgb(50%, 50%, 150%)",
        "rgb(256, 100, 100)",
    ],
)
def test_from_str_failures(value):
    with pytest.raises(ValueError):
        guilderia.Colour.from_str(value)


@pytest.mark.parametrize(
    ('value', 'expected'),
    [
        (guilderia.Colour.default(), 0x000000),
        (guilderia.Colour.teal(), 0x1ABC9C),
        (guilderia.Colour.dark_teal(), 0x11806A),
        (guilderia.Colour.brand_green(), 0x57F287),
        (guilderia.Colour.green(), 0x2ECC71),
        (guilderia.Colour.dark_green(), 0x1F8B4C),
        (guilderia.Colour.blue(), 0x3498DB),
        (guilderia.Colour.dark_blue(), 0x206694),
        (guilderia.Colour.purple(), 0x9B59B6),
        (guilderia.Colour.dark_purple(), 0x71368A),
        (guilderia.Colour.magenta(), 0xE91E63),
        (guilderia.Colour.dark_magenta(), 0xAD1457),
        (guilderia.Colour.gold(), 0xF1C40F),
        (guilderia.Colour.dark_gold(), 0xC27C0E),
        (guilderia.Colour.orange(), 0xE67E22),
        (guilderia.Colour.dark_orange(), 0xA84300),
        (guilderia.Colour.brand_red(), 0xED4245),
        (guilderia.Colour.red(), 0xE74C3C),
        (guilderia.Colour.dark_red(), 0x992D22),
        (guilderia.Colour.lighter_grey(), 0x95A5A6),
        (guilderia.Colour.dark_grey(), 0x607D8B),
        (guilderia.Colour.light_grey(), 0x979C9F),
        (guilderia.Colour.darker_grey(), 0x546E7A),
        (guilderia.Colour.og_blurple(), 0x7289DA),
        (guilderia.Colour.blurple(), 0x5865F2),
        (guilderia.Colour.greyple(), 0x99AAB5),
        (guilderia.Colour.ash_theme(), 0x2E2E34),
        (guilderia.Colour.dark_theme(), 0x1A1A1E),
        (guilderia.Colour.onyx_theme(), 0x070709),
        (guilderia.Colour.light_theme(), 0xFBFBFB),
        (guilderia.Colour.fuchsia(), 0xEB459E),
        (guilderia.Colour.yellow(), 0xFEE75C),
        (guilderia.Colour.ash_embed(), 0x37373E),
        (guilderia.Colour.dark_embed(), 0x242429),
        (guilderia.Colour.onyx_embed(), 0x131416),
        (guilderia.Colour.light_embed(), 0xFFFFFF),
        (guilderia.Colour.pink(), 0xEB459F),
    ],
)
def test_static_colours(value, expected):
    assert value.value == expected


@pytest.mark.parametrize(
    ('value', 'property', 'expected'),
    [
        (guilderia.Colour(0x000000), 'r', 0),
        (guilderia.Colour(0xFFFFFF), 'g', 255),
        (guilderia.Colour(0xABCDEF), 'b', 239),
        (guilderia.Colour(0x44243B), 'r', 68),
        (guilderia.Colour(0x333D8F), 'g', 61),
        (guilderia.Colour(0xDBFF00), 'b', 0),
    ],
)
def test_colour_properties(value, property, expected):
    assert getattr(value, property) == expected
