import os
import pytest
from django.core.exceptions import ImproperlyConfigured

from core import utils


def test_get_env_variable_success():
    os.environ["_TEST_ENV_VARIABLE_"] = "_TEST_ENV_VARIABLE_VALUE_"
    env_variable = utils.get_env_variable("_TEST_ENV_VARIABLE_")
    assert env_variable == "_TEST_ENV_VARIABLE_VALUE_"


def test_get_env_variable_failure():
    with pytest.raises(ImproperlyConfigured):
        utils.get_env_variable("_NOT_EXISTED_VARIABLE_")
