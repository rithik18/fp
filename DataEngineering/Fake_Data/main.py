
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

# Define valid certifications for each role
role_certification_schema = {
    "Software Engineer": [
        "AWS Certified Solutions Architect",
        "Microsoft Certified: Azure Developer Associate",
        "Certified Ethical Hacker",
        "Certified ScrumMaster",
        "AWS Certified Developer - Associate",
        "Certified Information Systems Security Professional",
        "Certified in Risk and Information Systems Control",
        "CompTIA Security+",
        "Certified Kubernetes Administrator",
        "Google Cloud Professional Developer",
    ],
    "Data Scientist": [
        "IBM Certified Data Scientist",
        "Google Data Analytics Professional Certificate",
        "Microsoft Certified: Azure Data Scientist Associate",
        "Certified Analytics Professional",
        "Google Professional Data Engineer",
        "AWS Certified Machine Learning - Specialty",
        "Certified Ethical Hacker",
        "Certified Business Analysis Professional",
        "CompTIA Cybersecurity Analyst",
        "AWS Certified Developer - Associate",
    ],
    "DevOps Engineer": [
        "AWS Certified DevOps Engineer",
        "Microsoft Certified: Azure DevOps Engineer Expert",
        "Certified Ethical Hacker",
        "Certified Cloud Security Professional",
        "Certified Kubernetes Administrator",
        "AWS Certified Developer - Associate",
        "CompTIA Security+",
        "Certified Information Systems Auditor",
        "Certified Agile Leadership",
        "Google Professional Cloud Architect",
    ],
    "Frontend Developer": [
        "Certified Front-End Web Developer",
    "React JS Certification",
    "HTML5 and CSS3 Certification",
    "JavaScript Developer Certification",
    "Certified User Experience Professional",
    "Google Mobile Web Specialist",
    "Microsoft Certified: Azure Developer Associate",
    "Certified ScrumMaster",
    "AWS Certified Developer - Associate",
    "Google Data Analytics Professional Certificate",
    "Certified Ethical Hacker",
    "Certified Information Systems Security Professional",
    "Google Professional Cloud Developer",
    "Certified Analytics Professional",
    "Certified Business Analysis Professional",
    ],
    "Backend Developer":[
    "AWS Certified Solutions Architect",
    "Certified Ethical Hacker",
    "CompTIA Security+",
    "Microsoft Certified: Azure Solutions Architect Expert",
    "Certified in Risk and Information Systems Control",
    "Certified Blockchain Professional",
    "AWS Certified Developer",
    "Certified ScrumMaster",
    "Google Professional Data Engineer",
    "Certified Information Systems Auditor",
    "Node.js Certification",
    "Python Developer Certification",
    "Java SE 11 Developer Certification",
    "Spring Professional Certification",
    "Django Certification",
    "Flask Certification",
    "Express.js Certification",
    "MongoDB Certified Developer",
],
    "Full Stack Developer": [
    "AWS Certified Solutions Architect",
    "Microsoft Certified: Azure Developer Associate",
    "Certified Ethical Hacker",
    "Certified ScrumMaster",
    "AWS Certified Developer - Associate",
    "Certified Information Systems Security Professional",
    "Certified Kubernetes Administrator",
    "Google Cloud Professional Developer",
    "AWS Certified Machine Learning - Specialty",
    "Microsoft Certified: Power Platform App Maker Associate",
    "React Certification",
    "HTML5 Developer Certification",
    "CSS Certification",
    "JavaScript Certification",
    "Node.js Certification",
    "Python Developer Certification",
    "Java SE 11 Developer Certification",
    "Spring Professional Certification",
    "Django Certification",
    "Flask Certification",
    "Express.js Certification",
    "MongoDB Certified Developer",
    "MySQL Database Administrator Certification",
    "PostgreSQL Certification",
    "Microsoft Certified: Azure Database Administrator Associate",
]
,
    "Data Analyst": [
    "Google Data Analytics Professional Certificate",
    "Certified Data Management Professional",
    "IBM Certified Data Analyst",
    "Microsoft Certified: Power BI Data Analyst Associate",
    "CompTIA Security+",
    "Certified Analytics Professional",
    "AWS Certified Data Analytics - Specialty",
    "Certified Information Systems Security Professional",
    "Certified Business Analysis Professional",
    "Microsoft Certified: Data Analyst Associate",
    "SAS Certified Data Scientist",
    "Tableau Desktop Specialist",
    "Excel Certification (Microsoft Office Specialist)",
    "Data Science and Machine Learning Bootcamp",
    "R Programming Certification",
    "Apache Spark Certification",
    "Data Visualization with Python",
    "Statistics for Data Science Certification",
    "Certified Data Scientist (CDS)",
    "Advanced SQL for Data Analysts",
    "Data Mining and Predictive Analytics Certification",
],
    "Cybersecurity Analyst": [
    "Certified Ethical Hacker",
    "CompTIA Security+",
    "Certified Information Systems Security Professional",
    "Certified Cloud Security Professional",
    "CompTIA Cybersecurity Analyst",
    "Certified Information Systems Auditor",
    "Certified in Risk and Information Systems Control",
    "Cisco Certified CyberOps Associate",
    "AWS Certified Security Specialty",
    "Certified Information Security Manager",
    "Certified Information Systems Security Officer (CISSO)",
    "GIAC Security Essentials (GSEC)",
    "Certified Information Systems Security Manager (CISSP)",
    "Microsoft Certified: Azure Security Engineer Associate",
    "Certified Threat Intelligence Analyst (CTIA)",
    "Certified Incident Handler (GCIH)",
    "CompTIA Advanced Security Practitioner (CASP+)",
    "EC-Council Certified Security Analyst (ECSA)",
    "Certified Wireless Network Administrator (CWNA)",
    "NIST Cybersecurity Framework Certification",
    "Certified Cybersecurity Technician (CybExer)",
],
    "Machine Learning Engineer": [
    "Google Data Analytics Professional Certificate",
    "AWS Certified Machine Learning - Specialty",
    "IBM Certified Data Scientist",
    "Certified Analytics Professional",
    "Certified Ethical Hacker",
    "AWS Certified Developer - Associate",
    "Microsoft Certified: Azure Data Scientist Associate",
    "Google Professional Cloud Developer",
    "CompTIA Security+",
    "Certified Information Systems Security Professional",
    "TensorFlow Developer Certificate",
    "Deep Learning Specialization (Coursera - Andrew Ng)",
    "Data Science Professional Certificate (IBM)",
    "Microsoft Certified: Azure AI Engineer Associate",
    "Certified Machine Learning Specialist (CML)",
    "Data Science and Machine Learning Bootcamp (Udemy)",
    "NVIDIA Deep Learning Institute Certifications",
    "AWS Certified Solutions Architect - Associate",
    "Databricks Certified Associate Developer for Apache Spark",
    "Kaggle Master (Kaggle)",
    "Introduction to Machine Learning with Python (edX)",
],
    "Cloud Engineer":[
    "AWS Certified Solutions Architect",
    "Microsoft Certified: Azure Developer Associate",
    "Certified Cloud Security Professional",
    "AWS Certified Advanced Networking - Specialty",
    "Google Cloud Professional Architect",
    "Microsoft Certified: Azure Administrator Associate",
    "Certified Ethical Hacker",
    "Certified Information Systems Security Professional",
    "AWS Certified Developer",
    "Certified Information Systems Auditor",
    "AWS Certified DevOps Engineer - Professional",
    "Google Cloud Professional Data Engineer",
    "Microsoft Certified: Azure Solutions Architect Expert",
    "HashiCorp Certified: Terraform Associate",
    "CompTIA Cloud+",
    "Cisco Certified Network Associate (CCNA)",
    "AWS Certified Security - Specialty",
    "Cloud Foundry Certified Developer",
    "Certified Kubernetes Administrator (CKA)",
    "VMware Certified Professional - Cloud Management and Automation",
    "Red Hat Certified Specialist in OpenShift Administration",
]
,
    "UX/UI Designer": [
    "Google UX Design Professional Certificate",
    "Certified User Experience Professional (CUXP)",
    "Adobe Certified Expert (ACE)",
    "Nielsen Norman Group UX Certification",
    "Interaction Design Foundation (IDF) UX Design Courses",
    "Certified ScrumMaster",
    "CompTIA Security+",
    "Certified Usability Analyst (CUA)",
    "Microsoft Certified: Power Platform App Maker Associate",
    "Human-Computer Interaction (HCI) Certification",
    "Web Accessibility Specialist (WAS)",
    "UX Certification from the Nielsen Norman Group",
    "Professional Certificate in UX Design from MIT",
    "UX Design Institute Diploma in UX Design",
    "Responsive Web Design Certification from freeCodeCamp",
    "UX Research and Design Certificate from UC Irvine",
    "Digital Marketing and UX Certification from Google",
]
,
    "Product Manager": [
    "Certified ScrumMaster",
    "Project Management Professional (PMP)",
    "Certified Product Manager (CPM)",
    "Certified Business Analysis Professional (CBAP)",
    "Google Analytics Individual Qualification (GAIQ)",
    "Agile Certified Practitioner (PMI-ACP)",
    "Lean Six Sigma Green Belt Certification",
    "AWS Certified Solutions Architect",
    "Certified Agile Leadership (CAL)",
    "Certified Information Systems Security Professional (CISSP)",
    "CompTIA Security+",
],
    "Business Analyst": [
    "Certified Business Analysis Professional (CBAP)",
    "Project Management Professional (PMP)",
    "Certified ScrumMaster",
    "Agile Business Analysis Certification",
    "Lean Six Sigma Green Belt Certification",
    "Certified Analytics Professional (CAP)",
    "Google Data Analytics Professional Certificate",
    "AWS Certified Solutions Architect",
    "Certified Information Systems Security Professional (CISSP)",
    "IBM Certified Data Analyst",
    "CompTIA Security+",
],
    "Quality Assurance Engineer": [
    "Certified Software Tester (CST)",
    "Certified ScrumMaster",
    "ISTQB Certified Tester",
    "Agile Tester Certification",
    "AWS Certified Developer",
    "Google Data Analytics Professional Certificate",
    "Microsoft Certified: Azure Developer Associate",
    "CompTIA Security+",
    "Certified Ethical Hacker (CEH)",
    "Certified Information Systems Security Professional (CISSP)",
    "Certified Quality Engineer (CQE)",
],
    "Technical Writer":[
    "Certified Technical Writer (CTW)",
    "Documentation and Technical Communication Certification",
    "Certified ScrumMaster",
    "CompTIA Security+",
    "Certified Ethical Hacker (CEH)",
    "Certified Information Systems Security Professional (CISSP)",
    "AWS Certified Solutions Architect",
    "Microsoft Certified: Azure Developer Associate",
    "Google Data Analytics Professional Certificate",
    "Technical Communication Certification from Society for Technical Communication (STC)",
]
}
role_skills_schema = {
    "Software Engineer": [
        {"skillId": fake.uuid4(), "name": "Java", "RoleId": "Software Engineer"},
        {"skillId": fake.uuid4(), "name": "Python", "RoleId": "Software Engineer"},
        {"skillId": fake.uuid4(), "name": "C#", "RoleId": "Software Engineer"},
        {"skillId": fake.uuid4(), "name": "JavaScript", "RoleId": "Software Engineer"},
        {"skillId": fake.uuid4(), "name": "React", "RoleId": "Software Engineer"},
        {"skillId": fake.uuid4(), "name": "Node.js", "RoleId": "Software Engineer"},
        {"skillId": fake.uuid4(), "name": "SQL", "RoleId": "Software Engineer"},
        {"skillId": fake.uuid4(), "name": "HTML/CSS", "RoleId": "Software Engineer"},
        {"skillId": fake.uuid4(), "name": "Git", "RoleId": "Software Engineer"},
        {"skillId": fake.uuid4(), "name": "Agile Methodologies", "RoleId": "Software Engineer"},
    ],
    "Data Scientist": [
        {"skillId": fake.uuid4(), "name": "Python", "RoleId": "Data Scientist"},
        {"skillId": fake.uuid4(), "name": "R", "RoleId": "Data Scientist"},
        {"skillId": fake.uuid4(), "name": "SQL", "RoleId": "Data Scientist"},
        {"skillId": fake.uuid4(), "name": "Machine Learning", "RoleId": "Data Scientist"},
        {"skillId": fake.uuid4(), "name": "Statistics", "RoleId": "Data Scientist"},
        {"skillId": fake.uuid4(), "name": "Data Visualization", "RoleId": "Data Scientist"},
        {"skillId": fake.uuid4(), "name": "Big Data Technologies", "RoleId": "Data Scientist"},
        {"skillId": fake.uuid4(), "name": "Data Wrangling", "RoleId": "Data Scientist"},
        {"skillId": fake.uuid4(), "name": "Deep Learning", "RoleId": "Data Scientist"},
        {"skillId": fake.uuid4(), "name": "Data Mining", "RoleId": "Data Scientist"},
    ],
    "DevOps Engineer": [
        {"skillId": fake.uuid4(), "name": "Docker", "RoleId": "DevOps Engineer"},
        {"skillId": fake.uuid4(), "name": "Kubernetes", "RoleId": "DevOps Engineer"},
        {"skillId": fake.uuid4(), "name": "CI/CD", "RoleId": "DevOps Engineer"},
        {"skillId": fake.uuid4(), "name": "Cloud Computing", "RoleId": "DevOps Engineer"},
        {"skillId": fake.uuid4(), "name": "Infrastructure as Code", "RoleId": "DevOps Engineer"},
        {"skillId": fake.uuid4(), "name": "Linux", "RoleId": "DevOps Engineer"},
        {"skillId": fake.uuid4(), "name": "Scripting", "RoleId": "DevOps Engineer"},
        {"skillId": fake.uuid4(), "name": "Monitoring", "RoleId": "DevOps Engineer"},
        {"skillId": fake.uuid4(), "name": "Agile Methodologies", "RoleId": "DevOps Engineer"},
        {"skillId": fake.uuid4(), "name": "Networking", "RoleId": "DevOps Engineer"},
    ],
    "Frontend Developer": [
        {"skillId": fake.uuid4(), "name": "HTML", "RoleId": "Frontend Developer"},
        {"skillId": fake.uuid4(), "name": "CSS", "RoleId": "Frontend Developer"},
        {"skillId": fake.uuid4(), "name": "JavaScript", "RoleId": "Frontend Developer"},
        {"skillId": fake.uuid4(), "name": "React", "RoleId": "Frontend Developer"},
        {"skillId": fake.uuid4(), "name": "Angular", "RoleId": "Frontend Developer"},
        {"skillId": fake.uuid4(), "name": "Vue.js", "RoleId": "Frontend Developer"},
        {"skillId": fake.uuid4(), "name": "Responsive Design", "RoleId": "Frontend Developer"},
        {"skillId": fake.uuid4(), "name": "Cross-browser Compatibility", "RoleId": "Frontend Developer"},
        {"skillId": fake.uuid4(), "name": "Version Control/Git", "RoleId": "Frontend Developer"},
        {"skillId": fake.uuid4(), "name": "Web Performance Optimization", "RoleId": "Frontend Developer"},
    ],
    "Backend Developer": [
        {"skillId": fake.uuid4(), "name": "Node.js", "RoleId": "Backend Developer"},
        {"skillId": fake.uuid4(), "name": "Java", "RoleId": "Backend Developer"},
        {"skillId": fake.uuid4(), "name": "Python", "RoleId": "Backend Developer"},
        {"skillId": fake.uuid4(), "name": "Ruby", "RoleId": "Backend Developer"},
        {"skillId": fake.uuid4(), "name": "PHP", "RoleId": "Backend Developer"},
        {"skillId": fake.uuid4(), "name": "SQL", "RoleId": "Backend Developer"},
        {"skillId": fake.uuid4(), "name": "NoSQL", "RoleId": "Backend Developer"},
        {"skillId": fake.uuid4(), "name": "API Development", "RoleId": "Backend Developer"},
        {"skillId": fake.uuid4(), "name": "Microservices", "RoleId": "Backend Developer"},
        {"skillId": fake.uuid4(), "name": "Security Best Practices", "RoleId": "Backend Developer"},
    ],
    "Full Stack Developer": [
        {"skillId": fake.uuid4(), "name": "JavaScript", "RoleId": "Full Stack Developer"},
        {"skillId": fake.uuid4(), "name": "Node.js", "RoleId": "Full Stack Developer"},
        {"skillId": fake.uuid4(), "name": "React", "RoleId": "Full Stack Developer"},
        {"skillId": fake.uuid4(), "name": "HTML/CSS", "RoleId": "Full Stack Developer"},
        {"skillId": fake.uuid4(), "name": "SQL", "RoleId": "Full Stack Developer"},
        {"skillId": fake.uuid4(), "name": "RESTful APIs", "RoleId": "Full Stack Developer"},
        {"skillId": fake.uuid4(), "name": "Git", "RoleId": "Full Stack Developer"},
        {"skillId": fake.uuid4(), "name": "Agile Methodologies", "RoleId": "Full Stack Developer"},
        {"skillId": fake.uuid4(), "name": "Testing/Debugging", "RoleId": "Full Stack Developer"},
        {"skillId": fake.uuid4(), "name": "DevOps Practices", "RoleId": "Full Stack Developer"},
    ],
    "Business Analyst": [
        {"skillId": fake.uuid4(), "name": "Business Analysis", "RoleId": "Business Analyst"},
        {"skillId": fake.uuid4(), "name": "Requirements Gathering", "RoleId": "Business Analyst"},
        {"skillId": fake.uuid4(), "name": "Data Analysis", "RoleId": "Business Analyst"},
        {"skillId": fake.uuid4(), "name": "Stakeholder Management", "RoleId": "Business Analyst"},
        {"skillId": fake.uuid4(), "name": "Process Mapping", "RoleId": "Business Analyst"},
        {"skillId": fake.uuid4(), "name": "Project Management", "RoleId": "Business Analyst"},
        {"skillId": fake.uuid4(), "name": "Agile Methodologies", "RoleId": "Business Analyst"},
        {"skillId": fake.uuid4(), "name": "Communication Skills", "RoleId": "Business Analyst"},
        {"skillId": fake.uuid4(), "name": "Problem-Solving", "RoleId": "Business Analyst"},
        {"skillId": fake.uuid4(), "name": "SQL", "RoleId": "Business Analyst"},
    ],
    "Quality Assurance Engineer": [
        {"skillId": fake.uuid4(), "name": "Testing", "RoleId": "Quality Assurance Engineer"},
        {"skillId": fake.uuid4(), "name": "Automation Testing", "RoleId": "Quality Assurance Engineer"},
        {"skillId": fake.uuid4(), "name": "Manual Testing", "RoleId": "Quality Assurance Engineer"},
        {"skillId": fake.uuid4(), "name": "Performance Testing", "RoleId": "Quality Assurance Engineer"},
        {"skillId": fake.uuid4(), "name": "Agile Methodologies", "RoleId": "Quality Assurance Engineer"},
        {"skillId": fake.uuid4(), "name": "Defect Tracking", "RoleId": "Quality Assurance Engineer"},
        {"skillId": fake.uuid4(), "name": "Test Automation Tools", "RoleId": "Quality Assurance Engineer"},
        {"skillId": fake.uuid4(), "name": "Test Planning", "RoleId": "Quality Assurance Engineer"},
        {"skillId": fake.uuid4(), "name": "Version Control/Git", "RoleId": "Quality Assurance Engineer"},
        {"skillId": fake.uuid4(), "name": "Risk Management", "RoleId": "Quality Assurance Engineer"},
    ],
    "Technical Writer": [
        {"skillId": fake.uuid4(), "name": "Technical Writing", "RoleId": "Technical Writer"},
        {"skillId": fake.uuid4(), "name": "Documentation", "RoleId": "Technical Writer"},
        {"skillId": fake.uuid4(), "name": "Content Creation", "RoleId": "Technical Writer"},
        {"skillId": fake.uuid4(), "name": "Editing", "RoleId": "Technical Writer"},
        {"skillId": fake.uuid4(), "name": "SEO Writing", "RoleId": "Technical Writer"},
        {"skillId": fake.uuid4(), "name": "Research Skills", "RoleId": "Technical Writer"},
        {"skillId": fake.uuid4(), "name": "Agile Methodologies", "RoleId": "Technical Writer"},
        {"skillId": fake.uuid4(), "name": "Communication Skills", "RoleId": "Technical Writer"},
        {"skillId": fake.uuid4(), "name": "User Documentation", "RoleId": "Technical Writer"},
        {"skillId": fake.uuid4(), "name": "Graphic Design", "RoleId": "Technical Writer"},
    ],"Data Analyst": [
        {"skillId": fake.uuid4(), "name": "SQL", "RoleId": "Data Analyst"},
        {"skillId": fake.uuid4(), "name": "Excel", "RoleId": "Data Analyst"},
        {"skillId": fake.uuid4(), "name": "Data Visualization", "RoleId": "Data Analyst"},
        {"skillId": fake.uuid4(), "name": "Python", "RoleId": "Data Analyst"},
        {"skillId": fake.uuid4(), "name": "Data Cleaning", "RoleId": "Data Analyst"},
        {"skillId": fake.uuid4(), "name": "Data Analysis", "RoleId": "Data Analyst"},
        {"skillId": fake.uuid4(), "name": "Statistics", "RoleId": "Data Analyst"},
        {"skillId": fake.uuid4(), "name": "Reporting", "RoleId": "Data Analyst"},
        {"skillId": fake.uuid4(), "name": "Business Intelligence", "RoleId": "Data Analyst"},
        {"skillId": fake.uuid4(), "name": "Data Mining", "RoleId": "Data Analyst"},
    ],
    "Cybersecurity Analyst": [
        {"skillId": fake.uuid4(), "name": "Network Security", "RoleId": "Cybersecurity Analyst"},
        {"skillId": fake.uuid4(), "name": "Firewalls", "RoleId": "Cybersecurity Analyst"},
        {"skillId": fake.uuid4(), "name": "Intrusion Detection", "RoleId": "Cybersecurity Analyst"},
        {"skillId": fake.uuid4(), "name": "Penetration Testing", "RoleId": "Cybersecurity Analyst"},
        {"skillId": fake.uuid4(), "name": "Incident Response", "RoleId": "Cybersecurity Analyst"},
        {"skillId": fake.uuid4(), "name": "Risk Assessment", "RoleId": "Cybersecurity Analyst"},
        {"skillId": fake.uuid4(), "name": "Security Compliance", "RoleId": "Cybersecurity Analyst"},
        {"skillId": fake.uuid4(), "name": "Encryption", "RoleId": "Cybersecurity Analyst"},
        {"skillId": fake.uuid4(), "name": "Vulnerability Management", "RoleId": "Cybersecurity Analyst"},
        {"skillId": fake.uuid4(), "name": "Security Auditing", "RoleId": "Cybersecurity Analyst"},
    ],
    "Machine Learning Engineer": [
        {"skillId": fake.uuid4(), "name": "Python", "RoleId": "Machine Learning Engineer"},
        {"skillId": fake.uuid4(), "name": "TensorFlow", "RoleId": "Machine Learning Engineer"},
        {"skillId": fake.uuid4(), "name": "PyTorch", "RoleId": "Machine Learning Engineer"},
        {"skillId": fake.uuid4(), "name": "Scikit-Learn", "RoleId": "Machine Learning Engineer"},
        {"skillId": fake.uuid4(), "name": "Machine Learning Algorithms", "RoleId": "Machine Learning Engineer"},
        {"skillId": fake.uuid4(), "name": "Data Preprocessing", "RoleId": "Machine Learning Engineer"},
        {"skillId": fake.uuid4(), "name": "Model Deployment", "RoleId": "Machine Learning Engineer"},
        {"skillId": fake.uuid4(), "name": "NLP", "RoleId": "Machine Learning Engineer"},
        {"skillId": fake.uuid4(), "name": "Deep Learning", "RoleId": "Machine Learning Engineer"},
        {"skillId": fake.uuid4(), "name": "Big Data Technologies", "RoleId": "Machine Learning Engineer"},
    ],
    "Cloud Engineer": [
        {"skillId": fake.uuid4(), "name": "AWS", "RoleId": "Cloud Engineer"},
        {"skillId": fake.uuid4(), "name": "Azure", "RoleId": "Cloud Engineer"},
        {"skillId": fake.uuid4(), "name": "Google Cloud", "RoleId": "Cloud Engineer"},
        {"skillId": fake.uuid4(), "name": "Cloud Security", "RoleId": "Cloud Engineer"},
        {"skillId": fake.uuid4(), "name": "Infrastructure as Code", "RoleId": "Cloud Engineer"},
        {"skillId": fake.uuid4(), "name": "Networking", "RoleId": "Cloud Engineer"},
        {"skillId": fake.uuid4(), "name": "CI/CD Pipelines", "RoleId": "Cloud Engineer"},
        {"skillId": fake.uuid4(), "name": "Containerization", "RoleId": "Cloud Engineer"},
        {"skillId": fake.uuid4(), "name": "Serverless Architectures", "RoleId": "Cloud Engineer"},
        {"skillId": fake.uuid4(), "name": "DevOps Practices", "RoleId": "Cloud Engineer"},
    ],
    "UX/UI Designer": [
        {"skillId": fake.uuid4(), "name": "User Research", "RoleId": "UX/UI Designer"},
        {"skillId": fake.uuid4(), "name": "Wireframing", "RoleId": "UX/UI Designer"},
        {"skillId": fake.uuid4(), "name": "Prototyping", "RoleId": "UX/UI Designer"},
        {"skillId": fake.uuid4(), "name": "Adobe XD", "RoleId": "UX/UI Designer"},
        {"skillId": fake.uuid4(), "name": "Figma", "RoleId": "UX/UI Designer"},
        {"skillId": fake.uuid4(), "name": "UI Design", "RoleId": "UX/UI Designer"},
        {"skillId": fake.uuid4(), "name": "User Testing", "RoleId": "UX/UI Designer"},
        {"skillId": fake.uuid4(), "name": "Responsive Design", "RoleId": "UX/UI Designer"},
        {"skillId": fake.uuid4(), "name": "Interaction Design", "RoleId": "UX/UI Designer"},
        {"skillId": fake.uuid4(), "name": "Design Systems", "RoleId": "UX/UI Designer"},
    ],
    "Product Manager": [
        {"skillId": fake.uuid4(), "name": "Product Roadmap", "RoleId": "Product Manager"},
        {"skillId": fake.uuid4(), "name": "Stakeholder Management", "RoleId": "Product Manager"},
        {"skillId": fake.uuid4(), "name": "User Research", "RoleId": "Product Manager"},
        {"skillId": fake.uuid4(), "name": "Agile Methodologies", "RoleId": "Product Manager"},
        {"skillId": fake.uuid4(), "name": "Data-Driven Decision Making", "RoleId": "Product Manager"},
        {"skillId": fake.uuid4(), "name": "Wireframing", "RoleId": "Product Manager"},
        {"skillId": fake.uuid4(), "name": "Market Research", "RoleId": "Product Manager"},
        {"skillId": fake.uuid4(), "name": "Product Lifecycle Management", "RoleId": "Product Manager"},
        {"skillId": fake.uuid4(), "name": "Communication Skills", "RoleId": "Product Manager"},
        {"skillId": fake.uuid4(), "name": "Leadership", "RoleId": "Product Manager"},
    ],
}

