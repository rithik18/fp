import os
import csv
import logging
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables
load_dotenv('E:/JMAN/fp/fullstack/backend/.env')
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


