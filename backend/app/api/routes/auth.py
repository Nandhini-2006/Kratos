from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    ForgotPasswordRequest,
    GoogleLoginRequest
)

from app.services.auth.register import register_user
from app.services.auth.login import login_user
from app.services.auth.logout import logout_user
from app.services.auth.forgot_password import forgot_password
from app.services.auth.google_login import google_login


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):
    try:
        user = register_user(
            db=db,
            name=request.name,
            email=request.email,
            password=request.password
        )

        return {
            "message": "Registration successful",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post("/login")
def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):
    try:
        return login_user(
            db=db,
            email=request.email,
            password=request.password
        )

    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )


@router.post("/logout")
def logout():
    return logout_user()


@router.post("/forgot-password")
def forgot_password_route(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):
    return forgot_password(
        db=db,
        email=request.email
    )


@router.post("/google")
def google_login_route(
    request: GoogleLoginRequest,
    db: Session = Depends(get_db)
):
    try:
        return google_login(
            db=db,
            credential=request.credential
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )