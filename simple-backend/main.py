from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, User, Startup
from pydantic import BaseModel

app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models
class UserCreate(BaseModel):
    username: str
    password: str

class StartupCreate(BaseModel):
    name: str
    description: str
    target_amount: float

# Authentication
def fake_auth(username: str, password: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    if not user or user.password != password:
        return None
    return user

# Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to CrowwdBank API"}

@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    new_user = User(username=user.username, password=user.password)
    db.add(new_user)
    db.commit()
    return {"message": "User created successfully"}

@app.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
    user = fake_auth(username, password, db)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful", "user_id": user.id}

@app.post("/startups")
def create_startup(
    startup: StartupCreate,
    owner_id: int,
    db: Session = Depends(get_db)
):
    new_startup = Startup(
        name=startup.name,
        description=startup.description,
        target_amount=startup.target_amount,
        owner_id=owner_id
    )
    db.add(new_startup)
    db.commit()
    return {"message": "Startup created", "startup_id": new_startup.id}

@app.get("/startups")
def get_startups(db: Session = Depends(get_db)):
    startups = db.query(Startup).all()
    return startups

@app.post("/invest")
def make_investment(
    user_id: int,
    startup_id: int,
    amount: float,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    startup = db.query(Startup).filter(Startup.id == startup_id).first()
    
    if not user or not startup:
        raise HTTPException(status_code=404, detail="User or startup not found")
    
    if user.balance < amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    
    user.balance -= amount
    startup.raised_amount += amount
    
    db.commit()
    return {"message": "Investment successful"}