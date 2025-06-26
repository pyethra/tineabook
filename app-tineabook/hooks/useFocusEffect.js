
  // Garante que o teclado será exibido ao entrar na tela
  useFocusEffect(
    React.useCallback(() => {
      const focusInput = () => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      };      // Delay para garantir que o foco seja aplicado corretamente
      const timeout = setTimeout(focusInput, 100);

      return () => clearTimeout(timeout);
    }, [])
  );
