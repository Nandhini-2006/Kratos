from sqlalchemy.orm import Session

from google.oauth2 import id_token
from google.auth.transport import requests

from app.core.config import GOOGLE_CLIENT_ID
from app.core.security import create_access_token
from app.models.user import User


def google_login(db: Session, credential: str):

    if not GOOGLE_CLIENT_ID:
        raise ValueError("Google Client ID is not configured")

    try:
        google_user = id_token.verify_oauth2_token(
            credential,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )

    except ValueError:
        raise ValueError("Invalid Google credential")

    email = google_user.get("email")
    name = google_user.get("name")

    if not email:
        raise ValueError("Google account email not available")

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        user = User(
            name=name or "Google User",
            email=email,
            password=None
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    if not user.is_active:
        raise ValueError("User account is inactive")

    token = create_access_token(
        user_id=user.id,
        email=user.email
    )

    return {
        "message": "Google login successful",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }