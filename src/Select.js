'use strict';

{
  const {
    Util: { createAndAppend },
    MyReact: { useRef },
  } = window;

  const Select = props => {
    const renderedRef = useRef(false);

    const { repos, setRepoIndex, container } = props;
    if (repos.length === 0) {
      return;
    }

    // The <select> element needs to be rendered once only
    if (renderedRef.current) {
      return;
    }

    const select = createAndAppend('select', container, {
      class: 'repo-select',
      autofocus: 'autofocus',
    });

    select.addEventListener('change', () => setRepoIndex(select.value));

    repos
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((repo, index) =>
        createAndAppend('option', select, {
          text: repo.name,
          value: index,
        }),
      );

    renderedRef.current = true;
  };

  window.Select = Select;
}
