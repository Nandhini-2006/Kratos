from sqlalchemy.orm import Session

from app.models.user import User


def forgot_password(
    db: Session,
    email: str
):

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    return {
        "message": (
            "If the email exists, "
            "a password reset link will be sent"
        )
    }