




const addResenha = () => {
    if (!selectedBook) return;
    const novaResenha = {
      id: Date.now(),
      title: selectedBook.volumeInfo.title,
      author: selectedBook.volumeInfo.authors?.[0] || 'Autor desconhecido',
      coverImage: selectedBook.volumeInfo.imageLinks?.thumbnail,
      resenha,
      rating,
    };
    salvarResenha(novaResenha);
    setModalVisible(false);
    setSelectedBook(null);
    setResenha('');
    setRating(0);
    setSearchTerm(''); // Limpa o campo de pesquisa após enviar a resenha
    Keyboard.dismiss(); // Fecha o teclado
  };