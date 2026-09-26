import pandas as pd
import random

# Synthetic data
data = [
    # Bug Reports
    ("The app crashes every time I try to upload a profile picture.", "Bug Report"),
    ("Screen goes completely white when I click on settings.", "Bug Report"),
    ("I keep getting a 500 server error when logging in.", "Bug Report"),
    ("The submit button is completely unresponsive on iOS.", "Bug Report"),
    ("My data isn't saving when I close the application.", "Bug Report"),
    ("The UI glitches and overlaps when rotating my phone.", "Bug Report"),
    ("Push notifications aren't coming through at all.", "Bug Report"),
    ("The app force closes randomly when I scroll down.", "Bug Report"),
    
    # Complaints
    ("Customer support is terrible, nobody replied to my ticket.", "Complaint"),
    ("The new subscription price is a complete rip-off.", "Complaint"),
    ("I am so frustrated, the app is incredibly slow and laggy.", "Complaint"),
    ("Stop sending me so many spam emails every day!", "Complaint"),
    ("Your latest update completely ruined the user experience.", "Complaint"),
    ("I can't believe how difficult it is to cancel my account.", "Complaint"),
    
    # Suggestions
    ("Can you please add a dark mode feature?", "Suggestion"),
    ("It would be great if we could export the data to Excel.", "Suggestion"),
    ("I recommend adding a search bar to the top menu.", "Suggestion"),
    ("Please add support for multiple languages, especially Spanish.", "Suggestion"),
    ("You should implement two-factor authentication for better security.", "Suggestion"),
    ("I wish there was a way to customize the dashboard widgets.", "Suggestion"),
    
    # Praise
    ("I absolutely love this new update, the UI is so clean!", "Praise"),
    ("This is the best app I have ever used for managing tasks.", "Praise"),
    ("Incredible work on the new feature, it saves me hours!", "Praise"),
    ("The performance improvements are amazing, so much faster now.", "Praise"),
    ("Your customer service team is wonderful and very helpful.", "Praise"),
    
    # Questions
    ("How do I change my billing address in the settings?", "Question"),
    ("Where can I find the API documentation?", "Question"),
    ("When is the next major release coming out?", "Question"),
    ("Why did my credit card get declined?", "Question"),
    ("Who can I contact to get a refund?", "Question"),
    ("Which version of Android is supported?", "Question")
]

# Duplicate the data a few times so the model pays attention to it (giving it more weight)
# Since the original dataset is ~4000 rows, 30 rows won't change much. 
# Let's duplicate these 30 rows 5 times, creating 150 high-quality software examples.
data = data * 5

df_new = pd.DataFrame(data, columns=["content", "category"])

# Load original
df_orig = pd.read_csv("data/final dataset.csv")

# Ensure 'Unnamed: 0' index column is handled correctly if it exists
if 'Unnamed: 0' in df_orig.columns:
    df_new['Unnamed: 0'] = range(len(df_orig), len(df_orig) + len(df_new))

# Append
df_combined = pd.concat([df_orig, df_new], ignore_index=True)

# Save
df_combined.to_csv("data/final dataset.csv", index=False)
print(f"Successfully appended {len(df_new)} rows of software feedback to data/final dataset.csv!")