# Function to create fake users
def create_fake_user(role_id):
    return {
        "_id": fake.uuid4(),
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

# Function to create fake certifications based on user role
def create_fake_certification(role):
    cert_name = random.choice(role_certification_schema[role])
    return {
        "_id": fake.uuid4(),
        "name": cert_name,
        "issued_by": fake.company(),
        "is_certificate": True,
    }

# Function to create user certifications based on their role
def create_user_certifications(user_id, role, certifications):
    user_certifications = []
    
    # Filter certifications based on the role
    available_certs = [cert for cert in certifications if cert['role'] == role]
    
    for _ in range(5):  # 5 certifications per user
        cert = random.choice(available_certs)  # Select a random certification for the role

        # Generate the started_at date
        started_at = fake.date_time_this_decade()
        # Generate the completed_at date after the started_at date
        completed_at = fake.date_time_between(started_at,fake.date_time_this_decade())

        user_certifications.append({
            "_id": fake.uuid4(),
            "userId": user_id,
            "certificationId": cert["_id"],
            "certificationName": cert["name"],
            "started_at": started_at.isoformat(),
            "completed_at": completed_at.isoformat(),
            "competency": random.choice(list(Competency)).value,
            "isVerified": random.choice([True, False]),
            "imageData": fake.image_url(),
        })
    return user_certifications

# Function to create fake skills
def create_fake_skill():
    list_skill=[]
    for i in role_skills_schema.values():
        list_skill+=i
    skill=[]
    for i in list_skill:
        skill.append({
        "_id": i['skillId'],
        "name": i['name'],
        "created_at": fake.date_time_this_decade().isoformat(),
        "updated_at": fake.date_time_this_decade().isoformat(),
        "desc": i['name'],
    })
    return skill

# Function to create role skills
def create_role_skills(role_id, skills):
    return [{
        "_id": fake.uuid4(),
        "RoleId": role_id,
        "skillId": skill["_id"],
        "department": random.choice(list(Department)).value,
    } for skill in skills]

# Generate fake data
num_users = 30000
num_roles = len(roles_list)
num_skills = 100  # Total skills available
num_skills_per_role = 15  # Skills per role
num_skills_per_user = 10  # Skills per user

# Generate roles
roles = [{
    "_id": fake.uuid4(),
    "name": role,
    "desc": fake.sentence(),
    "created_at": fake.date_time_this_decade().isoformat(),
    "updated_at": fake.date_time_this_decade().isoformat()
} for role in roles_list]

def get_role_id(role_name, roles):
    for role in roles:
        if role == role_name:
            return role  # Assuming the Role ID is the same as the Role Name in this context
    return None  # Return None if the role is not found

def find_key_value(json_array, key, value):
      
    for item in json_array:
        if key in item and item[key] == value:
            # print(key,item,value)
            return item['_id']
    return None


for j in role_skills_schema.keys():
  
    # print(j)
    role_id = find_key_value(roles,'name',j)
    for i in role_skills_schema[j]:
      i['roleId']=role_id
# Generate skills
skills = create_fake_skill()
# skills = [create_fake_skill() for _ in range(num_skills)]
# print(skills)

# Generate certifications for the CSV file
certifications = []
for role in roles:
    for cert_name in role_certification_schema[role["name"]]:
        certifications.append({
            "_id": fake.uuid4(),
            "name": cert_name,
            "issued_by": fake.company(),
            "is_certificate": True,
            "role": role["name"]
        })

# Generate users and their certifications
users = []
user_certifications = []

# Ensure users are generated
for role in roles:
    for _ in range(num_users // num_roles):  # Distributing users across roles
        user = create_fake_user(role["_id"])
        users.append(user)
        user_certifications.extend(create_user_certifications(user["_id"], role["name"], certifications))

# Print the count of users to debug
print(f"Total users generated: {len(users)}")

# Generate role skills
role_names = [role["name"] for role in roles]  # Adjust based on how roles are structured

role_skills = []
for role in role_names:
    if role in role_skills_schema:  # Check if the role exists in the schema
        skills_for_role = role_skills_schema[role]
        for skill in skills_for_role:
            role_skills.append({
                "roleId": role_skills_schema[role][0]['roleId'],
                "skillId": skill["skillId"],
                "name": skill["name"],
            })


user_skills = []
for user in users:
    assigned_skills = random.sample([skill["_id"] for skill in skills], num_skills_per_user)  # 10 skills per user
    for skill_id in assigned_skills:
        user_skills.append({
            "_id": fake.uuid4(),
            "userId": user["_id"],
            "skillId": skill_id,
            "score": random.randint(1, 100),  # Score between 1 and 100
        })



# Write each dataset to a CSV file
def write_to_csv(data, filename, fieldnames):
    with open(filename, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
print(len(role_skills))
write_to_csv(users, 'users.csv', users[0].keys())
write_to_csv(user_certifications, 'user_certifications.csv', user_certifications[0].keys())
write_to_csv(roles, 'roles.csv', roles[0].keys())
write_to_csv(certifications, 'certifications.csv', certifications[0].keys())
write_to_csv(skills, 'skills.csv', skills[0].keys())
write_to_csv(user_skills, 'user_skills.csv', user_skills[0].keys())
write_to_csv(role_skills, 'role_skills.csv', role_skills[0].keys())

print("Data has been written to CSV files.")
