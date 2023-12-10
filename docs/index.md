---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Tealina"
  text: "Enable your full stack project to have end-to-end types and API documentation"
  # tagline: and code, types, document generation.
  image:
    src: logov2.svg
    alt: Tealina
  actions:
    - theme: brand
      text: Get Started
      link: /guide
    - theme: alt
      text: Why Tealina ?
      link: /why

features:
  - title: End-to-end type safety
    details: No need to redefine types in the frontend.
  - title: API documentation
    details: Directly extra infomation from your code
  - title: Zero Runtime
    details: Just type alias and a few conventions
  - title: File base route
    details: API route according the file structure
---

<style>
  .container p.text{
    font-size: 23px;
    line-height: 1.5;
  }
</style>
<script setup>
import serverMp4 from '/server1.mp4?url'
import webMp4 from '/web.mp4?url'
</script>

<div style="height:1rem"></div>
<div class="vp-doc" style="padding-left:10%;padding-right:10%">

  ## Code, Types, Document generation
  <div style="height:.4rem"></div>
  <video :src="serverMp4" style="width:100%" muted loop controls/>

  <div style="height:2rem"></div>

  ## End-to-end type safety
  <div style="height:.4rem"></div>
  <video :src="webMp4" style="width:100%" muted loop controls/>
</div>