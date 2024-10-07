import uuid
from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime

# User Model
class User(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str
    role_id: str
    joining_date: str
    department: str  # You can define it as an Enum if you prefer
    mail: str
    created_at: datetime
    updated_at: datetime
    password: str
    profileImage: Optional[str] = Field(default="data:image/svg+xml;base64,...")
    certification: List['UserCertification'] = []
    skills: List['UserSkill'] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "607d1e6d27b47d5e4e8e9d1e",
                "name": "John Doe",
                "role_id": "607d1e6d27b47d5e4e8e9d1f",
                "joining_date": "2024-01-01",
                "department": "FULL_STACK",
                "mail": "john.doe@example.com",
                "created_at": "2024-01-01T00:00:00",
                "updated_at": "2024-01-01T00:00:00",
                "password": "securepassword",
                "profileImage": None
            }
        }

# Certification Model
class Certification(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str
    issued_by: str
    is_certificate: bool
    user_certification: List['UserCertification'] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "607d1e6d27b47d5e4e8e9d2e",
                "name": "AWS Certified Solutions Architect",
                "issued_by": "Amazon",
                "is_certificate": True
            }
        }

# UserCertification Model
class UserCertification(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    userId: str
    certificationId: str
    certificationName: str
    started_at: datetime
    completed_at: datetime
    competency: str  # You can define it as an Enum if you prefer
    isVerified: bool = False
    imageData: str

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "607d1e6d27b47d5e4e8e9d3e",
                "userId": "607d1e6d27b47d5e4e8e9d1e",
                "certificationId": "607d1e6d27b47d5e4e8e9d2e",
                "certificationName": "AWS Certified Solutions Architect",
                "started_at": "2024-01-01T00:00:00",
                "completed_at": "2024-12-31T00:00:00",
                "competency": "BEGINNER",
                "isVerified": True,
                "imageData": "base64imageData"
            }
        }

# Skill Model
class Skill(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str
    created_at: datetime
    updated_at: datetime
    desc: str
    user: List['UserSkill'] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "607d1e6d27b47d5e4e8e9d4e",
                "name": "Python",
                "created_at": "2024-01-01T00:00:00",
                "updated_at": "2024-01-01T00:00:00",
                "desc": "Programming Language"
            }
        }

# UserSkill Model
class UserSkill(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    userId: str
    skillId: str
    score: int

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "607d1e6d27b47d5e4e8e9d5e",
                "userId": "607d1e6d27b47d5e4e8e9d1e",
                "skillId": "607d1e6d27b47d5e4e8e9d4e",
                "score": 85
            }
        }

# Role Model
class Role(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str
    desc: str
    created_at: datetime
    updated_at: datetime
    user: List[User] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "607d1e6d27b47d5e4e8e9d6e",
                "name": "Admin",
                "desc": "Administrator role",
                "created_at": "2024-01-01T00:00:00",
                "updated_at": "2024-01-01T00:00:00"
            }
        }


# User.update_forward_refs()
# Certification.update_forward_refs()
# UserCertification.update_forward_refs()
# Skill.update_forward_refs()
# UserSkill.update_forward_refs()
# Role.update_forward_refs()
