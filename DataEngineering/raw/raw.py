# import os
# import csv
# import random
# import logging
# from dotenv import load_dotenv
# from faker import Faker
# from pymongo import MongoClient
# from enum import Enum
# from model import User,Certification,UserCertification,Skill,UserSkill,Role

# # Load environment variables from a specific .env file path
# load_dotenv('C:/Users/RithikHarendarMahesh/Desktop/fp/fullstack/backend/.env')  # Update this to your .env file's path
# MONGO_URI = os.getenv("DATABASE_URL")
# # Configure logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # Initialize Faker
# fake = Faker()

# # Define enums
# class Department(Enum):
#     ADMIN = "ADMIN"
#     FULL_STACK = "FULL_STACK"
#     DATA_ANALYTICS = "DATA_ANALYTICS"
#     DATA_ENGINEERING = "DATA_ENGINEERING"
#     DEVOPS = "DEVOPS"
#     OTHER = "OTHER"

# class Competency(Enum):
#     BEGINNER = "BEGINNER"
#     INTERMEDIATE = "INTERMEDIATE"
#     ADVANCED = "ADVANCED"
#     EXPERT = "EXPERT"

# # Connect to MongoDB
# client = MongoClient(MONGO_URI)
# db = client['db'] 
# logger.info("Successfully connected to MongoDB.")


# # Fetch existing data
# def fetch_existing_data():
#     logger.info("Fetching existing data from the database...")
#     users = list(db['User'].find())
#     certifications = list(db['Certification'].find())
#     skills = list(db['Skill'].find())
#     roles = list(db['Role'].find())
#     userskill = list(db['UserSkill'].find())
#     usercertification = list(db['UserCertification'].find())
#     roleskill = list(db['RoleSkill'].find())

#     #66fad1b6c79fafa475699b3a
#     logger.info("Fetched %d users, %d certifications, %d skills, and %d roles. %d %d %d", len(users), len(certifications), len(skills), len(roles),len(userskill),len(usercertification),len(roleskill))
#     return users, certifications, skills, roles

# # Create fake user data
# def create_fake_user(existing_user=None):
#     if existing_user:
#         return {
#             "_id": existing_user["_id"],
#             "name": existing_user["name"],
#             "role_id": existing_user["role_id"],
#             "joining_date": existing_user["joining_date"],
#             "department": existing_user["department"],
#             "mail": existing_user["mail"],
#             "created_at": existing_user["created_at"],
#             "updated_at": existing_user["updated_at"],
#             "password": existing_user["password"],
#             "profileImage": existing_user.get("profileImage", None),
#         }
#     return {
#         "_id": fake.uuid4(),
#         "name": fake.name(),
#         "role_id": fake.uuid4(),
#         "joining_date": fake.date_time_this_decade().isoformat(),
#         "department": random.choice(list(Department)).value,
#         "mail": fake.unique.email(),
#         "created_at": fake.date_time_this_decade().isoformat(),
#         "updated_at": fake.date_time_this_decade().isoformat(),
#         "password": fake.password(),
#         "profileImage": None,
#     }

# # Create fake certification data
# def create_fake_certification(existing_certification=None):
#     if existing_certification:
#         return {
#             "_id": existing_certification["_id"],
#             "name": existing_certification["name"],
#             "issued_by": existing_certification["issued_by"],
#             "is_certificate": existing_certification["is_certificate"],
#         }
#     return {
#         "_id": fake.uuid4(),
#         "name": fake.bs(),
#         "issued_by": fake.company(),
#         "is_certificate": random.choice([True, False]),
#     }

# # Create fake skill data
# def create_fake_skill(existing_skill=None):
#     if existing_skill:
#         return {
#             "_id": existing_skill["_id"],
#             "name": existing_skill["name"],
#             "desc": existing_skill["desc"],
#             "created_at": existing_skill["created_at"],
#             "updated_at": existing_skill["updated_at"],
#         }
#     return {
#         "_id": fake.uuid4(),
#         "name": fake.word(),
#         "desc": fake.sentence(),
#         "created_at": fake.date_time_this_decade().isoformat(),
#         "updated_at": fake.date_time_this_decade().isoformat(),
#     }

