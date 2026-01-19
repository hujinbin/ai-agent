// Jest setup file
// This file runs before each test suite

// Mock fetch API for jsdom environment
global.fetch = jest.fn();
