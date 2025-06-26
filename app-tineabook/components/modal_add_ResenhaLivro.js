import { View } from "react-native";

<View>
{selectedBook && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.botao}>
                <Image style={styles.tinyLogo} source={IconeVoltar} />
              </Pressable>
              <View style={styles.infoLivro}>
                <Image
                  source={{
                    uri: selectedBook.volumeInfo.imageLinks?.thumbnail,
                  }}
                  style={styles.largeThumbnail}
                />
                <View style={styles.infoLiv}>
                  <Text style={styles.selectedTitle}>
                    {selectedBook.volumeInfo.title}
                  </Text>
                  <Text style={styles.selectedAuthor}>
                    por{' '}
                    {selectedBook.volumeInfo.authors?.[0] ||
                      'Autor desconhecido'}
                  </Text>
                </View>
              </View>
              <AirbnbRating
                count={5}
                defaultRating={rating}
                onFinishRating={setRating}
                size={30}
                showRating={false}
                starContainerStyle={styles.starContainer}
              />
              <TextInput
                placeholder="Escreva sua resenha"
                value={resenha}
                onChangeText={setResenha}
                style={[styles.input, styles.reviewInput]}
                multiline
              />
              <Button title="Enviar Resenha" onPress={addResenha} />
            </View>
          </View>
        </Modal>
      )}
    </View>