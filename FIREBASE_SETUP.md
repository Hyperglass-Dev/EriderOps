# Firebase Setup Instructions

## 1. Add Authorized Domain

Go to **Firebase Console > Authentication > Settings > Authorized domains**

Add:
- `eriderops.online`
- `www.eriderops.online`
- `localhost` (for dev)

## 2. Update Firestore Security Rules

Go to **Firestore Database > Rules** and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click **Publish** to activate the rules.

## 3. Enable Email/Password Authentication

Already done ✓

## 4. Firestore Database Region

Set to `australia-southeast2` ✓
