useEffect(() => {
    if (searchTerm) {
      pesquisaLivros();
    } else {
      setBooks([]);
    }
  }, [searchTerm]);
