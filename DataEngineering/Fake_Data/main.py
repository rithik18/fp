# from faker import Faker
# import random
# import csv
# from enum import Enum
# from datetime import datetime
# import uuid
# # Initialize Faker
# fake = Faker()

# # Define the Department enum
# class Department(Enum):
#     ADMIN = "ADMIN"
#     FULL_STACK = "FULL_STACK"
#     DATA_ANALYTICS = "DATA_ANALYTICS"
#     DATA_ENGINEERING = "DATA_ENGINEERING"
#     DEVOPS = "DEVOPS"
#     OTHER = "OTHER"

# # Define the competency enum
# class Competency(Enum):
#     BEGINNER = "BEGINNER"
#     INTERMEDIATE = "INTERMEDIATE"
#     ADVANCED = "ADVANCED"
#     EXPERT = "EXPERT"

# # Function to create fake users
# def create_fake_user():
#     return {
#         "_id": fake.uuid4(),
#         "name": fake.name(),
#         "role_id": fake.uuid4(),
#         "joining_date": fake.date_time_this_decade().isoformat(),  # Use date_time instead
#         "department": random.choice(list(Department)).value,
#         "mail": fake.unique.email(),
#         "created_at": fake.date_time_this_decade().isoformat(),
#         "updated_at": fake.date_time_this_decade().isoformat(),
#         "password": fake.password(),
#         "profileImage": fake.image_url(),  # Default or random image URL
#     }

# # Function to create fake certifications
# def create_fake_certification():
#     return {
#         "_id": fake.uuid4(),
#         "name": fake.company(),
#         "issued_by": fake.company_suffix(),
#         "is_certificate": random.choice([True, False]),
#     }

# # Function to create fake skills
# def create_fake_skill():
#     return {
#         "_id": fake.uuid4(),
#         "name": fake.word(),
#         "created_at": fake.date_time_this_decade().isoformat(),
#         "updated_at": fake.date_time_this_decade().isoformat(),
#         "desc": fake.sentence(),
#     }

# # Function to create fake user certifications
# def create_fake_user_certification(user_id, certification_id):
#     return {
#         "_id": fake.uuid4(),
#         "userId": user_id,
#         "certificationId": certification_id,
#         "certificationName": fake.company(),
#         "started_at": fake.date_time_this_decade().isoformat(),
#         "completed_at": fake.date_time_this_decade().isoformat(),
#         "competency": random.choice(list(Competency)).value,
#         "isVerified": random.choice([True, False]),
#         "imageData": fake.image_url(),
#     }

# # Function to create fake user skills
# def create_fake_user_skill(user_id, skill_id):
#     return {
#         "_id": fake.uuid4(),
#         "userId": user_id,
#         "skillId": skill_id,
#         "score": random.randint(1, 100),
#     }

# # Function to create fake roles
# def create_fake_role():
#     return {
#         "_id": fake.uuid4(),
#         "name": fake.word(),
#         "desc": fake.sentence(),
#         "created_at": fake.date_time_this_decade().isoformat(),
#         "updated_at": fake.date_time_this_decade().isoformat(),
#     }
# def create_fake_role_skill(role_id, skill_id):
#     return {
#         "_id": str(uuid.uuid4()),  # Generate a new UUID
#         "RoleId": role_id,
#         "skillId": skill_id,
#         "department": random.choice(list(Department)).value,  # Randomly select a department
#     }
# # Generate fake data
# num_users = 10000
# num_certifications = 100
# num_skills = 100
# num_roles = 20

# # Generate users, certifications, skills, and roles
# users = [create_fake_user() for _ in range(num_users)]
# certifications = [create_fake_certification() for _ in range(num_certifications)]
# skills = [create_fake_skill() for _ in range(num_skills)]
# roles = [create_fake_role() for _ in range(num_roles)]

# # Create user certifications and user skills with the generated IDs
# user_certifications = [
#     create_fake_user_certification(user["_id"], random.choice(certifications)["_id"])
#     for user in users
# ]

# user_skills = [
#     create_fake_user_skill(user["_id"], random.choice(skills)["_id"])
#     for user in users
# ]
# role_skills = [
#     create_fake_role_skill(role["_id"], random.choice(skills)["_id"])
#     for role in roles
# ]

# # Function to write data to CSV
# def write_to_csv(data, filename, fieldnames):
#     with open(filename, mode='w', newline='') as file:
#         writer = csv.DictWriter(file, fieldnames=fieldnames)
#         writer.writeheader()
#         writer.writerows(data)

# # Write each dataset to a CSV file
# write_to_csv(users, 'users.csv', users[0].keys())
# write_to_csv(certifications, 'certifications.csv', certifications[0].keys())
# write_to_csv(skills, 'skills.csv', skills[0].keys())
# write_to_csv(roles, 'roles.csv', roles[0].keys())
# write_to_csv(user_certifications, 'user_certifications.csv', user_certifications[0].keys())
# write_to_csv(user_skills, 'user_skills.csv', user_skills[0].keys())
# write_to_csv(role_skills, 'role_skills.csv', role_skills[0].keys())

# print("Data has been written to CSV files.")
from faker import Faker
from datetime import timedelta
import random
import csv
from enum import Enum
from datetime import datetime
import uuid

# Initialize Faker
fake = Faker()

