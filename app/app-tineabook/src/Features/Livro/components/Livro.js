import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Thumbnail from "./Thumbnail";
import Estrelas from "./Estrelas";

import { fetchLivro } from "../services/fetchLivro";

const Livro = ({}) => {
  /*
        db 
        {
            "id_livro": "DwAAQBAJ1vU6",
            "id_usuario": 1,
            "data": "2024-06-30T00:00:00",
            "status": "lido",
            "estrelas": 5,
            "resenha": "Li em dois dias, muito bom!"
        }
    */

  /*
        google books 
        {
           {
            "id": "hkEKEAAAQBAJ",

            "volumeInfo": {
                "title": "API Security in Action",
                "authors": [
                    "Neil Madden"
                ],
                "publisher": "Manning Publications",
                "description": "API Security in Action teaches you how to create secure APIs for any situation. By following this hands-on guide you’ll build a social network API while mastering techniques for flexible multi-user security, cloud key management, and lightweight cryptography. Summary A web API is an efficient way to communicate with an application or service. However, this convenience opens your systems to new security risks. API Security in Action gives you the skills to build strong, safe APIs you can confidently expose to the world. Inside, you’ll learn to construct secure and scalable REST APIs, deliver machine-to-machine interaction in a microservices architecture, and provide protection in resource-constrained IoT (Internet of Things) environments. Purchase of the print book includes a free eBook in PDF, Kindle, and ePub formats from Manning Publications. About the technology APIs control data sharing in every service, server, data store, and web client. Modern data-centric designs—including microservices and cloud-native applications—demand a comprehensive, multi-layered approach to security for both private and public-facing APIs. About the book API Security in Action teaches you how to create secure APIs for any situation. By following this hands-on guide you’ll build a social network API while mastering techniques for flexible multi-user security, cloud key management, and lightweight cryptography. When you’re done, you’ll be able to create APIs that stand up to complex threat models and hostile environments. What's inside Authentication Authorization Audit logging Rate limiting Encryption About the reader For developers with experience building RESTful APIs. Examples are in Java. About the author Neil Madden has in-depth knowledge of applied cryptography, application security, and current API security technologies. He holds a Ph.D. in Computer Science. Table of Contents PART 1 - FOUNDATIONS 1 What is API security? 2 Secure API development 3 Securing the Natter API PART 2 - TOKEN-BASED AUTHENTICATION 4 Session cookie authentication 5 Modern token-based authentication 6 Self-contained tokens and JWTs PART 3 - AUTHORIZATION 7 OAuth2 and OpenID Connect 8 Identity-based access control 9 Capability-based security and macaroons PART 4 - MICROSERVICE APIs IN KUBERNETES 10 Microservice APIs in Kubernetes 11 Securing service-to-service APIs PART 5 - APIs FOR THE INTERNET OF THINGS 12 Securing IoT communications 13 Securing IoT APIs",
                
                "pageCount": 574,
                "printType": "BOOK",
                "categories": [
                    "Computers"
                ],
                "maturityRating": "NOT_MATURE",
                "imageLinks": {
                    "thumbnail": "http://books.google.com/books/content?id=hkEKEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
            },
            
            "searchInfo": {
                "textSnippet": "About the book API Security in Action teaches you how to create secure APIs for any situation."
            }
        }
    */

  return (
    <View style={styles.card}>
      <Thumbnail></Thumbnail>
      <Text style={styles.titulo}>{title}</Text>
      <Text style={styles.autor}>{authors?.join(", ")}</Text>
      <Estrelas></Estrelas>
      <Resenha></Resenha>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  autor: {
    fontSize: 16,
  },
  ano: {
    fontSize: 14,
    color: "#555",
  },
});

export default Livro;
