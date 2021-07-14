<template>
  <div class="aside-out">
    <div class="aside-top">
      <div class="aside-title">
        {{ asideTop.title }}
      </div>
      <p>
        {{ asideTop.subTitle }}
      </p>
      <div>
        <a :href="asideTop.href">
          {{ asideTop.hrefContent }}
        </a>
      </div>
    </div>
    <div class="aside-main">
      <p>
        {{ asideMain.content }}
      </p>
      <div>
        <a :href="asideMain.href">
          {{ asideMain.hrefContent }}
        </a>
      </div>
    </div>
    <div class="aside-bottom">
      <p>
        {{ asideBottom.content }}
      </p>
      <a :href="asideBottom.href">
        {{ asideBottom.hrefContent }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftAside',
  data() {
    return {
      asideTop: {
        title: 'JavaScript',
        subTitle: 'Vanilla JavaScript Example',
        href: 'https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanillajs/',
        hrefContent: 'Source'
      },
      asideMain: {
        content: `JavaScript® (often shortened to JS) is a lightweight, 
            interpreted, object-oriented language with
            first-class functions, most known as the scripting language for Web pages, 
            but used in many non-browser
            environments as well such as node.js or Apache CouchDB.`,
        href: 'http://developer.mozilla.org/en-US/docs/JavaScript/',
        hrefContent: 'JavaScript'
      },
      asideBottom: {
        content:
          'If you have other helpful links to share, or find any of the links above no longer work, please',
        href: 'https://github.com/tastejs/todomvc/issues/',
        hrefContent: 'let us knowe'
      }
    }
  }
}
</script>

<style lang="less" scoped>
a {
  color: rgb(184, 63, 69);
  text-decoration: none;
}

a:hover {
  color: rgb(120, 126, 126);
  text-decoration: underline;
}

.aside-out {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10px;
  box-sizing: border-box;
  width: 280px;
  padding: 10px;
  font-size: 0.9em;
  color: rgb(77, 77, 77);
  background-color: rgb(251, 251, 251);

  .aside-top {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px;
    color: rgb(0, 0, 0);

    .aside-title {
      font-size: 1.6em;
    }

    & > p {
      padding: 10px;
      font-weight: bold;
      line-height: 20px;
      background-color: rgb(241, 241, 241);
    }
  }

  .aside-main {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 10px;
    font-style: italic;
    border-top: 1px dashed rgb(197, 197, 197);

    &::after,
    &::before {
      position: absolute;
      font-size: 3em;
      color: rgb(217, 217, 217);
    }

    &::before {
      content: '“';
      top: -3px;
      left: 10px;
    }

    &::after {
      content: '”';
      bottom: 12px;
      right: 18px;
    }

    & > a {
      margin-left: 175px;
      font-style: normal;
    }
  }

  .aside-bottom {
    padding: 10px;
    font-style: italic;
    border-top: 1px dashed rgb(197, 197, 197);

    & > p {
      line-height: 20px;
    }
  }
}
</style>