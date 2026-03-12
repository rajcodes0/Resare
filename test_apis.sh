#!/bin/bash

echo "=== TESTING ALL API ENDPOINTS ==="
echo ""

# Test 1: Search Profiles
echo "1. GET /api/v1/auth/search (empty query)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:5000/api/v1/auth/search?q=")
echo "Status: $STATUS"
curl -s "http://localhost:5000/api/v1/auth/search?q=" | jq '.users | length' 2>/dev/null || echo "Error parsing response"
echo ""

# Test 2: Search Profiles with query
echo "2. GET /api/v1/auth/search (with query 'raj')"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:5000/api/v1/auth/search?q=raj")
echo "Status: $STATUS"
curl -s "http://localhost:5000/api/v1/auth/search?q=raj" | jq '.users | length' 2>/dev/null || echo "Error"
echo ""

# Test 3: Get all files
echo "3. GET /api/files (all files)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:5000/api/files")
echo "Status: $STATUS"
curl -s "http://localhost:5000/api/files" | jq '.files | length' 2>/dev/null || echo "Error"
echo ""

# Test 4: Search files
echo "4. GET /api/files?q=test (search files)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:5000/api/files?q=test")
echo "Status: $STATUS"
curl -s "http://localhost:5000/api/files?q=test" | jq '.files | length' 2>/dev/null || echo "Error"
echo ""

# Get a user ID from search for profile test
echo "5. GET /api/v1/auth/profile/:userId"
USERID=$(curl -s "http://localhost:5000/api/v1/auth/search?q=raj" | jq -r '.users[0]._id' 2>/dev/null)
if [ ! -z "$USERID" ] && [ "$USERID" != "null" ]; then
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:5000/api/v1/auth/profile/$USERID")
  echo "Status: $STATUS (User ID: $USERID)"
  curl -s "http://localhost:5000/api/v1/auth/profile/$USERID" | jq '.user.username' 2>/dev/null || echo "Error"
else
  echo "Could not get user ID"
fi
echo ""

# Test 6: Get user files
echo "6. GET /api/files/user/:userId"
if [ ! -z "$USERID" ] && [ "$USERID" != "null" ]; then
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:5000/api/files/user/$USERID")
  echo "Status: $STATUS (User ID: $USERID)"
  curl -s "http://localhost:5000/api/files/user/$USERID" | jq '.files | length' 2>/dev/null || echo "Error"
else
  echo "Could not get user ID"
fi
echo ""

echo "=== API TESTING COMPLETE ==="
