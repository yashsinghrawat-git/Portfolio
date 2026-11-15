# EmailJS Setup — 5 Minutes

The contact form is wired up and ready. You just need to plug in 3 values from your free EmailJS account.

---

## Step 1 — Create a free account
Go to: https://www.emailjs.com  
Sign up with your Gmail (yashsingh2542@gmail.com).

---

## Step 2 — Add an Email Service
1. Dashboard → **Email Services** → **Add New Service**
2. Choose **Gmail**
3. Click **Connect Account** → sign in with yashsingh2542@gmail.com
4. Name it anything (e.g. `portfolio_gmail`)
5. Copy the **Service ID** (looks like `service_xxxxxxx`)

---

## Step 3 — Create an Email Template
1. Dashboard → **Email Templates** → **Create New Template**
2. Set **To Email**: `yashsingh2542@gmail.com`
3. Set **Subject**: `New Portfolio Message from {{from_name}}`
4. Set **Body** (paste this exactly):

```
Name:    {{from_name}}
Email:   {{from_email}}
Phone:   {{phone}}
Purpose: {{purpose}}

Message:
{{message}}
```

5. Save the template and copy the **Template ID** (looks like `template_xxxxxxx`)

---

## Step 4 — Get your Public Key
1. Dashboard → **Account** → **General** tab
2. Copy the **Public Key** (looks like `aBcDeFgHiJkLmNoPq`)

---

## Step 5 — Plug the 3 values into index.html

Open `index.html` and find these 3 lines (near the bottom, before `</body>`):

```html
emailjs.init({ publicKey: "YOUR_EMAILJS_PUBLIC_KEY" });
```
```js
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

Replace:
- `YOUR_EMAILJS_PUBLIC_KEY` → your Public Key from Step 4
- `YOUR_SERVICE_ID`         → your Service ID from Step 2
- `YOUR_TEMPLATE_ID`        → your Template ID from Step 3

---

## Free tier limits
- 200 emails/month — more than enough for a portfolio
- No credit card required

---

## Test it
Open your portfolio, fill in the contact form, hit Send.  
The message will arrive in yashsingh2542@gmail.com within seconds.
