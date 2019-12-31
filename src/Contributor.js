'use strict';

{
  const { createAndAppend } = window.Util;

  const Contributor = (container, props) => {
    const { contributor } = props;

    const li = createAndAppend('li', container);
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
  };

  window.Contributor = Contributor;
}
