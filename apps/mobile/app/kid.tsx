import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function KidDashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Texuddy</Text>
        <Text style={styles.headerSubtitle}>Level 3 Helper</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.sidebar}>
          <View style={styles.card}>
            <Text style={styles.avatar}>👤</Text>
            <Text style={styles.name}>Alex</Text>
            <Text style={styles.level}>Level: 3</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.aiName}>🤖 MaxBot</Text>
            <Text style={styles.level}>Level 3</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '67%' }]} />
            </View>
            <Text style={styles.progressText}>67%</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.statsTitle}>📊 Your Stats</Text>
            <Text style={styles.stat}>Helped: 0 people</Text>
            <Text style={styles.stat}>Points: 0</Text>
            <Text style={styles.stat}>Streak: 0 days 🔥</Text>
          </View>
        </View>
        
        <View style={styles.emailList}>
          <Text style={styles.sectionTitle}>Available Emails</Text>
          <View style={styles.emailCard}>
            <Text style={styles.emailIcon}>📱</Text>
            <Text style={styles.emailFrom}>Sarah M.</Text>
            <Text style={styles.emailSubject}>My son is always on phone</Text>
            <Text style={styles.emailPreview} numberOfLines={2}>
              Hi, I'm worried about my 12-year-old son...
            </Text>
            <View style={styles.emailActions}>
              <TouchableOpacity style={styles.helpButton}>
                <Text style={styles.helpButtonText}>Help</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.skipButton}>
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <Link href="/" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  sidebar: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  level: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 4,
  },
  aiName: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  stat: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  emailList: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  emailCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emailIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  emailFrom: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  emailSubject: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  emailPreview: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  emailActions: {
    flexDirection: 'row',
    gap: 8,
  },
  helpButton: {
    backgroundColor: '#667eea',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  helpButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  skipButton: {
    borderWidth: 2,
    borderColor: '#667eea',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  skipButtonText: {
    color: '#667eea',
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  backButtonText: {
    color: '#667eea',
    fontSize: 16,
  },
});

