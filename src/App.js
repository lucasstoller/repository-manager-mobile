import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [ repos, setRepos ] = useState([])
  
  useEffect(() => {
    api.get('repositories')
      .then(({ data: repos }) => {
        setRepos(repos)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  async function handleLikeRepository(id) {
    const { data: repo } = await api.post(`repositories/${id}/like`)
    repos.splice(repos.findIndex(repo => repo.id === id))
    setRepos([...repos, repo])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        { repos.map(repo => (
          <View style={styles.repositoryContainer} key={`repo-${ repo.id }`}>
            <Text style={styles.repository}>{ repo.title }</Text>

            <View style={styles.techsContainer}>
              { repo.techs.map(tech => (
                <Text 
                  style={styles.tech} 
                  key={`${repo.id}-tech-${tech}`}
                >
                  { tech }
                </Text>
              )) }
            </View>

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                testID={`repository-likes-${repo.id}`}
              >
                { repo.likes } curtidas
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(repo.id)}
              testID={`like-button-${repo.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </View>
        )) }
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
