import random
from django.contrib.auth import get_user_model
from faker import Faker

from tasks.models import TaskCategory, BaseTask, SubTask, TaskStatus

CustomUser = get_user_model()

fake = Faker('pl_PL')
fake.seed(4321)
random.seed(4321)


HOW_MUCH_TASK_CATEGORIES = 4
DEMO_TASK_CATEGORY_NAME = [
    fake.word() for _ in range(HOW_MUCH_TASK_CATEGORIES)
]
DEMO_TASK_CATEGORY_COLOR = [
    random.choice(TaskCategory.CATEGORY_COLORS)[0] for _ in range(HOW_MUCH_TASK_CATEGORIES)
]


HOW_MUCH_TASKS = 70
DEMO_TASK_RANDOM_USER = [
    random.choice(CustomUser.objects.filter(is_staff=False)) for _ in range(HOW_MUCH_TASKS)
]
DEMO_TASK_RANDOM_TITLE = [
    fake.paragraph(nb_sentences=1) for _ in range(HOW_MUCH_TASKS)
]
DEMO_TASK_RANDOM_PRIORITY = [
    random.choice(BaseTask.CHOICES_MATRIX)[0] for _ in range(HOW_MUCH_TASKS)
]
DEMO_TASK_RANDOM_STATUS = [
    random.choice(TaskStatus.objects.all()) for _ in range(HOW_MUCH_TASKS)
]


HOW_MUCH_SUB_TASKS = 10
DEMO_SUB_TASK_RANDOM_TITLE = [
    fake.paragraph(nb_sentences=1) for _ in range(HOW_MUCH_SUB_TASKS)
]
DEMO_SUB_TASK_RANDOM_STATUS = [
    random.choice(SubTask.SUBTASK_STATUSES)[0] for _ in range(HOW_MUCH_SUB_TASKS)
]
