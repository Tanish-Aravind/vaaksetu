#!/usr/bin/env python3
"""Test script to verify all API endpoints are working"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test the health endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        print("✓ Health endpoint:", response.json())
        return True
    except Exception as e:
        print("✗ Health endpoint failed:", str(e))
        return False

def test_root():
    """Test the root endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/")
        print("✓ Root endpoint:", response.json())
        return True
    except Exception as e:
        print("✗ Root endpoint failed:", str(e))
        return False

def test_chat():
    """Test the chat endpoint"""
    try:
        payload = {
            "message": "Hello, I'm feeling stressed today",
            "language": "en"
        }
        response = requests.post(
            f"{BASE_URL}/chat",
            json=payload,
            timeout=60
        )
        if response.status_code == 200:
            print("✓ Chat endpoint:", response.json())
            return True
        else:
            print(f"✗ Chat endpoint returned {response.status_code}:", response.text)
            return False
    except Exception as e:
        print("✗ Chat endpoint failed:", str(e))
        return False

def test_transcribe():
    """Test the transcribe endpoint"""
    try:
        # Create a dummy audio file (will fail transcription but tests the endpoint)
        dummy_audio = b"RIFF\x00\x00\x00\x00WAVE"
        files = {
            "audio": ("test.wav", dummy_audio, "audio/wav")
        }
        data = {
            "language": "kn"
        }
        response = requests.post(
            f"{BASE_URL}/transcribe",
            files=files,
            data=data,
            timeout=30
        )
        print(f"✓ Transcribe endpoint responded with {response.status_code}")
        if response.status_code in [200, 400]:  # 400 is OK for invalid audio
            print("  Response:", response.text[:100])
            return True
        return False
    except Exception as e:
        print("✗ Transcribe endpoint failed:", str(e))
        return False

if __name__ == "__main__":
    print("Testing VaakSetu API endpoints...\n")
    
    results = {
        "Health": test_health(),
        "Root": test_root(),
        "Chat": test_chat(),
        "Transcribe": test_transcribe()
    }
    
    print("\n" + "="*50)
    print("Summary:")
    for name, passed in results.items():
        status = "PASS" if passed else "FAIL"
        print(f"  {name}: {status}")
    print("="*50)
    
    if all(results.values()):
        print("\n✓ All endpoints are working!")
    else:
        print("\n✗ Some endpoints failed. Check the backend logs.")
