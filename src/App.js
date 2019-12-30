'use strict';

// For simplicity, error handling has been omitted

{
  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  const {
    MyReact: { useState, useEffect, useRef, render: renderDOM },
    Util: { createAndAppend },
    Select,
    Repository,
  } = window;

  function App() {
    const [repos, setRepos] = useState([]);
    const [repoIndex, setRepoIndex] = useState(0);
    const domRefs = useRef(null);

    useEffect(async () => {
      const res = await axios.get(HYF_REPOS_URL);
      setRepos(res.data);
    }, []);

    const selectComponent = Select({
      repos,
      setRepoIndex,
    });

    const repositoryComponent = Repository({
      repo: repos[repoIndex],
    });

    const render = () => {
      if (!domRefs.current) {
        const root = document.getElementById('root');
        const headerContainer = createAndAppend('header', root, {
          class: 'header',
        });
        const mainContainer = createAndAppend('main', root, {
          class: 'main-container',
        });
        domRefs.current = { headerContainer, mainContainer };
      }

      const { headerContainer, mainContainer } = domRefs.current;
      selectComponent.render(headerContainer);
      repositoryComponent.render(mainContainer);
    };

    return { render };
  }

  window.onload = () => renderDOM(App);
}
