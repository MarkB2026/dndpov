DNDPOV v5.58 — Character Party Manager local test.

1. Install Python 3.
2. Run: py -3 -m pip install -r requirements.txt
3. Put your secret_key.txt alongside ai_dm_server.py. Never publish the key.
4. Run START_AI_DM.bat.
5. Open purple Adventure Journal > Party / Sheets. Choose a text-based PDF or paste character details, review and Save.

Characters are stored under private_characters/ per browser session and supplied to AI DM as context. Raw PDFs are NOT stored or sent to OpenAI. Character sheet text IS sent to OpenAI when you ask the DM. This is not a rules engine: dice, battle outcomes, HP and inventory are not automatically applied. Scanned PDFs need OCR; use manual entry for now. This is a LOCAL TEST BUILD, not for public deployment.


v5.59: Polished Character Party Manager presentation, preview stat tiles, improved upload area, clear roster and editable extraction. No changes to server or combat rules.
