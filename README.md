# Nanyi's personal website

A Jekyll website published with GitHub Pages: a short introduction, blog posts, and a public research log.

## Write a research note

1. Copy `_research/_template.md` to `_research/YYYY-MM-DD-short-title.md`.
2. Replace the title, date, summary, and public references in the front matter.
3. Write the note in Markdown. Use only the headings that help; a short note is fine.
4. Preview the site and check the note, links, and mobile layout before publishing.

The research index and homepage update automatically. The template itself is excluded from publication.

## Write a blog post

Create `_posts/YYYY-MM-DD-short-title.md` with `layout: post`, `title`, and `date` in its front matter, then write the post in Markdown. Existing post URLs stay at `/<short-title>/`.

## Keep private work separate

Keep the private notebook outside this repository, with its own private backup. Prepare a separate public version of each note you choose to share. Only public sources and material you have permission to publish belong here.

An ignored folder, an unpublished flag, or a private source repository is not a substitute for separating private material from the public website. Git history may retain files after deletion, and feeds and generated pages can expose published content.

## Preview and publish

Install the gems with `bundle install`, then run `bundle exec jekyll serve`. Open the local URL shown in the terminal. Use `bundle exec jekyll build` for a fresh build check.

Review the changes and generated pages, including the public research index and feeds. Publish deliberately by committing the intended public files and pushing to the repository's GitHub Pages source branch. A successful local build is a preview check; verify the GitHub Pages deployment and live URLs after the push.
