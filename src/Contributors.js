'use strict';

{
  const {
    Util: { createAndAppend },
    Contributor,
  } = window;

  const Contributors = (container, props) => {
    const { contributors } = props;

    if (contributors.length === 0) {
      return;
    }

    const contributorsContainer = createAndAppend('section', container, {
      class: 'contributors-container whiteframe',
    });

    createAndAppend('div', contributorsContainer, {
      text: 'Contributions',
      class: 'contributor-header',
    });

    const ul = createAndAppend('ul', contributorsContainer, {
      class: 'contributor-list',
    });

    contributors.forEach(contributor => Contributor(ul, { contributor }));
  };

  window.Contributors = Contributors;
}