# # Create fake role data
# def create_fake_role(existing_role=None):
#     if existing_role:
#         return {
#             "_id": existing_role["_id"],
#             "name": existing_role["name"],
#             "desc": existing_role["desc"],
#             "created_at": existing_role["created_at"],
#             "updated_at": existing_role["updated_at"],
#         }
#     return {
#         "_id": fake.uuid4(),
#         "name": fake.word(),
#         "desc": fake.sentence(),
#         "created_at": fake.date_time_this_decade().isoformat(),
#         "updated_at": fake.date_time_this_decade().isoformat(),
#     }

# # Create fake user certification data
# def create_fake_user_certification(existing_user_cert=None, user_id=None, cert_id=None):
#     if existing_user_cert:
#         return {
#             "_id": existing_user_cert["_id"],
#             "userId": existing_user_cert["userId"],
#             "certificationId": existing_user_cert["certificationId"],
#             "certificationName": existing_user_cert["certificationName"],
#             "started_at": existing_user_cert["started_at"],
#             "completed_at": existing_user_cert["completed_at"],
#             "competency": existing_user_cert["competency"],
#             "isVerified": existing_user_cert["isVerified"],
#             "imageData": existing_user_cert["imageData"],
#         }
#     return {
#         "_id": fake.uuid4(),
#         "userId": user_id,
#         "certificationId": cert_id,
#         "certificationName": fake.bs(),
#         "started_at": fake.date_time_this_decade().isoformat(),
#         "completed_at": fake.date_time_this_decade().isoformat(),
#         "competency": random.choice(list(Competency)).value,
#         "isVerified": random.choice([True, False]),
#         "imageData": fake.image_url(),
#     }

# # Create fake user skill data
# def create_fake_user_skill(existing_user_skill=None, user_id=None, skill_id=None):
#     if existing_user_skill:
#         return {
#             "_id": existing_user_skill["_id"],
#             "userId": existing_user_skill["userId"],
#             "skillId": existing_user_skill["skillId"],
#             "score": existing_user_skill["score"],
#         }
#     return {
#         "_id": fake.uuid4(),
#         "userId": user_id,
#         "skillId": skill_id,
#         "score": random.randint(1, 10),
#     }

# # Fetch existing data
# users, certifications, skills, roles = fetch_existing_data()

# # Create merged data
# logger.info("Creating merged data...")
# merged_users = [create_fake_user(user) for user in users]
# merged_certifications = [create_fake_certification(cert) for cert in certifications]
# merged_skills = [create_fake_skill(skill) for skill in skills]
# merged_roles = [create_fake_role(role) for role in roles]

# # Create User Certifications and Skills
# merged_user_certifications = []
# for user in merged_users:
#     for cert in merged_certifications:
#         merged_user_certifications.append(create_fake_user_certification(user_id=user['_id'], cert_id=cert['_id']))

# merged_user_skills = []
# for user in merged_users:
#     for skill in merged_skills:
#         merged_user_skills.append(create_fake_user_skill(user_id=user['_id'], skill_id=skill['_id']))

# # Write merged data to CSV
# def write_to_csv(data, filename, fieldnames):
#     logger.info("Writing data to %s...", filename)
#     with open(filename, mode='w', newline='') as file:
#         writer = csv.DictWriter(file, fieldnames=fieldnames)
#         writer.writeheader()
#         writer.writerows(data)
#     logger.info("Successfully wrote to %s", filename)

# # Write merged data to CSV
# write_to_csv(merged_users, 'raw_users.csv', merged_users[0].keys())
# write_to_csv(merged_certifications, 'raw_certifications.csv', merged_certifications[0].keys())
# write_to_csv(merged_skills, 'raw_skills.csv', merged_skills[0].keys())
# write_to_csv(merged_roles, 'raw_roles.csv', merged_roles[0].keys())
# write_to_csv(merged_user_certifications, 'raw_user_certifications.csv', merged_user_certifications[0].keys())
# write_to_csv(merged_user_skills, 'raw_user_skills.csv', merged_user_skills[0].keys())

# logger.info("Merged data has been written to CSV files.")


import os
import csv
import logging
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables
load_dotenv('C:/Users/RithikHarendarMahesh/Desktop/fp/fullstack/backend/.env')
MONGO_URI = os.getenv("DATABASE_URL")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client['db']
logger.info("Successfully connected to MongoDB.")