# Define the Department enum
class Department(Enum):
    ADMIN = "ADMIN"
    FULL_STACK = "FULL_STACK"
    DATA_ANALYTICS = "DATA_ANALYTICS"
    DATA_ENGINEERING = "DATA_ENGINEERING"
    DEVOPS = "DEVOPS"
    OTHER = "OTHER"

# Define the competency enum
class Competency(Enum):
    BEGINNER = "BEGINNER"
    INTERMEDIATE = "INTERMEDIATE"
    ADVANCED = "ADVANCED"
    EXPERT = "EXPERT"

# Function to create fake users
def create_fake_user(role_ids):
    return {
        "_id": fake.uuid4(),
        "name": fake.name(),
        "role_id": random.choice(role_ids),  # Select role_id from the passed list
        "joining_date": fake.date_time_this_decade().isoformat(),
        "department": random.choice(list(Department)).value,
        "mail": fake.unique.email(),
        "created_at": fake.date_time_this_decade().isoformat(),
        "updated_at": fake.date_time_this_decade().isoformat(),
        "password": fake.password(),
        "profileImage": fake.image_url(),
    }

# Function to create fake certifications
def create_fake_certification():
    return {
        "_id": fake.uuid4(),
        "name": fake.company(),
        "issued_by": fake.company_suffix(),
        "is_certificate": random.choice([True, False]),
    }

# Function to create fake skills
def create_fake_skill():
    return {
        "_id": fake.uuid4(),
        "name": fake.word(),
        "created_at": fake.date_time_this_decade().isoformat(),
        "updated_at": fake.date_time_this_decade().isoformat(),
        "desc": fake.sentence(),
    }

# Function to create fake user certifications
def create_fake_user_certification(user_id, certification_id, certification_name):
    # Generate the started_at date
    started_at = fake.date_time_this_decade()

    # Generate a random duration between 1 day and 5 years
    duration = random.randint(1, 365 * 5)  # Adjust the range as needed
    completed_at = started_at + timedelta(days=duration)

    return {
        "_id": fake.uuid4(),
        "userId": user_id,
        "certificationId": certification_id,
        "certificationName": certification_name,
        "started_at": started_at.isoformat(),
        "completed_at": completed_at.isoformat(),
        "competency": random.choice(list(Competency)).value,
        "isVerified": random.choice([True, False]),
        "imageData": fake.image_url(),
    }

# Function to create fake user skills
def create_fake_user_skill(user_id, skill_id):
    return {
        "_id": fake.uuid4(),
        "userId": user_id,
        "skillId": skill_id,
        "score": random.randint(1, 100),
    }

# Function to create fake roles
def create_fake_role():
    return {
        "_id": fake.uuid4(),
        "name": fake.word(),
        "desc": fake.sentence(),
        "created_at": fake.date_time_this_decade().isoformat(),
        "updated_at": fake.date_time_this_decade().isoformat(),
    }

def create_fake_role_skill(role_id, skill_id):
    return {
        "_id": str(uuid.uuid4()),  # Generate a new UUID
        "RoleId": role_id,
        "skillId": skill_id,
        "department": random.choice(list(Department)).value,
    }

# Generate fake data
num_users = 30000
num_certifications = 100
num_skills = 100
num_roles = 20

# Generate roles first
roles = [create_fake_role() for _ in range(num_roles)]

# Extract role IDs for later use
role_ids = [role["_id"] for role in roles]

# Generate users using the role IDs
users = [create_fake_user(role_ids) for _ in range(num_users)]
certifications = [create_fake_certification() for _ in range(num_certifications)]
skills = [create_fake_skill() for _ in range(num_skills)]

# Create user certifications and user skills with the generated IDs
user_certifications = [
    create_fake_user_certification(
        user["_id"],
        cert["_id"],
        cert["name"]
    )
    for user in users
    for cert in random.sample(certifications, k=min(5, len(certifications)))
]

user_skills = [
    create_fake_user_skill(user["_id"], random.choice(skills)["_id"])
    for user in users
]
skills_per_role = 10  # Set minimum skills per role
total_skills = len(skills)
role_skills = []

for role in roles:
    assigned_skills = random.sample(skills, min(skills_per_role, total_skills))  # Get 10 unique skills
    for skill in assigned_skills:
        role_skills.append(create_fake_role_skill(role["_id"], skill["_id"]))

# If you want to fill up the remaining skills (if there are less than 200 entries), continue assigning
while len(role_skills) < 200:
    role = random.choice(roles)  # Pick a random role
    assigned_skills = random.sample(skills, min(skills_per_role, total_skills))  # Get another 10 unique skills
    for skill in assigned_skills:
        role_skills.append(create_fake_role_skill(role["_id"], skill["_id"]))

# Function to write data to CSV
def write_to_csv(data, filename, fieldnames):
    with open(filename, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)

# Write each dataset to a CSV file
write_to_csv(users, 'users.csv', users[0].keys())
write_to_csv(certifications, 'certifications.csv', certifications[0].keys())
write_to_csv(skills, 'skills.csv', skills[0].keys())
write_to_csv(roles, 'roles.csv', roles[0].keys())
write_to_csv(user_certifications, 'user_certifications.csv', user_certifications[0].keys())
write_to_csv(user_skills, 'user_skills.csv', user_skills[0].keys())
write_to_csv(role_skills, 'role_skills.csv', role_skills[0].keys())

print("Data has been written to CSV files.")
