# Step 1: Create the transcript

Ask exactly:

> Send a video/link to transcribe, or paste a transcript.

For a local video or public URL, run:

```text
node <flick-skill>/scripts/transcribe.mjs --source <file-or-url> --project <output-directory>
```

For pasted text, write it to a local text file, then run:

```text
node <flick-skill>/scripts/write-transcript.mjs --text-file <path-to-pasted-text> --project <output-directory>
```

This produces `<output-directory>/transcript.json`. Use it as the script. Do not ask whether it is a reference, what the hook is, what the core message is, or what the ending should be.

Then ask, in this exact order:

1. What aspect ratio should this be: 9:16, 16:9, 1:1, or custom?
2. Put any logo, fonts, screenshots, product images, or brand guide into `<output-directory>/brand-assets/`. What should I use?
3. What do you think? Your opinion will make your animation much better.

Proceed when the transcript and these three answers are available.