# Fetch existing data
def fetch_existing_data():
    logger.info("Fetching existing data from the database...")
    users = list(db['User'].find())
    certifications = list(db['Certification'].find())
    skills = list(db['Skill'].find())
    roles = list(db['Role'].find())
    user_skills = list(db['UserSkill'].find())
    user_certifications = list(db['UserCertification'].find())
    role_skills = list(db['RoleSkill'].find())
    
    logger.info("Fetched %d users, %d certifications, %d skills, %d roles, %d user skills, %d user certifications, %d role skills.", 
                len(users), len(certifications), len(skills), len(roles), len(user_skills), len(user_certifications), len(role_skills))
    
    return users, certifications, skills, roles, user_skills, user_certifications, role_skills

# Read data from CSV with handling for missing fields
def read_from_csv(filename, expected_fields):
    with open(filename, mode='r') as file:
        reader = csv.DictReader(file)
        data = []
        for row in reader:
            # Fill missing fields with empty strings
            for field in expected_fields:
                if field not in row:
                    row[field] = ''  # Fill with an empty string
            data.append(row)
        return data

# Merge existing data with CSV data
def merge_data(existing_data, csv_data):
    existing_ids = {item['_id'] for item in existing_data}
    merged_data = existing_data.copy()
    
    for item in csv_data:
        if item['_id'] not in existing_ids:  # Only add new entries
            merged_data.append(item)
    
    return merged_data

# Write merged data to CSV
def write_to_csv(data, filename):
    logger.info("Writing data to %s...", filename)
    with open(filename, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
    logger.info("Successfully wrote to %s", filename)

# Fetch existing data
existing_users, existing_certifications, existing_skills, existing_roles, existing_user_skills, existing_user_certifications, existing_role_skills = fetch_existing_data()

# Define expected fields for each CSV
user_fields = ['_id', 'name', 'role_id', 'joining_date', 'department', 'mail', 'created_at', 'updated_at', 'password', 'profileImage']
certification_fields = ['_id', 'name', 'issued_by', 'is_certificate']
skill_fields = ['_id', 'name', 'desc', 'created_at', 'updated_at']
role_fields = ['_id', 'name', 'desc', 'created_at', 'updated_at']
user_skill_fields = ['_id', 'userId', 'skillId', 'score']
user_certification_fields = ['_id', 'userId', 'certificationId', 'certificationName', 'started_at', 'completed_at', 'competency', 'isVerified', 'imageData']
role_skill_fields = ['_id', 'RoleId', 'skillId']

# Read fake data from CSV files
fake_users = read_from_csv('C:/Users/RithikHarendarMahesh/Desktop/fp/DataEngineering/Fake_Data/users.csv', user_fields)
fake_certifications = read_from_csv('C:/Users/RithikHarendarMahesh/Desktop/fp/DataEngineering/Fake_Data/certifications.csv', certification_fields)
fake_skills = read_from_csv('C:/Users/RithikHarendarMahesh/Desktop/fp/DataEngineering/Fake_Data/skills.csv', skill_fields)
fake_roles = read_from_csv('C:/Users/RithikHarendarMahesh/Desktop/fp/DataEngineering/Fake_Data/roles.csv', role_fields)
fake_user_skills = read_from_csv('C:/Users/RithikHarendarMahesh/Desktop/fp/DataEngineering/Fake_Data/user_skills.csv', user_skill_fields)
fake_user_certifications = read_from_csv('C:/Users/RithikHarendarMahesh/Desktop/fp/DataEngineering/Fake_Data/user_certifications.csv', user_certification_fields)
fake_role_skills = read_from_csv('C:/Users/RithikHarendarMahesh/Desktop/fp/DataEngineering/Fake_Data/role_skills.csv', role_skill_fields)

# Merge existing data with fake data
merged_users = merge_data(existing_users, fake_users)
merged_certifications = merge_data(existing_certifications, fake_certifications)
merged_skills = merge_data(existing_skills, fake_skills)
merged_roles = merge_data(existing_roles, fake_roles)
merged_user_skills = merge_data(existing_user_skills, fake_user_skills)
merged_user_certifications = merge_data(existing_user_certifications, fake_user_certifications)
merged_role_skills = merge_data(existing_role_skills, fake_role_skills)

# Write merged data to new CSV files
write_to_csv(merged_users, 'raw_users.csv')
write_to_csv(merged_certifications, 'raw_certifications.csv')
write_to_csv(merged_skills, 'raw_skills.csv')
write_to_csv(merged_roles, 'raw_roles.csv')
write_to_csv(merged_user_skills, 'raw_user_skills.csv')
write_to_csv(merged_user_certifications, 'raw_user_certifications.csv')
write_to_csv(merged_role_skills, 'raw_role_skills.csv')

logger.info("All data has been merged and written to CSV files.")


