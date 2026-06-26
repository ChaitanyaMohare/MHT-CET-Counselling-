// Quick test script for Contact form functionality
// Run: node test-contact.js

require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

console.log('🧪 Testing Contact Model...\n');

async function testContactForm() {
  try {
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected\n');

    // Test 1: Create a contact entry
    console.log('Test 1: Creating contact entry...');
    const testContact = await Contact.create({
      name: 'Test User',
      email: 'callback@praveshmitra.in',
      mobile: '9876543210',
      message: 'Test callback request',
      preferredDate: '2026-06-27',
      preferredTime: '10:00 AM - 12:00 PM',
      status: 'pending'
    });
    console.log('✅ Contact created successfully!');
    console.log('   ID:', testContact._id);
    console.log('   Name:', testContact.name);
    console.log('   Mobile:', testContact.mobile);
    console.log('   Date:', testContact.preferredDate);
    console.log('   Time:', testContact.preferredTime);
    console.log();

    // Test 2: Retrieve the contact
    console.log('Test 2: Retrieving contact...');
    const retrieved = await Contact.findById(testContact._id);
    console.log('✅ Contact retrieved successfully!');
    console.log('   Retrieved name:', retrieved.name);
    console.log();

    // Test 3: Update status
    console.log('Test 3: Updating status...');
    retrieved.status = 'contacted';
    await retrieved.save();
    console.log('✅ Status updated to:', retrieved.status);
    console.log();

    // Test 4: Count contacts
    console.log('Test 4: Counting total contacts...');
    const count = await Contact.countDocuments();
    console.log('✅ Total contacts in database:', count);
    console.log();

    // Cleanup: Delete test entry
    console.log('Cleanup: Deleting test contact...');
    await Contact.findByIdAndDelete(testContact._id);
    console.log('✅ Test contact deleted');
    console.log();

    console.log('🎉 All tests passed! Contact form should work correctly.\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('📡 MongoDB connection closed');
    process.exit(0);
  }
}

testContactForm();
