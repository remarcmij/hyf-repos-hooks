'use strict';

{
  const {
    MyReact: { useState, useEffect },
    Util: { createAndAppend },
    Contributors,
  } = window;

  const Repository = (container, props) => {
    const { repo } = props;

    const [contributors, setContributors] = useState([]);

    useEffect(async () => {
      if (repo) {
        const url = repo.contributors_url;
        const { data } = await axios.get(`${url}?per_page=100`);
        setContributors(data);
      }
    }, [repo]);

    const addRow = (tbody, label, value) => {
      const row = createAndAppend('tr', tbody);
      createAndAppend('th', row, { text: `${label}:`, class: 'label' });
      createAndAppend('td', row, { text: value });
      return row;
    };

    if (!repo) {
      return;
    }

    container.innerHTML = '';

    const repoContainer = createAndAppend('section', container, {
      class: 'repo-container whiteframe',
    });

    const cardContainer = createAndAppend('div', repoContainer, {
      class: 'card-container',
    });

    const table = createAndAppend('table', cardContainer);
    const tbody = createAndAppend('tbody', table);

    const firstRow = addRow(tbody, 'Repository');
    createAndAppend('a', firstRow.lastChild, {
      href: repo.html_url,
      target: '_blank',
      text: repo.name,
    });

    addRow(tbody, 'Description', repo.description || '');
    addRow(tbody, 'Forks', repo.forks);
    addRow(tbody, 'Updated', new Date(repo.updated_at).toLocaleString());

    Contributors(container, { contributors });
  };

  window.Repository = Repository;
}
