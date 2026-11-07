import guilderia

from functools import reduce
from operator import or_

def test_permissions_all():
    assert guilderia.Permissions.all().value == reduce(or_, guilderia.Permissions.VALID_FLAGS.values())
