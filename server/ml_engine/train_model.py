import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from imblearn.over_sampling import SMOTE # <--- The Secret Weapon
import joblib
import os

def train_real_model():
    print("--- 1. Loading Real Dataset (UCI Student Performance) ---")
    
    current_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(current_dir, 'data', 'student-mat.csv')
    
    try:
        df = pd.read_csv(csv_path, sep=';')
    except FileNotFoundError:
        print("File not found.")
        return

    # --- 2. DATA PREPROCESSING ---
    df['test_score'] = ((df['G1'] + df['G2']) / 40) * 100
    
    # We tweak the attendance calculation to be stricter
    # Real data shows very few absences, so even 10 absences is significant
    df['attendance'] = 100 - ((df['absences'] / 20) * 100) 
    df['attendance'] = df['attendance'].clip(lower=0)
    
    # Refined Risk Logic to create clearer separation
    def define_risk(row):
        if row['G3'] < 9: return 2      # Red (Fail)
        elif row['G3'] < 12: return 1   # Yellow (Warning) - Expanded range
        else: return 0                  # Green (Pass)

    df['risk_label'] = df.apply(define_risk, axis=1)

    X = df[['attendance', 'test_score']]
    y = df['risk_label']

    print(f"Original Dataset Size: {len(df)}")
    print(f"Original Class Distribution:\n{y.value_counts()}")

    # --- 3. SMOTE (Augmenting Data) ---
    print("\n--- 3. Applying SMOTE (Balancing Classes) ---")
    smote = SMOTE(random_state=42, k_neighbors=3)
    X_resampled, y_resampled = smote.fit_resample(X, y)
    
    print(f"New Dataset Size: {len(X_resampled)}")
    print(f"New Class Distribution:\n{y_resampled.value_counts()}")

    # Split the AUGMENTED data
    X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

    # --- 4. HYPERPARAMETER TUNING ---
    print("\n--- 4. Tuning Random Forest ---")
    
    # Define settings to try
    param_grid = {
        'n_estimators': [50, 100, 200],
        'max_depth': [None, 10, 20],
        'min_samples_split': [2, 5],
        'min_samples_leaf': [1, 2]
    }
    
    # GridSearch tries every combination to find the best one
    grid_search = GridSearchCV(RandomForestClassifier(random_state=42), param_grid, cv=5, n_jobs=-1)
    grid_search.fit(X_train, y_train)
    
    best_model = grid_search.best_estimator_
    print(f"Best Parameters Found: {grid_search.best_params_}")

    # --- 5. EVALUATE ---
    predictions = best_model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    
    print(f"\n🚀 FINAL Model Accuracy: {accuracy * 100:.2f}%")
    print(classification_report(y_test, predictions))

    # --- 6. SAVE ---
    model_path = os.path.join(current_dir, 'risk_model.pkl')
    joblib.dump(best_model, model_path)
    print(f"Model saved to: {model_path}")

if __name__ == "__main__":
    train_real_model()