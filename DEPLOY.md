# Portfolio Deployment & Hosting Guide

This guide explains how to push your local portfolio project to GitHub and host it for free using **GitHub Pages**.

## Step 1: Create a GitHub Repository
1. Log in to your GitHub account at [github.com](https://github.com).
2. Click the **New** button (or go to [github.com/new](https://github.com/new)).
3. Name your repository (e.g., `instructional-design-portfolio`).
4. Set the visibility to **Public** (required for the free tier of GitHub Pages).
5. Do **NOT** initialize the repository with a README, `.gitignore`, or License (as we already have files).
6. Click **Create repository**.

## Step 2: Link Your Local Folder & Push Code
Open a terminal (e.g., PowerShell on Windows) in your project directory: `c:\Users\Kagan Love\Documents\Projects\instructional-design-portfolio`. Run the following commands:

```bash
# Add all files to staging
git add .

# Create the initial commit
git commit -m "Initial commit: Portfolio structure and REST API module"

# Rename branch to main
git branch -M main

# Link to your remote GitHub repository (replace with your actual GitHub URL from the repository page)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/instructional-design-portfolio.git

# Push to your GitHub repository
git push -u origin main
```

## Step 3: Enable GitHub Pages
Once the code is pushed:
1. Go to your repository page on GitHub.
2. Click on the **Settings** tab (gear icon at the top).
3. In the left-hand sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**, set the source to **Deploy from a branch**.
5. Under **Branch**, select `main` and the folder `/ (root)`.
6. Click **Save**.
7. Wait 1–2 minutes. GitHub will display a notification banner at the top of the Pages settings showing your live URL (e.g., `https://YOUR_GITHUB_USERNAME.github.io/instructional-design-portfolio/`).

---

## Step 4: Drop Your S3 Portfolio Files
To showcase your existing Articulate Storyline or Rise courses:
1. Log in to your [AWS S3 Bucket Console](https://us-east-1.console.aws.amazon.com/s3/buckets/love-storylineportfolio3?region=us-east-1&tab=objects#).
2. Download the folders containing your published web exports.
3. Place them inside the `s3-projects/` folder.
   - For example: `s3-projects/product-walkthrough/story.html`
4. In `index.html`, verify that the anchor tag links match the paths of the index files you dropped in.
5. Push the new folders to GitHub:
   ```bash
   git add .
   git commit -m "Added S3 portfolio files"
   git push origin main
   ```
   They will automatically be hosted online alongside your portfolio!
