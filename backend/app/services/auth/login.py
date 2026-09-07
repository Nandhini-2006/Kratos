from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    verify_password
)

from app.models.user import User


def login_user(
    db: Session,
    email: str,
    password: str
):

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:

        raise ValueError(
            "Invalid email or password"
        )

    if not verify_password(
        password,
        user.password
    ):

        raise ValueError(
            "Invalid email or password"
        )

    if not user.is_active:

        raise ValueError(
            "User account is inactive"
        )

    token = create_access_token(
        user_id=user.id,
        email=user.email
    )

    return {
        "message": "Login successful",

        "token": token,

        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }