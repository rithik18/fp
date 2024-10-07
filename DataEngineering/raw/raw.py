import os
import csv
import random
import logging
from dotenv import load_dotenv
from faker import Faker
from pymongo import MongoClient
from enum import Enum

# Load environment variables from a specific .env file path
load_dotenv('/path/to/your/.env')  # Update this to your .env file's path
MONGO_URI = os.getenv("DATABASE_URL")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Faker
fake = Faker()

# Define enums
class Department(Enum):
    ADMIN = "ADMIN"
    FULL_STACK = "FULL_STACK"
    DATA_ANALYTICS = "DATA_ANALYTICS"
    DATA_ENGINEERING = "DATA_ENGINEERING"
    DEVOPS = "DEVOPS"
    OTHER = "OTHER"

class Competency(Enum):
    BEGINNER = "BEGINNER"
    INTERMEDIATE = "INTERMEDIATE"
    ADVANCED = "ADVANCED"
    EXPERT = "EXPERT"

# Connect to MongoDB
try:
    client = MongoClient(MONGO_URI)
    db = client['your_database_name']  # Replace with your database name
    logger.info("Successfully connected to MongoDB.")
except Exception as e:
    logger.error("Failed to connect to MongoDB: %s", e)

# Fetch existing data
def fetch_existing_data():
    logger.info("Fetching existing data from the database...")
    users = list(db.users.find())
    certifications = list(db.certifications.find())
    skills = list(db.skills.find())
    roles = list(db.roles.find())
    logger.info("Fetched %d users, %d certifications, %d skills, and %d roles.", len(users), len(certifications), len(skills), len(roles))
    return users, certifications, skills, roles

# Create fake user data
def create_fake_user(existing_user=None):
    if existing_user:
        return {
            "id": existing_user["_id"],
            "name": existing_user["name"],
            "role_id": existing_user["role_id"],
            "joining_date": existing_user["joining_date"],
            "department": existing_user["department"],
            "mail": existing_user["mail"],
            "created_at": existing_user["created_at"],
            "updated_at": existing_user["updated_at"],
            "password": existing_user["password"],
            "profileImage": existing_user.get("profileImage", None),
        }
    return {
        "id": fake.uuid4(),
        "name": fake.name(),
        "role_id": fake.uuid4(),
        "joining_date": fake.date_time_this_decade().isoformat(),
        "department": random.choice(list(Department)).value,
        "mail": fake.unique.email(),
        "created_at": fake.date_time_this_decade().isoformat(),
        "updated_at": fake.date_time_this_decade().isoformat(),
        "password": fake.password(),
        "profileImage": None,
    }

# Create fake certification data
def create_fake_certification(existing_certification=None):
    if existing_certification:
        return {
            "id": existing_certification["_id"],
            "name": existing_certification["name"],
            "issued_by": existing_certification["issued_by"],
            "is_certificate": existing_certification["is_certificate"],
        }
    return {
        "id": fake.uuid4(),
        "name": fake.bs(),
        "issued_by": fake.company(),
        "is_certificate": random.choice([True, False]),
    }

# Create fake skill data
def create_fake_skill(existing_skill=None):
    if existing_skill:
        return {
            "id": existing_skill["_id"],
            "name": existing_skill["name"],
            "desc": existing_skill["desc"],
            "created_at": existing_skill["created_at"],
            "updated_at": existing_skill["updated_at"],
        }
    return {
        "id": fake.uuid4(),
        "name": fake.word(),
        "desc": fake.sentence(),
        "created_at": fake.date_time_this_decade().isoformat(),
        "updated_at": fake.date_time_this_decade().isoformat(),
    }

# Create fake role data
def create_fake_role(existing_role=None):
    if existing_role:
        return {
            "id": existing_role["_id"],
            "name": existing_role["name"],
            "desc": existing_role["desc"],
            "created_at": existing_role["created_at"],
            "updated_at": existing_role["updated_at"],
        }
    return {
        "id": fake.uuid4(),
        "name": fake.word(),
        "desc": fake.sentence(),
        "created_at": fake.date_time_this_decade().isoformat(),
        "updated_at": fake.date_time_this_decade().isoformat(),
    }

# Create fake user certification data
def create_fake_user_certification(existing_user_cert=None, user_id=None, cert_id=None):
    if existing_user_cert:
        return {
            "id": existing_user_cert["_id"],
            "userId": existing_user_cert["userId"],
            "certificationId": existing_user_cert["certificationId"],
            "certificationName": existing_user_cert["certificationName"],
            "started_at": existing_user_cert["started_at"],
            "completed_at": existing_user_cert["completed_at"],
            "competency": existing_user_cert["competency"],
            "isVerified": existing_user_cert["isVerified"],
            "imageData": existing_user_cert["imageData"],
        }
    return {
        "id": fake.uuid4(),
        "userId": user_id,
        "certificationId": cert_id,
        "certificationName": fake.bs(),
        "started_at": fake.date_time_this_decade().isoformat(),
        "completed_at": fake.date_time_this_decade().isoformat(),
        "competency": random.choice(list(Competency)).value,
        "isVerified": random.choice([True, False]),
        "imageData": fake.image_url(),
    }

# Create fake user skill data
def create_fake_user_skill(existing_user_skill=None, user_id=None, skill_id=None):
    if existing_user_skill:
        return {
            "id": existing_user_skill["_id"],
            "userId": existing_user_skill["userId"],
            "skillId": existing_user_skill["skillId"],
            "score": existing_user_skill["score"],
        }
    return {
        "id": fake.uuid4(),
        "userId": user_id,
        "skillId": skill_id,
        "score": random.randint(1, 10),
    }

# Fetch existing data
users, certifications, skills, roles = fetch_existing_data()

# Create merged data
logger.info("Creating merged data...")
merged_users = [create_fake_user(user) for user in users]
merged_certifications = [create_fake_certification(cert) for cert in certifications]
merged_skills = [create_fake_skill(skill) for skill in skills]
merged_roles = [create_fake_role(role) for role in roles]

# Create User Certifications and Skills
merged_user_certifications = []
for user in merged_users:
    for cert in merged_certifications:
        merged_user_certifications.append(create_fake_user_certification(user_id=user['id'], cert_id=cert['id']))

merged_user_skills = []
for user in merged_users:
    for skill in merged_skills:
        merged_user_skills.append(create_fake_user_skill(user_id=user['id'], skill_id=skill['id']))

# Write merged data to CSV
def write_to_csv(data, filename, fieldnames):
    logger.info("Writing data to %s...", filename)
    with open(filename, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
    logger.info("Successfully wrote to %s", filename)

# Write merged data to CSV
write_to_csv(merged_users, 'raw_users.csv', merged_users[0].keys())
write_to_csv(merged_certifications, 'raw_certifications.csv', merged_certifications[0].keys())
write_to_csv(merged_skills, 'raw_skills.csv', merged_skills[0].keys())
write_to_csv(merged_roles, 'raw_roles.csv', merged_roles[0].keys())
write_to_csv(merged_user_certifications, 'raw_user_certifications.csv', merged_user_certifications[0].keys())
write_to_csv(merged_user_skills, 'raw_user_skills.csv', merged_user_skills[0].keys())

logger.info("Merged data has been written to CSV files.")
