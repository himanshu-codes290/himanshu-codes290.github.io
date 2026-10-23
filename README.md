# himanshu-pal.site

Personal portfolio of Himanshu Pal. Static HTML, CSS and a little JavaScript. No build step, no framework.

```
index.html      the page
styles.css      design tokens (light + dark) and layout
script.js       theme toggle, copy buttons, active nav link
assets/         résumé PDF
```

## Run locally

Open `index.html` in a browser, or serve the folder so the fonts and the PDF link resolve the same way they will in production:

```
npx serve .
# or
python -m http.server 8000
```

## Deploy to GitHub Pages

1. Create a repository (for example `himanshu-codes290.github.io` for a root-domain site, or any name for a project site).
2. Push this folder to the `main` branch.
3. In the repository settings, open Pages and choose **Deploy from a branch**, branch `main`, folder `/ (root)`.

`.nojekyll` is included so Pages serves the files as they are.

## Updating content

- Experience, projects and skills are plain HTML in `index.html`.
- Replace `assets/Himanshu_Pal_Resume.pdf` to update the résumé. The link text and filename are referenced twice in `index.html`.
- Colours and fonts are CSS custom properties at the top of `styles.css`. Both themes are defined there.
