# 🎓 MHT-CET Counselling

> **Right College. Right Branch. Bright Future.**
> A full-stack web application providing expert-guided MHT-CET engineering admission counselling for Maharashtra aspirants.

![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)
![EJS](https://img.shields.io/badge/Template-EJS-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📌 Overview

MHT-CET Counselling is a complete admission guidance platform that helps engineering aspirants in Maharashtra:

- Get **personalized college predictions** based on CET percentile, category, and preferences
- Access **real-time cutoff data** for all colleges and branches
- Book **1-on-1 expert counselling sessions**
- Get help with **CAP choice filling**, document verification, and form submission

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | EJS Templates, HTML5, CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose) |
| Sessions | express-session + connect-mongo |
| Payment | Cashfree Payment Gateway (placeholder) |
| Env Config | dotenv |

---

## 📁 Project Structure

```
MHT-CET-Counselling/
├── app.js                        # Express app entry point
├── .env                          # Environment variables (not committed)
├── package.json
│
├── models/
│   ├── Student.js                # Student registration + payment schema
│   ├── CounsellingForm.js        # Full 8-section counselling form schema
│   └── Contact.js                # Contact inquiry schema
│
├── controllers/
│   ├── indexController.js
│   ├── packagesController.js
│   ├── basicInfoController.js
│   ├── paymentController.js
│   ├── mainFormController.js
│   └── contactController.js
│
├── routes/
│   ├── index.js
│   ├── packages.js
│   ├── basicInfo.js
│   ├── payment.js
│   ├── mainForm.js
│   ├── contact.js
│   └── terms.js
│
├── views/
│   ├── partials/
│   │   ├── head.ejs              # HTML head + Google Fonts
│   │   ├── navbar.ejs            # Sticky white navbar
│   │   ├── footer.ejs            # Simple footer (used by inner pages)
│   │   └── progress.ejs          # 5-step progress bar
│   ├── index.ejs                 # Homepage
│   ├── packages.ejs              # Pricing plans
│   ├── basic-info.ejs            # Pre-payment student form
│   ├── payment.ejs               # Payment page (Cashfree)
│   ├── main-form.ejs             # 8-section counselling form
│   ├── thankyou.ejs              # Confirmation page
│   ├── contact.ejs               # Contact us page
│   ├── terms.ejs                 # Terms & Conditions
│   ├── 404.ejs                   # Not found page
│   └── error.ejs                 # Error page
│
└── public/
    └── css/
        └── style.css             # Full responsive stylesheet
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

### 1. Clone the repository

```bash
git clone https://github.com/ChaitanyaMohare/MHT-CET-Counselling-.git
cd MHT-CET-Counselling-
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/mhtcet_counselling
SESSION_SECRET=your_super_secret_key_here
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
PORT=3000
```

### 4. Start the server

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

### 5. Open in browser

```
http://localhost:3000
```

---

## 📄 Pages & Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Homepage with hero, features, FAQ |
| `/packages` | GET | Pricing plans (Basic / Pro / Premium) |
| `/select-plan` | POST | Save selected plan → redirect to basic info |
| `/basic-info` | GET | Pre-payment student information form |
| `/basic-info` | POST | Save student to MongoDB → redirect to payment |
| `/payment` | GET | Payment page with order summary |
| `/payment-success` | POST | Update payment status → redirect to main form |
| `/main-form` | GET | 8-section post-payment counselling form |
| `/main-form` | POST | Save counselling form → redirect to thank you |
| `/thankyou` | GET | Submission confirmation page |
| `/contact` | GET | Contact us page |
| `/contact` | POST | Save contact inquiry to MongoDB |
| `/terms` | GET | Terms & Conditions page |

---

## 🗂️ Counselling Form Sections

The main counselling form (Section A–H) covers:

| Section | Details |
|---------|---------|
| A | Branch preferences (primary + up to 5 secondary) |
| B | College type (Govt / Private / Autonomous etc.) |
| C | Location preferences and home district |
| D | College quality (NAAC, NBA, ranking, placement) |
| E | Financial preferences (fee budget, hostel, scholarship) |
| F | Priority ranking (drag & drop — 1 to 5) |
| G | Special preferences (quota, target/exclude college) |
| H | Career goals and post-graduation plans |

---

## 💳 Payment Integration

The payment flow uses **Cashfree Payment Gateway**. Currently the Pay button simulates a successful payment for development. To go live:

1. Sign up at [cashfree.com](https://www.cashfree.com/)
2. Add your `CASHFREE_APP_ID` and `CASHFREE_SECRET_KEY` to `.env`
3. Replace the simulated form in `views/payment.ejs` with the [Cashfree JS SDK](https://docs.cashfree.com/docs/web-checkout-seamless)

---

## 📦 Pricing Plans

| Plan | Price | Key Features |
|------|-------|-------------|
| Basic | ₹999 | PDF college list, 1 expert call (30 min) |
| Pro ⭐ | ₹1,999 | Personalized shortlist, 3 expert calls, branch guidance |
| Premium | ₹4,999 | Full support, unlimited calls, form filling, priority 24/7 |

---

## 🔒 Security

- Passwords / secrets stored in `.env` (excluded from git)
- Session data stored in MongoDB via `connect-mongo`
- Server-side validation on all form inputs
- Input sanitization and type checking before DB writes
- Session-protected routes (each step requires the previous step)

---

## 🌐 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `SESSION_SECRET` | Secret key for express-session |
| `CASHFREE_APP_ID` | Cashfree payment gateway App ID |
| `CASHFREE_SECRET_KEY` | Cashfree payment gateway secret key |
| `PORT` | Server port (default: 3000) |

---

## 📸 Screenshots

> Homepage · Packages · Basic Info Form · Payment · Counselling Form · Thank You

*(Add screenshots here after deployment)*

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use and modify for your own projects.

---

## 👨‍💻 Author

**Chaitanya Mohare**
- GitHub: [@ChaitanyaMohare](https://github.com/ChaitanyaMohare)

---

> Built with ❤️ for Maharashtra's engineering aspirants.
