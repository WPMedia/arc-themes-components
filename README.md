# Purpose

This branch exists as a test/POC of distinct styling for mobile videos.

## Summary

All changes are in the `Video` component (`src/component/video/*`). I added CSS media queries to change the styling once the page narrows (I chose `800px` so it would be easy to notice the transition, but `500px` would be better for targeting mobile devices). I didn't go crazy with the styling options; I only removed the black bars on the sides of the video container when the page is roughly phone sized.

There is risk to this method. Media queries require a specific size, so we would need to determine an exact width where a device goes from "mobile" to non-mobile.

Overall, I think that mobile-specific video design can be done. The design team should keep the limits of media queries in mind when planning styling for mobile video elements.

## Changes

- I added a CSS selector in `src/components/video/_index.scss` for the mobile design. The selectors for the video containers are in media queries, but the rest of the styling is not (so it can be reused for mobile and non-mobile)
- I added additional styling in `src/components/video/themes/news.json`
