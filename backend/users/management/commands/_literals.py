from faker import Faker

fake = Faker('pl_PL')
fake.seed(4321)

HOW_MUCH_DEMO_USERS = 2
DEMO_USER_PASSWORD = "password123"
DEMO_USER_FIRST_NAME = [fake.first_name() for _ in range(HOW_MUCH_DEMO_USERS)]
DEMO_USER_EMAIL = [fake.email() for _ in range(HOW_MUCH_DEMO_USERS)]
