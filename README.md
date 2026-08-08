# ⚖️ Notary 662 Tehran - Smart AI Assistant

Automated Legal Drafting, Notary Services Research, and Strategic Planning powered by Llama 3 and Cloudflare D1.

## 🚀 Live Preview
The application is deployed on Cloudflare Pages:
**[https://notary-662-sbz.pages.dev](https://notary-662-sbz.pages.dev)**

---

## 🧪 Testing & RAG (Retrieval-Augmented Generation)

### 🚀 Live RAG Test Dashboard (Hugging Face)
Test the RAG model directly without any setup. This dashboard queries the 140+ Persian legal PDFs and shows results instantly.
👉 **[Open RAG Test Dashboard](https://huggingface.co/spaces/sosa123454321/Notary-662-RAG-Dashboard)**

### Google Colab RAG Test Panel
Use the official test notebook for advanced debugging and development.

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/SBZ-EDU/Notary-662-Cloudflare/blob/main/Notary_662_RAG_Test.ipynb)

---

## 🛠️ Tech Stack
- **Frontend:** React + Tailwind CSS
- **Backend:** Cloudflare Pages Functions (Serverless)
- **Database:** Cloudflare D1 (SQL)
- **AI Models:** Llama 3.2 (via Hugging Face Inference)
- **RAG Data:** Hugging Face Dataset (140+ Legal PDFs)

---

## ⚙️ Setup & Deployment

### 1. D1 Database
Create the database and run migrations:
```bash
npx wrangler d1 create notary_db
npx wrangler d1 execute notary_db --file=./migrations/0000_init.sql --remote
```

### 2. Environment Variables
Add your Hugging Face Token to Cloudflare:
- `HF_TOKEN`: Your Hugging Face User Access Token.

### 3. Deploy
```bash
npm install
npm run build
npx wrangler pages deploy dist --project-name notary-662-sbz
```
