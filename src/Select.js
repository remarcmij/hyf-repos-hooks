'use strict';

{
  const {
    Util: { createAndAppend },
    MyReact: { useRef },
  } = window;

  const Select = (container, props) => {
    const isRenderedRef = useRef(false);

    // Render once only
    if (isRenderedRef.current) return;

    const { repos, setRepoIndex } = props;
    if (repos.length === 0) return;

    const select = createAndAppend('select', container, {
      class: 'repo-select',
      autofocus: 'autofocus',
    });

    select.addEventListener('change', () => setRepoIndex(select.value));

    repos.forEach((repo, index) =>
      createAndAppend('option', select, {
        text: repo.name,
        value: index,
      })
    );

    isRenderedRef.current = true;
  };

  window.Select = Select;
}
