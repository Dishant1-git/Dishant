# Dishant

Portfolio site — Next.js, TypeScript, Tailwind, GSAP.

```bash
npm install
npm run dev
```

## Contact form

The contact form in the Contact section posts to [Web3Forms](https://web3forms.com),
so there is no backend to run or deploy.

1. Enter your email at [web3forms.com](https://web3forms.com) and confirm it.
2. Paste the access key it sends you into `.env.local`:

   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key
   ```

3. Add the same variable in the Vercel project settings (Settings → Environment
   Variables) and redeploy.

The key is public by design — it only allows posting to your own inbox. Without
it the form still works: submissions fall back to opening the visitor's mail
client with the message pre-filled.
