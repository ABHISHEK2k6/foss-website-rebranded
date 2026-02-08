const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function debugDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    console.log('Connection String:', process.env.MONGODB_URI.replace(/:[^:@]+@/, ':***@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get database name
    const dbName = mongoose.connection.db.databaseName;
    console.log('📊 Current Database:', dbName);
    console.log('='.repeat(50));
    
    // List all collections in current database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📁 Collections in', dbName + ':');
    if (collections.length === 0) {
      console.log('  (no collections found)');
    } else {
      collections.forEach(col => {
        console.log('  -', col.name);
      });
    }
    
    // Check for users in different possible collection names
    console.log('\n🔍 Searching for user documents...\n');
    
    const possibleNames = ['users', 'Users', 'user', 'User'];
    
    for (const collectionName of possibleNames) {
      try {
        const collection = mongoose.connection.db.collection(collectionName);
        const count = await collection.countDocuments();
        if (count > 0) {
          console.log(`✅ Found ${count} documents in "${collectionName}" collection`);
          const docs = await collection.find({}).limit(5).toArray();
          docs.forEach((doc, i) => {
            console.log(`   User ${i+1}: ${doc.email || 'no email'} (role: ${doc.role || 'no role'})`);
          });
        }
      } catch (e) {
        // Collection doesn't exist, skip
      }
    }
    
    // Also check blogs collection
    try {
      const blogsCollection = mongoose.connection.db.collection('blogs');
      const blogCount = await blogsCollection.countDocuments();
      console.log(`\n📝 Found ${blogCount} blog posts in "blogs" collection`);
    } catch (e) {
      console.log('\n📝 No blogs collection found');
    }
    
    // List all databases
    console.log('\n🗄️  All databases on this cluster:');
    const adminDb = mongoose.connection.db.admin();
    const dbs = await adminDb.listDatabases();
    dbs.databases.forEach(db => {
      console.log('  -', db.name, `(${Math.round(db.sizeOnDisk / 1024)}KB)`);
    });
    
    console.log('\n' + '='.repeat(50));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

console.log('Debugging database structure...\n');
debugDatabase();
