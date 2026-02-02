# Work Habits Dashboard – School Setup Guide

## STEP 1 — Make a Copy of the Google Sheet Template
You must have the following sheets:
- students
- skills
- entries
- scores
- config

Fill in:
config:
  key          value
  school_name  EX: Lincoln Elementary
  web_app_url  (leave empty for now)

## STEP 2 — Open Apps Script
Google Sheet → Extensions → Apps Script

Paste the backend code.

## STEP 3 — Deploy as Web App
Click: Deploy → New Deployment
Type: Web App

- Execute as: User accessing the web app
- Who has access: Anyone in your organization

Copy the URL.

## STEP 4 — Paste URL into Web App
In /js/api.js:

const APPS_SCRIPT_URL = "YOUR_URL_HERE";

## STEP 5 — Upload Student List
Go to admin.html → Upload CSV

Format:
student_id,student_name
12345,Jane Smith
12346,Devon Reed

## STEP 6 — Use the Dashboard
Go to dashboard.html.
Click “Print Dashboard” to save as PDF.

You are now set up!
