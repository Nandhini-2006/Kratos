from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User


def register_user(
    db: Session,
    name: str,
    email: str,
    password: str
):

    existing_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if existing_user:
        raise ValueError(
            "Email already registered"
        )

    hashed_password = hash_password(
        password
    )

    user = User(
        name=name,
        email=email,
        password=hashed_password
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return user