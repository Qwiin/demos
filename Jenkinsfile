pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Client Tests') {
      steps {
        dir(path: 'mern-stack/client') {
          sh 'npm install'
          sh 'npm test'
        }

      }
    }

    stage('Server Tests') {
      steps {
        dir(path: 'mern-stack/server') {
          sh 'npm install'
          sh 'export MONGODB_URI=$MONGODB_URI'
          sh 'export EMAIL=$EMAIL'
          sh 'npm test'
        }

      }
    }

    stage('Build Images') {
      steps {
        sh 'docker build -t dquinn/mern-stack-app:client-latest client'
        sh 'docker build -t dquinn/mern-stack-app:server-latest server'
      }
    }

    stage('Push Images to DockerHub') {
      steps {
        withCredentials(bindings: [usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
          sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
          sh 'docker push dquinn/mern-stack-app:client-latest'
          sh 'docker push dquinn/mern-stack-app:server-latest'
        }

      }
    }

  }
  environment {
    MONGODB_URI = credentials('mongodb-uri')
    EMAIL = credentials('email')
  }
}