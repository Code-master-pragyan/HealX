import sqlite3
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "db", "healx.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS diagnoses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            symptoms TEXT,
            result_json TEXT,
            language TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()

def save_diagnosis(symptoms, result, language):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO diagnoses (symptoms, result_json, language)
        VALUES (?, ?, ?)
    """, (symptoms, json.dumps(result), language))

    conn.commit()
    conn.close()

def get_last_diagnoses(limit=10):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM diagnoses
        ORDER BY timestamp DESC
        LIMIT ?
    """, (limit,))

    rows = cursor.fetchall()
    conn.close()

    results = []
    for row in rows:
        results.append({
            "id": row["id"],
            "symptoms": row["symptoms"],
            "result": json.loads(row["result_json"]),
            "language": row["language"],
            "timestamp": row["timestamp"]
        })
    return results
