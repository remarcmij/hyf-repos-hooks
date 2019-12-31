'use strict';

// For simplicity, error handling has been omitted.

{
  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  const {
    MyReact: { useState, useEffect, useRef, renderDOM },
    Util: { createAndAppend },
    Select,
    Repository,
  } = window;

  const App = container => {
    const [repos, setRepos] = useState([]);
    const [repoIndex, setRepoIndex] = useState(0);
    const domRefs = useRef(null);

    // Fetch the list of repositories.
    useEffect(async () => {
      const { data } = await axios.get(HYF_REPOS_URL);
      setRepos(data.sort((a, b) => a.name.localeCompare(b.name)));
    }, [setRepos]);

    // Render container elements once only and keep references
    // to them in a useRef hook.
    if (domRefs.current == null) {
      const headerContainer = createAndAppend('header', container, {
        class: 'header',
      });
      const mainContainer = createAndAppend('main', container, {
        class: 'main-container',
      });
      domRefs.current = { headerContainer, mainContainer };
    }

    const { headerContainer, mainContainer } = domRefs.current;

    Select(headerContainer, { repos, setRepoIndex });
    Repository(mainContainer, { repo: repos[repoIndex] });
  };

  window.onload = () => renderDOM(App, document.getElementById('root'));
}
