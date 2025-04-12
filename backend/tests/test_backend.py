import pytest
import httpx
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get backend URL from environment
BACKEND_URL = os.getenv("REACT_APP_BACKEND_URL")

@pytest.mark.asyncio
async def test_root_endpoint():
    """Test the root endpoint returns expected response"""
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BACKEND_URL}/api/")
        assert response.status_code == 200
        assert response.json() == {"message": "Hello World"}
