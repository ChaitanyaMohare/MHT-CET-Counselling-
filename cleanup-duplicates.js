/**
 * One-time script: removes duplicate QuickLead entries.
 * Keeps the EARLIEST entry for each mobile number, deletes the rest.
 * Run once: node cleanup-duplicates.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

async function removeDuplicates() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const col = mongoose.connection.db.collection('quickleads');

  // Get all records sorted oldest first
  const all = await col.find({}).sort({ createdAt: 1 }).toArray();
  console.log(`📋 Total QuickLead records: ${all.length}`);

  const seen = new Map();
  const toDelete = [];

  for (const doc of all) {
    if (seen.has(doc.mobile)) {
      toDelete.push(doc._id);
      console.log(`  ⚠️  Duplicate found: ${doc.fullName} (${doc.mobile}) — will delete`);
    } else {
      seen.set(doc.mobile, doc._id);
    }
  }

  if (toDelete.length > 0) {
    const result = await col.deleteMany({ _id: { $in: toDelete } });
    console.log(`\n🗑️  Deleted ${result.deletedCount} duplicate(s)`);
  } else {
    console.log('\n✅ No duplicates found — database is clean');
  }

  await mongoose.disconnect();
  console.log('✅ Done');
}

removeDuplicates().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
