from faker import Faker
import random
from tasks.models import TaskCategory


fake = Faker('pl_PL')
fake.seed(4321)


HOW_MUCH_SUB_TASKS = 10
HOW_MUCH_TASKS = 10

HOW_MUCH_DEMO_USERS = 10
DEMO_USER_PASSWORD = "password123"
DEMO_USER_FIRST_NAME = [fake.first_name() for _ in range(HOW_MUCH_DEMO_USERS)]
DEMO_USER_EMAIL = [fake.email() for _ in range(HOW_MUCH_DEMO_USERS)]

HOW_MUCH_TASK_CATEGORIES = 10
DEMO_TASK_CATEGORY_NAME = [fake.word() for _ in range(HOW_MUCH_TASK_CATEGORIES)]
DEMO_TASK_CATEGORY_COLOR = [random.choice(TaskCategory.CATEGORY_COLORS)[0] for _ in range(HOW_MUCH_TASK_CATEGORIES)]
