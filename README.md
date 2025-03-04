# Main_Menu_Item

Description

This project is a custom widget for YouTrack that adds a custom menu item to the interface.

📥 Installation
1. Clone the repository
2. Install dependencies:
 ```bash
 npm install
```

🚀 Running in Development Mode
To run the project in development mode without building, use:
npm start
After starting, the app will be available at:

http://localhost:8080/


🔨 Building the Project
To build the project, run:
npm run build
This will generate the compiled files inside the dist/ folder.

⚠ Important: Move manifest.json to dist/
By default, webpack copies manifest.json to ``` dist/widgets/full-page/ ```.
For YouTrack to work properly, you must move it to the root of ``` dist/ ```.

✅ Automatic move:
If after building manifest.json is inside dist/widgets/full-page/, run:
``` bash
mv dist/widgets/full-page/manifest.json dist/
```

📦 Creating a ZIP File for YouTrack
Before uploading the widget to YouTrack, ZIP only the contents of dist/, not the folder itself:
```bash
cd dist
zip -r main-menu-widget.zip .
```

Then, upload main-menu-widget.zip to YouTrack.


📖 Available Commands
``` bash
npm install	Install dependencies
npm start	Run the project in development mode
npm run build	Build the project
zip -r main-menu.zip .	ZIP the project for YouTrack (run inside dist/)
```
