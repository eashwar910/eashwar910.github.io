---
title: "Crop Disease Classifier"
slug: "crop-disease-classifier"
tags: ["agriculture", "ml", "computer-vision"]
hasDemo: false
demoUrl: null
stickerTheme: "leaf-scan"
icon: "leaf-circuit"
defaultPosition: { x: 60, y: 60 }
order: 1
---

## Overview

A convolutional model trained on leaf imagery to flag **early-stage disease** across three
staple crops, deployed as a lightweight inference API for use directly in the field.

The goal was practical: give a smallholder farmer a same-day answer from a phone photo, with no
cloud round-trip required.

## Results

- **94.2%** validation accuracy across 6 disease classes
- Runs inference in **under 200ms** on a Raspberry Pi 4
- Model quantized to 4.1 MB for fully offline operation

## Stack

- PyTorch + `timm` for the backbone (EfficientNet-B0, transfer-learned)
- ONNX Runtime for edge deployment
- Streamlit front-end for the interactive demo

> Built as a proof that useful agricultural ML doesn't require heavyweight infrastructure —
> the whole pipeline fits on a device you can hold in one hand.
