<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="public/pay-day.png" alt="Salary Calculator Logo"></a>
</p>

<h3 align="center">Payroll Lens</h3>

<p align="center"> A salary calculator tool intended to help employees and 
employers in seeking information or clarification on how to calculate from gross to net salary.
It also help employees to determine how RSU (Restricted Stock Units) modify the monthly take home or annual earnings.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](./TODO.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Write about 1-2 paragraphs describing the purpose of your project.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running.

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo.

## 🔧 Running the tests <a name = "tests"></a>

Explain how to run the automated tests for this system.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## 🚀 Deployment <a name = "deployment"></a>

### ✅ Prerequisites

Make sure you have the following installed:

| Tool             | Version Command      |
| ---------------- | -------------------- |
| **Node.js**      | `node -v`            |
| **npm**          | `npm -v`             |
| **Angular CLI**  | `ng version`         |
| **Firebase CLI** | `firebase --version` |

If not installed:

```bash
npm install -g @angular/cli
npm install -g firebase-tools
```

---

### 🔧 Step 1: Create Angular App (skip if you already have one)

```bash
ng new my-angular-app
cd my-angular-app
```

✅ Choose `Yes` for Angular routing and your preferred stylesheet format (CSS, SCSS, etc.)

---

## 🛠 Step 2: Build Angular App

Angular 20 uses **standalone configuration**, so the build command is:

```bash
ng build
```

> This will output your build into `dist/my-angular-app/`

---

### 🔥 Step 3: Initialize Firebase in Your Project

```bash
firebase login
firebase init
```

You’ll see a menu of options. Use spacebar to select:

✅ **Hosting: Configure files for Firebase Hosting**

Then press **Enter**.

### 📋 Firebase CLI Prompts:

| Prompt                        | What to Answer                    |
| ----------------------------- | --------------------------------- |
| **Select a Firebase project** | Choose your project or create one |
| **Public directory**          | `dist/my-angular-app/browser`     |
| **Single-page app rewrite?**  | `Yes`                             |
| **Overwrite index.html?**     | `No`                              |

> 🟡 Replace `my-angular-app` with your real project name if it's different.

---

### 🚀 Step 4: Deploy to Firebase Hosting

```bash
firebase deploy
```

You'll see output like:

```
✔ Deploy complete!
Hosting URL: https://your-project-name.web.app
```

🎉 Your Angular 20 app is live on Firebase Hosting!

---

### 📂 Example Project Folder Structure After Build

```
my-angular-app/
├── dist/
│   └── my-angular-app/
│       └── browser/
├── firebase.json
├── angular.json
├── ...
```

---

### 📄 Example `firebase.json`

Firebase automatically generates this, but it should look like:

```json
{
  "hosting": {
    "public": "dist/my-angular-app/browser",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

### 🌐 Step 5 (Optional): Add a Custom Domain

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → Hosting → "Add custom domain"
3. Enter your domain (e.g., `www.example.com`)
4. Follow instructions to add **A** and **TXT** records to your DNS provider

Firebase will manage SSL automatically.

---

### ✅ Recap

| Step               | Command           |
| ------------------ | ----------------- |
| Build Angular      | `ng build`        |
| Init Firebase      | `firebase init`   |
| Deploy to Firebase | `firebase deploy` |


## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database

## ✍️ Authors <a name = "authors"></a>

- [@gabriel-rusu](https://github.com/gabriel-rusu) - Idea & Initial work

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References


### Features

- vacation suggestions (based on the number of holidays in a week) + floating days option
- salary comparisons
- bonus feature: micro-frontends split, the toolbar component should be a micro-frontend
