THEMBELIHLE ANDROID PROJECT — PHONE-ONLY BUILD OPTION
=====================================================

You said you do not have a computer. This project now includes a GitHub Actions
workflow so GitHub's cloud runner can build a test APK for you.

PHONE-ONLY STEPS
----------------
1. Create a GitHub account using your Gmail address at https://github.com/join
   (if you do not already have one).
2. In your phone browser, sign in to GitHub and create a NEW PUBLIC repository
   named: thembelihle-android
3. Upload the contents of this ZIP to the repository (not the ZIP file itself).
   Make sure the .github/workflows/build-apk.yml file is included.
4. Open the repository's Actions tab. If prompted, enable Actions.
5. Open "Build Thembelihle APK", tap "Run workflow", then "Run workflow" again.
6. Wait for the run to finish successfully. Open the completed run and download
   the "Thembelihle-debug-APK" artifact.
7. Extract that downloaded artifact ZIP. It contains app-debug.apk.
8. Open app-debug.apk on your Android phone and follow Android's install prompts.

BUILD DETAILS
-------------
The GitHub Actions workflow uses Java 17 and Gradle 8.9 to run assembleDebug,
then uploads the APK as a downloadable workflow artifact for 14 days.
Android's official docs explain that assembleDebug creates a debug APK that is
signed with a debug key and can be installed for testing.

SAFETY / PRODUCTION NOTES
-------------------------
- A debug APK is for testing, not Google Play publication.
- The demo admin credentials are public in the app code: admin / Welcome123!
  Do not use these credentials in a live service.
- Interest submissions are stored only in the local browser/device and are not
  delivered to an organisation.
- This project has no live backend, secure accounts, payment system, or shared
  database. Add these and complete POPIA/privacy/security review before launch.
- Never upload passwords, signing keys, private certificates, or personal data
  to a public repository.
