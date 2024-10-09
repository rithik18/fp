from faker import Faker
import random
import csv
from enum import Enum
 
# Initialize Faker
fake = Faker()
 
# Define the Department and Competency enums
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
 
# Define valid tech roles
roles_list = [
    "Software Engineer",
    "Data Scientist",
    "DevOps Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "Cybersecurity Analyst",
    "Machine Learning Engineer",
    "Cloud Engineer",
    "UX/UI Designer",
    "Product Manager",
    "Business Analyst",
    "Quality Assurance Engineer",
    "Technical Writer",
]
 
# Define valid certifications
certifications_list = [
    "AWS Certified Solutions Architect",
    "Microsoft Certified: Azure Developer Associate",
    "Google Data Analytics Professional Certificate",
    "Certified Ethical Hacker",
    "CompTIA Security+",
    "Certified ScrumMaster",
    "Cisco Certified Network Associate",
    "Project Management Professional",
    "Certified Information Systems Security Professional",
    "Certified Data Management Professional",
]
 
# Function to create fake users
def create_fake_user(role_id):
    return {
        "id": fake.uuid4(),
        "name": fake.name(),
        "role_id": role_id,
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
        "id": fake.uuid4(),
        "name": random.choice(certifications_list),
        "issued_by": fake.company(),
        "is_certificate": True,
    }
 
# Function to create user certifications
def create_user_certifications(user_id):
    user_certifications = []
    for _ in range(5):  # 5 certifications per user
        cert = create_fake_certification()
        user_certifications.append({
            "id": fake.uuid4(),
            "userId": user_id,
            "certificationId": cert["id"],
            "certificationName": cert["name"],
            "started_at": fake.date_time_this_decade().isoformat(),
            "completed_at": fake.date_time_this_decade().isoformat(),
            "competency": random.choice(list(Competency)).value,
            "isVerified": random.choice([True, False]),
            "imageData": fake.image_url(),
        })
    return user_certifications
 
# Function to create fake skills
def create_fake_skill():
    return {
        "id": fake.uuid4(),
        "name": fake.unique.word(),
        "created_at": fake.date_time_this_decade().isoformat(),
        "updated_at": fake.date_time_this_decade().isoformat(),
        "desc": fake.sentence(),
    }
 
# Function to create role skills
def create_role_skills(role_id, skills):
    return [{
        "id": fake.uuid4(),
        "RoleId": role_id,
        "skillId": skill["id"],
        "department": random.choice(list(Department)).value,
    } for skill in skills]
 
# Generate fake data
num_users = 30000
num_roles = len(roles_list)
num_certifications = 100  # Total certifications available
num_skills = 100  # Total skills available
num_skills_per_role = 15  # Skills per role
num_skills_per_user = 10  # Skills per user
 
# Generate roles
roles = [{
    "id": fake.uuid4(),
    "name": role,
    "desc": fake.sentence(),
    "created_at": fake.date_time_this_decade().isoformat(),
    "updated_at": fake.date_time_this_decade().isoformat()
} for role in roles_list]
 
# Generate skills
skills = [create_fake_skill() for _ in range(num_skills)]
 
# Generate certifications
certifications = [create_fake_certification() for _ in range(num_certifications)]
 
# Generate users and their certifications
users = []
user_certifications = []
for role in roles:
    for _ in range(num_users // num_roles):  # Distributing users across roles
        user = create_fake_user(role["id"])
        users.append(user)
        user_certifications.extend(create_user_certifications(user["id"]))
 
# Generate role skills
role_skills = []
for role in roles:
    assigned_skills = random.sample(skills, num_skills_per_role)
    role_skills.extend(create_role_skills(role["id"], assigned_skills))
 
# Generate user skills
user_skills = []
for user in users:
    assigned_skills = random.sample([skill["id"] for skill in skills], num_skills_per_user)  # 10 skills per user
    for skill_id in assigned_skills:
        user_skills.append({
            "id": fake.uuid4(),
            "userId": user["id"],
            "skillId": skill_id,
            "score": random.randint(1, 100),  # Score between 1 and 100
        })
 
# Write each dataset to a CSV file
def write_to_csv(data, filename, fieldnames):
    with open(filename, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
 
write_to_csv(users, 'users.csv', users[0].keys())
write_to_csv(user_certifications, 'user_certifications.csv', user_certifications[0].keys())
write_to_csv(roles, 'roles.csv', roles[0].keys())
write_to_csv(certifications, 'certifications.csv', certifications[0].keys())
write_to_csv(skills, 'skills.csv', skills[0].keys())
write_to_csv(user_skills, 'user_skills.csv', user_skills[0].keys())
write_to_csv(role_skills, 'role_skills.csv', role_skills[0].keys())
 
print("Data has been written to CSV files.")