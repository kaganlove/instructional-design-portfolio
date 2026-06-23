# S3 Projects Directory

This directory is a placeholder for your existing instructional design projects currently hosted on AWS S3 (like Articulate Storyline, Rise 360, or other interactive modules).

## How to integrate your projects:

1. **Download your projects from S3**:
   - Go to your AWS S3 bucket console: [love-storylineportfolio3](https://us-east-1.console.aws.amazon.com/s3/buckets/love-storylineportfolio3?region=us-east-1&tab=objects#)
   - Download the published web folders for your modules.
   - Extract them so you have folders like `module1-storyline`, `compliance-training`, etc.

2. **Move them here**:
   - Copy those folders directly into this `s3-projects/` directory.
   - For example:
     - `s3-projects/module1-storyline/story.html` (or `index.html`)
     - `s3-projects/compliance-training/index.html`

3. **Link them in the Portfolio**:
   - The main landing page (`index.html`) contains card elements for your S3 projects.
   - Update the links on those cards to point to `./s3-projects/your-folder-name/story.html` or `./s3-projects/your-folder-name/index.html`.
   - When you push to GitHub, these relative paths will work out-of-the-box on your GitHub Pages site!
