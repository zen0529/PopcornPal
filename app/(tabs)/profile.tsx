import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Profile = () => {
  return (
    <View>
      <Link href={'/login'}>SignOut</Link>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})