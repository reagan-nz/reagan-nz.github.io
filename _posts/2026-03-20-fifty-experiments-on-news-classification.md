---
layout: post
title: "Fifty experiments on a news classification task"
date: 2026-03-20
---

Spent this quarter running a fairly systematic ablation study on a 4-class news topic classification task — 5 preprocessing strategies × 2 feature settings × 5 baseline classifiers, 50 runs total, evaluated on accuracy, macro-F1, and confusion matrices instead of just eyeballing one accuracy number and calling it done.

Two things stuck with me more than the actual accuracy numbers:

1. **Heavier preprocessing helped less than I expected.** More aggressive cleaning didn't reliably translate into better classification — past a certain point it looks like it mostly changes *which* mistakes the model makes rather than reducing how many it makes.
2. **A throwaway metadata field became a shortcut.** Which outlet a story came from turned out to be, in some configurations, a better predictor of the label than the article text itself. That's less a fact about news classification and more a warning about the dataset — a model that "works" by exploiting a source-label correlation isn't actually doing the task you think it's doing.

Also confirmed the obvious-but-still-annoying fact that short articles are harder to classify than long ones, mostly because there's just less signal to work with per example.

This is the closest thing I have to an actual research project so far — not because the individual pieces (pandas, scikit-learn, some NLTK preprocessing) are advanced, but because the process of running condition after condition and taking the "why did that happen" question seriously is the part I want to get more experience doing.
