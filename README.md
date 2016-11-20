# HNSaver

This is just a small script that logs what Hacker News stories you see and which
ones you click on. It saves all of this information to localStorage and displays
it on the site, to show you what you've already seen / clicked on.

The idea is that this can be used to create a content-based filtering
recommender system. I want to create such a system, but for that I need enough
training data. :)

## How to use it

The script was written in ES6 and requires jQuery. You have to install some script runner extension to your browser, e.g. Tampermonkey (Chrome) and enable jQuery.

## How it looks like

![](https://raw.githubusercontent.com/florian/hnsaver/master/img.png)

- The star means I clicked on the story
- The check means I saw the story before
- Stories that I've never seen before won't be greyed out
