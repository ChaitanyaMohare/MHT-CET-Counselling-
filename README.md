# NextStep — Guiding Every Step to Your Dream College

> A full-stack MHT-CET college admission counselling platform for Maharashtra engineering aspirants.

![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)
![EJS](https://img.shields.io/badge/Template-EJS-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📌 What is NextStep?

NextStep helps MHT-CET engineering aspirants in Maharashtra navigate the CAP admission process with confidence. Students register, choose a counselling plan, and complete payment. The expert counsellor then calls the student, fills in their college preferences via the admin panel, and delivers a personalised college shortlist.

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | EJS, HTML5, CSS3 |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose) |
| Sessions | express-session + connect-mongo |
| Payment | Cashfree Payment Gateway |
| Auth | Session-based admin login |

---

## 📁 Project Structure

```
NextStep/
├── app.js                         # Express entry point
├── package.json
│
├── models/
│   ├── Student.js                 # Student registration + payment
│   ├── CounsellingForm.js         # 8-section counselling preferences
│   └── Contact.js                 # Contact inquiries
│
├── controllers/
│   ├── indexController.js
│   ├── packagesController.js
│   ├── basicInfoController.js
│   ├── paymentController.js
│   ├── mainFormController.js
│   ├── contactController.js
│   └── adminController.js
│
├── routes/
│   ├── index.js
│   ├── packages.js
│   ├── basicInfo.js
│   ├── payment.js
│   ├── mainForm.js
│   ├── contact.js
│   ├── terms.js
│   └── admin.js
│
├── views/
│   ├── partials/
│   │   ├── head.ejs
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── progress.ejs
│   ├── admin/
│   │   ├── login.ejs
│   │   ├── dashboard.ejs
│   │   ├── student-detail.ejs
│   │   └── partials/
│   │       ├── sidebar.ejs
│   │       └── topbar.ejs
│   ├── index.ejs
│   ├── packages.ejs
│   ├── basic-info.ejs
│   ├── payment.ejs
│   ├── thankyou.ejs
│   ├── contact.ejs
│   └── terms.ejs
│
└── public/
    ├── css/
    │   ├── style.css
    │   └── admin.css
    └── images/
        └── logo (2).png
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
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

### 3. Start the server

```bash
# Development (auto-reload)
npx nodemon app.js

# Production
node app.js
```

### 4. Open in browser

```
http://localhost:3000
```

---

## 🔄 Student Flow

```
Homepage → Choose Plan → Basic Info Form → Payment → Thank You Page
```

After payment the student sees a confirmation page. The expert counsellor then calls the student and fills their counselling preferences via the **Admin Panel**.

---

## 🛡️ Admin Panel

Access at **`/admin`** — session-protected.

| Page | URL | Description |
|------|-----|-------------|
| Login | `/admin/login` | Admin sign-in |
| Dashboard | `/admin` | All students, stats, search & filter |
| Student Profile | `/admin/student/:id` | Full profile + counselling form |
| Logout | `/admin/logout` | End admin session |

**Dashboard features:**
- Stats cards — Total / Paid / Pending / Forms Filled
- Search by name, mobile, or email
- Filter by payment status
- Per-student 📞 Call and 💬 WhatsApp buttons
- "View & Fill Form" opens the full 8-section counselling form

---

## 📄 Routes Reference

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Homepage |
| `/packages` | GET | Pricing plans |
| `/select-plan` | POST | Save plan → redirect to basic info |
| `/basic-info` | GET / POST | Student info form |
| `/payment` | GET | Payment page |
| `/payment-success` | POST | Confirm payment → redirect to thank you |
| `/thankyou` | GET | Confirmation page |
| `/contact` | GET / POST | Contact form |
| `/terms` | GET | Terms & Conditions |
| `/admin/login` | GET / POST | Admin login |
| `/admin` | GET | Admin dashboard |
| `/admin/student/:id` | GET | Student profile |
| `/admin/student/:id/form` | POST | Save counselling form |
| `/admin/logout` | GET | Admin logout |

---

## 🗂️ Counselling Form — Section Overview

The admin fills this form during or after the call with the student.

| Section | Topic |
|---------|-------|
| A | Branch preferences (primary + up to 5 secondary) |
| B | College type (Govt / Private / Autonomous etc.) |
| C | Location & home district |
| D | College quality — NAAC, NBA, ranking, placement |
| E | Fee budget, hostel, scholarship |
| F | Priority ranking (drag & drop 1–5) |
| G | Special preferences — quota, target/exclude college |
| H | Career goals and post-graduation plans |

---

## 💳 Pricing Plans

| Plan | Price | Highlights |
|------|-------|-----------|
| Basic | ₹999 | PDF college list + 1 expert call (30 min) |
| Pro ⭐ | ₹1,999 | Personalised shortlist + 3 expert calls + branch guidance |
| Premium | ₹4,999 | Full support + unlimited calls + form filling + priority 24/7 |

---

## � Payment Integration

Payment is handled via **Cashfree Payment Gateway**. The current setup simulates a successful payment for development. To go live, replace the simulated form in `views/payment.ejs` with the [Cashfree JS SDK](https://docs.cashfree.com/docs/web-checkout-seamless).

---

## 📸 Screenshots

*(Add screenshots here after deployment)*

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📜 License

MIT License — free to use and modify.

---

## 👨‍💻 Author

**Chaitanya Mohare**
- GitHub: [@ChaitanyaMohare](https://github.com/ChaitanyaMohare)

---

> Built with ❤️ for Maharashtra's engineering aspirants.
