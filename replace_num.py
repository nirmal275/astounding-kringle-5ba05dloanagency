import os
import re

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace different formats of the number
                new_content = content.replace('98765 43210', '88008 38765')
                new_content = new_content.replace('98765-43210', '88008-38765')
                new_content = new_content.replace('9876543210', '8800838765')
                
                if content != new_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")
            except Exception as e:
                print(f"Error reading {filepath}: {e}")
