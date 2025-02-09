from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from passlib.context import CryptContext
import requests
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Configuration
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI is missing in .env file")

client = MongoClient(MONGO_URI, server_api=ServerApi('1'))
db = client["crowwdbank"]  # Database Name

# Collections
startups_collection = db["startups"]
investors_collection = db["investors"]

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Gemini API Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing in .env file")

GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"

# Models
class Startup(BaseModel):
    name: str
    description: str
    raised: str
    target: str
    investors: int
    growth: str
    image: str
    category: str

class Investor(BaseModel):
    name: str
    email: EmailStr  # Updated from username to email
    password: str
    company: str
    investments: str
    sectors: str
    image: str

class ChatRequest(BaseModel):
    message: str

# Utility Functions
def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Routes

@app.get("/")
def home():
    return {"message": "Funding Platform API is running"}

@app.get("/startups")
async def list_startups():
    startups = list(startups_collection.find({}, {"_id": 0}))  # Exclude MongoDB ID
    return startups

@app.get("/investors")
async def list_investors():
    investors = list(investors_collection.find({}, {"_id": 0, "password": 0}))  # Exclude passwords
    return investors

@app.post("/register-startup")
async def register_startup(startup: Startup):
    existing = startups_collection.find_one({"name": startup.name})
    if existing:
        raise HTTPException(status_code=400, detail="Startup already registered")
    startups_collection.insert_one(startup.dict())
    return {"message": "Startup registered successfully"}

@app.post("/register-investor")
async def register_investor(investor: Investor):
    existing = investors_collection.find_one({"email": investor.email})
    if existing:
        raise HTTPException(status_code=400, detail="Investor already registered with this email")
    
    hashed_password = hash_password(investor.password)
    investor_dict = investor.dict()
    investor_dict["password"] = hashed_password
    investors_collection.insert_one(investor_dict)
    return {"message": "Investor registered successfully"}

@app.post("/signin")
async def signin(email: str, password: str):
    investor = investors_collection.find_one({"email": email})
    if not investor or not verify_password(password, investor["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}

@app.post("/signout")
async def signout():
    return {"message": "Signout successful"}

@app.post("/chatbot")
async def chatbot(user_prompt: dict):
    """
    Processes investor-related queries using Google Gemini AI.
    """
    try:
        # Custom investor-focused system prompt
        system_prompt = """
        You are an AI-powered investment advisor specializing in startup evaluations. 
        Your goal is to analyze potential investment opportunities based on market trends, 
        financial health, scalability, and risk assessment. Use clear financial reasoning 
        and provide insights that investors need. 

        Consider the following factors when responding:
        - **Market Potential**: How large is the target market? What trends indicate growth?
        - **Financial Health**: How much funding has the startup raised? What is its revenue model?
        - **Scalability**: Can this business expand easily? Does it have a unique value proposition?
        - **Risk Assessment**: What challenges or threats might impact this startup’s success?
        - **Competitive Landscape**: Who are the key competitors? How does this startup differentiate itself?

        Now, analyze the following investment opportunity:
        """

        # User input prompt
        user_input = user_prompt.get("query", "")

        # Final prompt sent to Gemini API
        payload = {
            "contents": [
                {
                    "parts": [{"text": system_prompt + user_input}]
                }
            ]
        }

        # Call Gemini API
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        headers = {"Content-Type": "application/json"}
        response = requests.post(url, json=payload, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Error connecting to Gemini API")

        gemini_response = response.json()

        return {
            "status": "success",
            "response": gemini_response
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))