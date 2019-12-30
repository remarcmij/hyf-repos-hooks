'use strict';

{
  const { createAndAppend } = window.Util;

  const Contributors = props => {
    const render = container => {
      const { contributors } = props;
      if (contributors.length === 0) {
        return;
      }

      createAndAppend('div', container, {
        text: 'Contributions',
        class: 'contributor-header',
      });
      const ul = createAndAppend('ul', container, {
        class: 'contributor-list',
      });
      if (!contributors) {
        return;
      }
      contributors.forEach(contributor => {
        const li = createAndAppend('li', ul);
        const a = createAndAppend('a', li, {
          href: contributor.html_url,
          class: 'contributor-item',
          target: '_blank',
        });
        createAndAppend('img', a, {
          src: contributor.avatar_url,
          alt: `avatar for ${contributor.login}`,
          class: 'contributor-avatar',
        });
        const div = createAndAppend('div', a, { class: 'contributor-data' });
        createAndAppend('div', div, { text: contributor.login });
        createAndAppend('div', div, {
          text: contributor.contributions,
          class: 'contributor-badge',
        });
      });
    };

    return { render };
  };

  window.Contributors = Contributors;
}
