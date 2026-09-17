# Dishant

Portfolio site — Next.js, TypeScript, Tailwind, GSAP.

```bash
npm install
npm run dev
```

## Contact form

The contact form posts to [Web3Forms](https://web3forms.com) — no backend to run
or deploy, and no environment variables to configure.

The access key is `ACCESS_KEY` at the top of
`src/components/ContactForm.tsx`. It is public by design: it only permits
posting to the inbox it belongs to, and it is served to every visitor in the
client bundle either way. To point the form at a different inbox, get a key at
[web3forms.com](https://web3forms.com), confirm the email, and replace that
constant.

Note this is not a pattern to reuse for real secrets — anything that must stay
private belongs on the server, not in a client component.
