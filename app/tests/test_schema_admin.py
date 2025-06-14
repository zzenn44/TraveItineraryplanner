from datetime import datetime
import sys
import os

# Allow import from app/
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from schemas.admin import AdminCreate, AdminOut

# Test data
admin_data = {
    "name": "Ojaswi Kafle",
    "email": "ojaswi@example.com",
    "role": "admin",
    "created_at": datetime.utcnow(),
    "password": "supersecurepassword123",
}

#Create admin
try:
    admin = AdminCreate(**admin_data)
    print("AdminCreate schema is valid!")
except Exception as e:
    print("AdminCreate validation failed:", e)

#Convert to output
try:
    admin_out = AdminOut(
        id="admin123",
        name=admin.name,
        email=admin.email,
        role=admin.role,
        created_at=admin.created_at
    )
    print("AdminOut schema is valid!")
    print(admin_out.model_dump_json(indent=2))
except Exception as e:
    print("AdminOut validation failed:", e)
